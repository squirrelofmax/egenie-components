import React from 'react'
import ReactDataGrid from 'react-data-grid'
import { extendObservable, action, intercept, observable, set, autorun } from 'mobx'
import { getMapOfFieldToEditedCellModel } from './EditedCellFormatter'
import { observer } from 'mobx-react'
import shortid from 'shortid'
import { getUser, getColumnsConfig, saveColumnsConfig, cache } from './requests'
// model

/*
api:{
  onPageChange,onSizeChange,onSortAll,onRowClick,onRefresh
}
*/
export default class EgGridModel {
  constructor ({ columns, interceptorOfRows, user = getUser, getDisplayRows, getDisplayColumns, api = {}, parent = {}, ...options }) {
    this.api = api
    this.setRowRender()
    extendObservable(this, {
      parent,
      id: shortid.generate(),
      cache,
      user: '',
      _class: '', // 特殊样式的类
      columns: this.prevHandleColumns(columns),
      rows: [],
      size: 50,
      total: 0,
      cursorIdx: '',
      pageSizes: [10, 20, 50, 100, 200, 500, 1000],
      currentPage: 1,
      expanded: {},
      treeCash: {},
      selectedKeyValues: [],
      cashSelectedRows: [],
      cursorRow: {},
      treeField: '', // 树结构的字段
      primaryKeyField: '', // 标识字段，用于树结构以及复选框选择列
      treeSearchKeyField: '', // 树结构的查询字段
      loading: false,
      showCheckBox: false, // 是否展示复选框列,默认不显示
      pagerSetting: '', // 分页器设置
      hiddenRefresh: false, // 是否隐藏刷新按钮
      hiddenReset: false, // 是否隐藏重置按钮
      hiddenPager: false, // 是否隐藏分页器
      gridIdForColumnConfig: '',
      // 非state中的属性
      sumColumns: [],
      refreshWhenRowsSelectChange: false, // 貌似跟表格没关系，就算有关系，用mobx也可以省略之
      cashOn: false,
      sortAll: false,
      cacheColumnConfig: true,
      // ignoreCacheChange: true,
      wrapperRef: {},
      get _size () {
        return this.size ? Number(this.size) : 0
      },
      get _currentPage () {
        return this.currentPage ? Number(this.currentPage) : 0
      },
      get _rows () { // getDisplayRows是rows的转换规则，prevHandleRows是内置的预处理规则，主要用于转换树结构
        const { rows } = this
        if (!getDisplayRows) return this.prevHandleRows(rows)
        const ret = getDisplayRows(this.prevHandleRows(rows), rows)
        return ret// 传源rows的目的是在产生可编辑单元格的model时可以直接操作当前行
      },
      get rowsCount () {
        return this._rows.length
      },
      get _columns () {
        let ret = [
          {
            key: 'gridOrderNo',
            width: 50,
            name: '序号',
            locked: true,
            ejlHidden: false,
            ejlOriginalIndex: -1,
            ejlIndex: -1,
            formatter: ({ value }) => (<div style={{ marginLeft: -8, textAlign: 'center' }}>{value}</div>),
            getRowMetaData: row => row
          },
          ...this.columns
        ].filter(el => !el.ejlHidden)
        ret.sort((a, b) => {
          return a.ejlIndex - b.ejlIndex
        })
        if (getDisplayColumns) ret = getDisplayColumns(ret, this)
        return ret
      },
      get cacheKeyForColumnsConfig () {
        return this.user + '__' + this.gridIdForColumnConfig
      },
      ...(options || {})
    })

    intercept(this, 'columns', (change) => {
      change.newValue = this.prevHandleColumns(change.newValue)
      return change
    })

    interceptorOfRows = typeof interceptorOfRows === 'function' ? interceptorOfRows(this) : interceptorOfRows
    if (interceptorOfRows) {
      intercept(this, 'rows', (change) => {
        change.newValue = this.getMapOfFieldToEditedCellModel(change.newValue, interceptorOfRows)
        return change
      })
    }
    if (this.cacheColumnConfig) {
      this.getUser(user)
      autorun(this.updateColumnsWhenCacheChange)
    }
  }
  // 工具方法
  prevHandleRows = (rows) => {
    if (!rows || !rows.length) return []
    const { size, currentPage } = this
    rows = rows.map((el, index) => {
      el = { ...el }
      el.gridOrderNo = (currentPage - 1) * size + index + 1
      return el
    })
    if (!this.treeField) {
      return rows
    }
    const len = rows && rows.length
    const res = rows.map(function (el, i) {
      el.treeDepth = el.hasOwnProperty('treeDepth') ? el.treeDepth : 0
      el.siblingIndex = el.hasOwnProperty('siblingIndex') ? el.siblingIndex : i
      el.numberSiblings = el.hasOwnProperty('numberSiblings') ? el.numberSiblings : len
      el.children = (el.hasOwnProperty('children') || el.treeDepth) ? [{}] : el.children
      return el
    })
    return res
  }

