/* eslint-disable camelcase */
import { extendObservable, action } from 'mobx'
import shortid from 'shortid'
import { Message, MessageBox } from 'element-react'
import {
  multiUpdate
} from '../requests'

export default class MultiEditModel {
  constructor (options) {
    this.initValue = {
      customer: '', // 客户
      taxRate: null, // 税率
      salePrice: null, // 含税售价
      planSendDate: null, // 预计送货日期
      saleNum: null // 销售数量
    }
    extendObservable(this, this.initValue)
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
  onReset = action(() => {
    console.log('执行onReset-------')
    Object.assign(this, this.initValue)
    this.purchase_unit_options_key = 'all'
  })
  onSave = action(() => {
    console.log('执行onSave-------')
    const ids = this.top.details.gridModel.selectedKeyValues
    const idKey = 'skuId'
    const items = this.top.details.gridModel.rows.filter(el => {
      const onlyId = el[idKey]
      return ids.find(id => id === onlyId)
    })

    const { formData } = this
    const finalData = Object.keys(formData).reduce((a, b) => {
      if (formData[b]) a[b] = formData[b]
      return a
    }, {})

    items.forEach(el => {
      if (el.dataStatusForApi == null) el.dataStatusForApi = 2
      Object.keys(finalData).forEach(key => {
        el[key] = finalData[key]
      })
    })

    this.show = false
    this.onReset()
    Message.success('修改完成！')
  })
  onClose = action(() => {
    console.log('执行onClose-------')
    MessageBox.confirm('未保存, 是否确认关闭?', '提示', { type: 'warning' }).then(() => {
      this.show = false
      this.onReset()
    })
  })
}
