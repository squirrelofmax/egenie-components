import { extendObservable, action } from 'mobx'
import shortid from 'shortid'

export default class FilterItemModel {
  constructor (options) {
    options = this.initValueByType(options)
    extendObservable(this, {
      id: shortid.generate(),
      field: '',
      type: '',
      label: '',
      hiddenColon: '',
      labelStyle: '',
      clearable: true,
      value: '',
      initValue: '', // 重置时用，只还原value，不还原顺序
      initIndex: '', // 恢复默认顺序时用,保存设置的顺序时会更新这个字段为当前index
      initDisplay: true, // 恢复默认显示时用
      options: [],
      labelField: '',
      valueField: '',
      display: true,
      disabledDate: () => false, // 日期不可选范围
      top: {},
      get searchValue () {
        const {type, value, label, options, valueField, labelField} = this
        if (type === 'date') return this.formatDateToStr(value)
        if (type === 'year') return this.formatYearToStr(value)
        if (type === 'numbergroup') {
          const {min = '', max = ''} = value
          return (!min && !max) ? '' : min + ',' + max
        }
        if (type === 'tree') {
          if (!value || !value.length) return ''
          return value[value.length - 1] + ''
        }
        return value + ''
      },
      ...options
    })
  }

  /**
   * actions
   */

  handleValueChange = action(value => {
    this.top.edited = true
    const _v = this.value
    this.value = value
    const { onItemsChange } = this.top.api
    onItemsChange && onItemsChange(this, this.field, value, _v)
  })
  handleTextChange = action(value => {
    this.handleValueChange(value)
  })

  handleSelectChange = action(value => {
    this.handleValueChange(value)
  })

  handleTreeChange = action((value) => {
    console.log('执行handleTreeChange，Value：', value)
    this.handleValueChange(value)
  })

  handleNumberGroupChange = action((key, v) => {
    this.top.edited = true
    const _v = this.value[key]
    this.value[key] = v
    const { onItemsChange } = this.top.api
    onItemsChange && onItemsChange(this, this.field, v, _v, key)
  })

  handleDateChange = action(value => {
    this.handleValueChange(value)
    if (this.field === 'dateValueStart') {
      let item = this.top.filteritems.find(({ field }) => field === 'dateValueEnd')
      item.disabledDate = time => {
        if (value == null) return false
        return time.getTime() <= value.getTime() - 8.64e7
      }
    }
    if (this.field === 'dateValueEnd') {
      let item = this.top.filteritems.find(({ field }) => field === 'dateValueStart')
      item.disabledDate = time => {
        if (value == null) return false
        return time.getTime() >= value.getTime() + 1
      }
    }
  })

  handleYearChange = action(value => {
    this.handleValueChange(value)
  })

  onKeyUp = action((e) => {
    if (e.keyCode === 13) { this.top.handleSearch() }
  })

  /**
   * utils
   */
  initValueByType = (options) => { // 对初始值的解析可以放到这里
    if (!options || typeof options !== 'object') return {}
    const {type, value} = options
    if (type === 'text') {
      if (!value) return {...options, value: '', initValue: ''}
    }
    if (type === 'select') {
      if (!value) return {...options, value: '', initValue: ''}
    }
    if (type === 'multiselect') {
      if (!value) return { ...options, value: [], initValue: [] }
      if (typeof value === 'string') return { ...options, value: value.split(','), initValue: value.split(',') }
    }
    if (type === 'numbergroup') {
      // 值为空
      if (!value) return {...options, value: {min: '', max: ''}, initValue: {min: '', max: ''}}
      // 值符合标准
      if (typeof value === 'object' && value.hasOwnProperty('min') && value.hasOwnProperty('max')) return {...options, initValue: value}
      // 值是'0，100'这样的字符串
      if (typeof value === 'string' && value.split(',').length == 2) {
        const arr = value.split(',')
        const newValue = {min: arr[0], max: arr[1]}
        return {...options, value: newValue, initValue: {...newValue}}
      }
      // ...其他情况
    }
    if (type === 'date') {
      if (!value) return {...options, value: null, initValue: null}
      if (typeof value === 'string' || typeof value === 'number') return {...options, value: new Date(value), initValue: new Date(value)}
      // ...其他情况
    }
    return {...options, value, initValue: value}
  }

  formatDateToStr (ts) {
    if (!ts) { return '' }
    if (typeof ts === 'string') { return ts }
    const d = typeof ts === 'number' ? new Date(ts) : ts
    const ydm = [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(el => String(el).padStart(2, 0)).join('-')
    const hms = [d.getHours(), d.getMinutes(), d.getSeconds()].map(el => String(el).padStart(2, 0)).join(':')
    return ydm + ' ' + hms
  }

  formatYearToStr (ts) {
    if (!ts) { return '' }
    if (typeof ts === 'string') { return ts }
    const d = typeof ts === 'number' ? new Date(ts) : ts
    return d.getFullYear() + ''
  }
}