  prevHandleColumns = (columns = []) => {
    if (!columns.length) return columns
    return columns.map((el, index) => {
      return { ejlHidden: false, ejlOriginalIndex: index, ejlIndex: index, ...el }
    })
  }

  rowGetter = (i) => {
    return this._rows[i]
  }

  setRowRender () {
    const that = this
    this.RowRenderer = observer(class RowRenderer extends React.Component {
      setScrollLeft (scrollBy) {
        // if you want freeze columns to work, you need to make sure you implement this as apass through
        this.row.setScrollLeft(scrollBy)
      };

      getRowStyle () {
        return {
          backgroundColor: this.getRowBackground()
        }
      };

      getRowBackground () {
        return this.props.idx === that.cursorIdx ? '#fee48d' : '#fff'
      };

      getClass () {
        return this.props.idx === that.cursorIdx ? 'eg-row-wrapper cursor' : 'eg-row-wrapper'
      }

      render () {
        // here we are just changing the style
        // but we could replace this with anything we liked, cards, images, etc
        // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
        return (<div className={this.getClass()} style={this.getRowStyle()}><ReactDataGrid.Row ref={node => (this.row = node)} {...this.props} /></div>)
      }
    })
  }

  // actions
  setWrapperRef = action((wrapperRef) => { this.wrapperRef = wrapperRef })
  pageChange = action((currentPage) => {
    this.resetCursorRow()
    const { size, api: { onPageChange } } = this
    this.showCheckBox && this.resetHeaderCheckBox() // 重置表头勾选框
    // pageChange与sizeChange不需要物理上reset，需要清空状态值expanded，这样渲染时自动就重置了
    // this.props.treeSearchKeyField&&this.resetTreeArrow();
    this.currentPage = currentPage
    this.expanded = {}// 重置树结构的展开/收缩状态
    if (onPageChange) {
      this.loading = true
      this.resetHeaderCheckBox()
      onPageChange({ currentPage, size })
    }
  })
  sizeChange = action((size) => {
    this.resetCursorRow()
    const { showCheckBox, resetHeaderCheckBox, api: { onSizeChange } } = this
    showCheckBox && resetHeaderCheckBox() // 重置表头勾选框
    this.currentPage = 1
    this.size = size
    this.expanded = {}// 重置树结构的展开/收缩状态
    if (onSizeChange) {
      this.loading = true
      this.resetHeaderCheckBox()
      onSizeChange({ currentPage: 1, size })
    }
  })
  handleHeaderDrop = action((source, target) => {
    if (source === target) return
    let copy = this.columns.slice(0)
    copy.sort((a, b) => {
      return a.ejlIndex - b.ejlIndex
    })
    const columnSourceIndex = copy.findIndex(i => i.key === source)
    const columnTargetIndex = copy.findIndex(i => i.key === target)
    copy[columnSourceIndex].ejlIndex = columnTargetIndex
    const indexChangeDirection = columnSourceIndex < columnTargetIndex ? -1 : 1
    const params = columnSourceIndex < columnTargetIndex ? [columnSourceIndex + 1, columnTargetIndex + 1] : [columnTargetIndex, columnSourceIndex]
    copy.slice(...params).forEach(el => {
      el.ejlIndex += indexChangeDirection
    })
    copy = this.columns.slice(0)// 只改ejlIndex，不更改数组顺序
    //  要先清空columns 再赋值，必须！涉及到了DraggableHeader组件
    this.columns = []
    setTimeout(action(() => (this.columns = copy)), 0)
    // 保存columnsConfig到后端以及localStorage
    if (!this.cacheColumnConfig) return
    let configObj = copy.reduce((res, column) => {
      const { ejlIndex, ejlOriginalIndex } = column
      if (ejlOriginalIndex !== ejlIndex) res[ejlOriginalIndex] = ejlIndex
      return res
    }, {})
    this.saveColumnsConfig(configObj)
  })

