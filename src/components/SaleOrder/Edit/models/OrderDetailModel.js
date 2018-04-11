import React from 'react'
import { extendObservable, action, autorun } from 'mobx'
import { observer } from 'mobx-react'
import shortid from 'shortid'
import { Message, MessageBox, Button } from 'element-react'
import { getEditableCellFormatter, EgGridModel, ImgFormatter } from '@/lib'
import {
  findEmployeeByVendorId, findStockByWarehouseId
} from '../requests'
import { getSaleOrderDetailList } from '../../requests'
export default class OrderDetailModel {
  deleteIds = new Set([])
  removePreErp={
    erpPic: 'pic',
    erpProductName: 'productName',
    erpProductNo: 'productNo',
    erpProductSellerOuterNo: 'productSellerOuterNo',
    erpSkuNo: 'skuNo',
    erpBarCode: 'barCode',
    erpColorType: 'colorType',
    erpSizeType: 'sizeType',
    erpSkuId: 'skuId'
  }

  editableFields = ['id', 'customer', 'saleNum', 'taxRate', 'salePrice', 'planSendDate']// 编辑保存时用

  mapSkuIdToId = {}

  constructor (options) {
    extendObservable(this, {
      id: shortid.generate(),
      top: {},
      gridModel: {},
      filteritems: [
        { label: 'SKU编码', field: 'skuNo', value: '' }
      ], // {label,field,,value}
      _filteritems: [], // 用于前端过滤
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
    // this.setGridPager()
    // autorun(this.setGridPager)
    autorun(() => {
      this.gridModel.total = this.gridModel.rows.length
    })
    autorun(() => {
      this.gridModel.columns = this.getColumns()
    })
    this.onFilter()
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
    // const data = this.searchData
    const data = {}
    console.log(data, '点击搜索')
    this.queryDataAndSetState({cond: data, page: '1', pageSize: '1000'})
    Object.assign(this.gridModel, { currentPage: 1, selectedKeyValues: [], expanded: {}, cashSelectedRows: [] })
  })

  onFilter = action(() => {
    console.log('点击搜索进行前端过滤')
    this._filteritems = this.filteritems.map(el => ({...el}))
    console.log('点击搜索进行前端过滤', this._filteritems.slice(0))
  })

  onSingleDelete = action((row) => {
    // console.log('执行onSingleDelete-------')
    MessageBox.confirm('您确定要删除该商品信息吗？(删除后取消保存可以恢复数据)', '提醒', { type: 'info' }).then(action(() => {
        // 清空勾选缓存
      const ids = this.gridModel.selectedKeyValues// TODO:id字段变的化用cashSelectedRows
      const { skuId } = row
      const idx = ids.findIndex(id => id === skuId)
      ~idx && this.gridModel.selectedKeyValues.splice(idx, 1)
      const i = this.gridModel.cashSelectedRows.findIndex(row => row.skuId === skuId)
      ~i && this.gridModel.cashSelectedRows.splice(i, 1)
        // 删除该行数据
      const idKey = 'skuId'
      const index = this.gridModel.rows.findIndex(el => el[idKey] === skuId)
      ~index && this.gridModel.rows.splice(index, 1)
      if (this.top.flag === 'edit' && (row.dataStatusForApi == null || row.dataStatusForApi === 2)) {
        this.deleteIds.add(skuId)
        this.mapSkuIdToId[skuId] = row.id
      }
    }))
  })
  onMultiDelete = action(() => {
    // console.log('执行onMultiDelete-------')
    const ids = this.gridModel.selectedKeyValues
    if (!ids.length) { return Message.error('请至少选择一行') }

    MessageBox.confirm('您确定要删除勾选的商品信息吗？(删除后取消保存可以恢复数据)', '提醒', { type: 'info' }).then(action(() => {
      const idKey = 'skuId'
      this.gridModel.resetHeaderCheckBox()

      if (this.top.flag === 'edit') {
        this.gridModel.cashSelectedRows.forEach(el => {
          if (el.dataStatusForApi == null || el.dataStatusForApi === 2) {
            this.deleteIds.add(el[idKey])
            this.mapSkuIdToId[el.skuId] = el.id
          }
        })
      }

      Object.assign(this.gridModel, { selectedKeyValues: [], cashSelectedRows: [] })
      this.gridModel.rows = this.gridModel.rows.filter(el => !ids.find(id => el[idKey] === id))
    }))
  })
  changeAllRowsOfSameVendor = action((key, vendorId, value) => {
    this.gridModel.rows.forEach(el => {
      if (el.vendor_id === vendorId) { el[key] = value }
    })
  })

  handleCellValueChange = action((key, value, row) => { // 除了文本编辑框，返回true代表不执行handleCellBlur
    console.log(`执行最外部的handleCellValueChange,key:${key},value:${value},row:`, row)
    row[key] = value
    // this.sideEffectOfValueChange(row)
    if (row.dataStatusForApi == null) row.dataStatusForApi = 2 // 添加商品过来的数据都带有dataStatusForApi标记，没带说明是后端查的且为改变过
    if (key === 'plan_arrival_date' && !value) {
      Message.warning('请填写预计到货日期')
      return true// 返回ture则停止调用blur
    }
  })

  handleCellBlur = action((key, value, row) => {
    console.log(`执行最外部的handleCellBlur,key:${key},value:${value},row:`, row)
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
      purchaseOrderId: this.top.id
    }
    this.history = { ...obj }
    getSaleOrderDetailList(obj, this.top.id).then(action(v => {
      this.gridModel.loading = false
      if (v.status !== 'Successful') {
        this.gridModel.rows = []
        this.gridModel.totalCount = 0
        return Message.error(v.data)
      }
      const data = v.data ? v.data.list : []
      data.forEach(el => {
        el.customer = this.top.transformCustomerNameToId(el.customer)
        el.salePrice = el.priceIncludeTax
        // 去掉erp前缀
        Object.keys(this.removePreErp).forEach(erpField => {
          const field = this.removePreErp[erpField]
          el[field] = el[erpField]
          delete el[erpField]
        })
      })
      this.gridModel.rows = data
      this.gridModel.totalCount = v.data ? v.data.totalCount : 0
    }))
  })
  getVendorDictBySkuId = action((skuid) => {
    if (this.top._dict.filterVendorById[skuid]) { return this.top._dict.filterVendorById[skuid] }
    return Promise.resolve()
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
            field: 'customer',
            type: 'select',
            getOptions: 'top._dict.customer'
          },
          { field: 'saleNum', type: 'number' },
          { field: 'taxRate', max: 100, unit: '%', type: 'number' },
          { field: 'salePrice', type: 'number' },
          { field: 'planSendDate', type: 'date' },
          {
            field: 'salePriceNoTax',
            type: 'calc',
            getValue: (row) => (parseFloat(row.salePrice || 0) * 100 / (parseFloat(row.taxRate || 0) + 100)).toFixed(2)
          },
          {
            field: 'XSJE',
            type: 'calc',
            getValue: (row) => {
              const price = parseFloat(row.salePrice || 0) * 100 / (parseFloat(row.taxRate || 0) + 100)
              return (price * parseFloat(row.saleNum || 0)).toFixed(2)
            }
          },
          {
            field: 'XSJEHS',
            type: 'calc',
            getValue: (row) => {
              return (parseFloat(row.salePrice || 0) * parseFloat(row.saleNum || 0)).toFixed(2)
            }
          },
          {
            field: 'tax',
            type: 'calc',
            getValue: (row) => {
              const price = parseFloat(row.salePrice || 0) * 100 / (parseFloat(row.taxRate || 0) + 100)
              return (parseFloat(row.salePrice || 0) - price).toFixed(2)
            }
          }
        ],
        context: this
      },
      primaryKeyField: 'skuId',
      getDisplayRows: (rows, rawRows) => {
        const {_filteritems, getFilter} = this
        const ret = rows.filter(getFilter(_filteritems)).map(el => {
          const price = (parseFloat(el.salePrice || 0) * 100 / (parseFloat(el.taxRate || 0) + 100)).toFixed(2)
          return {
            ...el,
            salePriceNoTax: price,
            XSJE: (price * parseFloat(el.saleNum || 0)).toFixed(2),
            XSJEHS: (parseFloat(el.salePrice || 0) * parseFloat(el.saleNum || 0)).toFixed(2),
            tax: (parseFloat(el.salePrice || 0) - price).toFixed(2)
          }
        })
        console.log('执行getDisplayRows方法', ret.length)
        return ret
      },
      pagerSetting: 'total',
      hiddenRefresh: true,
      cashOn: true, // 因为批量修改，删除
      sortAll: false,
      showCheckBox: true,
      sumColumns: ['saleNum', 'XSJEHS'],
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
    findEmployeeByVendorId(value).then(action(v => {
      if (v.status !== 'Successful') return Message.error(v.data || '')
      item.purchaser_tel = v.data.tel || ''
    }))
  }

  updateRowWhenWarehouseChange = (value, skuIds, item) => {
    findStockByWarehouseId(value, skuIds).then(action(v => {
      if (v.status !== 'Successful') return Message.error(v.data || '')
      item.sale_stock = v.data[skuIds]['saleStock']
      item.on_way_stock = v.data[skuIds]['onWayStock']
      item.entity_stock = v.data[skuIds]['entityStock']
    }))
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
        name: '客户',
        width: 160,
        resizable: true,
        draggable: true,
        formatter: getEditableCellFormatter('customer'),
        getRowMetaData: row => row
      }, {
        key: 'productName',
        name: '商品名称',
        width: 150,
        resizable: true,
        draggable: true,
        sortable: true,
        getRowMetaData: row => row
      }, {
        key: 'productNo',
        name: '商品编码',
        width: 150,
        resizable: true,
        draggable: true,
        sortable: true,
        getRowMetaData: row => row
      }, {
        key: 'productSellerOuterNo',
        name: '商品货号',
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
        draggable: true
      }, {
        key: 'colorType',
        name: '颜色',
        width: 100,
        resizable: true,
        draggable: true
      }, {
        key: 'sizeType',
        name: '尺码',
        width: 130,
        resizable: true,
        draggable: true
      }, {
        key: 'saleNum',
        name: '销售数量',
        width: 185,
        resizable: true,
        draggable: true,
        formatter: getEditableCellFormatter('saleNum'),
        getRowMetaData: row => row
      }, {
        key: 'baseUnitId',
        name: '基本计量单位',
        width: 120,
        resizable: true,
        draggable: true,
        formatter: observer(({ value }) => {
          const options = this.top._dict['base_unit']
          const item = options && options.find(el => el.value == value)
          const displayValue = item ? item.label : value
          return (<div style={{ textAlign: 'center', marginLeft: -8 }}>{displayValue}</div>)
        }),
        getRowMetaData: row => row
      }, {
        key: 'salePriceNoTax',
        name: '售价',
        width: 85,
        resizable: true,
        draggable: true,
        formatter: getEditableCellFormatter('salePriceNoTax'),
        getRowMetaData: row => row // formatter: observer(({ value }) => (<div style={{ textAlign: 'right' }}>{value}</div>))
      }, {
        key: 'taxRate',
        name: '税率',
        width: 120,
        resizable: true,
        draggable: true, // InputFormatterForTaxRate
        formatter: getEditableCellFormatter('taxRate'),
        getRowMetaData: row => row
      }, {
        key: 'tax',
        name: '税额',
        width: 85,
        resizable: true,
        draggable: true,
        formatter: getEditableCellFormatter('tax'),
        getRowMetaData: row => row// formatter: observer(({ value }) => (<div style={{ textAlign: 'right' }}>{value}</div>))
      }, {
        key: 'salePrice',
        name: '含税售价',
        width: 100,
        resizable: true,
        draggable: true,
        formatter: getEditableCellFormatter('salePrice'),
        getRowMetaData: row => row
      }, {
        key: 'XSJE',
        name: '销售金额',
        width: 100,
        resizable: true,
        draggable: true,
        // formatter: observer(({ value }) => (
        //   <div style={{ textAlign: 'right' }}>{value}</div>
        // )),
        formatter: getEditableCellFormatter('XSJE'),
        getRowMetaData: row => row
      }, {
        key: 'XSJEHS',
        name: '销售金额(含税)',
        width: 140,
        resizable: true,
        draggable: true,
        // formatter: observer(({ value }) => (
        //   <div style={{ textAlign: 'right' }}>{value}</div>
        // )),
        formatter: getEditableCellFormatter('XSJEHS'),
        getRowMetaData: row => row
      }, {
        key: 'planSendDate',
        name: '预计交货日期',
        width: 220,
        resizable: true,
        draggable: true,
        formatter: getEditableCellFormatter('planSendDate'),
        getRowMetaData: row => row
      }
      // ...(this.top.flag === 'edit' ? [{
      //   key: 'realSendDate',
      //   name: '实际交货日期',
      //   width: 220,
      //   resizable: true,
      //   draggable: true,
      //   formatter: ({ dependentValues: { mapOfFieldToEditedCellModel } }) => (<DatePickerFormatter store={mapOfFieldToEditedCellModel['realSendDate']} />),
      //   getRowMetaData: row => row
      // }] : [])
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

  getFilter=(filteritems) => {
    const _filteritems = filteritems.filter(el => el.value != null && el.value !== '')
    if (!_filteritems.length) return el => el
    return (el) => {
      return filteritems.every(({type, value, field, filetrField}) => { // 目前只考虑下拉filter与文本filter
        return type === 'select' ? el[filetrField || field] + '' === value + '' : ~el[filetrField || field].indexOf(value)
      })
    }
  }
}
