import { extendObservable, action } from 'mobx'
import { Message, MessageBox } from 'element-react'
import { excelExport } from '../../modules/ExportOrImport/Export/Export'
import _tools from '../../modules/Tools.js'

import {
  getConfig, saveAsNewFilterset, deleteScheme, getList, getTotalNums
} from './requests'

// 模块
import ImgFormatter from '../../modules/ImgFormatter'
// model
import FilterSetListModel from '../../modules/FilterSetList/model'

const _getConfig = getConfig()

export default class WrapperOfFilterSetListModel extends FilterSetListModel {
  api = {// 交给父类调用
    deleteScheme
  }
  constructor (options) {
    super()
    extendObservable(this, {
      dict: {
        warehouse: [{ value: 'check_date', label: '审核时间' }, { value: 'create_time', label: '入库时间' }]
      }, // 各种从后端获取的未处理数据
      get _dict () { // 对dict解析后的数据,filteritems中options都在这里找
        // 通过在FilterSetModel构造器中autorun(this.assignFilterOptions)实现了
        // 改变 _dict会自动改变filteritems中对应的options
        const { warehouse } = this.dict
        return {
          warehouse
        }
      },
      isReport: true, // 报表页面
      filterSetList: [],
      ...(options || {})
    })

    // 调用请求接口iniit数据
    // this.getConfig()
  }

  /**
   * 调用请求接口iniit数据
   */
  getConfig = () => {
    _getConfig.then(action(v => {
      this.getConfigOver = true // 标记getConfig结束，assignFilterSetList要用到
      if (v.status !== 'Successful') return Message.error(v.data)
      console.log('getConfig的结果', v)
      const { item_list, old_set } = v.data
      this.dict = { ...this.dict, ...item_list }
      if (!old_set) return
      // this.filterset.filters.config = this.filterset.filters.config.concat(old_set)
      this.configOfFilterItems = this.configOfFilterItems.concat(old_set)
      this.assignFilterSetList()// 定义于父类，作用是通过configOfFilterItems（定义与父类）生成filterSetList
    }))
  }
  /**
   * utils
   */
  // 父类中assembleFilterSetList方法会用到,TODO:主要工作量在这里
  getFilterSetConfig = () => {
    return {// 非的filterset设置
      parent: this,
      sliceFromIndex: 2, // 前两项固定
      hiddenOrderButton: false,
      filteritems: [
        {
          field: 'start_date',
          type: 'date',
          label: '日期',
          value: Date.now() - 30 * 24 * 3600 * 1000
        },
        {
          field: 'end_date',
          type: 'date',
          label: '至',
          value: Date.now()
        },
        {
          field: 'warehouse_id',
          type: 'select',
          label: '仓库',
          labelField: 'label',
          valueField: 'value',
          options: []
        },
        {
          field: 'product_no',
          type: 'text',
          label: '商品编码'
        }, {
          field: 'product_name',
          type: 'text',
          label: '商品名称'
        }, {
          field: 'seller_outer_no',
          type: 'text',
          label: '商品货号'
        },
        {
          field: 'sku_no',
          type: 'text',
          label: 'SKU编码'
        },
        {
          field: 'bar_code',
          type: 'text',
          label: '条形码'
        }
      ],
      reportList: this.getReportList(),
      api: {
        queryData: () => { }, // 因为是报表所以主表的queryData在report的配置里
        saveFilterSet: (data) => { // 貌似保存顺序的接口跟这个是一样的，只是参数少了value那部分
          console.log('执行生成方案接口', 'data:', data)
          return saveAsNewFilterset(data)
        },
        onItemsChange: (item, field, value, oldValue, key) => { // filteritems的值改变的对外接口
          // console.log('执行onItemsChange方法','item:',item,'field:',field,'value:',value,'oldValue:',oldValue,'numbergroup组件的MinOrMax:',key)
          if ((field === 'start_date' || field === 'end_date') && !value) {
            item.value = oldValue
            return Message.error('日期不可为空')
          }
        }
      }
    }
  }

