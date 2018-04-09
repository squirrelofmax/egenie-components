import { extendObservable, action } from 'mobx'
import shortid from 'shortid'
import { Message, MessageBox } from 'element-react'
import {
  savePurchaseOrder, addPayTypeDict, deletePayTypeDict, getPayTypeDict
  , findCommonVendorBySkuIds, updatePurchaseOrderMain, findMasterWarehouse, getAddressByWarehouseId
} from '../requests'

import {getProvinceList, getCityList, getDistrictList, getWarehouse, getVendorDict
  , getDictList, getPurchaseUnitDict, getAllDept} from '../../../../requests/requests'
import OrderDetailModel from './OrderDetailModel'
import AddGoodsModel from './AddGoodsModel'
import MultiEditModel from './MultiEditModel'

export default class OrderModel {
  constructor (options) {
    this.initValue = {
      pms_purchase_order_id: '', // id，用于查询，不显示
      pms_purchase_order_no: '', // 采购单号
      purchase_date: new Date(), // 采购日期,必填
      purchase_order_type_code: '0', // 采购订单类型，下拉
      product_type_code: '', // 商品类型，下拉
      vendor_id: '', // 供应商,下拉
      warehouse_id: '', // 仓库，下拉
      sales_type: '', // 销售方式，下拉
      pay_type: '', // 结算方式
      deliver_address: '', // 收货地址
      province_id: '', // 省
      city_id: '', // 市
      district_id: '', // 区
      remarks: '', // 备注
      contract_terms: '', // 合同条款
      organization_id: [] // 组织部门
    }
    extendObservable(this, this.initValue)
    extendObservable(this, {
      parent: {}, // FilterSetList
      id: shortid.generate(),
      flag: 'edit', // add/edit
      show: false,
      fullScreen: false,
      deptProps: {value: 'id', label: 'name', children: 'children'},
      details: {},
      get formData () {
        return JSON.parse(JSON.stringify(this, Object.keys(this.initValue)))
      },
      addGoodsModel: new AddGoodsModel({ top: this }),
      get saveData () {
        const main = JSON.parse(JSON.stringify(this, Object.keys(this.initValue)))
        main.purchase_order_type = main.purchase_order_type_code
        main.product_type = main.product_type_code
        delete main.purchase_order_type_code
        delete main.product_type_code
        main.purchase_date = this.formatDateToString(new Date(main.purchase_date))
        const reg = /_code$/
        const detail = this.details.gridModel._rows.map(el => {
          el = {...el}
          Object.keys(el).forEach(key => { // 清除所有code
            delete el.is_usable_code
            delete el.is_usable
            delete el.version
            delete el.conversion_rate
            delete el.purchase_num
            el[key] = el[key] == null ? '' : el[key]
            if (reg.test(key)) {
              el[key.replace(reg, '')] = el[key]
              delete el[key]
            }
          })
          el.organization_id = el.organization_id.length ? el.organization_id[el.organization_id.length - 1] : ''
          el.plan_arrival_date = el.plan_arrival_date
            ? (typeof el.plan_arrival_date === 'object' ? el.plan_arrival_date : new Date(el.plan_arrival_date))
              .toLocaleDateString().split('/').map(el => el.padStart(2, '0')).join('-')
            : ''
          return el
        })
        return {...main, detailNewList: detail}
      },
      multiEditModel: new MultiEditModel({top: this}),
      dict: {
        purchase_order_type: [], // 采购订单类型，下拉
        product_type: [], // 商品类型，下拉
        vendor_id: {}, // 供应商,下拉
        warehouse_id: [], // 仓库，下拉
        sales_type: [], // 销售方式，下拉
        province_id: [], // 省
        city_id: [], // 市
        district_id: [], // 区
        purchase_unit: {}, // 采购单位,eg.{009002:[]}
        pay_type: {}, // 结算方式
        filterVendorById: {}, // 过滤后的vendor字典项，eg,10001:{}--//改了，10001:[{供应商1的信息},{供应商2的信息}]
        commonVendor: {}, // 批量修改页面要用到的vendor字典项{"2000021": "A100_F2_A002"}
        dept: []
      },
      get _dict () {
        const {filterVendorById, purchase_unit, dept} = this.dict
        const all = Object.keys(purchase_unit).reduce((res, cid) => {
          return res.concat(purchase_unit[cid].map(unit => ({ value: unit.id, label: unit.unitName })))
        }, [])

        return {
          sales_type: this.dict.sales_type.map(el => ({value: el.code, label: el.name})),
          warehouse_id: this.dict.warehouse_id.map(el => ({value: el.warehouse_id, label: el.warehouse_name})),
          vendor_id: Object.keys(this.dict.vendor_id).map(key => ({ label: key, value: this.dict.vendor_id[key] })),
          purchase_unit: Object.keys(purchase_unit).reduce((res, cid) => {
            res[cid] = purchase_unit[cid].map(unit => ({ value: unit.id, label: unit.unitName }))
            return res
          }, {all, none: []}),
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
          }, {}),
          filterVendorById: Object.keys(this.dict.filterVendorById).reduce((res, id) => {
            res[id] = filterVendorById[id].map(({id, vendorName, purchaserId}) => ({ value: id, label: vendorName, purchaserId: purchaserId == null ? '' : purchaserId }))
            return res
          }, {}),
          pay_type: Object.keys(this.dict.pay_type).map(key => ({ value: key, label: this.dict.pay_type[key] })),
          dept: this.getTreeOptions(dept),
          idPathMapOfDept: dept.reduce((res, obj) => {
            res[obj.id] = obj.path
            return res
          }, {})
        }
      },
      ...(options || {})
    })
    setTimeout(() => { this.dict.sales_type = [{ code: '0', name: '普通采购' }, { code: '3', name: '采购退货' }] }, 10000)
    this.details = new OrderDetailModel({ top: this })
    this.getProvince()
    getWarehouse().then(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      this.dict.warehouse_id = v.data
    })
    getVendorDict().then(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      this.dict.vendor_id = v.data
    })
    getDictList('product_type').then(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      this.dict.product_type = v.data
    })
    getDictList('sales_type').then(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      this.dict.sales_type = v.data
    })
    getPurchaseUnitDict().then(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      this.dict.purchase_unit = v.data
    })
    findMasterWarehouse().then(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      this.marsterWarehouse = v.data
    })
    getAllDept().then(v => {
      if (v.status === 'Failed') return Message.error(v.data)
      this.dict.dept = v || []
    })
    this.getPayTypeDict()
  }

  /**
   * actions
   */
  toggleFullScreen = action(() => {
    this.fullScreen = !this.fullScreen
  })
  onValueChange = action((key, value) => {
    // console.log('valueChange-------')
    this[key] = value
    if (key === 'warehouse_id') {
      if (value == null || value === '') return
      getAddressByWarehouseId(value).then(v => {
        if (v.status !== 'Successful') return Message.error(v.data)
        const { provinceType, cityType, districtType, address } = v.data
        this.province_id = provinceType
        this.getCity(provinceType)
        this.city_id = cityType
        this.getDistrict(this.city_id)
        this.district_id = districtType
        this.deliver_address = address
      })
    }
    if (key === 'province_id') {
      // 省改变，获取市下拉数据，清除区下拉数据，市，区的值置空
      this.getCity(value)
      this.city_id = ''
      this.dict.district_id = []
      this.district_id = ''
    }
    if (key === 'city_id') {
      // 市改变，获取区下拉数据，区的值置空
      this.getDistrict(value)
      this.district_id = ''
    }
  })
  onSave = action(() => {
    if (this.flag === 'add') {
      if (this.saveData.detailNewList.some(row => !row.plan_arrival_date)) return Message.error('明细的预计到货日期不能为空！')
      if (this.saveData.detailNewList.some(row => !row.base_unit_id)) return Message.error('明细的基本计量单位不能为空！')
      return MessageBox.confirm('是否确认进行保存操作？', '提示', { type: 'info' }).then(() => {
        savePurchaseOrder(this.saveData).then(v => {
          if (v.status !== 'Successful') return Message.error(v.data)
          Message.success('保存成功！')
          this.resetWhenClose()
          this.show = false
          this.refreshMainPageContent()
        })
      })
    }

    // 修改时，保存主表信息
    const data = { ...this.saveData }
    delete data.detailNewList
    delete data.organization_id

    updatePurchaseOrderMain(this.pms_purchase_order_id, data).then(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      this.resetWhenClose()
      this.show = false
      this.refreshMainPageContent()
    })
  })
  resetWhenClose = action(() => {
    Object.assign(this, this.initValue)
    Object.assign(this.details.gridModel, { rows: [], currentPage: 1, selectedKeyValues: [], expanded: {}, cashSelectedRows: [] })
    this.fullScreen = false
  })
  refreshMainPageContent = action(() => {
    // 刷新主页面数据
    const filterSet = this.parent.cursorFilterSetModel
    filterSet.handleRefresh()
    const { subTableListModel: { cursorTabModel, tabsFlag } } = filterSet
    tabsFlag.searched = {}// 重置查询标记
    cursorTabModel && cursorTabModel.onSearch()// 查询当前subTable
  })
  onClose = action(() => {
    MessageBox.confirm('未保存, 是否确认关闭?', '提示', { type: 'warning' }).then(() => {
      this.resetWhenClose()
      this.show = false
    })
  })
  getProvince = action(() => {
    getProvinceList().then(v => {
      this.dict.province_id = v
    })
  })
  getCity = action((id) => {
    getCityList(id).then(v => {
      this.dict.city_id = v
    })
  })
  getDistrict = action((id) =>
    getDistrictList(id).then(v => {
      this.dict.district_id = v
    })
  )
  getPayTypeDict = action(() => {
    getPayTypeDict().then(v => {
      if (v.status === 'Failed') return Message.error(v.data)
      this.dict.pay_type = v.data
    })
  })
  showWhenAdd = action(() => {
    this.show = true
    this.flag = 'add'
    // this.details.setGridPager()
    this.purchase_date = new Date()
    if (this.marsterWarehouse) {
      const { id, provinceType, cityType, districtType, address } = this.marsterWarehouse
      this.warehouse_id = id
      this.province_id = provinceType
      this.getCity(provinceType)
      this.city_id = cityType
      this.getDistrict(this.city_id)
      this.district_id = districtType
      this.deliver_address = address
    }
  })
  showWhenEdit = action((row) => {
    this.show = true
    this.flag = 'edit'
    // this.details.setGridPager()
    Object.assign(this, row)
    // console.log(row)
    this.organization_id = this.getDeptValueById(row.organization_id)
    this.purchase_date = row.purchase_date && new Date(row.purchase_date)// 日期
    if (this.province_id) this.getCity(this.province_id)// 省市区
    if (this.city_id) this.getDistrict(this.city_id)
    // 获取detail信息
    this.details.onSearch()
  })
  addPayTypeDict = action(() => {
    MessageBox.prompt('请输入结算方式名称', '自定义结算方式', {}).then(({ value }) => {
      if (!value || /\s/.test(value)) {
        return Message({ type: 'error', message: '名称不能有空格，请重试' })
      }
      addPayTypeDict(value).then(v => {
        if (v.status !== 'Successful') return Message.error(v.data)
        Message.success(v.data)
        this.getPayTypeDict()
      })
    })
  })
  showMultiEditDialog = action(() => {
    if (!this.details.gridModel.selectedKeyValues.length) { return Message.error('请至少选择一行数据') }
    this.multiEditModel.toggleShow()
    const { rows } = this.details.gridModel
    const onlyIdKey = this.flag === 'add' ? 'onlyId' : 'pms_purchase_order_detail_id'
    const _rows = this.details.gridModel.selectedKeyValues.map(onlyId => rows.find(row => row[onlyIdKey] === onlyId))
    // 获取公共供货商
    findCommonVendorBySkuIds({ skuIds: [...new Set(_rows.map(el => el.sku_id))].join(',') }).then(v => {
      if (v.status !== 'Successful') {
        this.dict.commonVendor = {}
        return Message.error(v.data)
      }
      this.dict.commonVendor = v.data
    })

    // 判断采购单位的下拉选项
    const puids = _rows.map(row => row.purchase_unit_id)// 获取所有的采购单位id
    const { getUnitCategoryByUnitId } = this.details
    const categorys = puids.map(unitid => getUnitCategoryByUnitId(unitid)).filter(c => c)  // 转换为种类，并忽略所有无种类的
    if (!categorys.length) { return (this.multiEditModel.purchase_unit_options_key = 'all') } // 全为无种类的则为所有种类
    const res = [...new Set(categorys)]// 去重
    if (res.length === 1) { return (this.multiEditModel.purchase_unit_options_key = res[0]) } // 单个种类，则下拉为此种类的

    this.multiEditModel.purchase_unit_options_key = 'none'// 多个种类，则下拉为空
    Message.warning('某些选中行的采购单位互相不兼容，无法批量修改采购单位')
  })
  deletePayTypeDict = action((key) => {
    // console.log('点击了叉号！')
    deletePayTypeDict(key).then(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      Message.success(v.data)
      this.getPayTypeDict()
      // this.details.gridRef.forceUpdate()
    })
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
    const left = date.toLocaleDateString().split('/')
    .map(el => el.padStart(2, '0')).join('-')
    const right = [date.getHours(), date.getMinutes(), date.getSeconds()].map(el => String(el).padStart(2, '0')).join(':')
    const ret = left + ' ' + right
    console.log('进行日期格式化，结果为：' + ret)
    return ret
  }
}
