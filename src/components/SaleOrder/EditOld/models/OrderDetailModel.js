import React from 'react'
import { extendObservable, action, autorun } from 'mobx'
import shortid from 'shortid'
import { InputFormatterForTaxRate } from '../formatter'
import { Message, MessageBox, Button } from 'element-react'
import { NumberFormatter, DatePickerFormatter, SelectFormatter, TreeFormatter } from '../../../../modules/EditedCellFormatter'
import ImgFormatter from '../../../../modules/ImgFormatter'
import validateNumber from '../../../../modules/validateNumber'
import EgGridModel from '../../../../modules/EgGridModel'
import {
  singleUpdate, singleDelete, multiDelete, getVendorDictBySkuId, updateVendorProps
  , findEmployeeByVendorId, findStockByWarehouseId
} from '../requests'

export default class OrderDetailModel {
  constructor (options) {
    extendObservable(this, {
      id: shortid.generate(),
      top: {},
      gridModel: {},
      filteritems: [
        {label: '供应商名称', field: 'vendor_name', value: '', type: 'select', options: [{label: '供应商AAA', value: 'a'}]},
        { label: 'SKU编码', field: 'sku_no', value: '' }
      ], // {label,field,,value}
      cursorFilteritemField: '',
      history: { pageSize: '50', sidx: '', sord: 'asc', page: '1' },
      get numOfHasValue () {
        return this.filteritems.reduce((res, el) => Number(!!el.value) + res, 0)
      },
      get searchData () {
        return this.filteritems.reduce((data, item) => {
          data[item.field] = item.value + ''
          return data
        }, {})
      },
      get cursorFilteritem () {
        return this.filteritems.find(({ field }) => field === this.cursorFilteritemField)
      },
      ...(options || {})
    })
    this.gridModel = this.getGridModel()
    this.setGridPager()
    autorun(this.setGridPager)
  }

  /**
   * autorun
   */
  setGridPager = () => {
    console.log('top:', this.top, 'flag:', this.top.flag)
    this.gridModel.pagerSetting = this.top.flag === 'add' ? 'total' : ''
    this.gridModel.hiddenRefresh = this.top.flag === 'add'
  }

  /**
   * actions
   */
  onFilterValueChange = action((key, value) => {
    this.cursorFilteritem && (this.cursorFilteritem.value = value)
  })
  onCursorFilteritemFieldChange = action(field => {
    const { clearAfterChangeFilteritem, cursorFilteritem } = this
    if (clearAfterChangeFilteritem && cursorFilteritem) cursorFilteritem.value = ''
    this.cursorFilteritemField = field
  })
  onSearch = action(() => {
    // console.log('执行查询操作')
    this.gridModel.resetHeaderCheckBox()// 重置表头的勾选框
    const data = this.searchData
    console.log(data, '点击搜索')
    this.queryDataAndSetState({cond: data, page: '1'})
    Object.assign(this.gridModel, { currentPage: 1, selectedKeyValues: [], expanded: {}, cashSelectedRows: [] })
  })
  onSingleDelete = action((row) => {
    // console.log('执行onSingleDelete-------')
    MessageBox.confirm('请确认是否删除该商品信息', '提醒', { type: 'info' }).then(() => {
      const foo = () => {
        // 清空勾选缓存
        const ids = this.gridModel.selectedKeyValues
        const { onlyId } = row
        const idx = ids.findIndex(id => id === onlyId)
        ~idx && this.gridModel.selectedKeyValues.splice(idx, 1)
        const i = this.gridModel.cashSelectedRows.findIndex(row => row.onlyId === onlyId)
        ~i && this.gridModel.cashSelectedRows.splice(i, 1)
        // 删除该行数据
        const idKey = this.top.flag === 'add' ? 'onlyId' : 'pms_purchase_order_detail_id'
        const index = this.gridModel.rows.findIndex(el => el[idKey] === onlyId)
        ~index && this.gridModel.rows.splice(index, 1)
        Message.success('删除完成！')
      }

      if (this.top.flag === 'add') return foo()

      singleDelete(row.pms_purchase_order_detail_id).then(v => {
        if (v.status !== 'Successful') return Message.error(v.data)
        foo()
      })
    })
  })
  onMultiDelete = action(() => {
    // console.log('执行onMultiDelete-------')
    const ids = this.gridModel.selectedKeyValues
    if (!ids.length) { return Message.error('请至少选择一行') }

    MessageBox.confirm('请确认是否删除勾选的商品信息', '提醒', { type: 'info' }).then(() => {
      const idKey = this.top.flag === 'add' ? 'onlyId' : 'pms_purchase_order_detail_id'
      const foo = () => {
        this.gridModel.resetHeaderCheckBox()
        Object.assign(this.gridModel, { selectedKeyValues: [], cashSelectedRows: [] })
        this.gridModel.rows = this.gridModel.rows.filter(el => !ids.find(id => el[idKey] === id))
        return Message.success('删除完成！')
      }

      if (this.top.flag === 'add') return foo()

      multiDelete({ ids: ids.join(',') }).then(v => {
        if (v.status !== 'Successful') return Message.error(v.data)
        foo()
      })
    })
  })
  changeAllRowsOfSameVendor = action((key, vendorId, value) => {
    this.gridModel.rows.forEach(el => {
      if (el.vendor_id === vendorId) { el[key] = value }
    })
  })

