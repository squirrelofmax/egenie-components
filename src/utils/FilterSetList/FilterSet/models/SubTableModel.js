import { extendObservable, action } from 'mobx'
import shortid from 'shortid'
// model
import EgGridModel from '@/utils/EgGrid/EgGridModel'
import { Message } from 'element-react'

/**
api:{
  queryData
}
 */
export default class SubTableModel {
  constructor ({ api, grid, getButtons = () => [], ...options }) {
    this.api = api
    extendObservable(this, {
      parent: {},
      top: {},
      hidden: false, // 是否隐藏
      tab: {name: '', value: ''},
      id: shortid.generate(),
      gridModel: {},
      filteritems: [], // {label,field,,value}
      allFilteritemsInOneGroup: true,
      clearAfterChangeFilteritem: false, // 改变filteritem后是否清空
      cursorFilteritemField: '',
      buttons: getButtons(this),
      get buttonsPassPermissionValidate () {
        if (!this.buttons.length) return this.buttons
        const { permissionOfButton } = this.parent
        const buttons = this.buttons.map((el, idx) => { // 给group按钮加idx属性
          const { group } = el
          if (!group) return { ...el }
          const ret = { ...el, idx: 0 }
          ret.group = ret.group.map((el, index) => ({ ...el, idx: index + 1 }))
          console.log('group的idx-------:', ret)
          return ret
        })
        if (permissionOfButton == null) return buttons// 没有权限控制，则全部显示
        return buttons.filter(el => {
          const { permissionId, group } = el
          if (group) return true // group留给下一步处理
          if (permissionId == null) return true// 没有permissionId字段说明不受权限影响
          return ~permissionOfButton.indexOf(permissionId)
        }).map(button => {
          let { group, ...firstButton } = button
          if (!group) { return button }
          group = group.slice(0)
          group.unshift(firstButton)// 先把gourp放到同一个arr中
          let arr = group.filter(el => el.permissionId == null || ~permissionOfButton.indexOf(el.permissionId))// 过滤掉没权限的
          if (!arr.length) return false // 如果都没权限，返回false，留给下一步再过滤掉
          let ret = arr.shift()// 提出第一项为主按钮
          if (!arr.length) return ret// 如果剩余的是空数组，直接返回第一项作为按钮而不是按钮组
          ret.group = arr// 否则把剩余arr的装配个ret
          return ret
        }).filter(button => button)// 过滤掉false
      },
      get _buttons () { // 最终页面展示的buttons，跟cashRows联动
        const {
          buttonsPassPermissionValidate, gridModel: {
            cashOn, cashSelectedRows
          }
        } = this
        // 如果没有cashRows就不处理直接返回
        if (!buttonsPassPermissionValidate.length || !cashOn || !cashSelectedRows || !cashSelectedRows.length) return buttonsPassPermissionValidate
        return buttonsPassPermissionValidate.map(button => {
          let { group, ...firstButton } = button
          const { display } = button
          if (!group) {
            if (group) return button // group留给下一步处理
            if (!display) return button
            if (typeof display !== 'function') return button // 如果没有display方法或者display不合法，那么就跟主按钮一起显隐
            return { ...button, disabled: !display(cashSelectedRows) }
          }
          group = group.slice(0)
          group.unshift(firstButton)// 先把gourp放到同一个arr中
          let arr = group.map((button) => { // 设置disabled
            let { display } = button
            if (!display) return button
            if (typeof display !== 'function') return button // 如果没有display方法或者display不合法，那么就跟主按钮一起显隐
            return { ...button, disabled: !display(cashSelectedRows) }
          })
          const idx = arr.findIndex(el => !el.disabled)// 第一个可用的坐标
          if (!~idx) return { ...arr[0], group: arr.slice(1) } // 全禁用，则以最初的第一按钮显示，并禁用
          const item = arr.splice(idx, 1)[0]
          item.group = arr
          if (item.isLabel && !~arr.findIndex(el => !el.disabled)) item.disabled = true // 如果剩余全禁用，第一个又只是label则全禁用
          return item
        })
      },
      get numOfHasValue () {
        return this.filteritems.reduce((res, el) => Number(!!el.value) + res, 0)
      },
      history: {pageSize: '50', sidx: '', sord: 'asc', page: '1'},
      get searchData () {
        return this.filteritems.reduce((data, item) => {
          data[item.field] = item.value + ''
          return data
        }, {})
      },
      get isCursor () {
        return this.parent.activeTab === this.tab.value
      },
      get isInited () {
        return this.parent.tabsFlag.inited[this.tab.value]
      },
      get isSearched () {
        return this.parent.tabsFlag.searched[this.tab.value]
      },
      get cursorFilteritem () {
        return this.filteritems.find(({ field }) => field === this.cursorFilteritemField)
      },
      ...(options || {})
    })
    const {
      handlePageOrSizeChange, onSortAll, onRowClick, onRefresh
    } = this
    // 配置
    this.gridModel = new EgGridModel({
      ...grid,
      api: {
        onPageChange: handlePageOrSizeChange,
        onSizeChange: handlePageOrSizeChange,
        onSortAll, // 排序
        onRowClick, // 行点击
        onRefresh
      }
    })
  }

