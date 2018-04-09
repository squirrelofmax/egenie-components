// 框架
import React, {Component} from 'react'
import { observer } from 'mobx-react'
// 请求
// model
import TopModel from './model'
// 模块
import FilterSetList from '../../modules/FilterSetList'

// 样式
import './index.css'

const PurchaseOrder = observer(class PurchaseOrder extends Component {
  constructor (props) {
    super(props)
    if (~window.location.pathname.indexOf('/ejl-report/goods-stats')) document.querySelectorAll('title')[0].text = '商品汇总表'
  }

  render () {
    return (
      <FilterSetList store={store} _class='goods-stats-report__container' />
    )
  }
})

export default PurchaseOrder

const store = new TopModel()
