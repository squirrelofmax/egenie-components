import { extendObservable, action } from 'mobx'
import shortid from 'shortid'
// model
import ReportModel from './ReportModel'

export default class ReportListModel {
  constructor ({list, ...options}) {
    extendObservable(this, {
      id: shortid.generate(),
      top: {},
      activeTab: '',
      get cursorTabModel () {
        const {activeTab} = this
        return this.listModel.find(el => el.tab.value === activeTab)
      },
      tabsFlag: {
        inited: {},
        searched: {}
      },
      showOtherTabs: false, // 是否show第二行tabs
      sumCards: [], // sumCards的配置，它的值跟tab无关，只跟filteritems的查询条件有关
      listModel: [],
      ...(options || {})
    })

    this.setListModel(list)
  }

  onClickTab = action((tabValue) => {
    const { inited, searched } = this.tabsFlag
    // inited[tabValue]=true
    this.tabsFlag.inited = { ...inited, [tabValue]: true }
    this.activeTab = tabValue
    if (!searched[tabValue]) this.top.handleSearch()
  })

  toggleOtherTabs = action(() => {
    this.showOtherTabs = !this.showOtherTabs
  })

  setListModel = action((list) => {
    this.listModel = list.map(el => {
      return new ReportModel({ ...el, top: this.top, parent: this })
    }, this)
  })
}
