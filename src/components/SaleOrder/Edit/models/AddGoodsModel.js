import React from 'react'
import { extendObservable, action, when, autorun } from 'mobx'
import shortid from 'shortid'
import { Message, MessageBox, Button } from 'element-react'
import {
  getProductList
} from '../requests'
import { ImgFormatter, EgGridModel, getEditableCellFormatter} from '@/lib'
import mockData from './mock'

class Search {
  constructor (options) {
    extendObservable(this, {
      history: {...options, page: 1, pageSize: 50, sidx: '', sord: ''},
      present: {...options}
    })
  }
}

export default class AddGoodsModel {
  constructor (options) {
    this.initValue = {
      product_name: '', // 商品名称
      product_no: '', // 商品编码
      product_seller_outer_no: '', // 商品货号
      sku_no: '', // SKU编码
      bar_code: '', // 条形码
      color: '', // 颜色
      size: ''// 尺码
    }
    extendObservable(this, {
      id: shortid.generate(),
      inited: false, // 是否第一次show，是的话resize window，使得表格正常渲染。
      show: false,
      searchObj: new Search(this.initValue),
      get addedOnlyIds () {
        return this.bottomGridModel.rows.map(el => el.skuId)
      },
      get formData () {
        return JSON.parse(JSON.stringify(this.searchObj.present, ['product_name', 'product_code', 'product_seller_outer_no', 'sku_no', 'vendor_name', 'warehouse_id', 'bar_code', 'color_type',
          'size_type']))
      },
      top: {},
      topGridModel: this.getTopGridModel(),
      bottomGridModel: this.getBottomGridModel(),
      ...(options || {})
    })
    when(
      () => this.inited,
      () => setTimeout(() => window.dispatchEvent(new Event('resize')))
    )
    autorun(() => {
      this.bottomGridModel.total = this.bottomGridModel.rows.length
    })
  }
  /**
   actions
   */
  onValueChange = action((key, value) => {
    console.log('valueChange-------')
    this.searchObj.present[key] = value
  })
  onSearch = action(() => {
    console.log('执行onSearch-------')
    const { history, present } = this.searchObj
    const data = { ...history, ...present, page: 1 }
    this.queryDataAndSetState(data)
    Object.assign(this.topGridModel, { currentPage: 1, selectedKeyValues: [], expanded: {}, cashSelectedRows: [] })
    // 操作MyGrid的虚拟DOM，设置页码为1，清空勾选数据,重置树表的expanded状态,清空缓存的Rows
  })
  queryDataAndSetState = action(data => {
    this.topGridModel.loading = true
    // getProductList(data).then(action(v => {
    Promise.resolve(mockData).then(action(v => {
      this.topGridModel.loading = false
      Object.assign(this.searchObj.history, data)
      if (v.status !== 'Successful') {
        this.topGridModel.rows = []
        this.topGridModel.total = 0
        return Message.error(v.data)
      }
      this.topGridModel.rows = v.data.list
      this.topGridModel.total = v.data.totalCount
    }))
  })
  onReset = action(() => {
    console.log('执行onReset-------')
    this.searchObj.present = { ...this.initValue }
  })
  onPageOrSizeChange = action(({ currentPage, size }) => {
    console.log('执行onPageOrSizeChange-------', currentPage, size)
    this.queryDataAndSetState({ ...this.searchObj.history, page: currentPage, pageSize: size })
  })
  onSingleAdd = action((row) => {
    console.log('执行onSingleAdd-------')
    const item = this.bottomGridModel.rows.find(({skuId}) => skuId === row.skuId)
    if (item) return (item.saleNum += 1)
    this.bottomGridModel.rows = this.bottomGridModel.rows.concat([{ ...row, saleNum: 1 }])
  })
  onMultiAdd = action(() => {
    console.log('执行onMultiAdd-------')
    const topRows = this.topGridModel.cashSelectedRows
    if (!topRows.length) { return Message.error('请至少选择一行') }
    // 上下交集对应的下方的rows
    const repeatRowsOfBottom = this.bottomGridModel.rows.filter(({ skuId }) => topRows.find(el => el.skuId === skuId))
    repeatRowsOfBottom.forEach(el => { el.saleNum += 1 })
    // 上下差集对应的上方的rows
    const specialRowsOfTop = topRows.filter(({ skuId }) => !this.bottomGridModel.rows.find(el => el.skuId === skuId)).map(el => {
      el = { ...el, saleNum: 1 }
      return el
    })
    this.bottomGridModel.rows = this.bottomGridModel.rows.concat(specialRowsOfTop)
  })
  onSingleDelete = action((row) => {
    console.log('执行onSingleDelete-------')
    const index = this.bottomGridModel.rows.findIndex(el => el.skuId === row.skuId)
    ~index && this.bottomGridModel.rows.splice(index, 1)
    this.bottomGridModel.selectedKeyValues = this.bottomGridModel.selectedKeyValues.filter(skuId => skuId !== row.skuId)
  })
  onMultiDelete = action(() => {
    console.log('执行onMultiDelete-------')
    const ids = this.bottomGridModel.selectedKeyValues
    if (!ids.length) { return Message.error('请至少选择一行') }
    this.bottomGridModel.resetHeaderCheckBox()
    this.bottomGridModel.selectedKeyValues = []
    this.bottomGridModel.rows = this.bottomGridModel.rows.filter(el => !ids.find(id => el.skuId === id))
  })

