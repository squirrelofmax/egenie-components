// 框架
import React from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import {Dialog, Button} from 'element-react'
import { observer } from 'mobx-react'
import OrderPanelItem from './OrderPanelItem'
// 样式
import '@/css/FilterSetList/FilterSet/OrderPanel.css'

const SortableItem = SortableElement(OrderPanelItem)

const SortableList = SortableContainer(({items, onSwitch}) => {
  return (
    <div className='scroll-container'>
      <div className='scroll-wrapper'>
        <div className='items-container'>
          {items.map((el, index) => (
            <SortableItem key={el.id} index={index} item={el} onSwitch={onSwitch.bind(this, index)} orderNo={index} />
          ))}
        </div>
      </div>
    </div>
  )
})

const OrderPanel = observer(({store: {filteritems, sliceFromIndex, OrderPanelModel: {
  show, diaY, toggleShow, onSave, onCancel, resetToOriginalOrder, onSortEnd, onSwitch
 }}}) => {
  return (<div className='orderpanel-wrapper'>
    <Dialog closeOnClickModal={false} closeOnPressEscape={false} title='询价' visible={show} onCancel={onCancel} top={diaY + ''}>
      <div className='arrow' />
      <Dialog.Body>
        <div className='info'>拖动以设置搜索条件显示顺序，序号小于等于10的条件会显示在搜索栏，设置条件为隐藏会将条件的显示顺序移动到最后。</div>
        <SortableList items={filteritems.slice(sliceFromIndex)} onSortEnd={onSortEnd} axis='xy' helperClass='sortableHelper' onSwitch={onSwitch} />
        <div className='button-wrapper'>
          <Button type='primary' size='small' onClick={onSave}>保存</Button>
          <Button size='small' onClick={resetToOriginalOrder}>恢复默认顺序</Button>
          <Button size='small' onClick={onCancel}>取消</Button>
        </div>
      </Dialog.Body>
    </Dialog>
  </div>)
})

export default OrderPanel