  handleCellValueChange = action((key, value, row) => { // 除了文本编辑框，返回true代表不执行handleCellBlur
    console.log(`执行最外部的handleCellValueChange,key:${key},value:${value},row:`, row)
    row[key] = value
    if (key === 'plan_arrival_date' && !value) {
      Message.warning('请填写预计到货日期')
      return true// 返回ture则停止调用blur
    }
  })

  handleCellBlur = action((key, value, row) => {
    console.log(`执行最外部的handleCellBlur,key:${key},value:${value},row:`, row)
    // const idKey = this.top.flag === 'add' ? 'onlyId' : 'pms_purchase_order_detail_id'
    // const item = this.gridModel.rows.find(el => el[idKey] === row.onlyId)
    // if (item) {
    //   const numberInputKeys = [{ key: 'plan_arrival_num' }, { key: 'plan_arrival_price' }, { key: 'confirmed_price' }, { key: 'confirmed_num' }, { key: 'tax_rate', min: 0, max: 100 }]
    //   const numberItem = numberInputKeys.find(el => el.key === key)
    //   if (numberItem) value = validateNumber({ ...numberItem, value })
    //   if (key === 'sales_type_code' || key === 'pay_type_code') this.changeAllRowsOfSameVendor(key, row.vendor_id, value)
    //   if (key === 'purchase_unit_id') this.changeNumAndPriceWhenUintChange(item, value)
    //   if (key === 'base_unit_id') {
    //     item.purchase_unit_id = value
    //     this.changeNumAndPriceWhenUintChange(item, value)
    //   }
    //   if (key === 'vendor_id') { // 获取其他的供应商的销售方式与结算方式，赋值
    //     const otherItem = this.gridModel.rows.find(el => el.onlyId !== row.onlyId && el.vendor_id == value)
    //     if (otherItem) {
    //       const { sales_type, pay_type } = otherItem
    //       Object.assign(item, { sales_type, pay_type })
    //     }
    //     const vendorItem = this.top.dict.filterVendorById[item.sku_id].find(el => el.id == value) || {}
    //     item.purchaser_id = vendorItem.purchaserId || ''
    //     this.updateRowWhenVendorChange(value, item)
    //   }
    //   if (key === 'plan_arrival_price') item.confirmed_price = value
    //   if (key === 'plan_arrival_num') item.confirmed_num = value
    //   if (key === 'warehouse_id') {
    //     this.updateRowWhenWarehouseChange(value, item.sku_id, item)
    //   }
    //   // if(key === 'tax_rate') value = validateNumber({value,min:0,max:100})
    //   item[key] = value
    //   if (key === 'plan_arrival_date' && !value) return Message.warning('请填写预计到货日期')// 不符合条件就不保存

    //   const finalItem = JSON.parse(JSON.stringify(
    //     this.displayRows.find(el => el[idKey] === row.onlyId),
    //     this.columns.slice(3).map(el => el.key).concat(['pms_purchase_order_detail_id'])
    //   ))
    //   finalItem.organization_id = finalItem.organization_id.length ? finalItem.organization_id[finalItem.organization_id.length - 1] : ''
    //   finalItem.plan_arrival_date = finalItem.plan_arrival_date && new Date(finalItem.plan_arrival_date).toLocaleDateString().split('/')
    //     .map(el => el.padStart(2, '0')).join('-')
    //   // delete finalItem.version
    //   delete finalItem.conversion_rate
    //   delete finalItem.purchase_num
    //   const reg = /_code$/
    //   Object.keys(finalItem).forEach(key => { // 清除所有code
    //     if (reg.test(key)) {
    //       finalItem[key.replace(reg, '')] = finalItem[key]
    //       delete finalItem[key]
    //     }
    //   })
    //   // delete finalItem.is_usable
    //   if (key !== 'tax_rate') { delete finalItem.tax_rate }
    //   if (key !== 'plan_arrival_price') { delete finalItem.plan_arrival_price }
    //   if (key !== 'sales_type_code') { delete finalItem.sales_type }
    //   if (key !== 'pay_type_code') { delete finalItem.pay_type }
    //   if (key !== 'organization_id') { delete finalItem.organization_id }
    //   if (this.top.flag === 'edit') {
    //     if (key === 'sales_type_code' || key === 'pay_type_code') {
    //       const { pms_purchase_order_id, vendor_id } = finalItem
    //       return updateVendorProps({
    //         pms_purchase_order_id,
    //         vendor_id,
    //         [key.replace(reg, '')]: finalItem[key.replace(reg, '')]
    //       }).then(v => {
    //         if (v.status !== 'Successful') return Message.error(v.data)
    //       })
    //     }
    //     singleUpdate(finalItem).then(v => {
    //       if (v.status !== 'Successful') return Message.error(v.data)
    //     })
    //   }
    // }
  })

