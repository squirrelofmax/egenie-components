import React from 'react'
import ReactDataGrid from 'react-data-grid'
import {DraggableHeader} from 'react-data-grid-addons'
import { observer } from 'mobx-react'
import {Pagination, Layout, Loading} from 'element-react'

import '../../css/EgGrid/EgGrid.css'

/*
props属性
columns:定义表头,例如[{ key: 'num', name: '数量' },  { key: 'color', name: '颜色' }] 两列
rows:存放表体数据，例如 [{"num":"30","color": "白色"},{xx},{xx},{xx}]  4条数据 ，仅仅用于初始化
size:设置每页的行数，例如 5,只用于初始化
pageSizes:设置分页选项，例如[50,100, 200, 300,400, 20000]
total:总数据量
onPageChange:接收外界函数，在切换页码时调用，传给该函数两个参数--size,currentPage(改变后的页码)
onSizeChange:接收外界函数，在改变每页数据量的时候调用，传参size--改变后的size
treeField:树结构的字段
primaryKeyField:标识字段，用于树结构以及复选框选择列
treeSearchKeyField：树结构的查询字段
onOutCellExpand:树结构展开时查询数据
showCheckBox:是否展示复选框列,默认不显示
pagerSetting:分页器设置
hiddenRefresh：是否显示刷新按钮
hiddenReset ：是否显示重置按钮
hiddenPager:是否显示分页器
onRowsDeselected：取消勾选时触发,传参被取消勾选的行数据,eg.[row1]
onRowsSelected：勾选时触发，传参新勾选的行数据,eg.[row1,row2,...]
onSortAll:按照整体排序时的方法

onEgRowClick:点击获取字表信息接口
onEgRowSelectChange：选中行改变接口

this.cashSelectedRows:缓存选中的Rows
 */
const SelectedCountOfPager = observer(({store: {
    showCheckBox, hiddenReset, selectedKeyValues, resetAllSelectedRows
  }}) => {
  return (showCheckBox && !hiddenReset
      ? <div style={{fontSize: 11, lineHeight: '23px', marginTop: 3, marginLeft: 0, marginRight: 'auto', width: 110, fontWeight: 400, float: 'left'}}>
        已勾选
        <span style={{fontSize: 18, color: 'red', fontWeight: 700}}>{selectedKeyValues.length}</span>条
        <span style={{marginLeft: 4, color: 'rgb(57, 57, 57)', fontSize: 12, cursor: 'pointer'}} onClick={resetAllSelectedRows}>重置</span>
      </div>
      : null)
})

const PagationOfPager = observer(({store: {
    hiddenPager, pagerSetting, pageChange, sizeChange, total, pageSizes, _size, _currentPage
  }}) => {
  return (hiddenPager
    ? null
    : <Pagination style={{float: 'right', marginTop: 2, marginBottom: -10, fontWeight: 400}} layout={pagerSetting || 'total, sizes, prev, pager, next, jumper'}
      onCurrentChange={pageChange} total={total} pageSize={_size} onSizeChange={sizeChange} pageSizes={pageSizes.slice(0)} currentPage={_currentPage} />)
})

