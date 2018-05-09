import { extendObservable, action, set } from 'mobx'
import shortid from 'shortid'
// model
import SubTableModel from './SubTableModel'

export default class SubTableListModel {
  constructor ({list = [], ...options}) {
    extendObservable(this, {
      id: shortid.generate(),
      activeTab: '',
      tabsFlag: {
        inited: {},
        searched: {}
      },
      list: [],
      listModel: [],
      top: {},
      get cursorTabModel () {
        return this.listModel.find(el => el.tab.value === this.activeTab)
      },
      ...(options || {})
    })
    this.setListModel(list)
  }

  onClickTab = action((tabName) => {
    this.activeTab = tabName
    const { tabsFlag: { inited, searched } } = this
    this.tabsFlag.inited = { ...inited, [tabName]: true }// 初始化开关开，查询开关由内部的subTableModel设置，只要查了就设置
    if (!searched[tabName]) { // 如果该页签在最近一次行点击后还未获取过数据，那么search
      if (this.cursorTabModel) this.cursorTabModel.onSearch()
    }
  })

  setListModel = action((list) => {
    this.listModel = list.map(el => {
      // const { grid: { getColumns, ...restOfGrid } } = el
      // const grid = { columns: getColumns(this.top), ...restOfGrid }
      return new SubTableModel({ ...el, parent: this, top: this.top })
    }, this)
  })

  resetWhenDeleteCursorRowOfMainGrid = action((id) => { // 供外部调用
    const { gridModel: { cursorRow, primaryKeyField } } = this.top
    if (id == null || id !== cursorRow[primaryKeyField]) return
    console.log('执行resetWhenDeleteCursorRowOfMainGrid')
    this.top.gridModel.cursorRow = {}
    this.top.gridModel.cursorIdx = ''
    this.listModel.forEach(el => {
      set(el.gridModel, {
        rows: [], total: 0, currentPage: 1, selectedKeyValues: [], cashSelectedRows: [], expanded: {}, treeCash: {}
      })
      el.gridModel.resetHeaderCheckBox()
    })
  })
}
