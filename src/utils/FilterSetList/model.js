import { extendObservable, action } from 'mobx'
import shortid from 'shortid'
import FilterSetModel from './FilterSet/models/FilterSetModel'
import { MessageBox } from 'element-react'

export default class FilterSetListModel {
  getConfigOver = false
  constructor () {
    extendObservable(this, {
      id: shortid.generate(),
      tabsFlag: {// 对tabs渲染的控制
        inited: { def: true },
        searched: {}
      },
      activeTabName: 'def',
      configOfFilterItems: [// 查询方案的配置，在filteritems的render中装配，不过在顶层获取配置数据有要做一定的解析，统一格式，才能保证在filteritems中装配成功
        {
          scheme_name: 'def',
          scheme_value: '',
          tab_label: '默认方案',
          display_setting: null,
          item_list: {},
          old_set: [],
          dict_list: {},
          sys_setting: true
        }
      ],
      permissionOfButton: null, // 按钮权限，从后台获取，目前只在非report页面有用
      get cursorFilterSetModel () {
        return this.filterSetList.find(el => el.name === this.activeTabName)
      }
    })

    Promise.resolve().then(v => {
      this.assignFilterSetList()
      this.cursorFilterSetModel.handleSearch()
      this.isReport && this.cursorFilterSetModel.reportListModel.cursorTabModel.querySumCards()
    })
  }

  onTabsClick = action((tab) => {
    console.log('执行tab点击事件，参数tab的值为：', tab)
    // 初始化要执行一遍查询
    if (!this.tabsFlag.inited[tab.props.name]) this.filterSetList.find(el => el.name === this.activeTabName).handleSearch()
    this.tabsFlag.inited = { ...this.tabsFlag.inited, [tab.props.name]: true }
    this.activeTabName = tab.props.name
  })
  // FilterSet生成方案后回调
  onAddNew = action((data) => {
    // this.configOfFilterItems = this.configOfFilterItems.concat([data])
    this.filterSetList = this.filterSetList.concat([this.getFilterSetModelByConfig(data)])
  })

  deleteFilterSet = action((name) => {
    console.log('执行删除方法，name：' + name)
    MessageBox.confirm('彻底删除后数据将无法恢复，您确定要删除吗？', '确认', { type: 'info' }).then(() => {
      // const idx = this.configOfFilterItems.findIndex(el => el.scheme_name === name)
      const idx = this.filterSetList.findIndex(el => el.name === name)
      if (~idx) {
        const middle = this.filterSetList.slice(0)
        middle.splice(idx, 1)
        this.filterSetList = middle
        this.api.deleteScheme(name) // TODO:需要在子类中设置
        this.activeTabName = 'def'
      }
    })
  })
  // 根据configOfFilterItems装配filterSetList
  assignFilterSetList = () => {
    const { configOfFilterItems, getConfigOver } = this
    this.filterSetList = getConfigOver ? this.filterSetList.concat(configOfFilterItems.slice(1).map(this.getFilterSetModelByConfig)) : configOfFilterItems.map(this.getFilterSetModelByConfig)
  }

  getFilterSetModelByConfig = ({ scheme_name, sys_setting, tab_label, scheme_value, display_setting }) => {
    return new FilterSetModel({
      ...this.getFilterSetConfig(), // TODO:需要在子类中设置
      name: scheme_name,
      setValue: scheme_value,
      displaySetting: display_setting,
      // 下面两个涉及到方案标题栏，还有上方的scheme_name
      sysSetting: sys_setting,
      tabLabel: tab_label
    })
  }
}
