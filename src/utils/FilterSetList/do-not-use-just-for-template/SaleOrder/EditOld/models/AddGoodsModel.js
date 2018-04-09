import React from 'react'
import { extendObservable, action, when } from 'mobx'
import shortid from 'shortid'
import { Message, MessageBox, Button } from 'element-react'
import {
  getProductList, addWhenAdd, addWhenEdit, singleDelete, multiDelete, singleUpdate
} from '../requests'
import { NumberFormatter } from '../../../../modules/EditedCellFormatter'
import ImgFormatter from '../../../../modules/ImgFormatter'
import validateNumber from '../../../../modules/validateNumber'
import EgGridModel from '../../../../modules/EgGridModel'

class Search {
  constructor (options) {
    extendObservable(this, {
      history: {...options, page: 1, pageSize: 20, sidx: '', sord: '', center_table: 'sku'},
      present: {...options}
    })
  }
}

export default class AddGoodsModel {
  constructor (options) {
    this.initValue = {
      product_name: '', // 商品名称
      product_no: '', // 商品编码
      seller_outer_no: '', // 商品货号
      sku_no: '', // SKU编码
      vendor_name: '', // 供应商
      bar_code: '', // 条形码
      color_type: '', // 颜色
      size_type: ''// 尺码
    }
    extendObservable(this, {
      id: shortid.generate(),
      inited: false, // 是否第一次show，是的话resize window，使得表格正常渲染。
      show: false,
      searchObj: new Search(this.initValue),
      get addedOnlyIds () {
        return this.bottomGridModel.rows.map(el => el.onlyId)
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
    this.topGridModel.loading = true
    const { history, present } = this.searchObj
    const data = { ...history, ...present, page: 1 }
    this.queryDataAndSetState(data)
    Object.assign(this.topGridModel, { currentPage: 1, selectedKeyValues: [], expanded: {}, cashSelectedRows: [] })
    // 操作MyGrid的虚拟DOM，设置页码为1，清空勾选数据,重置树表的expanded状态,清空缓存的Rows
  })
  queryDataAndSetState = action(data => {
    // getProductList(data)
    Promise.resolve({
      status: 'Successful',
      data: {
        list: [{ sku_id: '第一号sku', customer: '', confirmed_num: '', plan_arrival_date: '', plan_arrival_date2: '' }, { sku_id: '第二号sku', customer: '', confirmed_num: '123', plan_arrival_date: '', plan_arrival_date2: new Date() }],
        totalCount: 50
      }
    }).then(v => {
      this.topGridModel.loading = false
      Object.assign(this.searchObj.history, data)
      if (v.status !== 'Successful') {
        this.topGridModel.rows = []
        this.totalCount = 0
        // this.gridRef.forceUpdate()
        return Message.error(v.data)
      }
      this.topGridModel.rows = v.data.list
      this.totalCount = v.data.totalCount
      // this.gridRef.forceUpdate()
    })
  })
  onReset = action(() => {
    console.log('执行onReset-------')
    this.searchObj.present = { ...this.initValue }
  })
  onPageOrSizeChange = action(({ currentPage, size }) => {
    console.log('执行onPageOrSizeChange-------', currentPage, size)
    this.topGridModel.loading = true
    this.queryDataAndSetState({ ...this.searchObj.history, page: currentPage, pageSize: size })
  })
  onSingleAdd = action((row) => {
    console.log('执行onSingleAdd-------')
    let isRepeat = false
    if (this.addedOnlyIds.length) { isRepeat = this.addedOnlyIds.some(id => id === row.onlyId) }
    if (isRepeat) { return Message.error('不能重复添加，重复行序号为：' + row.gridOrderNo) }

    this.topGridModel.loading = true
    const data = {
      skuIds: row.sku_id,
      vendorIds: row.vendor_id == null ? '0' : row.vendor_id
    }
    if (this.top.flag === 'add') {
      addWhenAdd(data).then(v => {
        this.topGridModel.loading = false
        if (v.status !== 'Successful') return Message.error(v.data)
        this.bottomGridModel.rows = this.bottomGridModel.rows.concat(v.data || [])
      })
    } else {
      // addWhenEdit({ ...data, pmsPurchaseOrderId: this.top.pms_purchase_order_id })
      Promise.resolve({
        status: 'Successful',
        data: {
          list: [{ plan_arrival_num: null, plan_arrival_price: '' }],
          totalCount: 50
        }
      }).then(v => {
        this.topGridModel.loading = false
        if (v.status !== 'Successful') return Message.error(v.data)
        this.bottomGridModel.rows = this.bottomGridModel.rows.concat(v.data || [])
      })
    }
  })
  onMultiAdd = action(() => {
    console.log('执行onMultiAdd-------')
    const onlyIds = this.topGridModel.selectedKeyValues
    if (!onlyIds.length) { return Message.error('请至少选择一行') }
    const { addedOnlyIds, topGridModel: {rows: displayList} } = this
    const repeatItems = onlyIds.filter(onlyId => addedOnlyIds.find(el => el === onlyId))
    if (repeatItems.length) {
      return Message.error('不能重复添加，重复行序号为：' +
        displayList.filter(el => repeatItems.find(onlyId => el.onlyId === onlyId)).map(el => el.gridOrderNo).join(','))
    }

    this.topGridModel.loading = true
    const data = {
      skuIds: onlyIds.map(el => el.split(',')[0]).join(','),
      vendorIds: onlyIds.map(el => el.split(',')[1]).join(',')
    }
    if (this.top.flag === 'add') {
      addWhenAdd(data).then(v => {
        this.topGridModel.loading = false
        if (v.status !== 'Successful') return Message.error(v.data)
        this.bottomGridModel.rows = this.bottomGridModel.rows.concat(v.data || [])
      })
    } else {
      addWhenEdit({ ...data, pmsPurchaseOrderId: this.top.pms_purchase_order_id }).then(v => {
        this.topGridModel.loading = false
        if (v.status !== 'Successful') return Message.error(v.data)
        this.bottomGridModel.rows = this.bottomGridModel.rows.concat(v.data || [])
      })
    }
  })
  onSingleDelete = action((row) => {
    console.log('执行onSingleDelete-------')
    const index = this.bottomGridModel.rows.findIndex(el => el.sku_id === row.sku_id && el.vendor_id === row.vendor_id)
    ~index && this.bottomGridModel.rows.splice(index, 1)
    if (this.top.flag === 'edit') {
      singleDelete(row.pms_purchase_order_detail_id).then(v => {
        if (v.status !== 'Successful') return Message.error(v.data)
        Message.success('删除完成！')
      })
    }
  })
  onMultiDelete = action(() => {
    console.log('执行onMultiDelete-------')
    const ids = this.bottomGridModel.selectedKeyValues
    if (!ids.length) { return Message.error('请至少选择一行') }
    if (this.top.flag === 'add') {
      this.bottomGridModel.resetHeaderCheckBox()
      this.bottomGridModel.selectedKeyValues = []
      return (
        this.bottomGridModel.rows = this.bottomGridModel.rows.filter(el => !ids.find(id =>
        ((el.sku_id == null ? '' : el.sku_id) + ',' + (el.vendor_id == null ? '0' : el.vendor_id)) === id))
      )
    }

    multiDelete({ ids: ids.join(',') }).then(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      this.bottomGridModel.rows = this.bottomGridModel.rows.filter(el => !ids.find(id =>
        ((el.sku_id == null ? '' : el.sku_id) + ',' + (el.vendor_id == null ? '0' : el.vendor_id)) === id))
      Message.success('删除完成！')
      this.bottomGridModel.resetHeaderCheckBox()
      this.bottomGridModel.selectedKeyValues = []
    })
  })

  handleCellValueChange = action((key, value, row) => { // 除了文本编辑框，返回true代表不执行handleCellBlur
    console.log(`执行最外部的handleCellValueChange,key:${key},value:${value},是否是可观察的：${(row)},row:`, row)
    row[key] = value
    if (key === 'plan_arrival_date' && !value) {
      Message.warning('请填写预计到货日期')
      return true// 返回ture则停止调用blur
    }
  })

  handleCellBlur = action((key, value, row) => {
    console.log(`执行最外部的handleCellBlur,key:${key},value:${value},row:`, row)
  })

  onSingleUpdate = action((key, value, row) => {
    console.log('执行onSingleUpdate-------')
    const numberInputKeys = [{ key: 'plan_arrival_num' }, { key: 'plan_arrival_price' }]
    const numberItem = numberInputKeys.find(el => el.key === key)
    if (numberItem) value = validateNumber({ ...numberItem, value })
    const idx = this._displayList.findIndex(el => el.onlyId === row.onlyId)
    this.bottomGridModel.rows[idx][key] = value
    if (this.top.flag === 'add') return

    const key2 = key.replace(/^plan_arrival/, 'confirmed')
    const obj = key === 'plan_arrival_price' ? { contract_price: value } : {}
    singleUpdate({ pms_purchase_order_detail_id: row.pms_purchase_order_detail_id, [key]: value, [key2]: value, ...obj }).then(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      const idx = this._displayList.findIndex(el => el.onlyId === row.onlyId)
      this.bottomGridModel.rows[idx][key] = value
    })
  })
  onRefresh = action(() => {
    this.queryDataAndSetState(this.searchObj.history)
  })
  onSave = action(() => {
    console.log('执行onSave-------')
    if (this.top.flag === 'add') {
      const { vendor_id, warehouse_id, sales_type, pay_type, organization_id } = this.top
      const assignedRows = this.bottomGridModel.rows.map(el => { // 如果新添加的数据的分供商id，仓库id，销售类型，结算类型为空，那么赋值为。。。
        el = { ...el }
        el.vendor_id = el.vendor_id || vendor_id
        el.warehouse_id = el.warehouse_id || warehouse_id
        el.sales_type_code = el.sales_type_code || sales_type
        el.pay_type_code = el.pay_type_code || pay_type
        el.confirmed_price = el.plan_arrival_price
        el.confirmed_num = el.plan_arrival_num
        el.onlyId = shortid.generate()
        el.contract_price = el.plan_arrival_price
        el.organization_id = organization_id || []
        el.isNoBaseUnit = !el.base_unit_id
        el.purchase_unit_id = el.purchase_unit_id || el.base_unit_id
        return el
      })
      this.top.details.rows = this.top.details.rows.concat(assignedRows)
      this.top.details.gridRef.resetHeaderCheckBox()
    } else { // 从后台查询数据
      this.top.details.onRefresh()
    }
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
          return { ...el, onlyId: (el.sku_id == null ? '' : el.sku_id) + ',' + (el.vendor_id == null ? '0' : el.vendor_id) }
        })
      },
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
          'plan_arrival_num', 'plan_arrival_price'
        ],
        context: this
      },
      getDisplayRows (rows) {
        return rows.map((el, index) => {
          return { ...el, onlyId: (el.sku_id == null ? '' : el.sku_id) + ',' + (el.vendor_id == null ? '0' : el.vendor_id) }
        })
      },
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
      key: 'product_name',
      name: '商品名称',
      width: 150,
      resizable: true,
      draggable: true
    }, {
      key: 'product_no',
      name: '商品编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'sku_no',
      name: 'SKU编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'bar_code',
      name: '条形码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'color_type',
      name: '颜色',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'size_type',
      name: '尺码',
      width: 130,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'product_seller_outer_no',
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
      key: 'plan_arrival_num',
      name: '数量',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: ({ dependentValues: { mapOfFieldToEditedCellModel } }) => (<NumberFormatter store={mapOfFieldToEditedCellModel['plan_arrival_num']} />),
      getRowMetaData: row => row
    }, {
      key: 'plan_arrival_price',
      name: '含税售价',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: ({ dependentValues: { mapOfFieldToEditedCellModel } }) => (<NumberFormatter store={mapOfFieldToEditedCellModel['plan_arrival_price']} />),
      getRowMetaData: row => row
    }, {
      key: 'product_name',
      name: '商品名称',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'product_no',
      name: '商品编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'sku_no',
      name: 'SKU编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'bar_code',
      name: '条形码',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'color_type',
      name: '颜色',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'size_type',
      name: '尺码',
      width: 130,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'product_seller_outer_no',
      name: '商品货号',
      resizable: true,
      draggable: true,
      sortable: true
    }]
}