  /**
   * actions
   */
  onFilterValueChange = action((key, value) => {
    if (this.allFilteritemsInOneGroup) return this.cursorFilteritem && (this.cursorFilteritem.value = value)
    const item = this.filteritems.find(el => el.field === key)
    if (item) item.value = value
  })

  onCursorFilteritemFieldChange = action(field => {
    const { clearAfterChangeFilteritem, cursorFilteritem } = this
    if (clearAfterChangeFilteritem && cursorFilteritem) cursorFilteritem.value = ''
    this.cursorFilteritemField = field
  })

  onSearch = action(() => {
    this.gridModel.resetHeaderCheckBox() // 重置表头的勾选框
    this.gridModel.loading = true
    const data = this.searchData
    console.log(data, '点击搜索')
    const page = '1'
    const { pageSize = '50', sidx, sord } = this.history
    if (this.gridModel.hiddenPager) {
      this.queryDataAndSetState({ cond: data })
    } else {
      this.queryDataAndSetState({ cond: data, page, pageSize, sidx, sord })
    }
    // 操作EgGrid，设置页码为1，清空勾选数据,重置树表的expanded状态
    // this.gridModel.currentPage = 1
    this.gridModel.selectedKeyValues = []
    this.gridModel.expanded = {}
    this.gridModel.cashSelectedRows = []
  })

  queryDataAndSetState = action((data) => {
    const { cursorRow, primaryKeyField } = this.top.gridModel
    const pid = cursorRow[primaryKeyField]
    if (!pid) return (this.gridModel.loading = false)
    this.api.queryData && this.api.queryData(data, pid, cursorRow, this.gridModel).then(action(v => { // gridModel用于设置动态列columns
      const searched = this.top.subTablesModel.tabsFlag.searched
      this.top.subTablesModel.tabsFlag.searched = { ...searched, [this.tab.value]: true }
      this.gridModel.loading = false
      this.history = data
      if (!this.gridModel.hiddenPager) {
        this.gridModel.currentPage = data.page
        this.gridModel.size = data.pageSize
      }
      if (v.status !== 'Successful') {
        this.gridModel.rows = []
        this.gridModel.total = 0
        return Message.error(v.data)
      }
      this.gridModel.rows = v.data ? this.gridModel.hiddenPager ? v.data : v.data.list : []
      this.gridModel.total = v.data && !this.gridModel.hiddenPager ? v.data.totalCount : 0
    }))
  })

  prevHandleDataFromInner = action((innerState) => {
    const history = this.history
    const data = Object.assign({}, history)
    data.page = innerState.currentPage + ''
    data.pageSize = innerState.size + ''
    return data
  })

  handlePageOrSizeChange = action((innerState) => {
    const data = this.prevHandleDataFromInner(innerState)
    this.queryDataAndSetState(data)
  })

  onRefresh = action(() => {
    const data = this.history
    this.queryDataAndSetState(data)
  })

  onSortAll = action(({ sidx, sord }) => {
    const data = { ...this.history, sidx, sord }
    this.queryDataAndSetState(data)
  })

  onRowClick = action((id, row) => { // 一般用id就可以，特殊需求就用第二个参数row

  })

  /**
   utils
   */
  getDisplayValueOfFilteritem (item) {
    if (!item) return ''
    const {type, value, options} = item
    if (type === 'select') return (options.find((el) => el.value === value) || {}).label || ''
    return value || ''
  }
}