  saveColumnsConfig = action((config) => {
    const data = {
      cacheKey: this.cacheKeyForColumnsConfig,
      cacheValue: JSON.stringify(config)
    }
    saveColumnsConfig(data)
  })
  /* 排序相关 */
  handleGridSort = action((sortColumn, sortDirection) => {
    if (sortDirection === 'ASC') {
      this.defaultRows = this._rows.slice(0)
    }

    const topLevelRows = this.treeSearchKeyField
      ? this._rows.filter(function (el) { // 排除子节点
        return el.treeDepth === 0
      }).slice(0)
      : this._rows.slice(0)

    this.treeSearchKeyField && this.resetTreeArrow() // 物理重置树结构的箭头

    const comparer = (a, b) => {
      const res = Number(a[sortColumn]) - Number(b[sortColumn])
      if (Number.isNaN(res)) {
        a = a[sortColumn] ? a[sortColumn] + '' : ''
        b = b[sortColumn] ? b[sortColumn] + '' : ''
      }
      const ret = Number.isNaN(res) ? a.toLowerCase().localeCompare(b.toLowerCase()) : res
      if (sortDirection === 'ASC') { return ret }
      if (sortDirection === 'DESC') { return -ret }
    }

    const rows = sortDirection === 'NONE'
      ? this.defaultRows.slice(0)
      : topLevelRows.sort(comparer)

    this.rows = rows
    this.expanded = {}
    // setTimeout(() => { this.comp.forceUpdate() })// 树结构按钮都归位,TODO,需要强制刷新？如果需要，只能找Grid的Ref了
  })
  handleGridSortAll = action((sortColumn, sortDirection) => {
    const param = sortDirection === 'NONE' ? {} : { sidx: sortColumn, sord: sortDirection.toLowerCase() }
    this.api.onSortAll && this.api.onSortAll(param)
  })
  /* 树结构相关方法 */
  getSubRowDetails = action((rowItem) => {
    if (this.treeField) {
      const rowKeyValue = rowItem[this.primaryKeyField]
      let isExpanded = !!this.expanded[rowKeyValue]
      return { // 该节点的信息+其children，后者用假数据，只为了保证展开按钮存在。信息貌似也没啥用处----Grid组件内部用
        group: rowItem.children && rowItem.children.length > 0, // 这个貌似真没用，也许是供外部读取的数据，是不是叶子节点的标记，不过完全不影响展开按钮的存在。
        // 研究发现，在有children属性时group没用，否则group就决定了展开按钮的存在与否，完全可以
        expanded: isExpanded, // 保证了重新渲染的时候展开按钮的状态会保持
        children: rowItem.children, // 固定值[{}]会造成，子节点也可展开，现在的情况是props改变的都赋值了[{}]，state改变的row都没，所以子节点没有展开按钮
        field: this.treeField,
        treeDepth: rowItem.treeDepth || 0, // 后三项用于形成树形结构，如果没有就失去了前边的结构线
        siblingIndex: rowItem.siblingIndex,
        numberSiblings: rowItem.numberSiblings
      }
    }
  })
  onCellExpand = action((args) => {
    const afterStep = function (subRows) {
      treeCash[treeSearchKeyValue] = subRows // 放到缓存中
      if (expanded && !expanded[rowKeyValue]) {
        expanded[rowKeyValue] = true
        rows.splice(rowIndex + 1, 0, ...subRows)
      } else if (expanded[rowKeyValue]) {
        expanded[rowKeyValue] = false
        rows.splice(rowIndex + 1, subRows.length)
      }
    }

    const defaultSubRows = [{}]
    const rows = this.rows
    const treeCash = this.treeCash
    const rowKeyValue = args.rowData[this.primaryKeyField]
    const treeSearchKeyValue = args.rowData[this.treeSearchKeyField]
    const rowIndex = rows.indexOf(args.rowData)
    const expanded = this.expanded
    // console.log(args, 'treeCash:', treeCash, 'rowKeyValue:', rowKeyValue, 'rowIndex:', rowIndex, 'expanded:', expanded, 'treeSearchKeyValue:', treeSearchKeyValue, '执行树结构展开/收缩操作')

    // 有缓存就取缓存，否则就从后端获取数据，如果外部没传相关方法，就返回空行
    treeCash.hasOwnProperty(treeSearchKeyValue)
      ? afterStep(treeCash[treeSearchKeyValue])
      : (!this.api.onOutCellExpand
        ? afterStep(defaultSubRows)
        : this.api.onOutCellExpand(args.rowData).then(v => {
          // console.log(v, '回到内部执行then方法')

          if (v && v.length && v.length > 1) { // 加工数据，赋值给children
            const afterUpdateSubRows = this.updateSubRowDetails(v, args.rowData.treeDepth, rowKeyValue)
            afterStep(afterUpdateSubRows)
          } else {
            afterStep(defaultSubRows)
          }
        }))
  })
  updateSubRowDetails = action((subRows, parentTreeDepth, rowKeyValue) => {
    let treeDepth = parentTreeDepth || 0
    subRows = subRows.filter(el => el[this.primaryKeyField] !== rowKeyValue, this)
    subRows.forEach((sr, i) => {
      sr.treeDepth = treeDepth + 1
      sr.siblingIndex = i
      sr.numberSiblings = subRows.length
    })
    return subRows
  })
  /* 勾选复选框相关方法 */
  handleRowsSelected = action((rows) => {
    const { primaryKeyField } = this
    if (this.cashOn) this.cashSelectedRows = this.cashSelectedRows.concat(rows.map(el => el.row))
    this.selectedKeyValues = this.selectedKeyValues.concat(rows.map(r => r.row[primaryKeyField]))
    this.api.onRowsSelected && this.api.onRowsSelected(rows)
    this.api.onEgRowSelectChange && this.api.onEgRowSelectChange(rows, 'select')// 与上一行接口重复了
  })
  handleRowsDeselected = action((rows) => { // 被取消选中的行
    // console.log(rows, '--rows,取消选中行')
    const { primaryKeyField } = this
    const rowKeyValues = rows.map(r => r.row[primaryKeyField])
    if (this.cashOn) this.cashSelectedRows = this.cashSelectedRows.filter(row => rowKeyValues.indexOf(row[primaryKeyField]) === -1)
    this.selectedKeyValues = this.selectedKeyValues.filter(v => rowKeyValues.indexOf(v) === -1)
    this.api.onRowsDeselected && this.api.onRowsDeselected(rows)
    this.api.onEgRowSelectChange && this.api.onEgRowSelectChange(rows, 'deselected')
  })
  /* 重置相关 */
  resetHeaderCheckBox = action(() => {
    const headerCheckBox = this.wrapperRef.querySelectorAll && this.wrapperRef.querySelectorAll('.react-grid-HeaderCell input[type="checkbox"')[0]
    if (headerCheckBox) { headerCheckBox.checked = false }
  })
  resetTreeArrow = action(() => {
    this.wrapperRef.querySelectorAll && this.wrapperRef.querySelectorAll('.rdg-cell-expand').forEach(function (el) {
      el.innerText = '▶'
    })
  })
  onRowClick = action((rowIdx, row) => {
    // console.log('EgGrid内部的onRowClick')
    if (~rowIdx) {
      this.beforeIdx = this.cursorIdx
      this.cursorIdx = rowIdx
      this.cursorRow = row
    }
    row && (this.beforeIdx !== this.cursorIdx) && this.triggerCursorRowClick()
  })
  onRefresh = action(() => {
    if (this.api.onRefresh) {
      this.loading = true
      // this.resetHeaderCheckBox()
      this.api.onRefresh()
    }
  })
  resetAllSelectedRows = action(() => {
    this.resetHeaderCheckBox()
    this.selectedKeyValues = []
    this.cashSelectedRows = []
    this.api.onEgRowSelectChange && this.api.onEgRowSelectChange()
  })