  onRefresh = action(() => {
    const data = this.history
    this.queryDataAndSetState(data)
  })
  onPageOrSizeChange = action((innerState) => {
    const data = this.getDataFromInnder(innerState)
    this.queryDataAndSetState(data)
  })
  getDataFromInnder = action(({ currentPage, size }) => {
    return { page: currentPage, pageSize: size }
  })
  queryDataAndSetState = action((data) => {
    this.gridModel.loading = true
    const obj = {
      ...this.history,
      ...data,
      purchaseOrderId: this.top.pms_purchase_order_id
    }
    this.history = { ...obj }
    // getDetailListByCond(obj).then(v => {
    Promise.resolve({
      status: 'Successful',
      data: {
        list: [{ product_name: '', sku_id: '第一号sku', customer: '', confirmed_num: '', plan_arrival_date: '', plan_arrival_date2: '' }, { product_name: '', sku_id: '第二号sku', customer: '', confirmed_num: '123', plan_arrival_date: '', plan_arrival_date2: new Date() }],
        totalCount: 50
      }
    }).then(v => {
      this.gridModel.loading = false
      if (v.status !== 'Successful') {
        this.gridModel.rows = []
        this.gridModel.totalCount = 0
        return Message.error(v.data)
      }
      const { getDeptValueById } = this.top
      const data = v.data ? v.data.list : []
      data.forEach(el => {
        const res = getDeptValueById(el.organization_id)
        el.organization_id = res
        el.isNoBaseUnit = !el.base_unit_id
        el.purchase_unit_id = el.purchase_unit_id || el.base_unit_id
      })
      this.gridModel.rows = data
      this.gridModel.totalCount = v.data ? v.data.totalCount : 0
    })
  })
  getVendorDictBySkuId = action((skuid) => {
    if (this.top._dict.filterVendorById[skuid]) { return this.top._dict.filterVendorById[skuid] }
    return getVendorDictBySkuId(skuid).then(v => {
      let res = v.data
      if (v.status !== 'Successful') res = []
      this.top.dict.filterVendorById[skuid] = res
      return res.map(({ id, vendorName, purchaserId }) => ({ value: id, label: vendorName, purchaserId: purchaserId == null ? '' : purchaserId }))
    })
  })