  getReportList () {
    const tabs = [
      { value: 'style', name: '按款式' },
      { value: 'sku', name: '按SKU编码' }
    ]
    const ret = {
      activeTab: 'sku',
      sumCards: [
        {
          field: 'real_arrival_num', // 用于获取值
          label: '销采到货', // 用于自定义label，没有就用列名
          ui: { icon: 'icon-share_stock' }, //
          value: 0
        },
        {
          field: 'stock_in_num', // 用于获取值
          label: '备货入库', // 用于自定义label，没有就用列名
          ui: { icon: 'icon-share_stock' }, //
          value: 0
        },
        {
          field: 'arrived_count', // 用于获取值
          label: '确认退货', // 用于自定义label，没有就用列名
          ui: { color: '#66c36b', icon: 'icon-share_stock' }, //
          value: 0
        },
        {
          field: 'stock_out_num', // 用于获取值
          label: '采购退货出库', // 用于自定义label，没有就用列名
          ui: { color: '#66c36b', icon: 'icon-share_stock' }, //
          value: 0
        }
      ],
      tabsFlag: {
        inited: tabs.reduce((a, b) => {
          a[b.value] = b.value === 'sku'
          return a
        }, {}),
        searched: tabs.reduce((a, b) => {
          a[b.value] = false
          return a
        }, {})
      },
      list: [],
      showOtherTabs: false
    }
    const list = tabs.map(({ value, name }) => {
      return {
        tab: { name, value },
        hiddenSubTables: true,
        api: {
          queryData: (data, tabValue, reportModel) => {
            let { cond, page, pageSize, sidx = '', sord = '' } = data
            const group_by_key = tabValue === 'sku' ? 'sku_id' : 'product_id'
            cond = { ...cond }// 因为会对cond对象修改，所以还是不要影响到源数据
            cond.create_time_start = cond.start_date
            cond.create_time_end = cond.end_date
            cond.group_by_key = group_by_key
            delete cond.start_date
            delete cond.end_date
            return getList(`vo=${JSON.stringify(cond)}&page=${page}&pageSize=${pageSize}&sidx=${sidx}&sord=${sord}`)
          },
          querySumCards: (data) => {
            // 接口返回的data是{[field]:[sumValue]}
            const ret = getTotalNums(data)
            return ret
          }
        },
        grid: {
          getDisplayRows: (rows) => {
            return rows
          },
          getColumns: (reportModel) => {
            return this.generateColumn(reportModel.tab.value)
          },
          columnsConfig: { type: '', getColumns: '' }, // 顺序，显示，宽度，最好的数据结构是[{key:xx,width:xx},{}],需要在grid的render方法中装配
          primaryKeyField: 'gridOrderNo',
          sumColumns: [],
          cashOn: true,
          sortAll: false,
          showCheckBox: true
        },
        getButtons: (report) => {
          return [
            {
              permissionId: '1',
              text: '导出',
              handleClick: () => {
                const cashRows = (report.gridModel.cashSelectedRows || []).map(({ mapOfFieldToEditedCellModel, ...rest }) => rest)
                let exportProperties = {}
                exportProperties.dataIsComplete = true
                const sheet_name = report.tab.value === 'sku' ? 'sku_sum_export' : 'product_sum_export'
                const group_by_key = report.tab.value === 'sku' ? 'sku_id' : 'product_id'
                const title = '商品汇总表导出'
                if (cashRows.length) {
                  MessageBox.confirm('确定导出选中的数据吗?', '提示', {
                    type: 'warning'
                  }).then(() => {
                    excelExport.exportData(sheet_name, title, cashRows)
                  }).catch(() => {
                    Message({
                      type: 'info',
                      message: '已取消导出'
                    })
                  })
                } else if (!cashRows.length) {
                  MessageBox.confirm('未选择数据将导出全部数据?', '提示', {
                    type: 'warning'
                  }).then(() => {
                    const { cond, ...rest } = report.top.history
                    const {start_date: create_time_start, end_date: create_time_end, ..._cond} = cond
                    let params = {
                      vo: JSON.stringify({ create_time_start, create_time_end, ..._cond, group_by_key }),
                      ...rest
                    }
                    let totalCount = report.gridModel.total
                    console.log(totalCount)
                    console.log(params, 'params')
                    excelExport.exportUrl(sheet_name, title, '/api/productStatisticsController/getDetailNums', params, totalCount, exportProperties)
                  }).catch(() => {
                    Message({
                      type: 'info',
                      message: '已取消导出'
                    })
                  })
                }
              }
            }
          ]
        }
      }
    })
    ret.list = list
    return ret
  }

  generateColumn (tab = 'sku', report) {
    let fixColumn = [
      {
        key: 'product_name',
        name: '商品名称',
        width: 370,
        resizable: true,
        draggable: true
      }, {
        key: 'product_no',
        name: '商品编码',
        width: 130,
        resizable: true,
        draggable: true
      }, {
        key: 'seller_outer_no',
        name: '商品货号',
        width: 130,
        resizable: true,
        draggable: true
      }, {
        key: 'pic',
        name: '图片',
        width: 90,
        resizable: true,
        draggable: true,
        formatter: ImgFormatter
      }, {
        key: 'sku_no',
        name: 'SKU编码',
        width: 130,
        resizable: true,
        draggable: true
      }, {
        key: 'bar_code',
        name: '条形码',
        width: 130,
        resizable: true,
        draggable: true
      }, {
        key: 'color_type',
        name: '颜色',
        width: 60,
        resizable: true,
        draggable: true
      }, {
        key: 'size_type',
        name: '尺码',
        width: 60,
        resizable: true,
        draggable: true
      }, {
        key: 'cost_price',
        name: '成本价',
        width: 60,
        resizable: true,
        draggable: true
      },
      {
        key: 'warehouse_name',
        name: '仓库',
        width: 90,
        resizable: true,
        draggable: true
      }, {
        key: 'real_arrival_num',
        name: '销采到货',
        width: 90,
        resizable: true,
        draggable: true
      }, {
        key: 'stock_in_num',
        name: '备货入库',
        width: 90,
        resizable: true,
        draggable: true
      }, {
        key: 'arrived_count',
        name: '确认退货',
        width: 90,
        resizable: true,
        draggable: true
      }, {
        key: 'stock_out_num',
        name: '采购退货出库',
        width: 100,
        resizable: true,
        draggable: true
      }
    ]

    if (tab === 'style') return fixColumn.filter(el => !~['sku_no', 'bar_code', 'color_type', 'size_type'].indexOf(el.key))

    return fixColumn
  }
}