  handleCellValueChange = action((key, value, row) => { // 除了文本编辑框，返回true代表不执行handleCellBlur
    console.log(`执行最外部的handleCellValueChange,key:${key},value:${value},是否是可观察的：${(row)},row:`, row)
    row[key] = value
  })

  handleCellBlur = action((key, value, row) => {
    console.log(`执行最外部的handleCellBlur,key:${key},value:${value},row:`, row)
  })

  onRefresh = action(() => {
    this.queryDataAndSetState(this.searchObj.history)
  })
  onSave = action(() => {
    console.log('执行onSave-------')
    const { customer, flag } = this.top
    const assignedRows = this.bottomGridModel.rows.map(({mapOfFieldToEditedCellModel, ...el}) => { // 必须排除mapOfFieldToEditedCellModel否则就会影响新建页面的interceptor工作
      el = { ...el }
      el.planSendDate = new Date()
      el.realSendDate = null
      el.customer = customer
      el.dataStatusForApi = 1
      return el
    })

    assignedRows.forEach(({ skuId, saleNum }) => {
      const item = this.top.details.gridModel.rows.find(el => el.skuId === skuId)

      if (item) {
        item.saleNum = Number(item.saleNum || 0) + saleNum
        if (flag === 'edit' && item.dataStatusForApi == null) item.dataStatusForApi = 2 // null 未编辑 , 1 新增 , 2 编辑
      }
    })
    // 如果编辑页面删除了一条后台数据，又在添加商品页面把该数据添加进来，那么这条数据的状态是“编辑”，deleteIds中改条数据的id被排除，TODO:测试
    if (flag === 'edit' && assignedRows.some(el => this.top.details.deleteIds.has(el.skuId))) {
      assignedRows.forEach(el => {
        if (this.top.details.deleteIds.has(el.skuId)) {
          el.dataStatusForApi = 2
          el.id = this.top.details.mapSkuIdToId[el.skuId]
          this.top.details.deleteIds.delete(el.skuId)
        }
      })
    }

    const specialRows = assignedRows.filter(({ skuId }) => !this.top.details.gridModel.rows.find(el => el.skuId === skuId))
    this.top.details.gridModel.rows = this.top.details.gridModel.rows.concat(specialRows)

    this.top.details.gridModel.resetHeaderCheckBox()
    this.resetWhenClose()
  })
  onClose = action(() => {
    console.log('执行onClose-------')
    MessageBox.confirm('未保存, 是否确认关闭?', '提示', { type: 'warning' }).then(() => {
      this.resetWhenClose()
    })
  })
  resetWhenClose = action(() => {
    this.show = false
    // this.searchObj=new Search(this.initValue)
    // this.list=[]
    this.topGridModel.resetHeaderCheckBox()
    Object.assign(this.topGridModel, { selectedKeyValues: [], cashSelectedRows: [] })
    // this.totalCount=0
    this.bottomGridModel.rows = []
    this.bottomGridModel.resetHeaderCheckBox()
    Object.assign(this.bottomGridModel, { selectedKeyValues: [], cashSelectedRows: [] })
  })

