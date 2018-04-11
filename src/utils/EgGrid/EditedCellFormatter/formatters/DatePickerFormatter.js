// 框架
import React from 'react'
import { DatePicker } from 'element-react'
import { observer } from 'mobx-react'

const DatePickerFormatter = observer(({store, store: {
 disabled, style, value, _class, handleCellBlur, handleCellValueChange, disabledDate
}}) => {
  return (
    <div className={'ejl-grid-cell--' + (disabled ? 'disabled' : 'editable') + (_class ? ' ' + _class : '')} style={{
      textAlign: 'left', padding: disabled ? '0px' : '10px 8px 10px 0px', ...(style || {})
    }}>
      {disabled
        ? formatDateToStr(value)
        : <DatePicker value={value ? typeof value === 'object' ? value : new Date(value) : null}
          onKeyDown={(e) => { e.stopPropagation() }}
          format='yyyy-MM-dd HH:mm:ss' isShowTime disabledDate={disabledDate}
          onChange={(v) => {
            const stop = handleCellValueChange(v)
            if (!stop) handleCellBlur()
          }}
          />
            }
    </div>
  )
})

export default DatePickerFormatter

function formatDateToStr (ts) {
  if (!ts) { return '' }
  if (typeof ts === 'string') { return ts }
  const d = typeof ts === 'object' ? ts : new Date(ts)
  const ydm = [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(el => String(el).padStart(2, 0)).join('-')
  const hms = [d.getHours(), d.getMinutes(), d.getSeconds()].map(el => String(el).padStart(2, 0)).join(':')
  return ydm + ' ' + hms
}