  resetCursorRow = action(() => {
    this.beforeIdx = this.cursorIdx
    this.cursorIdx = ''
    this.cursorRow = {}
    this.triggerCursorRowClick()
  })

  setCursorRowToFirst = action(() => {
    if (!(this.rows && this.rows.length)) return this.resetCursorRow()
    this.beforeIdx = this.cursorIdx
    this.cursorIdx = 0
    this.cursorRow = this.rows[0]
    this.triggerCursorRowClick()
  })

  triggerCursorRowClick = action(() => {
    this.api && this.api.onRowClick && this.api.onRowClick(this.cursorRow[this.primaryKeyField], this.cursorRow)
  })

  clearToOriginal = action(() => { // 主表清空字表
    set(this, {
      rows: [], total: 0, currentPage: 1, selectedKeyValues: [], cashSelectedRows: [], expanded: {}, treeCash: {}, cursorIdx: '', cursorRow: {}
    })
    this.resetHeaderCheckBox()
  })

  /**
   * utils
   */

  getMapOfFieldToEditedCellModel (sourceRows, { config, context }) {
    return observable((sourceRows || []).map((el, idx) => {
      if (el.hasOwnProperty('mapOfFieldToEditedCellModel')) return el
      el = observable(el)
      extendObservable(el, { mapOfFieldToEditedCellModel: {} })
      const mapOfFieldToEditedCellModel = getMapOfFieldToEditedCellModel(el, config, context)
      el.mapOfFieldToEditedCellModel = mapOfFieldToEditedCellModel
      return el
    }))
  }

