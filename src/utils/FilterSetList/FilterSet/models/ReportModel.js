import { extendObservable, action } from 'mobx'
import shortid from 'shortid'
// model
import SubTableListModel from './SubTableListModel'
import EgGridModel from '@/utils/EgGrid/EgGridModel'
import { Message } from 'element-react'
/**
api:{
  queryData,querySumCards
}
 */
export default class ReportModel {
  constructor ({ getButtons = () => [], grid, subTables, ...options }) {
    extendObservable(this, {
      parent: {},
      top: {},
      tab: {name: '', value: ''},
      hiddenSubTables: false,
      id: shortid.generate(),
      subTablesModel: {},
      gridModel: {},
      history: {cond: {}},
      buttons: getButtons(this),
      get buttonsPassPermissionValidate () {
        if (!this.buttons.length) return this.buttons
        const { permissionOfButton } = this.top.parent
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
      get searchData () {
        return this.top.searchData
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
      ...(options || {})
    })

    this.setGridModel(grid)
    this.setSubTablesModel(subTables)
  }

  onSearch = action(() => {
    this.gridModel.resetHeaderCheckBox() // 重置表头的勾选框
    this.gridModel.loading = true
    const data = this.searchData
    /// /console.log(data, '点击搜索')
    const page = '1'
    const { pageSize = '50', sidx, sord } = this.history
    if (this.top.edited && this.parent.sumCards && this.parent.sumCards.length) this.querySumCards()
    this.queryDataAndSetState({ cond: data, page, pageSize, sidx, sord }, true)
    // 操作EgGrid，设置页码为1，清空勾选数据,重置树表的expanded状态
    // this.gridModel.currentPage = 1
    this.gridModel.selectedKeyValues = []
    this.gridModel.expanded = {}
    this.gridModel.cashSelectedRows = []
  })
  queryDataAndSetState = action((data, isSearch) => {
    const tabValue = this.tab.value
    const _data = JSON.parse(JSON.stringify(data))
    this.api.queryData && this.api.queryData(_data, tabValue, this).then(action(v => {
      if (isSearch) { // 点击查询才会恢复edited状态
        if (this.top.edited) { // 条件修改过那么清空searched，edited恢复false
          this.parent.tabsFlag.searched = {}
          this.top.edited = false
        }
        this.parent.tabsFlag.searched = { ...this.parent.tabsFlag.searched, [tabValue]: true }
      }
      this.gridModel.loading = false
      this.top.history = data
      this.gridModel.currentPage = data.page
      this.gridModel.size = data.pageSize
      if (v.status !== 'Successful') {
        this.gridModel.rows = []
        this.gridModel.total = 0
        return Message.error(v.data)
      }
      this.gridModel.rows = v.data ? v.data.list : []
      this.gridModel.total = v.data ? v.data.totalCount : 0
    }))
  })
  prevHandleDataFromInner = action((innerState) => {
    const history = this.top.history
    const data = Object.assign({}, history)
    data.page = innerState.currentPage + ''
    data.pageSize = innerState.size + ''
    return data
  })
  handlePageOrSizeChange = action((innerState) => {
    const data = this.prevHandleDataFromInner(innerState)
    this.queryDataAndSetState(data)
  })
  querySumCards = action(() => {
    this.api.querySumCards && this.api.querySumCards(this.searchData).then(action(sumData => {
      if (sumData.status !== 'Successful') return Message.error(sumData.data)
      const { sumCards } = this.parent
      Object.keys(sumData.data).forEach(action(key => {
        const item = sumCards.find(el => el.field === key)
        if (item) item.value = sumData.data[key]
      }))
    }))
  })
  onRefresh = action(() => {
    const data = this.top.history
    this.queryDataAndSetState(data)
  })
  onSortAll = action(({ sidx, sord }) => {
    const data = { ...this.history, sidx, sord }
    this.queryDataAndSetState(data)
  })
  onRowClick = action((id, row) => { // 一般用id就可以，特殊需求就用第二个参数row
    const { cursorTabModel, tabsFlag } = this.subTablesModel
    tabsFlag.searched = {}// 能进来说明点击的是不同行，所以清空searchFlag
    cursorTabModel && cursorTabModel.onSearch()
  })
  /* 设置model */
  setGridModel = action((grid) => {
    const {
          handlePageOrSizeChange, onSortAll, onRowClick, onRefresh
        } = this
    // 配置
    this.gridModel = new EgGridModel({
      ...grid,
      columns: grid.getColumns(this),
      api: {
        onPageChange: handlePageOrSizeChange,
        onSizeChange: handlePageOrSizeChange,
        onSortAll, // 排序
        onRowClick, // 行点击
        onRefresh
      }
    })
  })
  setSubTablesModel = action((subTables) => {
    this.subTablesModel = new SubTableListModel({ ...subTables, top: this })
  })
}
