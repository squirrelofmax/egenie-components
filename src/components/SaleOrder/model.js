import React from 'react'
import { extendObservable, action, observable} from 'mobx'
import { observer } from 'mobx-react'
import { Message, Button, MessageBox } from 'element-react'

import {
    getConfig, saveAsNewFilterset, deleteScheme,
  getSaleOrderList, getDictsByTypes, getSaleOrderDetailList, getSaleOrderLogList, doConfirmed, checkSaleOrder, recheckSaleOrder,
  doConfirmAndCheck, closeSaleOrder, updateSaleOrder, deleteSaleOrder, generatePurchaseOrder
} from './requests'

// 模块
import { ImgFormatter, TimeStampFormatter, getEditableCellFormatter, FilterSetListModel} from '@/lib'

// model
import SaleOrderModel from './Edit/models/OrderModel'

const _getConfig = getConfig()

export default class WrapperOfFilterSetListModel extends FilterSetListModel {
  api = {// 交给父类调用
    deleteScheme
  }
  constructor (options) {
    super()
    extendObservable(this, {
      flag: false,
      dict: {
        isChecked: [{ value: '0', label: '未审核' }, { value: '1', label: '已审核' }],
        confirmed_status: [],
        delivery_type: [],
        is_close: [],
        purchase_order_type: [],
        sales_type: [],
        send_status: [],
        trade_sale_order_type: []
      }, // 各种从后端获取的未处理数据
      get _dict () { // 对dict解析后的数据,filteritems中options都在这里找
        // 通过在FilterSetModel构造器中autorun(this.assignFilterOptions)实现了
        // 改变 _dict会自动改变filteritems中对应的options
        const {isChecked, confirmed_status, delivery_type, is_close, purchase_order_type, sales_type, send_status, trade_sale_order_type} = this.dict
        const util = (obj) => Object.keys(obj).map(value => ({ value, label: obj[value] }))
        return {
          isChecked,
          confirmedStatus: util(confirmed_status),
          deliveryType: util(delivery_type),
          isClose: util(is_close),
          purchaseOrderType: util(purchase_order_type),
          salesType: util(sales_type),
          sendStatus: util(send_status),
          tradeSaleOrderType: util(trade_sale_order_type)
        }
      },
      isReport: false, // 报表页面
      filterSetList: [],
      editDialog: {},
      ...(options || {})
    })

    this.editDialog = new SaleOrderModel({ parent: this })
    // 调用请求接口iniit数据
    this.getConfig()
    this.getDictsByTypes()
    // const o = observable
    // debugger
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
      this.configOfFilterItems = this.configOfFilterItems.concat(old_set)
      this.assignFilterSetList()// 定义于父类，作用是通过configOfFilterItems（定义与父类）生成filterSetList
    }))
  }

  getDictsByTypes=action(() => {
    if (!this.getDictsByTypes.cache) this.getDictsByTypes.cache = getDictsByTypes('is_close,confirmed_status,delivery_type,sales_type,send_status,trade_sale_order_type,purchase_order_type')
    this.getDictsByTypes.cache.then(action(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      Object.assign(this.dict, v.data)
    }))
  })

  /**
   * utils
   */

