import { extendObservable, action, autorun, when } from 'mobx'

/**
 * options:{
 *     rawRow,//用于直接操作源row
 *    isDisabled,//供调用的方法
 *    field,
 *    style,
 *    getClass,
 *    getValue:()=>{}
 *    accessor:{
 *      valueChange:'',//eg,handleCellValueChange
 *      blur:'handleCellBlur'
 *     }
 * }
 */
// 生成单元格的model
class EditedCellModel {
  oldBlurValue = ''
  oldChangeValue = ''

  constructor ({
      parent = {}, rawRow = {}, field, style = {},
    min = 0, max = Infinity, step = 1, unit = '', // number
    clearable = true,
    filterable = true, getFilterable = (options) => options && options.length > 10,
    options = [], getOptions = () => options, justOnceNotForever = false, // select
      accessor = {
        valueChange: 'handleCellValueChange',
        blur: 'handleCellBlur'
      },
      isDisabled = () => false,
      getClass = () => '',
      disabledDate = () => false, // 默认全部可用
    treeOptions = [], getTreeOptions = _getTreeOptions,
    treeOptionsAccessor = '', treeProps = { value: 'id', label: 'name', children: 'children' },
    getValue// 用于计算值
    }) {
    const { valueChange, blur } = accessor
    extendObservable(this, {
      parent,
      rawRow,
      field,
      style,
      min, // number组件专用
      max, // number组件专用
      step, // number组件专用
      unit, // number组件专用
      options, // [{label:'',value:''}]
      clearable,
      justOnceNotForever, // options只监听外部字典项的初始化
      treeOptions: getTreeOptions ? getTreeOptions(treeOptions) : treeOptions, // 默认执行数据格式转换，如果传的是转换好的treeOptions那么请把getTreeOptions设为null
      treeOptionsAccessor,
      treeProps,
      get value () {
        return typeof getValue === 'function' ? getValue(this.rawRow) : this.rawRow[field]
      },
      get disabled () {
        return isDisabled(this)// 可以通过this获取当前单元格信息，进而通过this.parent获取外层信息
      },
      get _class () {
        return getClass(this)
      },
      get filterable () {
        return filterable && getFilterable && getFilterable(this.options)
      }
    })
    this.oldChangeValue = this.value
    this.handleCellValueChange = action((value) => { // 交给外部做，不仅仅改变row的值，还会发生各种联动
      const _value = Array.isArray(value) ? value.toString() : value// 考虑到树形下拉组件传递进来的是个array，且每次只是内部value变，数组还是同一个数组
      if (_value === this.oldChangeValue) return true
      this.oldChangeValue = _value
      return this.parent[valueChange] && this.parent[valueChange](this.field, value, this.rawRow)// row确定是源row，可以直接操作
    })
    this.handleCellBlur = action(() => {
      const _value = Array.isArray(this.value) ? this.value.toString() : this.value
      if (_value === this.oldBlurValue) return
      this.oldBlurValue = _value
      this.parent[blur] && this.parent[blur](this.field, this.value, this.rawRow)
    })

    if (typeof getOptions === 'function') {
      Promise.resolve(getOptions(this.rawRow, this.field, this.value)).then(v => { // 获取下拉选项，外部接口可根据参数做缓存
        if (!v || !Array.isArray(v)) return
        this.options = v
      })
    }
    if (typeof getOptions === 'string') {
      console.log('getOptions----', getOptions)
      const getOptionsByAccessor = () => {
        return getOptions.split('.').reduce((res, key) => {
          return res[key]
        }, this.parent)
      }
      const setOptionsByAccessor = () => {
        this.options = getOptionsByAccessor()
      }
      setOptionsByAccessor()
      if (!this.justOnceNotForever) autorun(setOptionsByAccessor)
      else when(() => getOptionsByAccessor().length > 0, setOptionsByAccessor)
    }

    if (treeOptionsAccessor) {
      const getOptionsByAccessor = () => {
        const ret = getOptions.split('.').reduce((res, key) => {
          return res[key]
        }, this.parent)
        return getTreeOptions ? getTreeOptions(ret) : ret
      }
      const setOptionsByAccessor = () => {
        this.treeOptions = getOptionsByAccessor()
      }
      setOptionsByAccessor()
      if (!this.justOnceNotForever) autorun(setOptionsByAccessor)
      else when(() => getOptionsByAccessor().length > 0, setOptionsByAccessor)
    }
  }
}

export function getEditedCellModelList (rawRow, config, parent) { // config是array,['field1',{field:'',isDisabled:()=>{}},'field3']
  return config.map(el => {
    const field = typeof el === 'string' ? el : el.field
    if (!rawRow.hasOwnProperty(field)) extendObservable(rawRow, {[field]: null})
    if (typeof el === 'string') return new EditedCellModel({ field: el, parent, rawRow })
    return new EditedCellModel({ ...el, parent, rawRow })
  })
}

export function getMapOfFieldToEditedCellModel (rawRow, config, parent) { // config是array,['field1',{field:'',isDisabled:()=>{}},'field3']
  return getEditedCellModelList(rawRow, config, parent).reduce((res, a) => {
    res[a.field] = a
    return res
  }, {})
}

export default EditedCellModel

export function _getTreeOptions (data) {
  data = data ? data.slice(0) : []
  let postData = []

  if (data && data.length > 0) {
    if (!data[0].hasOwnProperty('pid')) {
      postData = data
    } else {
      let transformData = {}

      data.forEach((item) => {
        if (item.pid == null || item.pid === '' || item.isParent === 'true') {
          // item.children = [];
          postData.push(item)
        } else {
          // item.children = [];
          if (transformData[item.pid]) {
            transformData[item.pid].push(item)
          } else {
            transformData[item.pid] = [item]
          }
        }
      })

      let classData = postData

      while (Object.keys(transformData).length !== 0) {
        let arr = []
        classData.forEach((item) => {
          if (transformData[item.id]) {
            item.children = transformData[item.id]
            arr = arr.concat(item.children || [])
            delete transformData[item.id]
          }
        })

        if (arr.length === 0) {
          Object.keys(transformData).forEach((item) => {
            console.log(item)
            transformData[item].forEach((obj) => {
              postData.push(obj)
            })
          })
          break
        } else {
          classData = arr
        }
      }
    }
  }
  return postData
}
