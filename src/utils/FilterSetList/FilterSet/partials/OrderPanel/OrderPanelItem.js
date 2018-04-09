import React from 'react'
import { observer } from 'mobx-react'
import { Switch } from 'element-react'

import '@/css/FilterSetList/FilterSet/OrderPanelItem.css'

const OrderPanelItem = observer(
  ({item, orderNo, onSwitch}) => {
    const { label = '默认标签', display = true, top: { sliceFromIndex }} = item
    const defaultWrapperClassName = 'orderpanelitem-wrapper'

    return (<div className={defaultWrapperClassName}>
      <span className='orderNo'>{orderNo + 1 + sliceFromIndex}</span>
      <span className='label'>{label}</span>
      <Switch value={display} onChange={onSwitch} />
    </div>)
  }
)

export default OrderPanelItem
