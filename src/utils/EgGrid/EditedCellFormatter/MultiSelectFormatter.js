// 框架
import React from 'react'
import { Select } from 'element-react'
import { observer } from 'mobx-react'

const SelectFormatter = observer(({store, store: {
  disabled, style, value, _class, clearable, options, filterable,
     handleCellBlur, handleCellValueChange
}}) => {
  return (
    <div className={'ejl-grid-cell__select ejl-grid-cell--' + (disabled ? 'disabled' : 'editable') + (_class ? ' ' + _class : '')} style={{
      textAlign: 'left', padding: disabled ? '0px' : '10px 8px 10px 0px', ...(style || {})
    }}>
      {disabled
                ? (value || []).join(',')
                : <Select value={value || []} clearable={clearable} filterable={filterable} multiple
                  onChange={(v) => {
                    const stop = handleCellValueChange(v)
                    if (!stop) handleCellBlur()
                  }}>
                  {options && options.length
                    ? options.map(function ({label, value}) {
                      return (<Select.Option label={label} value={value} key={label} />)
                    })
                    : null
                  }
                </Select>
            }
    </div>
  )
})

export default SelectFormatter
