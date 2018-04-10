import React from 'react'
import { observer } from 'mobx-react'
import { Input, DatePicker, Select, InputNumber } from 'element-react'

import '../../../../css/FilterSetList/FilterSet/FilterItem.css'

const FilterItem = observer(({
                               store: {
                                 id, type, label, hiddenColon, labelStyle, value, index, options, labelField, valueField, display = true,
                                 handleNumberGroupChange, handleTextChange, handleDateChange, handleSelectChange, onKeyUp, clearable, disabledDate, handleYearChange
                               }
                             }) => {
  const defaultLabel = (
    <label className='filteritem-label' style={labelStyle || {}}>{label + (hiddenColon ? '' : ':')}</label>
  )

  const defaultWrapperClassName = 'filteritem-wrapper'
  const hasValueFlag = (value) ? 'has-value' : ''// 非numbergroup的有值判断
  const style = display ? {} : {display: 'none'}
  // debugger
  if (type === 'text') {
    return (<div className={defaultWrapperClassName} style={style} key={id}>
      {defaultLabel}
      <Input className={hasValueFlag} value={value} onChange={handleTextChange} onKeyUp={onKeyUp} />
    </div>)
  }

  if (type === 'date') {
    return (<div className={defaultWrapperClassName + (value ? ' has-value' : '')} style={style} key={id}>
      {defaultLabel}
      <DatePicker format='yyyy-MM-dd HH:mm:ss' isShowTime disabledDate={disabledDate} className={hasValueFlag} value={value || null} onChange={handleDateChange} />
    </div>)
  }

  if (type === 'select') {
    return (<div className={defaultWrapperClassName} style={style} key={id}>
      {defaultLabel}
      <Select className={hasValueFlag} value={value} onChange={handleSelectChange} clearable={clearable}
        filterable={options && (options.length > 9)}>
        {options && options.length
          ? options.map(function (el) {
            // debugger
            return (<Select.Option label={el[labelField]} value={el[valueField]} key={el[valueField]} />)
          })
          : ''
        }
      </Select>
    </div>)
  }

  if (type === 'numbergroup') {
    return (<div className={defaultWrapperClassName} style={style} key={id}>
      {defaultLabel}
      <InputNumber className={(value.min || value.min === 0) ? 'has-value' : ''} defaultValue={(value.min == null || value.min === '') ? undefined : +value.min}
        value={(value.min == null || value.min === '') ? undefined : +value.min} min={0}
        max={value.max === '' ? Infinity : value.max - 1}
        onChange={handleNumberGroupChange.bind(this, 'min')} onKeyUp={onKeyUp} />
      <label>至</label>
      <InputNumber className={value.max ? 'has-value' : ''} defaultValue={(value.max == null || value.max === '') ? undefined : +value.max}
        value={(value.max == null || value.max === '') ? undefined : +value.max} min={value.min ? value.min + 1 : 1} max={Infinity}
        onChange={handleNumberGroupChange.bind(this, 'max')} onKeyUp={onKeyUp}
      />
    </div>)
  }

  if (type === 'year') {
    return (<div className={defaultWrapperClassName + (value ? ' has-value' : '')} style={style}>
      {defaultLabel}
      <DatePicker className={hasValueFlag}
        value={value ? typeof value === 'string' ? new Date(value) : value : null}
        onChange={handleYearChange}
        selectionMode='year'
        align='right'
      />
    </div>)
  }

  if (type === 'multiselect') {
    return (<div className={defaultWrapperClassName + (value ? ' has-value' : '')} style={style}>
      {defaultLabel}
      <Select className={hasValueFlag} value={value} onChange={handleSelectChange} clearable={clearable}
        filterable={options && (options.length > 9)} multiple>
        {options && options.length
          ? options.map(function (el) {
            // debugger
            return (<Select.Option label={el[labelField]} value={el[valueField]} key={el[valueField]} />)
          })
          : ''
        }
      </Select>
    </div>)
  }
})

export default FilterItem