const Pager = observer(({store, store: {
    hiddenPager, hiddenRefresh, hiddenReset, showCheckBox, sumColumns, rows, _columns, onRefresh
  }}) => {
  return hiddenPager && hiddenRefresh && (hiddenReset || !showCheckBox) && !(sumColumns && sumColumns.length)
      ? null
      : (
        <Layout.Row key='egl-grid-pager-wrapper-layou-row' type='flex' justify='end'>
          <div key='egl-grid-pager-wrapper' style={{width: '100%', lineHeight: 2, fontWeight: 700, color: '#333'}}>
            <SelectedCountOfPager store={store} />
            {hiddenRefresh
              ? null
              : <div style={{float: 'right', fontSize: 13, cursor: 'pointer', marginTop: 5, fontWeight: 400}} onClick={onRefresh}><i className='fa fa-refresh' style={{color: '#13A0FF', marginRight: 5}} /><span >刷新</span></div>}
            <PagationOfPager store={store} />
            {sumColumns && sumColumns.length ? (<strong style={{color: '#333'}}><span style={{fontSize: 14}}>本页统计</span><span style={{marginLeft: 10, fontSize: 16, fontWeight: 400}}>|</span></strong>) : null}
            {sumColumns && sumColumns.length
              ? sumColumns.reduce((res, columnKey) => {
                let item
                if (typeof columnKey === 'object') { item = _columns.find(el => el.key === columnKey.key) } else { item = _columns.find(el => el.key === columnKey) }
                if (!item) return res
                const label = (<label key={item ? item.name : ''} style={{marginTop: 2, marginLeft: 10, marginRight: 5}}>{item ? item.name : ''}</label>)
                let value
                if (typeof columnKey === 'object') {
                  value = rows.reduce((res, row) => {
                    return res + columnKey.rule(row)
                  }, 0)
                } else {
                  value = rows.reduce((res, row) => {
                    return res + Number(row[columnKey] || 0)
                  }, 0)
                }
                return res.concat([label, parseInt(value)])
              }, [])
              : null
            }
          </div>
        </Layout.Row>
      )
})

const EgGrid = observer((props) => {
    // console.log('EgGrid进行渲染render()',this.state.selectedKeyValues)
  const {
      _class,
      columns,
    _columns,
      // rows,
      // size,
      // total,
      // pageSizes,
      // currentPage,
      // expanded,
      // treeCash,
      selectedKeyValues,
      // cashSelectedRows,

      // treeField,//树结构的字段
      primaryKeyField, // 标识字段，用于树结构以及复选框选择列
      // treeSearchKeyField,//树结构的查询字段
      loading,
      showCheckBox, // 是否展示复选框列,默认不显示
      // pagerSetting,//分页器设置
      // hiddenRefresh,//是否隐藏刷新按钮
      // hiddenReset,//是否隐藏重置按钮
      // hiddenPager,//是否隐藏分页器
      // sumColumns,
      // refreshWhenRowsSelectChange,
      // cashOn,
      sortAll,

      RowRenderer,
      // function
      setWrapperRef,
      // pageChange,
      // sizeChange,
      handleHeaderDrop,
      handleGridSort,
      handleGridSortAll,
      getSubRowDetails,
      onCellExpand,
      // updateSubRowDetails,
      handleRowsSelected,
      handleRowsDeselected,
      onRowClick,
      // onRefresh,
      rowGetter,
      rowsCount
      // resetAllSelectedRows,
    } = props.store
  const {style = {}} = props
  return (
    <Loading className={'grid-loading' + (_class ? ' ' + _class : '')}loading={loading} style={{display: 'flex', height: '100%', flexFlow: 'column nowrap', ...style}}>
      <div key='1' className='EgGrid' ref={setWrapperRef}>
        <DraggableHeader.DraggableContainer key='1' onHeaderDrop={handleHeaderDrop}>
          <ReactDataGrid columns={_columns.slice(0)} rowGetter={rowGetter} rowsCount={rowsCount} onGridSort={sortAll ? handleGridSortAll : handleGridSort}
            getSubRowDetails={getSubRowDetails} onCellExpand={onCellExpand} rowSelection={{
              showCheckbox: !!showCheckBox,
              enableShiftSelect: true,
              onRowsSelected: handleRowsSelected,
              onRowsDeselected: handleRowsDeselected,
              selectBy: {
                keys: {
                  rowKey: primaryKeyField,
                  values: selectedKeyValues.slice(0)
                }
              }
            }} onRowClick={onRowClick} rowRenderer={RowRenderer} />
        </DraggableHeader.DraggableContainer>
        <Pager key='2' store={props.store} />
      </div>
      <div key='2' style={{flex: '0 0 8px'}} />
    </Loading>
  )
})

export default EgGrid
