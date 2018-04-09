import { extendObservable, action } from 'mobx'
import { Message, MessageBox } from 'element-react'
import {
   addPayTypeDict, deletePayTypeDict, getPayTypeDict
  , getAddressByWarehouseId, doCreate, doUpdate, getCustomerDict, deleteCustomerDict, addCustomerDict,
  getProvinceList, getCityList, getDistrictList
  , getDictList, getPurchaseUnitDict
} from '../requests'

import OrderDetailModel from './OrderDetailModel'
import AddGoodsModel from './AddGoodsModel'
import MultiEditModel from './MultiEditModel'

export default class OrderModel {
  rules = {
    customer: [
    { required: true, message: '请选择客户', trigger: 'change' }
    ],
    saleDate: [
        { required: true, message: '请选择销售日期', trigger: 'change' }
    ]
  }
  constructor (options) {
    this.initValue = {
      id: '', // id，用于查询，不显示
      saleDate: new Date(), // 销售日期,必填
      customer: '',
      salesType: '', // 销售方式，下拉
      productType: '', // 商品类型
      payType: '', // 结算方式
      deliveryType: '',
      deliverAddress: '', // 收货地址
      provinceId: '', // 省
      cityId: '', // 市
      districtId: '', // 区
      remark: '', // 备注
      contractTerms: '' // 合同条款
    }
    extendObservable(this, this.initValue)
    extendObservable(this, {
      parent: {}, // FilterSetList
      flag: 'edit', // add/edit
      show: false,
      fullScreen: false,
      deptProps: {value: 'id', label: 'name', children: 'children'},
      details: {},
      formRef: {},
      get formData () {
        return JSON.parse(JSON.stringify(this, Object.keys(this.initValue)))
      },
      addGoodsModel: new AddGoodsModel({ top: this }),
      get mainData () {
        const main = JSON.parse(JSON.stringify(this, Object.keys(this.initValue)))
        main.saleDate = this.formatDateToString(new Date(main.saleDate))
        main.customer = main.customer || ''
        main.customer = this.dict.customer[main.customer] || main.customer
        main.id = main.id + ''
        return main
      },
      get detailData () {
        return this.details.gridModel._rows.map(el => {
          el = { ...el }

          el.planSendDate = el.planSendDate
            ? this.formatDateToString(typeof el.planSendDate === 'object' ? el.planSendDate : new Date(el.planSendDate))
            : ''

          el.customer = el.customer || ''
          el.customer = this.dict.customer[el.customer] || el.customer

          Object.keys(el).forEach(key => { // 去除null,转换为字符串
            el[key] = el[key] == null ? '' : el[key] + ''
          })

          return el
        })
      },
      get saveData () {
        const {id, ...main} = this.mainData
        return { saleOrder: main, saleOrderDetailList: this.detailData }
      },
      get saveDataForEdit () {
        const main = this.mainData
        const newDetailList = this.detailData.filter(el => el.dataStatusForApi == 1)
        const updateDetailList = this.detailData.filter(el => el.dataStatusForApi == 2).map(el => { // 只留可编辑的字段
          return this.details.editableFields.reduce((res, key) => {
            res[key] = el[key]
            return res
          }, {})
        })
        const deleteDetailIds = [...this.details.deleteIds].map(skuId => this.details.mapSkuIdToId[skuId] + '').join(',')
        console.log('newDetailList:', newDetailList.slice(0), 'updateDetailList:', updateDetailList.slice(0), 'deleteDetailIds:', deleteDetailIds, 'allRowsStauts:', this.detailData.map(el => el.dataStatusForApi).slice(0), 'allRows:', this.detailData)
        return { saleOrder: main, newDetailList, updateDetailList, deleteDetailIds }
      },
      multiEditModel: new MultiEditModel({top: this}),
      dict: {
        productType: [{value: 1, label: '成品'}, {value: 2, label: '半成品'}, {value: 3, label: '原材料'}], // 商品类型，下拉
        provinceId: [], // 省
        cityId: [], // 市
        districtId: [], // 区
        purchase_unit: {}, // 采购单位,eg.{009002:[]}
        payType: {}, // 结算方式
        customer: {} // 客户 {"100001": "客户xxx" }
      },
      get _dict () {
        const { purchase_unit, productType, customer } = this.dict
        const objToOptions = (obj) => Object.keys(obj).map(value => ({value, label: obj[value]}))
        return {
          salesType: this.parent._dict.salesType,
          tradeSaleOrderType: this.parent._dict.tradeSaleOrderType,
          deliveryType: this.parent._dict.deliveryType,
          payType: Object.keys(this.dict.payType).map(key => ({ value: key, label: this.dict.payType[key] })),
          provinceId: this.dict.provinceId.map(({ province_id, province_name }) => ({ value: province_id, label: province_name})),
          cityId: this.dict.cityId.map(({ city_id, city_name }) => ({ value: city_id, label: city_name})),
          districtId: this.dict.districtId.map(({ district_id, district_name }) => ({ value: district_id, label: district_name})),
          customer: objToOptions(customer),
          productType,
          base_unit: Object.keys(purchase_unit).reduce((res, cid) => {
            const item = purchase_unit[cid].find(unit => unit.basic)
            if (item) res.push({label: item.unitName, value: item.id})
            return res
          }, []),
          conversion_rate: Object.keys(purchase_unit).reduce((res, cid) => {
            purchase_unit[cid].reduce((res, unit) => {
              res[unit.id] = unit.conversionRate
              return res
            }, res)
            return res
          }, {})
        }
      },
      ...(options || {})
    })
    this.details = new OrderDetailModel({ top: this })
    this.getAllDicts()
  }