  /**
   * utils
   */
  getGridModel = () => {
    const {onPageOrSizeChange, onRefresh} = this
    console.log('下拉选项-----', this.top._dict.sales_type)
    return new EgGridModel({
      interceptorOfRows: {
        config: [
          {
            field: 'product_name',
            treeOptions: [{ pid: null, id: '1', name: '总公司' }, { pid: '1', id: '101', name: '分公司' }, { pid: '101', id: '10101', name: '叶子公司' }]
          },
          {
            field: 'customer',
            // options: this.top._dict.sales_type
            getOptions: 'top._dict.sales_type'
          }, { field: 'confirmed_num', max: 100, unit: '%' }, 'plan_arrival_date', 'plan_arrival_date2'
        ],
        context: this
      },
      getDisplayRows: (rows, rawRows) => {
        const { flag, _dict } = this.top
        return rows.map(el => {
          const price = (parseFloat(el.plan_arrival_price || 0) * 100 / (parseFloat(el.tax_rate || 0) + 100)).toFixed(2)
          const conversion_rate = !el.purchase_unit_id ? 1 : (_dict.conversion_rate[el.purchase_unit_id] || 1)
          return {
            ...el,
            onlyId: flag === 'add' ? el.onlyId : el.pms_purchase_order_detail_id,
            price: price,
            plan_arrival_total_price: (parseFloat(el.plan_arrival_price || 0) * parseFloat(el.plan_arrival_num || 0)).toFixed(2),
            no_tax_plan_arrival_total_price: (price * parseFloat(el.plan_arrival_num || 0)).toFixed(2),
            confirmed_total_price: (parseFloat(el.confirmed_price || 0) * parseFloat(el.confirmed_num || 0)).toFixed(2),
            real_arrival_total_price: (parseFloat(el.confirmed_price || 0) * parseFloat(el.real_storage_num || 0)).toFixed(2),
            tax: (parseFloat(el.plan_arrival_price || 0) - price).toFixed(2),
            conversion_rate,
            purchase_num: Math.round((el.plan_arrival_num || 0) / conversion_rate)
          }
        })
      },
      cashOn: true, // 因为批量修改，删除
      sortAll: false,
      showCheckBox: true,
      sumColumns: ['plan_arrival_num', 'plan_arrival_total_price'],
      columns: this.getColumns(),
      api: {
        onPageChange: onPageOrSizeChange, onSizeChange: onPageOrSizeChange, onRefresh
        //  onSortAll, onRowClick,
      }
    })
  }

  getUnitCategoryByUnitId=(unitid) => {
    const dict = this.top.dict.purchase_unit
    return Object.keys(dict).find(c => dict[c].some(unit => unit.id == unitid))
  }

  changeNumAndPriceWhenUintChange=(item, value) => { // 需求改变，不必改相关的数量，价格，只有一个采购单位数，完全可以派生
    // const cid=this.getUnitCategoryByUnitId(value) //获取单位类别，value必不为空,即不可清空
    // const {purchase_unit_id}=item
    // const rate2=this.top.dict.purchase_unit[cid].find(unit => unit.id == value).conversionRate || 1
    // const _item=this.top.dict.purchase_unit[cid].find(unit => unit.id == purchase_unit_id)
    // const rate1=_item ? _item.conversionRate : 1
    // item.plan_arrival_price *= rate2
    // item.plan_arrival_price /=rate1
    // item.confirmed_price *= rate2
    // item.confirmed_price /= rate1
    // item.plan_arrival_num *= rate1
    // item.plan_arrival_num /= rate2
    // item.plan_arrival_num = Math.floor(item.plan_arrival_num)
    // item.confirmed_num  *= rate1
    // item.confirmed_num  /= rate2
    // item.confirmed_num = Math.floor(item.confirmed_num)
  }

  updateRowWhenVendorChange = (value, item) => {
    findEmployeeByVendorId(value).then(v => {
      if (v.status !== 'Successful') return Message.error(v.data || '')
      item.purchaser_tel = v.data.tel || ''
    })
  }

  updateRowWhenWarehouseChange = (value, skuIds, item) => {
    findStockByWarehouseId(value, skuIds).then(v => {
      if (v.status !== 'Successful') return Message.error(v.data || '')
      item.sale_stock = v.data[skuIds]['saleStock']
      item.on_way_stock = v.data[skuIds]['onWayStock']
      item.entity_stock = v.data[skuIds]['entityStock']
    })
  }

