// 框架
import React, {Component} from 'react'
import { observer } from 'mobx-react'
// 请求
// model
import TopModel from './model'
// 模块
import FilterSetList from '../../lib/FilterSetList'
// 页面
import Edit from './Edit'

// 样式
import './index.css'

const SaleOrder = observer(class SaleOrder extends Component {
  constructor (props) {
    super(props)
    if (~window.location.pathname.indexOf('/ejl-oms/sale-order')) document.querySelectorAll('title')[0].text = '销售订单OMS'
  }

  render () {
    return [
      <FilterSetList store={store} _class='oms-sale-order__container' key={store.id} />,
      <Edit ref='editDialog' store={store.editDialog} key={store.id + '-edit'} />
    ]
  }
})

export default SaleOrder

const store = new TopModel()
