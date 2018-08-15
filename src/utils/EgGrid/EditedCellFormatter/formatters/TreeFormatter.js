// 框架
import React from 'react'
import { Cascader } from 'element-react'
import {toJS} from 'mobx'
import { observer } from 'mobx-react'

const TreeFormatter = observer(({store, store: {
  disabled, style, value, _class, clearable, treeOptions, treeProps, changeOnSelect,
     handleCellBlur, handleCellValueChange
}}) => {
  return (
    <div className={'ejl-grid-cell__select ejl-grid-cell--' + (disabled ? 'disabled' : 'editable') + (_class ? ' ' + _class : '')} style={{
      textAlign: 'left', padding: disabled ? '0px' : '10px 8px 10px 0px', ...(style || {})
    }}>
      {disabled
        ? (value || []).join(',')
        : <Cascader value={(value || []).slice(0)} options={toJS(treeOptions)} props={treeProps} filterable clearable={clearable} changeOnSelect={changeOnSelect}
          showAllLevels={false}
          beforeFilter={() => (Promise.resolve(true))}
          onKeyDown={(e) => { e.stopPropagation() }}
          onChange={(v) => {
            const stop = handleCellValueChange(v)
            if (!stop) handleCellBlur()
          }} />
      }
    </div>
  )
})

export default TreeFormatter