  getColumns=() => {
    return [
      {
        key: 'operation',
        width: 77,
        name: '操作',
        locked: true,
        formatter: ({ dependentValues }) => (<div>
          <Button type='text' size='small' onClick={this.onSingleDelete.bind(this, dependentValues)}>删除</Button>
        </div>),
        getRowMetaData: row => row
      },
      {
        key: 'pic',
        name: '图片',
        width: 100,
        formatter: ImgFormatter
      }, {
        key: 'flag',
        name: '标记',
        width: 100
      }, {
        key: 'customer',
        name: '客户', // TODO:下拉选择
        width: 160,
        resizable: true,
        draggable: true,
        formatter: ({ dependentValues: { mapOfFieldToEditedCellModel } }) => (<SelectFormatter store={mapOfFieldToEditedCellModel['customer']} />),
        getRowMetaData: row => row
      }, {
        key: 'product_name',
        name: '商品名称',
        width: 150,
        resizable: true,
        draggable: true,
        sortable: true,
        formatter: ({ dependentValues: { mapOfFieldToEditedCellModel } }) => (<TreeFormatter store={mapOfFieldToEditedCellModel['product_name']} />),
        getRowMetaData: row => row
      }, {
        key: 'product_no',
        name: '商品编码',
        width: 150,
        resizable: true,
        draggable: true,
        sortable: true
      }, {
        key: 'product_out_no',
        name: '商品货号',
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
        draggable: true
      }, {
        key: 'color_type',
        name: '颜色',
        width: 100,
        resizable: true,
        draggable: true
      }, {
        key: 'size_type',
        name: '尺码',
        width: 130,
        resizable: true,
        draggable: true
      }, {
        key: 'confirmed_num',
        name: '销售数量',
        width: 185,
        resizable: true,
        draggable: true,
        formatter: ({ dependentValues: { mapOfFieldToEditedCellModel } }) => (<NumberFormatter store={mapOfFieldToEditedCellModel['confirmed_num']} />),
        getRowMetaData: row => row
      }, {
        key: 'base_unit_id',
        name: '基本计量单位',
        width: 120,
        resizable: true,
        draggable: true,
        getRowMetaData: row => row
      }, {
        key: 'price',
        name: '售价',
        width: 85,
        resizable: true,
        draggable: true,
        formatter: ({ value }) => (<div style={{ textAlign: 'right' }}>{value}</div>)
      }, {
        key: 'tax_rate',
        name: '税率',
        width: 120,
        resizable: true,
        draggable: true, // InputFormatterForTaxRate
        // formatter: (props) => (<InputFormatter store={this.mapOfFieldToEditedCellModel['tax_rate']} dependentValues={props.dependentValues} />),
        getRowMetaData: row => row
      }, {
        key: 'tax',
        name: '税额',
        width: 85,
        resizable: true,
        draggable: true,
        formatter: ({ value }) => (<div style={{ textAlign: 'right' }}>{value}</div>)
      }, {
        key: 'plan_arrival_price',
        name: '含税售价',
        width: 100,
        resizable: true,
        draggable: true,
        // formatter: (props) => (<InputFormatter {...props} foo={{
        //   onBlur: this.onCellChange.bind(this, 'plan_arrival_price'),
        //   onChange: null,
        //   _class: Number(props.dependentValues.contract_price) === Number(props.value) ? '' : 'red'
        // }}
        // />),
        getRowMetaData: row => row
      }, {
        key: 'no_tax_plan_arrival_total_price',
        name: '销售金额',
        width: 100,
        resizable: true,
        draggable: true,
        formatter: ({ value }) => (
          <div style={{ textAlign: 'right' }}>{value}</div>
        ),
        getRowMetaData: row => row
      }, {
        key: 'plan_arrival_total_price',
        name: '销售金额(含税)',
        width: 140,
        resizable: true,
        draggable: true,
        formatter: ({ value }) => (
          <div style={{ textAlign: 'right' }}>{value}</div>
        ),
        getRowMetaData: row => row
      }, {
        key: 'plan_arrival_date',
        name: '预计到货日期',
        width: 220,
        resizable: true,
        draggable: true,
        formatter: ({ dependentValues: { mapOfFieldToEditedCellModel } }) => (<DatePickerFormatter store={mapOfFieldToEditedCellModel['plan_arrival_date']} />),
        getRowMetaData: row => row
      },
      {
        key: 'plan_arrival_date2',
        name: '实际送货日期',
        width: 220,
        resizable: true,
        draggable: true,
        formatter: ({ dependentValues: { mapOfFieldToEditedCellModel } }) => (<DatePickerFormatter store={mapOfFieldToEditedCellModel['plan_arrival_date2']} />),
        getRowMetaData: row => row
      }
    ]
  }

  getDisplayValueOfFilteritem (item) {
    if (!item) return ''
    const { type, value, options } = item
    if (type === 'select') return (options.find((el) => el.value === value) || {}).label || ''
    return value || ''
  }

  getOptionsOfCustomer (skuId) {
    const cash = {}
    return !cash[skuId]
    ? (cash[skuId] = Promise.resolve([{ label: `${skuId}的Hello`, value: '1' }, { label: `${skuId}的World`, value: '2' }]))
    : cash[skuId]
  }
}
