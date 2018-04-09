// 框架
import React from 'react'
import { Input } from 'element-react'
import { observer } from 'mobx-react'

const InputFormatter = observer(({store, store: {
    disabled, style, value, _class, handleCellBlur, handleCellValueChange
}}) => {
  return (
    <div className={'ejl-grid-cell--' + (disabled ? 'disabled' : 'editable') + (_class ? ' ' + _class : '')} style={{
      textAlign: 'left', padding: disabled ? '0px' : '10px 8px 10px 0px', ...(style || {})
    }}>
      {disabled
                ? value
                : <Input value={value} onKeyDown={(e) => { e.stopPropagation() }}
                  onKeyUp={e => {
                    e.stopPropagation()
                    if (e.keyCode == 13) handleCellBlur()
                  }}
                  onBlur={handleCellBlur} onChange={handleCellValueChange} />
            }
    </div>
  )
})

export default InputFormatter
