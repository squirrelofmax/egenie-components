import { extendObservable, action, autorun } from 'mobx'
import shortid from 'shortid'
// model
import FilterItemModel from './FilterItemModel'
import MorePanelModel from './MorePanelModel'
import OrderPanelModel from './OrderPanelModel'
import SubTableListModel from './SubTableListModel'
import ReportListModel from './ReportListModel'
import EgGridModel from '../../../EgGrid/EgGridModel'
import { Message, MessageBox } from 'element-react'

/**
 api:{
   queryData,saveFilterSet,onItemsChange
 }
*/
export default class FilterSetModel {
  constructor ({ api, grid = {}, subTables = {}, reportList = {}, filteritems = [], getButtons = () => [], ...options }) {
    this.api = api
    extendObservable(this, {
      isFirefox: ~navigator.userAgent.indexOf('Firefox'),
      parent: {},
      hiddenSubTables: false,
      subTablesModel: {},
      buttons: getButtons(this),
      get buttonsPassPermissionValidate () {
        if (!this.buttons.length) return this.buttons
        const {permissionOfButton} = this.parent
        const buttons = this.buttons.map((el, idx) => { // 给group按钮加idx属性
          const { group } = el
          if (!group) return {...el}
          const ret = { ...el, idx: 0 }
          ret.group = ret.group.map((el, index) => ({...el, idx: index + 1}))
          console.log('group的idx-------:', ret)
          return ret
        })
        if (permissionOfButton == null) return buttons// 没有权限控制，则全部显示
        return buttons.filter(el => {
          const {permissionId, group} = el
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
          const {display} = button
          if (!group) {
            if (group) return button // group留给下一步处理
            if (!display) return button
            if (typeof display !== 'function') return button // 如果没有display方法或者display不合法，那么就跟主按钮一起显隐
            return {...button, disabled: !display(cashSelectedRows)}
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
      name: 'def',
      setValue: '', // 用于设置查询方案的值
      displaySetting: '', // 用于设置查询方案的顺序与显隐
      foldModel: {// 用于控制dropline
        height: 300,
        foldFlag: false,
        fullScreen: false,
        subTableOldHeight: 0,
        onFold: action(() => {
          const {subTableOldHeight, foldFlag, height} = this.foldModel
          let nextHeight = subTableOldHeight
          if (!foldFlag) {
            nextHeight = 0
            this.foldModel.subTableOldHeight = height
          }
          this.foldModel.foldFlag = !this.foldModel.foldFlag
          this.foldModel.height = nextHeight
          setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
        }),
        dropLineRef: {},
        dragStartClintY: 0,
        setDropLineRef: action(item => {
          this.dropLineRef = item
          setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
        }),
        onDragStart: action((e) => {
          e.stopPropagation()
          this.foldModel.dragStartClintY = e.clientY
        }),
        onDragEnd: action((e) => {
          e.stopPropagation(); e.preventDefault(); console.log('结束', e.clientY)
          e = {...e}
          this.foldModel.height += this.foldModel.dragStartClintY - e.clientY
          setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
        }),
        toggleFullScreen: action(() => {
          this.foldModel.fullScreen = !this.foldModel.fullScreen
          setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
        })
      },
      edited: false, // filteritems是否在查询过后改变，目前只有在report中会用到。
      reportListModel: {},
      id: shortid.generate(),
      gridModel: {}, // subModel
      MorePanelModel: new MorePanelModel({top: this}),
      OrderPanelModel: new OrderPanelModel({top: this}),
      filteritems: [],
      history: {},
      sliceFromIndex: 0, // OrderPanel中filteritems.slice()要用到的，它的值value可以理解为前value个filteritem是固定的
      hiddenOrderButton: false,
      get searchData () {
        return this.filteritems.reduce((data, item) => {
          if (item.display) { data[item.field] = item.searchValue }
          return data
        }, {})
      },
      get changedFilterNumInMorePanel () {
        return this.filteritems.slice(10).reduce((count, item) => {
          if (item.display && item.value) {
            if (item.type === 'numbergroup') {
              (item.value.min || item.value.min === 0) && count++
              item.value.max && count++
            } else {
              count++
            }
          }
          return count
        }, 0)
      },
      get numOfDisplayFilterItems () {
        const idx = this.filteritems.findIndex(item => !item.display)
        return ~idx ? idx : this.filteritems.length
      },
      get dataForGenerateScheme () {
        const display_setting = {}
        const scheme_value = {}
        this.filteritems.forEach((el, index) => {
          display_setting[el.label] = {
            display_sequence: index,
            display_hidden: el.display
          }
          if (el.searchValue && !(el.type === 'numbergroup' && el.searchValue === ',')) {
            scheme_value[el.field] = el.searchValue
          }
        })
        return {display_setting: JSON.stringify(display_setting), scheme_value: JSON.stringify(scheme_value)}
      },
      ...(options || {})
    })
    this.setFilteritemsModel(filteritems)
    if (this.parent.isReport) {
      this.setReportListModel(reportList)
    } else {
      this.setGridModel(grid)
      this.setSubTablesModel(subTables)
    }
    // 给filteritems装配options
    this.assignFilterOptions()
    autorun(this.assignFilterOptions)
  }

  // 给filteritems装配options
  assignFilterOptions = () => { // 字典项都加载完毕后仍有必要，比如类似于省市区的变化
    const {_dict} = this.parent
    if (!_dict) return
    Object.keys(_dict).forEach(key => {
      const options = _dict[key]
      const item = this.filteritems.find(el => el.field === key)
      if (item) item.options = options
    })
  }

  getFilteritemByField=(field) => {
    return this.filteritems.find(el => el.field === field)
  }

  generateScheme = action(() => {
    MessageBox.prompt('请输入新方案名称', '生成查询方案', {}).then(({ value }) => {
      if (!value || /\s/.test(value)) return Message({ type: 'error', message: '名称不能有空格，请重试' })
      const data = this.dataForGenerateScheme
      data.scheme_name = value
      // console.log(data,JSON.stringify(data),'转换数据for保存')
      this.api.saveFilterSet && this.api.saveFilterSet(data).then(v => {
        // 前端直接添加
        this.parent.onAddNew && this.parent.onAddNew(data)
        if (v.status !== 'Successful') return Message.error(v.data)
        return Message.success('保存成功！')
      })
    })
  })

  handleSearch= action(() => {
    if (this.parent.isReport) {
      const { reportListModel: { cursorTabModel } } = this
      if (cursorTabModel) { cursorTabModel.onSearch() }
      return
    }
    this.gridModel.resetHeaderCheckBox() // 重置表头的勾选框
    const data = this.searchData
    /// /console.log(data, '点击搜索')
    const page = '1'
    const { pageSize = '50', sidx, sord } = this.history
    this.queryDataAndSetState({ cond: data, page, pageSize, sidx, sord })
    // 操作EgGrid，设置页码为1，清空勾选数据,重置树表的expanded状态
    // this.gridModel.currentPage = 1
    this.gridModel.selectedKeyValues = []
    this.gridModel.expanded = {}
    this.gridModel.cashSelectedRows = []
  })

  queryDataAndSetState= action((data) => {
    this.gridModel.loading = true
    this.history = {...data}
    this.api.queryData && this.api.queryData(data, this).then(action(v => {
      this.gridModel.loading = false
      this.gridModel.currentPage = data.page
      this.gridModel.size = data.pageSize
      if (v.status !== 'Successful') {
        this.gridModel.rows = []
        this.gridModel.total = 0
        return Message.error(v.data)
      }
      this.gridModel.rows = v.data.list
      this.gridModel.total = v.data.totalCount
    }))
  })

  prevHandleDataFromInner= action((innerState) => {
    const history = this.history
    const data = Object.assign({}, history)
    data.page = innerState.currentPage + ''
    data.pageSize = innerState.size + ''
    return data
  })

  handlePageOrSizeChange= action((innerState) => {
    const data = this.prevHandleDataFromInner(innerState)
    this.queryDataAndSetState(data)
  })

  onRefresh= action(() => {
    const data = this.history
    this.queryDataAndSetState(data)
  })

  onSortAll= action(({ sidx, sord }) => {
    const data = { ...this.history, sidx, sord }
    this.queryDataAndSetState(data)
  })

  onRowClick= action((id, row) => { // 一般用id就可以，特殊需求就用第二个参数row
    const { activeTab, listModel, tabsFlag } = this.subTablesModel
    tabsFlag.searched = {}// 能进来说明点击的是不同行，所以清空searchFlag
    const table = listModel.find(el => el.tab.value === activeTab)
    if (table) table.onSearch()
  })

  /* 设置model */
  setGridModel= action((grid) => {
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

  setFilteritemsModel = action((filteritems) => {
    const setModel = this
    let ret = filteritems

    if (this.setValue) {
      console.log('执行到设置setValue这一步', this.setValue)
      const setValue = JSON.parse(this.setValue)
      Object.keys(setValue).forEach(field => {
        const item = ret.find(el => el.field === field)
        if (!item) return
        item.value = setValue[field]
      })
    }

    if (this.displaySetting) {
      console.log('执行到设置displaySetting这一步', this.displaySetting)
      const displaySetting = JSON.parse(this.displaySetting)
      Object.keys(displaySetting).forEach(label => {
        const item = ret.find(el => el.label === label)
        if (!item) return
        item.orginalIndex = item.initIndex = displaySetting[label].display_sequence
        item.display = displaySetting[label].display_hidden
      })
      ret.sort((a, b) => {
        return Number(a.initIndex) - Number(b.initIndex)
      })
    }

    this.filteritems = ret.map((item, index) => new FilterItemModel({
      initIndex: index, originalIndex: index, ...item, top: setModel, initValue: item.value
    }))
  })

  setSubTablesModel = action((subTables) => {
    this.subTablesModel = new SubTableListModel({ ...subTables, top: this })
  })

  setReportListModel = action((reportList) => {
    this.reportListModel = new ReportListModel({ ...reportList, top: this })
  })

  reset = action(() => {
    this.filteritems.forEach(item => {
      item.value = item.initValue
    })
  })
}