  testOp = () => {
    const a = this.saveDataForEdit
  }
  /**
   * actions
   */
  setFormRef = action((form) => (this.formRef = form))

  getAllDicts=action(() => {
    this.getProvince()
    getDictList('product_type').then(action(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      this.dict.product_type = v.data
    }))
    getPurchaseUnitDict().then(action(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      this.dict.purchase_unit = v.data
    }))
    this.getPayTypeDict()
    this.getCustomerDict()
  })

  toggleFullScreen = action(() => {
    this.fullScreen = !this.fullScreen
  })
  onValueChange = action((key, value) => {
    // console.log('valueChange-------')
    this[key] = value
    if (key === 'warehouse_id') {
      if (value == null || value === '') return
      getAddressByWarehouseId(value).then(action(v => {
        if (v.status !== 'Successful') return Message.error(v.data)
        const { provinceType, cityType, districtType, address } = v.data
        this.provinceId = provinceType
        this.getCity(provinceType)
        this.cityId = cityType
        this.getDistrict(this.cityId)
        this.districtId = districtType
        this.deliverAddress = address
      }))
    }
    if (key === 'provinceId') {
      // 省改变，获取市下拉数据，清除区下拉数据，市，区的值置空
      this.getCity(value)
      this.cityId = ''
      this.dict.districtId = []
      this.districtId = ''
    }
    if (key === 'cityId') {
      // 市改变，获取区下拉数据，区的值置空
      this.getDistrict(value)
      this.districtId = ''
    }
  })
  onSave = action(() => {
    this.formRef.validate((valid) => {
      if (!valid) return false
      if (this.detailData.some(row => !row.planSendDate)) return Message.error('明细的预计交货日期不能为空！')
      const op = this.flag === 'add' ? doCreate : doUpdate
      const data = this.flag === 'add' ? this.saveData : this.saveDataForEdit
      return MessageBox.confirm('是否确认进行保存操作？', '提示', { type: 'info' }).then(() => {
        op(data).then(action(v => {
          if (v.status !== 'Successful') return Message.error(v.data)
          Message.success('保存成功！')
          this.resetWhenClose()
          this.show = false
          this.refreshMainPageContent()
        }))
      })
    })
  })
  resetWhenClose = action(() => {
    Object.assign(this, this.initValue)
    Object.assign(this.details.gridModel, { rows: [], currentPage: 1, selectedKeyValues: [], expanded: {}, cashSelectedRows: [] })
    this.details.deleteIds.clear()
    this.details.mapSkuIdToId = {}
    this.details.gridModel.resetHeaderCheckBox()
    this.fullScreen = false
  })
  refreshMainPageContent = action(() => {
    // 刷新主页面数据
    const filterSet = this.parent.cursorFilterSetModel
    filterSet.onRefresh()
    const { subTablesModel: { cursorTabModel, tabsFlag } } = filterSet
    tabsFlag.searched = {}// 重置查询标记
    cursorTabModel && cursorTabModel.onSearch()// 查询当前subTable
  })
  onClose = action(() => {
    MessageBox.confirm('未保存, 是否确认关闭?', '提示', { type: 'warning' }).then(action(() => {
      this.resetWhenClose()
      this.show = false
    }))
  })
  getProvince = action(() => {
    getProvinceList().then(action(v => {
      if (v.status === 'Failed' || v.status === 'redirected') return Message.error(v.data)
      this.dict.provinceId = v
    }))
  })
  getCity = action((id) => {
    getCityList(id).then(action(v => {
      if (v.status === 'Failed' || v.status === 'redirected') return Message.error(v.data)
      this.dict.cityId = v
    }))
  })
  getDistrict = action((id) =>
    getDistrictList(id).then(action(v => {
      if (v.status === 'Failed' || v.status === 'redirected') return Message.error(v.data)
      this.dict.districtId = v
    }))
  )
  getPayTypeDict = action(() => {
    getPayTypeDict().then(action(v => {
      if (v.status === 'Failed') return Message.error(v.data)
      this.dict.payType = v.data
    }))
  })
  getCustomerDict = action(() => {
    getCustomerDict().then(action(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      this.dict.customer = v.data
    }))
  })
  showWhenAdd = action(() => {
    this.show = true
    this.flag = 'add'
    // this.details.setGridPager()
    this.saleDate = new Date()
    if (this.marsterWarehouse) {
      const { id, provinceType, cityType, districtType, address } = this.marsterWarehouse
      this.warehouse_id = id
      this.provinceId = provinceType
      this.getCity(provinceType)
      this.cityId = cityType
      this.getDistrict(this.cityId)
      this.districtId = districtType
      this.deliverAddress = address
    }
  })
  showWhenEdit = action((row) => {
    this.show = true
    this.flag = 'edit'
    // this.details.setGridPager()
    const {customer, ...rest} = row
    Object.assign(this, {...rest, customer: this.transformCustomerNameToId(customer)})
    // console.log(row)
    this.saleDate = row.saleDate && new Date(row.saleDate)// 日期
    if (this.provinceId) this.getCity(this.provinceId)// 省市区
    if (this.cityId) this.getDistrict(this.cityId)
    // 获取detail信息
    this.details.onSearch()
  })
  addPayTypeDict = action(() => {
    MessageBox.prompt('请输入结算方式名称', '自定义结算方式', {}).then(({ value }) => {
      if (!value || /\s/.test(value)) {
        return Message({ type: 'error', message: '名称不能有空格，请重试' })
      }
      addPayTypeDict(value).then(action(v => {
        if (v.status !== 'Successful') return Message.error(v.data)
        Message.success(v.data)
        this.getPayTypeDict()
      }))
    })
  })
  addCustomerDict = action(() => {
    MessageBox.prompt('请输入客户名称', '自定义客户', {}).then(({ value }) => {
      if (!value || /\s/.test(value)) {
        return Message({ type: 'error', message: '名称不能有空格，请重试' })
      }
      addCustomerDict({name: value}).then(action(v => {
        if (v.status !== 'Successful') return Message.error(v.data)
        Message.success(v.data)
        this.getCustomerDict()
      }))
    })
  })
  showMultiEditDialog = action(() => {
    if (!this.details.gridModel.selectedKeyValues.length) { return Message.error('请至少选择一行数据') }
    this.multiEditModel.toggleShow()
  })
  deletePayTypeDict = action((key) => {
    // console.log('点击了叉号！')
    deletePayTypeDict(key).then(action(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      Message.success(v.data)
      this.getPayTypeDict()
      // this.details.gridRef.forceUpdate()
    }))
  })
  deleteCustomerDict = action((key) => {
    // console.log('点击了叉号！')
    deleteCustomerDict(key).then(action(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      Message.success(v.data)
      this.getCustomerDict()
      // this.details.gridRef.forceUpdate()
    }))
  })
  /**
   * utils
   */

  getTreeOptions (data) {
    data = data ? data.slice(0) : []
    let postData = []

    if (data && data.length > 0) {
      if (!data[0].hasOwnProperty('pid')) {
        postData = data
      } else {
        let transformData = {}

        data.forEach((item) => {
          if (item.pid == null || item.pid === '' || item.isParent === 'true') {
            // item.children = [];
            postData.push(item)
          } else {
            // item.children = [];
            if (transformData[item.pid]) {
              transformData[item.pid].push(item)
            } else {
              transformData[item.pid] = [item]
            }
          }
        })

        let classData = postData

        while (Object.keys(transformData).length !== 0) {
          let arr = []
          classData.forEach((item) => {
            if (transformData[item.id]) {
              item.children = transformData[item.id]
              arr = arr.concat(item.children || [])
              delete transformData[item.id]
            }
          })

          if (arr.length === 0) {
            Object.keys(transformData).map((item) => {
              console.log(item)
              transformData[item].map((obj) => {
                postData.push(obj)
              })
            })
            break
          } else {
            classData = arr
          }
        }
      }
    }
    return postData
  }

  getDeptValueById=(id) => {
    const path = this._dict.idPathMapOfDept[id]
    let {dept} = this._dict
    if (!path) return []
    return path.split('.').reduce((res, p) => {
      const item = dept.find(el => {
        const arr = el.path.split('.')
        return arr[arr.length - 1] == p
      })
      if (!item) return res
      res.push(item.id)
      dept = item.children || []
      return res
    }, [])
  }

  formatDateToString=(date) => {
    const left = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(el => String(el).padStart(2, 0)).join('-')
    const right = [date.getHours(), date.getMinutes(), date.getSeconds()].map(el => String(el).padStart(2, '0')).join(':')
    const ret = left + ' ' + right
    console.log('进行日期格式化，结果为：' + ret)
    return ret
  }

  transformCustomerNameToId = (name) => {
    const item = this._dict.customer.find(el => el.label === name)
    return item ? item.value : name
  }
}