  callbackAfterRefresh = action(({ add, edit, remove }) => {
    if (add) return this.gridModel.setCursorRowToFirst()
    if (edit) return this.gridModel.triggerCursorRowClick()
    if (remove) {
      const { cashSelectedRows, selectedKeyValues, primaryKeyField, cursorRow } = this.gridModel
      const id = cursorRow[primaryKeyField]
      const cashItem = cashSelectedRows.find(el => el[primaryKeyField] == id)
      cashItem && cashSelectedRows.remove(cashItem)
      const selectedId = selectedKeyValues.find(el => el == id)
      selectedId && selectedKeyValues.remove(selectedId)
      return this.gridModel.resetCursorRow()
    }
  })

  getUser = action((user) => {
    if (typeof user === 'function') {
      return Promise.resolve(user()).then(action(v => {
        if (!v) return
        this.user = v.username
      })).then(this.getColumnsConfig)
    }
    Promise.resolve(user).then(action(v => {
      this.user = v
    })).then(this.getColumnsConfig)
  })

  getColumnsConfig = action(() => { // 只会在页面初始化的时候调用
    getColumnsConfig(this.cacheKeyForColumnsConfig).then(action(v => {
      if (v.status !== 'Successful') return
      // this.ignoreCacheChange = true
      cache.setStorage({ cacheKey: this.cacheKeyForColumnsConfig, cacheValue: v.data || '{}' })
      if (!v.data) return
      // this.updateColumnsWhenCacheChange()
      this.updateColumns(v.data)
      const copy = this.columns.slice(0)
      this.columns = []
      setTimeout(action(() => { this.columns = copy }), 0)
    }))
  })

  updateColumnsWhenCacheChange = () => {
    // if (this.ignoreCacheChange) return (this.ignoreCacheChange = false)
    const columnsConfig = cache.value[this.cacheKeyForColumnsConfig]
    if (!columnsConfig) return
    this.updateColumns(columnsConfig)
  }

  updateColumns = (columnsConfig) => {
    if (!this.columns.length) return
    this.columns.forEach(el => {
      el.ejlIndex = el.ejlOriginalIndex
    })
    let params = {}
    params = this.parseJSON(columnsConfig)
    Object.entries(params).forEach(([key, value]) => {
      this.columns[key].ejlIndex = value
    })
  }

  parseJSON (str) {
    let ret
    try {
      ret = JSON.parse(str)
    } catch (e) {
      let temp, i, j, kv
      if (str.startsWith('[')) {
        try {
          str = str.slice(2, str.length - 2).split('},{')
          temp = []
          for (let i = 0, len = str.length; i < len; i++) {
            var item = str[i].split(','),
              obj = {}
            for (j = 0; j < item.length; j++) {
              kv = item[j].split(':')
              obj[kv[0]] = kv[1]
            }
            temp.push(obj)
          }
          ret = temp
        } catch (e) {
          ret = null
          console.warn('parseJSON 失败', str)
        }
      } else {
        try {
          str = str.slice(1, str.length - 1).split(',')
          temp = {}
          for (i = 0; i < str.length; i++) {
            kv = str[i].split(':')
            temp[kv[0]] = kv[1]
          }
          ret = temp
        } catch (e) {
          ret = null
          console.warn('parseJSON 失败', str)
        }
      }
    }
    for (let key in ret) {
      try {
        ret[key] = JSON.parse(ret[key])
      } catch (e) {
      }
    }
    return ret
  }
}