// 父类中assembleFilterSetList方法会用到,TODO:主要工作量在这里

  getFilterSetConfig = () => {
    return {// 非的filterset设置
      parent: this,
      sliceFromIndex: 3, // 前三项filteritem固定
      hiddenOrderButton: false,
      filteritems: this.getFilteritems(),
      grid: this.getGrid(),
      getButtons: this.getButtons, // 获取buttons配置的接口，传进去在FilterSetModel构造器中调用，调用时会把FilterSetModel的实例传进来当参数
      api: this.getApi(),
      subTables: this.getSubTables()
    }
  }

  /**
   供getFilterSetConfig调用的比较长的utils
   */

  getFilteritems = () => [
    {
      field: 'dateType',
      type: 'select',
      label: '日期类型',
      labelField: 'label',
      valueField: 'value',
      clearable: false,
      value: 'createdAt',
      display_sequence: 0,
      options: [{
        value: 'createdAt',
        label: '创建时间'
      }, {
        value: 'checkedTime',
        label: '审核时间'
      }, {
        value: 'closeTime',
        label: '关闭时间'
      }
      ]
    },
    {
      field: 'dateValueStart',
      type: 'date',
      label: '日期',
      display_sequence: 1
    },
    {
      field: 'dateValueEnd',
      type: 'date',
      label: '至',
      display_sequence: 2,
      hiddenColon: true,
      labelStyle: {
        justifyContent: 'center'
      }
    },
    {
      field: 'isChecked',
      type: 'select',
      label: '审核状态',
      labelField: 'label',
      valueField: 'value',
      options: []
    },
    {
      field: 'isClose',
      type: 'select',
      label: '关闭状态',
      labelField: 'label',
      valueField: 'value',
      options: []
    },
    {
      field: 'customer',
      type: 'text',
      label: '客户'
    },
    {
      field: 'pmsPurchaseOrderNo',
      type: 'text',
      label: '采购单号'
    },
    {
      field: 'tradeSaleOrderNo',
      type: 'text',
      label: '销售单号',
      labelField: 'label',
      valueField: 'value'
    },
    {
      field: 'salesType',
      type: 'select',
      label: '销售方式',
      labelField: 'label',
      valueField: 'value',
      options: []
    },
    {
      field: 'tradeSaleOrderType',
      type: 'select',
      label: '订单类型',
      labelField: 'label',
      valueField: 'value',
      options: []
    },
    {
      field: 'deliveryType',
      type: 'select',
      label: '交货方式',
      labelField: 'label',
      valueField: 'value',
      options: []
    },
    // // {
    // //   field: 'payTypeName',
    // //   type: 'select',
    // //   label: '结算方式',
    // //   labelField: 'label',
    // //   valueField: 'value',
    // //   options: []
    // // },
    {
      field: 'erpProductNo',
      type: 'text',
      label: '商品编码'
    },
    {
      field: 'erpSkuNo',
      type: 'text',
      label: 'SKU编码'
    },
    {
      field: 'sendStatus',
      type: 'select',
      label: '整单送货',
      labelField: 'label',
      valueField: 'value',
      options: []
    },
    {
      field: 'ZJE',
      type: 'numbergroup',
      label: '总金额'
    },
    {
      field: 'ZSL',
      type: 'numbergroup',
      label: '总数量'
    }
  ]

  getGrid = () => ({
    gridIdForColumnConfig: 'omsSaleOrder_filterset_mainGrid',
    getColumns: this.getColumns, // 获取columns配置的接口，传进去在FilterSetModel构造器中调用，调用时会把FilterSetModel的实例传进来当参数
    _class: '', // 设置Grid最外层div的class
    getDisplayColumns: (columns, gridModel) => {
      if (!this.flag) return columns
      const item = gridModel.parent.filteritems[5]
      return [
        {
          key: 'test',
          name: '测试',
          width: 150,
          resizable: true,
          draggable: true,
          sortable: true
        },
        {
          key: item.label,
          name: item.label,
          width: 150,
          resizable: true,
          draggable: true,
          sortable: true
        },
        {
          key: item.label + '1',
          name: item.value + '---',
          width: 150,
          resizable: true,
          draggable: true,
          sortable: true
        },
        ...columns
      ]
    },
    interceptorOfRows: this.getInterceptor(),
    getDisplayRows: (rows) => { // 对rows的加工接口，返回的是最终展示出来的数据，另外如果要加可编辑单元格要在此给每个row装配对应单元格的model
      return rows
    },
    columnsConfig: null, // 顺序，显示，宽度，最好的数据结构是[{key:xx,width:xx},{}],需要在grid的render方法中装配
    primaryKeyField: 'id', // checkBox列用到，数据的id
    sumColumns: [], // 表格底部统计行
    cashOn: true, // 主表要加cashRows以控制按钮显隐，还有把cashRows作为数据传给对应后端接口，即只要有按钮执行批量操作，且是分页的，就必须cashOn：true
    sortAll: true, // 一般都是true，即通过后端接口进行排序
    showCheckBox: true// 一般都是true，除非是report的那种纯展示表格
  })

  getInterceptor = () => {
    return {
      config: [
        {
          field: 'deliveryType',
          type: 'select',
          getOptions: '_dict.deliveryType',
          isDisabled: (cell) => {
            const { isMultiApprove, confirmedStatus, isChecked, isClose } = cell.rawRow
            const flag = (isChecked || isClose == 1 || isClose == 2 || isClose == 3 || isClose == 5)// 已审核或已关闭
            return flag || (isMultiApprove && (confirmedStatus == 1 || confirmedStatus == 2))// 如果未审核且未关闭，那么只有当多级审批时，还有可能disabled，即已确认。
          },
          getClass: () => 'ejl-grid-cell--align-center-when-disabled'
        }
      ],
      context: this
    }
  }

  getColumns = (filterset) => {
    // const that = filterset
    // const SelectFormatter = getSelectFormatter(that)
    return [
      {
        key: 'operation',
        width: 77,
        name: '操作',
        locked: true,
        formatter: ({ value, dependentValues }) => (<div style={{ textAlign: 'left' }}>
          <Button style={{ display: dependentValues.isChecked == 1 || dependentValues.isClose == 1 ? 'none' : '' }} type='text' size='small'
            onClick={() => {
              console.log('点击了行内编辑按钮')
              this.editDialog.showWhenEdit(dependentValues)
            }}>编辑</Button>
          <Button style={{ display: dependentValues.isChecked == 1 || dependentValues.isClose == 1 ? 'none' : '' }} type='text' size='small'
            onClick={() => {
              MessageBox.confirm('彻底删除后数据将无法恢复，您确定要删除吗？', '提示', { type: 'info' }).then(() => {
                const id = dependentValues.id
                deleteSaleOrder(id).then(v => {
                  if (v.status !== 'Successful') return Message.error(v.data)
                  Message.success('删除完成')
                  const { onRefresh, subTablesModel: { resetWhenDeleteCursorRowOfMainGrid } } = this.cursorFilterSetModel
                  onRefresh()
                  resetWhenDeleteCursorRowOfMainGrid(id)
                })
              })
            }}>删除</Button>
        </div>),
        getRowMetaData: row => row
      },
      {
        key: 'customer',
        name: '客户',
        width: 100,
        resizable: true,
        draggable: true
      }, {
        key: 'isChecked',
        name: '审核状态',
        width: 70,
        resizable: true,
        draggable: true,
        formatter: observer(({ value }) => {
          const options = this._dict['isChecked']
          const item = options && options.find(el => el.value == value)
          const displayValue = item ? item.label : value
          return (<div style={{ textAlign: 'center', marginLeft: '-8px' }}>{displayValue}</div>)
        })
      }, {
        key: 'isClose',
        name: '关闭状态',
        width: 70,
        resizable: true,
        draggable: true,
        formatter: observer(({ value }) => {
          const options = this._dict['isClose']
          const item = options && options.find(el => el.value == value)
          const displayValue = item ? item.label : value
          return (<div style={{ textAlign: 'center', marginLeft: '-8px', color: value == 2 ? 'red' : '#000' }}>{displayValue}</div>)
        })
      },
      {
        key: 'pmsPurchaseOrderNo',
        name: '采购单据编号',
        width: 150,
        resizable: true,
        draggable: true,
        sortable: true
      }, {
        key: 'tradeSaleOrderNo',
        name: '销售单据编号',
        width: 150,
        resizable: true,
        draggable: true,
        sortable: true
      }, {
        key: 'tradeSaleOrderType',
        name: '销售订单类型',
        width: 90,
        resizable: true,
        draggable: true,
        sortable: true,
        formatter: observer(({ value }) => {
          const options = this._dict['tradeSaleOrderType']
          const item = options && options.find(el => el.value == value)
          const displayValue = item ? item.label : value
          return (<div style={{ textAlign: 'center', marginLeft: '-8px' }}>{displayValue}</div>)
        })
      }, {
        key: 'salesType',
        name: '销售方式',
        width: 70,
        resizable: true,
        draggable: true,
        sortable: true,
        formatter: observer(({ value }) => {
          const options = this._dict['salesType']
          const item = options && options.find(el => el.value == value)
          const displayValue = item ? item.label : value
          return (<div style={{ textAlign: 'center', marginLeft: '-8px' }}>{displayValue}</div>)
        })
      }, {
        key: 'deliveryType',
        name: '交货方式',
        width: 190,
        resizable: true,
        draggable: true,
        sortable: true,
        formatter: getEditableCellFormatter('deliveryType'),
        getRowMetaData: row => row
      },
      // {
      //   key: 'payTypeName',
      //   name: '结算方式',
      //   width: 70,
      //   resizable: true,
      //   draggable: true,
      //   sortable: true
      // },
      {
        key: 'provinceName',
        name: '省',
        width: 80,
        resizable: true,
        draggable: true,
        sortable: true
      }, {
        key: 'cityName',
        name: '市',
        width: 80,
        resizable: true,
        draggable: true,
        sortable: true
      }, {
        key: 'districtName',
        name: '区',
        width: 80,
        resizable: true,
        draggable: true,
        sortable: true
      }, {
        key: 'deliverAddress',
        name: '送货地址',
        width: 150,
        resizable: true,
        draggable: true,
        sortable: true
      }, {
        key: 'remark',
        name: '备注',
        width: 150,
        resizable: true,
        draggable: true,
        sortable: true
      }, {
        key: 'checkerName',
        name: '审核人',
        width: 80,
        resizable: true,
        draggable: true,
        sortable: true
      }, {
        key: 'createdAt',
        name: '创建时间',
        width: 130,
        resizable: true,
        draggable: true,
        sortable: true,
        formatter: TimeStampFormatter
      }, {
        key: 'checkedTime',
        name: '审核时间',
        width: 130,
        resizable: true,
        draggable: true,
        sortable: true,
        formatter: TimeStampFormatter
      }, {
        key: 'closeTime',
        name: '关闭时间',
        width: 130,
        resizable: true,
        draggable: true,
        sortable: true,
        formatter: TimeStampFormatter
      }, {
        key: 'sendStatus',
        name: '整单送货完成',
        width: 90,
        resizable: true,
        draggable: true,
        sortable: true,
        formatter: observer(({ value }) => {
          const options = this._dict['sendStatus']
          const item = options && options.find(el => el.value == value)
          const displayValue = item ? item.label : value
          return (<div style={{ textAlign: 'center', marginLeft: -8 }}>{displayValue}</div>)
        })
      }, {
        key: 'totalSaleAmount',
        name: '销售总金额',
        width: 85,
        resizable: true,
        draggable: true,
        formatter: ({ value }) => (<div style={{ textAlign: 'right' }}>{value}</div>)
      }, {
        key: 'totalSaleNum',
        name: '销售总数量',
        width: 85,
        resizable: true,
        draggable: true,
        formatter: ({ value }) => (<div style={{ textAlign: 'right' }}>{value}</div>)
      }
    ]
  }

  getButtons = (filterset) => {
    return [
      {
        text: '新建',
        handleClick: () => {
          console.log('点击了新建按钮')
          this.editDialog.showWhenAdd()
        },
        icon: 'icon-add',
        display: (rows) => rows.every(el => {
          return true
        })
      },
      {
        permissionId: '21',
        text: '审核',
        icon: 'icon-audit',
        handleClick: () => {
          console.log('点击了审核按钮')
          const tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',')
          if (!tradeSaleOrderIds) return Message.error('请先选中一行或多行！')
          MessageBox.confirm('是否确认进行审核操作?', '提示', { type: 'info' }).then(() => {
            checkSaleOrder({ tradeSaleOrderIds }).then(action(v => {
              if (v.status !== 'Successful') return Message.error(v.data)
              filterset.gridModel.cashSelectedRows.forEach(el => { el.isChecked = 1 })
              filterset.onRefresh()
              return Message.success(v.data)
            }))
          })
        },
        display: (rows) => rows.length && rows.every(el => {
          if (!el.isMultiApprove) { // 不是多级审批。。。未关闭，未审核
            return (!el.isClose || el.isClose == 4) && (!el.isChecked)
          }
          // 是多级审批，并且采购商已经同意配货，。。。未关闭，未审核
          return (el.confirmedStatus == 2) && (!el.isClose || el.isClose == 4) && (!el.isChecked)
        }),
        group: [
          {
            idx: 0,
            permissionId: '29',
            text: '反审核',
            icon: 'icon-audit',
            handleClick: () => {
              console.log('点击了反审核按钮')
              const tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',')
              if (!tradeSaleOrderIds) return Message.error('请先选中一行或多行！')
              MessageBox.confirm('是否确认进行反审核操作?', '提示', { type: 'info' }).then(() => {
                recheckSaleOrder({ tradeSaleOrderIds }).then(action(v => {
                  if (v.status !== 'Successful') return Message.error(v.data)
                  filterset.gridModel.cashSelectedRows.forEach(el => { el.isChecked = 0 })
                  filterset.onRefresh()
                  return Message.success(v.data)
                }))
              })
            },
            display: (rows) => rows.length && rows.every(el => {
              // 每一个都未关闭(或拒绝关闭)，已审核,且发送未完成
              return !el.isMultiApprove && (!el.isClose || el.isClose == 4) && (el.isChecked == 1) && (el.sendStatus == 2 || !el.sendStatus)
            })
          }
        ]
      }, {
        permissionId: '256',
        text: '提交确认',
        handleClick: () => {
          console.log('点击了提交确认按钮')
          const tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',')
          if (!tradeSaleOrderIds) return Message.error('请先选中一行！')
          doConfirmed({ tradeSaleOrderIds }).then(action(v => {
            if (v.status !== 'Successful') return Message.error(v.data)
            filterset.gridModel.cashSelectedRows.forEach(el => { el.confirmedStatus = 1 })
            filterset.onRefresh()
            Message.success(v.data)
          }))
        },
        icon: 'icon-audit',
        // 每一个都是多级审批，未确认，未关闭， ---未审核
        display: (rows) => rows.length && rows.every(el => (el.isMultiApprove == 1) && (el.canConfirmCheck == 0) && (el.confirmedStatus == 0 || el.confirmedStatus == 3) && (!el.isClose || el.isClose == 4) && (el.isChecked != 1))
      }, {
        permissionId: '262',
        text: '确认并审核',
        handleClick: () => {
          console.log('点击了确认并审核按钮')
          const tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',')
          if (!tradeSaleOrderIds) return Message.error('请先选中一行！')
          doConfirmAndCheck({ tradeSaleOrderIds }).then(action(v => {
            if (v.status !== 'Successful') return Message.error(v.data)
            filterset.gridModel.cashSelectedRows.forEach(el => { el.confirmedStatus = 1; el.isChecked = 1 })
            filterset.onRefresh()
            Message.success(v.data)
          }))
        },
        icon: 'icon-audit',
        // 每一个都是多级审批，可确认审批,未确认，未关闭， ---未审核
        display: (rows) => rows.length && rows.every(el => (el.isMultiApprove == 1) && (el.canConfirmCheck == 1) && (el.confirmedStatus == 0 || el.confirmedStatus == 3) && (!el.isClose || el.isClose == 4) && (el.isChecked != 1))
      },
      {
        permissionId: '84',
        text: '关闭',
        icon: 'icon-close',
        handleClick: () => {
          console.log('点击了关闭按钮')
          const tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',')
          if (!tradeSaleOrderIds) return Message.error('请先选中一行或多行！')
          MessageBox.confirm('是否确认进行关闭操作?', '提示', { type: 'info' }).then(() => {
            closeSaleOrder({ tradeSaleOrderIds, isClose: 1 }).then(action(v => {
              if (v.status !== 'Successful') return Message.error(v.data)
              filterset.gridModel.cashSelectedRows.forEach(el => { el.isClose = 1 })
              filterset.onRefresh()
              return Message.success(v.data)
            }))
          })
        },
        display: (rows) => {
          // 选中1行且该行未关闭，已审核
          if (!rows.length) return false
          if (rows.length > 1) return false
          const item = rows[0]
          return (!item.isClose || item.isClose == 4) && item.isChecked == 1
        }
      },
      {
        permissionId: '242',
        text: '打印',
        isLabel: true, // 点击不发生任何事件，在与勾选框联动时有用到
        icon: 'icon-suspend',
        handleClick: () => {
          console.log('点击了打印按钮')
        },
        group: [
          {
            idx: 0,
            permissionId: '243',
            text: '打印2',
            icon: 'icon-barcode',
            display: (rows) => rows.length && rows.every(el => {
              return false
            }),
            handleClick: () => {
              console.log('点击了打印2按钮')
            }
          },
          {
            idx: 1,
            permissionId: '243',
            text: '打印设置',
            icon: 'icon-suspend_relieve',
            display: (rows) => rows.every(el => {
              return false
            }),
            handleClick: () => {
              console.log('点击了打印设置按钮')
            }
          }
        ],
        display: (rows) => rows.every(el => {
          return true
        })
      },
      {
        permissionId: '256',
        text: '生成采购单',
        icon: 'icon-audit',
        handleClick: () => {
          console.log('点击了生成采购单按钮')
          const tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',')
          if (!tradeSaleOrderIds) return Message.error('请先选中一行或多行！')
          MessageBox.confirm('是否确认进行生成采购单操作?', '提示', { type: 'info' }).then(() => {
            generatePurchaseOrder(tradeSaleOrderIds).then(action(v => {
              if (v.status !== 'Successful') return Message.error(v.data)// TODO:后续加是否已生成采购单的标记位
              filterset.onRefresh()
              return Message.success(v.data)
            }))
          })
        },
        display: (rows) => rows.length && rows.every(el => { // 已审核，未关闭
          const { isChecked, isClose } = el
          return (isClose == null || isClose == 0 || isClose == 4) && (isChecked == 1)
        })
      },
      {
        permissionId: '257',
        text: '生成送货单',
        icon: 'icon-audit',
        handleClick: () => {
          console.log('点击了生成送货单按钮')
        },
        display: (rows) => rows.length && rows.every(el => {
          const { isMultiApprove, confirmedStatus, isChecked, isClose, sendStatus } = el
          return sendStatus != 1 && (isClose == null || isClose == 0 || isClose == 4) && (isChecked == 1) && (!isMultiApprove || confirmedStatus == 2)
        })
      },
      {
        permissionId: '21',
        text: '同意关闭',
        icon: 'icon-close',
        handleClick: () => {
          console.log('点击了同意关闭按钮')
          const tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',')
          if (!tradeSaleOrderIds) return Message.error('请先选中一行！')
          MessageBox.confirm('是否确认同意关闭?', '提示', { type: 'info' }).then(() => {
            closeSaleOrder({ tradeSaleOrderIds, isClose: 3 }).then(action(v => {
              if (v.status !== 'Successful') return Message.error(v.data)
              filterset.gridModel.cashSelectedRows.forEach(el => { el.isClose = 3 })
              filterset.onRefresh()
              return Message.success(v.data)
            }))
          })
        },
        display: (rows) => rows.length && rows.every(el => {
          return false
        }),
        group: [
          {
            permissionId: '29',
            text: '拒绝关闭',
            icon: 'icon-close',
            handleClick: () => {
              console.log('点击了拒绝关闭按钮')
              const tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',')
              if (!tradeSaleOrderIds) return Message.error('请先选中一行！')
              MessageBox.confirm('是否确认拒绝关闭?', '提示', { type: 'info' }).then(() => {
                closeSaleOrder({ tradeSaleOrderIds, isClose: 4 }).then(action(v => {
                  if (v.status !== 'Successful') return Message.error(v.data)
                  filterset.gridModel.cashSelectedRows.forEach(el => { el.isClose = 4 })
                  filterset.onRefresh()
                  return Message.success(v.data)
                }))
              })
            },
            display: (rows) => {
              if (!rows.length) return false
              if (rows.length > 1) return false
              const item = rows[0]
              return item.isClose == 2
            }
          }
        ]
      },

      {
        permissionId: '257',
        text: '导入',
        icon: 'icon-import',
        handleClick: action(() => {
          filterset.gridModel.columns[2].ejlHidden = !filterset.gridModel.columns[2].ejlHidden
          console.log('点击了导入按钮')
        }),
        // display: (rows) => rows.every(el => {
        //   return true
        // })
        display: (rows) => {
          console.log(rows[0])
          return true
        }
      },
      {
        permissionId: '257',
        text: '导出',
        icon: 'icon-export',
        handleClick: () => {
          this.flag = !this.flag
          console.log('点击了导出按钮')
        },
        display: (rows) => rows.every(el => {
          return true
        })
      }
    ]
  }

  getApi = () => ({
    queryData: (data, filterset) => {
      const {cond, sidx = 'createdAt', sord = 'desc', ...rest} = data
      return getSaleOrderList({ ...cond, sidx, sord, ...rest})
    },
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
  })

  getSubTables = () => ({
    activeTab: 'detail',
    tabsFlag: {
      inited: {detail: true, log: false},
      searched: {}
    },
    list: [
      this.getSubDetail(),
      this.getSubLog()
    ]
  })

  getSubDetail = () => ({
    tab: { name: '销售订单明细', value: 'detail' },
    filteritems: [
      {label: '商品编码', field: 'erpProductNo', value: ''},
      {label: 'SKU编码', field: 'erpSkuNo', value: ''}
    ],
    allFilteritemsInOneGroup: true, // 默认是true，设为false则分成多个独立的过滤器
    clearAfterChangeFilteritem: false, // 默认是false,设为true则无法查复合条件
    grid: this.getSubDetailGrid(),
    api: {
      queryData: (data, pid, cursorRow, gridModel) => {
        const {cond, ...rest} = data
        return getSaleOrderDetailList({...cond, ...rest}, pid)
      }
    }
  })

  getSubDetailGrid =() => ({
    gridIdForColumnConfig: 'omsSaleOrder_filterset_subGrid_detail',
    getColumns: this.getSubDetailGridColumns, // 获取columns配置的接口，传进去在FilterSetModel构造器中调用，调用时会把FilterSetModel的实例传进来当参数
    _class: '', // 设置Grid最外层div的class
    getDisplayRows: (rows) => { // 对rows的加工接口，返回的是最终展示出来的数据
      return rows
    },
    columnsConfig: null, // 顺序，显示，宽度，最好的数据结构是[{key:xx,width:xx},{}],需要在grid的render方法中装配
    primaryKeyField: 'gridOrderNo', // checkBox列用到，数据的id
    sumColumns: [], // 表格底部统计行
    cashOn: false, // 主表要加cashRows以控制按钮显隐，还有把cashRows作为数据传给对应后端接口，即只要有按钮执行批量操作，且是分页的，就必须cashOn：true
    sortAll: false, // 一般都是true，即通过后端接口进行排序
    showCheckBox: false// 一般都是true，除非是report的那种纯展示表格
  })

  getSubDetailGridColumns = (filterset) => [
    {
      key: 'erpPic',
      name: '图片',
      width: 100,
      resizable: true,
      draggable: true,
      formatter: ImgFormatter
    }, {
      key: 'Flags',
      name: '标记',
      width: 80,
      resizable: true,
      draggable: true
    }, {
      key: 'customer',
      name: '客户',
      width: 150,
      resizable: true,
      draggable: true
    }, {
      key: 'erpProductNo',
      name: '商品编码',
      width: 150,
      resizable: true,
      draggable: true
    }, {
      key: 'erpProductName',
      name: '商品名称',
      width: 150,
      resizable: true,
      draggable: true
    }, {
      key: 'erpSkuNo',
      name: 'SKU编码',
      width: 150,
      resizable: true,
      draggable: true
    }, {
      key: 'erpBarCode',
      name: '条形码',
      width: 100,
      resizable: true,
      draggable: true
    }, {
      key: 'erpColorType',
      name: '颜色',
      width: 100,
      resizable: true,
      draggable: true,
      formatter: ({ value }) => (<div style={{ textAlign: 'center', marginLeft: -8 }}>{value}</div>)
    }, {
      key: 'erpSizeType',
      name: '尺码',
      width: 130,
      resizable: true,
      draggable: true,
      formatter: ({ value }) => (<div style={{ textAlign: 'center', marginLeft: -8 }}>{value}</div>)
    }, {
      key: 'baseUnitId',
      name: '基本计量单位',
      width: 100,
      resizable: true,
      draggable: true,
      formatter: observer(({ value }) => {
        const options = this.editDialog._dict['base_unit']
        const item = options && options.find(el => el.value == value)
        const displayValue = item ? item.label : value
        return (<div style={{ textAlign: 'center', marginLeft: -8 }}>{displayValue}</div>)
      })
    }, {
      key: 'saleNum',
      name: '销售数量',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: ({ value }) => (<div style={{ textAlign: 'right' }}>{value}</div>),
      getRowMetaData: row => row
    }, {
      key: 'realSendNum',
      name: '累计送货数量',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: ({ value }) => (<div style={{ textAlign: 'right' }}>{value}</div>)
    }, {
      key: 'salePriceNoTax',
      name: '售价',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: ({ dependentValues: { priceIncludeTax, taxRate } }) => (<div style={{ textAlign: 'right' }}>{(Number(priceIncludeTax || 0) * 100 / (100 + Number(taxRate || 0))).toFixed(2)}</div>),
      getRowMetaData: row => row
    }, {
      key: 'taxRate',
      name: '税率',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: ({ value }) => (<div style={{ textAlign: 'right' }}>{value == null ? '' : (value + '%')}</div>)
    }, {
      key: 'tax',
      name: '税额',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: ({ dependentValues: { priceIncludeTax, taxRate } }) => (<div style={{ textAlign: 'right' }}>{(Number(priceIncludeTax || 0) - (Number(priceIncludeTax || 0) * 100 / (100 + Number(taxRate || 0)))).toFixed(2)}</div>),
      getRowMetaData: row => row
    }, {
      key: 'priceIncludeTax',
      name: '含税售价',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: ({ value }) => (<div style={{ textAlign: 'right' }}>{value}</div>)
    }, {
      key: 'XSJE',
      name: '销售金额', // 不含税的销售金额，计算出来
      width: 85,
      resizable: true,
      draggable: true,
      formatter: ({ dependentValues: { priceIncludeTax, taxRate, saleNum } }) => (<div style={{ textAlign: 'right' }}>{((Number(priceIncludeTax || 0) - (Number(priceIncludeTax || 0) * 100 / (100 + Number(taxRate || 0)))) * Number(saleNum || 0)).toFixed(2)}</div>),
      getRowMetaData: row => row
    }, {
      key: 'XSJEHS',
      name: '销售金额(含税)',
      width: 95,
      resizable: true,
      draggable: true,
      formatter: ({dependentValues: {priceIncludeTax, saleNum}}) => (<div style={{textAlign: 'right'}}>{(Number(priceIncludeTax || 0) * Number(saleNum || 0)).toFixed(2)}</div>),
      getRowMetaData: row => row
    }, {
      key: 'sendStatus',
      name: '送货完成',
      width: 100,
      resizable: true,
      draggable: true,
      formatter: observer(({ value }) => {
        const options = this._dict['sendStatus']
        const item = options && options.find(el => el.value == value)
        const displayValue = item ? item.label : value
        return (<div style={{ textAlign: 'center', marginLeft: -8 }}>{displayValue}</div>)
      })
    }, {
      key: 'planSendDate',
      name: '预计交货日期',
      width: 160,
      resizable: true,
      draggable: true,
      formatter: TimeStampFormatter,
      getRowMetaData: row => row
    }, {
      key: 'realSendDate',
      name: '实际交货日期',
      width: 160,
      resizable: true,
      draggable: true,
      formatter: TimeStampFormatter,
      getRowMetaData: row => row
    }
  ]

  getSubLog = () => ({
    tab: { name: '日志', value: 'log' },
    grid: this.getSubLogGrid(),
    api: {
      queryData: (data, pid, cursorRow, gridModel) => {
        const {cond, ...rest} = data
        return getSaleOrderLogList(rest, pid)
      }
    }
  })

  getSubLogGrid = () => ({
    gridIdForColumnConfig: 'omsSaleOrder_filterset_subGrid_log',
    getColumns: this.getSubLogGridColumns, // 获取columns配置的接口，传进去在FilterSetModel构造器中调用，调用时会把FilterSetModel的实例传进来当参数
    _class: '', // 设置Grid最外层div的class
    getDisplayRows: (rows) => { // 对rows的加工接口，返回的是最终展示出来的数据
      return rows
    },
    columnsConfig: null, // 顺序，显示，宽度，最好的数据结构是[{key:xx,width:xx},{}],需要在grid的render方法中装配
    primaryKeyField: 'gridOrderNo', // checkBox列用到，数据的id
    sumColumns: [], // 表格底部统计行
    cashOn: false, // 主表要加cashRows以控制按钮显隐，还有把cashRows作为数据传给对应后端接口，即只要有按钮执行批量操作，且是分页的，就必须cashOn：true
    sortAll: false, // 一般都是true，即通过后端接口进行排序
    showCheckBox: false// 一般都是true，除非是report的那种纯展示表格
  })

  getSubLogGridColumns = (filterset) => [
    {
      key: 'moduleType',
      name: '操作模块',
      width: 100,
      resizable: true,
      draggable: true
    },
    {
      key: 'operationType',
      name: '操作类型',
      width: 150,
      resizable: true,
      draggable: true
    },
    {
      key: 'operationResult',
      name: '操作结果',
      resizable: true,
      draggable: true
    },
    {
      key: 'operatorShowName',
      name: '操作人名称',
      width: 200,
      resizable: true,
      draggable: true
    },
    {
      key: 'createdAt',
      name: '操作时间',
      width: 150,
      resizable: true,
      draggable: true,
      formatter: TimeStampFormatter
    }
  ]

  /**
   * actions
   */

  handleCellValueChange = action((key, value, row) => { // 主表子表的cellChange都在这两个方法中处理
    console.log(`执行最外部的handleCellValueChange,key:${key},value:${value},row:`, row)
    row[key] = value
    if (key === 'plan_arrival_date' && !value) {
      Message.warning('请填写预计到货日期')
      return true// 返回ture则停止调用blur
    }
  })

  handleCellBlur = action((key, value, row) => {
    console.log(`执行最外部的handleCellBlur,key:${key},value:${value},row:`, row)
    if (key === 'deliveryType') {
      updateSaleOrder({ [key]: value }, row['id']).then(action(v => {
        if (v.status !== 'Successful') return Message.error(v.data)
        Message.success('更新成功！')
      }))
    }
  })
}
