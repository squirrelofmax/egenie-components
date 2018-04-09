/* eslint-disable camelcase */
import { extendObservable, action } from 'mobx'
import shortid from 'shortid'
import { Message, MessageBox } from 'element-react'
import validateNumber from '../../../../modules/validateNumber'
import {
  multiUpdate
} from '../requests'

export default class MultiEditModel {
  constructor (options) {
    this.initValue = {
      warehouse_id: '', // 仓库
      vendor_id: '', // 供应商
      purchase_unit_id: '', // 采购单位
      tax_rate: '', // 税率
      plan_arrival_price: '', // 含税单价
      plan_arrival_date: '', // 预计到货日期
      sales_type: '', // 销售方式
      pay_type: '', // 结算方式
      plan_arrival_num: '', // 计划采购数量
      confirmed_price: '', // 供应商确认含税单价
      confirmed_num: '', // 供应商确认数量
      organization_id: []
    }
    extendObservable(this, {
      id: shortid.generate(),
      show: false,
      purchase_unit_options_key: 'all',
      get formData () {
        const ret = JSON.parse(JSON.stringify(this, Object.keys(this.initValue)))
        ret.plan_arrival_date = this.plan_arrival_date
        return ret
      },
      top: {},
      ...this.initValue,
      ...(options || {})
    })
  }

  /**
   * actions
   */
  toggleShow = action(() => {
    this.show = !this.show
  })
  onValueChange = action((key, value) => {
    this.sideEffectWhenValueChange(key, value)
    this[key] = value
  })
  sideEffectWhenValueChange = action((key, value) => {
    if (key === 'plan_arrival_num') this.confirmed_num = value
    if (key === 'plan_arrival_price') this.confirmed_price = value
  })
  onBlur = action((key) => {
    const { value, change } = this.validateNumberAndChangeItIfNeed(key, this[key])
    if (change) {
      this.sideEffectWhenValueChange(key, value)
      this[key] = value
    }
  })
  onReset = action(() => {
    console.log('执行onReset-------')
    Object.assign(this, this.initValue)
    this.purchase_unit_options_key = 'all'
  })
  onSave = action(() => {
    console.log('执行onSave-------')
    const ids = this.top.details.gridRef.state.selectedKeyValues
    const idKey = this.top.flag === 'add' ? 'onlyId' : 'pms_purchase_order_detail_id'
    const items = this.top.details.rows.filter(el => {
      const onlyId = el[idKey]
      return ids.find(id => id === onlyId)
    })

    const { formData, purchase_unit_id, top: { details: { changeNumAndPriceWhenUintChange } } } = this
    const finalData = Object.keys(formData).reduce((a, b) => {
      if (formData[b]) a[b] = b === 'tax_rate' ? formData[b] + '%' : formData[b]
      return a
    }, {})

    const foo = () => {
      if (purchase_unit_id)// 采购单位改变时的联动
      { items.forEach(item => changeNumAndPriceWhenUintChange(item, purchase_unit_id)) }

      // 统一赋值,空白就忽略,税率+%
      items.forEach(el => {
        Object.keys(finalData).forEach(key => {
          el[key] = finalData[key]
        })
      })

      this.show = false
      this.onReset()
      return Message.success('修改完成！')
    }

    if (this.top.flag === 'add') return foo()
    if (finalData['plan_arrival_date']) {
      finalData['plan_arrival_date'] = finalData['plan_arrival_date'].toLocaleDateString()
        .split('/').map(el => el.padStart(2, '0')).join('-')
    }
    let { organization_id, ...rest } = finalData
    organization_id = organization_id.length ? organization_id[organization_id.length - 1] : null
    rest = organization_id == null ? rest : { ...rest, organization_id }
    multiUpdate({ ids: ids.join(','), ...rest }).then(v => {
      if (v.status !== 'Successful') return Message.error(v.data)
      foo()
    })
  })
  onClose = action(() => {
    console.log('执行onClose-------')
    MessageBox.confirm('未保存, 是否确认关闭?', '提示', { type: 'warning' }).then(() => {
      this.show = false
      this.onReset()
    })
  })

  /**
   * utils
   */

  validateNumberAndChangeItIfNeed (key, value) {
    const ruleItem = this.top.details.numValidateRules[key]
    if (ruleItem) return {value: validateNumber({ ...ruleItem, value: value }), change: true}
    return {value}
  }
}