  /**
   * utils
   */

  getTopGridModel = () => {
    const { onPageOrSizeChange, onRefresh } = this
    return new EgGridModel({
      getDisplayRows (rows) {
        return rows.map((el, index) => {
          return { ...el, onlyId: el.sku_id }
        })
      },
      gridIdForColumnConfig: 'omsSaleOrder_filterset_editDialog_addgoods_topGrid',
      primaryKeyField: 'skuId',
      cashOn: true,
      sortAll: false,
      showCheckBox: true,
      sumColumns: [],
      columns: this.getColumns(),
      api: {
        onPageChange: onPageOrSizeChange, onSizeChange: onPageOrSizeChange, onRefresh
        //  onSortAll, onRowClick,
      }
    })
  }

  getBottomGridModel = () => {
    return new EgGridModel({
      interceptorOfRows: {
        config: [
          { field: 'saleNum', type: 'number' },
          { field: 'salePrice', type: 'number' }
        ],
        context: this
      },
      gridIdForColumnConfig: 'omsSaleOrder_filterset_editDialog_addgoods_bottomGrid',
      getDisplayRows (rows) {
        return rows.map((el, index) => {
          return { ...el, onlyId: el.sku_id }
        })
      },
      primaryKeyField: 'skuId',
      cashOn: false,
      sortAll: false,
      showCheckBox: true,
      sumColumns: [],
      pagerSetting: 'total',
      hiddenRefresh: true,
      columns: this._getColumns()
    })
  }
  getColumns = () => [
    {
      key: 'operation',
      width: 77,
      name: '操作',
      locked: true,
      formatter: ({dependentValues}) => (<div>
        <Button type='text' size='small' onClick={this.onSingleAdd.bind(this, dependentValues)}>添加</Button>
      </div>),
      getRowMetaData: row => row
    },
    {
      key: 'pic',
      name: '图片',
      width: 100,
      resizable: true,
      draggable: true,
      formatter: ImgFormatter
    }, {
      key: 'productName',
      name: '商品名称',
      width: 150,
      resizable: true,
      draggable: true
    }, {
      key: 'productNo',
      name: '商品编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'skuNo',
      name: 'SKU编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'barCode',
      name: '条形码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'colorType',
      name: '颜色',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'sizeType',
      name: '尺码',
      width: 130,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'productSellerOuterNo',
      name: '商品货号',
      resizable: true,
      draggable: true,
      sortable: true
    }]
  _getColumns=() => [
    {
      key: 'operation',
      width: 77,
      name: '操作',
      locked: true,
      formatter: ({dependentValues}) => (<div>
        <Button type='text' size='small' onClick={this.onSingleDelete.bind(this, dependentValues)}>删除</Button>
      </div>),
      getRowMetaData: row => row
    },
    {
      key: 'pic',
      name: '图片',
      width: 100,
      resizable: true,
      draggable: true,
      formatter: ImgFormatter
    }, {
      key: 'saleNum',
      name: '销售数量',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: getEditableCellFormatter('saleNum'),
      getRowMetaData: row => row
    }, {
      key: 'salePrice',
      name: '含税售价',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: getEditableCellFormatter('salePrice'),
      getRowMetaData: row => row
    }, {
      key: 'productName',
      name: '商品名称',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'productNo',
      name: '商品编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'skuNo',
      name: 'SKU编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'barCode',
      name: '条形码',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'colorType',
      name: '颜色',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'sizeType',
      name: '尺码',
      width: 130,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'productSellerOuterNo',
      name: '商品货号',
      resizable: true,
      draggable: true,
      sortable: true
    }]
}
