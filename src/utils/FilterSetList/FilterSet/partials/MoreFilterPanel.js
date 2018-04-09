// 框架
import React from 'react'
import { observer } from 'mobx-react'
import {Dialog} from 'element-react'
import FilterItem from './FilterItem'
// 样式
import '@/css/FilterSetList/FilterSet/MoreFilterPanel.css'

const MoreFilterPanel = observer(
    ({store: {filteritems, MorePanelModel: {show, toggleShow}}}) => {
      const children = filteritems.slice(10).map((el, index) => (<FilterItem key={el.id} store={el} />))
      return (<div className='morefilterpanel-wrapper'>
        <Dialog title='询价' modal={false} visible={show} onCancel={() => {}} top={6 + ''}>
          <div className='arrow' /><div className='arrow-border' />
          <Dialog.Body>
            {children}
          </Dialog.Body>
        </Dialog>
      </div>)
    }
  )

export default MoreFilterPanel
