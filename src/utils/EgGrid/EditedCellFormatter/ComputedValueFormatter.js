// 框架
import React from 'react'
import { observer } from 'mobx-react'

// ComputedValueFormatter组件的onBlur方法没有用
const ComputedValueFormatter = observer(({store, store: {
   style, value, _class
}}) => {
  return (
    <div className={'ejl-grid-cell--computed-value' + (_class ? ' ' + _class : '')} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: 0, ...(style || {})
    }}>
      {value}
    </div>
  )
})

export default ComputedValueFormatter
