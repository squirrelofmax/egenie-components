// 框架
import React from 'react'
import { InputNumber } from 'element-react'
import { observer } from 'mobx-react'

// InputNumber组件的onBlur方法没有用
const NumberFormatter = observer(({store, store: {
  disabled, style, value, min, max, step, unit, _class, handleCellBlur, handleCellValueChange
}}) => {
  return (
    <div className={'ejl-grid-cell--' + (disabled ? 'disabled' : 'editable') + (_class ? ' ' + _class : '')} style={{
      display: 'flex', alignItems: 'center', textAlign: 'right', padding: disabled ? '0px' : '10px 8px 10px 0px', ...(style || {})
    }}>
      {disabled
                ? value
                : <InputNumber
                  value={value == null ? value : +value} min={min} step={step} defaultValue={value == null ? value : +value}
                  max={max} onKeyDown={(e) => { e.stopPropagation() }}
                  onChange={(v) => {
                    const stop = handleCellValueChange(v)
                    if (!stop) handleCellBlur()
                  }}
                  />
      }
      {unit}
    </div>
  )
})

export default NumberFormatter
