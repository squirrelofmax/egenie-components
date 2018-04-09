// 框架
import React, {Component} from 'react'
import { Button, Badge, Dropdown, Icon, Input, Select } from 'element-react'
import { observer } from 'mobx-react'
// 请求

// 模块
import EgGrid from '@/utils/EgGrid/EgGridMobx'
import FilterGroup from './partials/FilterGroup'
import MoreFilterPanel from './partials/MoreFilterPanel'
import OrderPanel from './partials/OrderPanel/OrderPanel'

// 关联页面
// 样式
import '@/css/FilterSetList/FilterSet/index.css'

const ButtonsOfSubTable = observer(({store, store: {
  _buttons
} }) => {
  if (!_buttons.length) return null
  return (<div className='filterset__subtable__header' style={{
    position: 'absolute',
    top: -37,
    left: 140,
    display: 'flex',
    height: 26,
    alignItems: 'center' }}>
    {_buttons.map((el, index) => {
      const { group } = el
      return group
        ? (<Dropdown key={index} style={{ marginRight: 10 }} onCommand={idx => group.find(el => String(el.idx) === idx).handleClick()} menu={(
          <Dropdown.Menu>
            {group.map((item) => (<Dropdown.Item key={item.idx} disabled={item.disabled} style={{ fontSize: 12 }} command={item.idx + ''}>{el.icon ? <i className={el.icon} style={{ marginRight: 3 }} /> : null}{item.text}</Dropdown.Item>))}
          </Dropdown.Menu>
        )}>
          <Button type='plain' size='small' onClick={el.handleClick.bind(store)} key={index} disabled={el.disabled} >
            {el.icon ? <i className={el.icon} style={{ marginRight: 3, color: '#20A0FF' }} /> : null}{el.text}<i className='el-icon-caret-bottom el-icon--right' />
          </Button>
        </Dropdown>)
        : (
          <Button disabled={el.disabled} size='small' onClick={el.handleClick.bind(store)} key={index}
            style={{}}>{el.icon ? <i className={el.icon} style={{ marginRight: 3, color: '#20A0FF' }} /> : null}{el.text}</Button>
        )
    })}
  </div>)
})

const FilterItemsOfSubTable = observer(({ store: {
  filteritems, onFilterValueChange, onSearch,
  allFilteritemsInOneGroup, clearAfterChangeFilteritem, cursorFilteritem, onCursorFilteritemFieldChange,
  numOfHasValue, getDisplayValueOfFilteritem
} }) => {
  return filteritems.length ? <div className='right-corner' style={{
    position: 'absolute',
    top: -37,
    right: 0,
    display: 'flex',
    height: 26,
    width: 420,
    alignItems: 'center'
  }}>
    {allFilteritemsInOneGroup
      ? [
        <Badge key='1' style={{ flex: '0 0 180px', marginRight: 10 }} className={numOfHasValue ? '' : 'count0'} value={numOfHasValue} >
          <Select size='small' style={{ width: '100%' }} value={cursorFilteritem ? cursorFilteritem.field : ''} onChange={onCursorFilteritemFieldChange}>
            {filteritems.map(el => <Select.Option key={el.field} label={el.label} value={el.field}>
              <span style={{ float: 'left', fontSize: 11 }}>{el.label}</span>
              <span style={{ float: 'right', color: '#ff4949', fontSize: 11, maxWidth: 100, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {getDisplayValueOfFilteritem(el)}
              </span>
            </Select.Option>)}
          </Select>
        </Badge>,
        (cursorFilteritem && cursorFilteritem.type === 'select'
          ? <Select key='2' clearable size='small' style={{ marginRight: 10, flex: 'auto' }} value={cursorFilteritem.value} onChange={onFilterValueChange.bind(this, null)}>
            {cursorFilteritem.options.map(el => <Select.Option key={el.value} label={el.label} value={el.value} />)}
          </Select>
          : <Input key='2' size='small' style={{ marginRight: 10 }} value={cursorFilteritem ? cursorFilteritem.value : ''} onChange={onFilterValueChange.bind(this, null)} />)
      ]
      : filteritems.map((el, index) => {
        const { label, field, type, value, options } = el
        return (<label style={{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center', marginRight: 10, width: 170 }}>
          {label + ':'}
          {type === 'select'
            ? <Select key={index} clearable size='small' style={{ marginRight: 10, flex: 'auto' }} value={value} onChange={onFilterValueChange.bind(this, field)}>
              {options.map(el => <Select.Option key={el.value} label={el.label} value={el.value} />)}
            </Select>
            : <Input key={index} size='small' style={{ marginRight: 10 }} value={value} onChange={onFilterValueChange.bind(this, field)} />
          }
        </label>)
      })}
    <Button size='mini' icon='search' onClick={onSearch}>查询</Button>
  </div> : null
})

const SubTable = observer(({ activeTab, store, store: {
  tab: {value}, gridModel, isInited, isCursor
}}) => {
  return isInited ? (<div className={'tab-content__detail ' + value} style={{position: 'relative',
    height: '100%',
    flexFlow: 'column nowrap',
    margin: '10px 18px 0',
    display: isCursor ? 'flex' : 'none'}}>

    <EgGrid store={gridModel} />

    <FilterItemsOfSubTable store={store} />
    <ButtonsOfSubTable store={store} />
  </div>) : null
})

const ButtonHeader = observer(({store, store: {
  _buttons, foldModel: {fullScreen}
}}) => {
  return (<div className='header' style={{display: fullScreen ? 'none' : ''}}>
    {_buttons.map((el, index) => {
      const {group} = el
      return group
        ? (<Dropdown key={index} style={{marginRight: 10}} onCommand={idx => group.find(el => String(el.idx) === idx).handleClick()} menu={(
          <Dropdown.Menu>
            {group.map((item) => (<Dropdown.Item key={item.idx} disabled={item.disabled} style={{ fontSize: 12 }} command={item.idx + ''}>{el.icon ? <i className={el.icon} style={{ marginRight: 3 }} /> : null}{item.text}</Dropdown.Item>))}
          </Dropdown.Menu>
        )}>
          <Button type='plain' size='small' onClick={el.handleClick.bind(store)} key={index} disabled={el.disabled} >
            {el.icon ? <i className={el.icon} style={{ marginRight: 3, color: '#20A0FF' }} /> : null}{el.text}<i className='el-icon-caret-bottom el-icon--right' />
          </Button>
        </Dropdown>)
        : (
          <Button disabled={el.disabled} size='small' onClick={el.handleClick.bind(store)} key={index}
            style={{}}>{el.icon ? <i className={el.icon} style={{ marginRight: 3, color: '#20A0FF' }} /> : null}{el.text}</Button>
        )
    })}
  </div>)
})

const ButtonHeaderOfReport = observer(({ store, store: {
  foldModel: { fullScreen }, reportListModel: { listModel }
} }) => {
  if (!listModel.length) return null
  return listModel.map(el => {
    const { isCursor, isInited, _buttons } = el
    const ret = _buttons.length && isInited
      ? (<div className='filterset__report__header' style={{ display: fullScreen ? 'none' : isCursor ? 'flex' : 'none', alignItems: 'center', padding: '0px 18px 5px', flexFlow: 'row nowrap', flex: '0 0 28px' }}>
        {_buttons.map((el, index) => {
          const { group } = el
          return group
              ? (<Dropdown key={index} style={{ marginRight: 10 }} onCommand={idx => group.find(el => String(el.idx) === idx).handleClick()} menu={(
                <Dropdown.Menu>
                  {group.map((item) => (<Dropdown.Item key={item.idx} disabled={item.disabled} style={{ fontSize: 12 }} command={item.idx + ''}>{el.icon ? <i className={el.icon} style={{ marginRight: 3 }} /> : null}{item.text}</Dropdown.Item>))}
                </Dropdown.Menu>
              )}>
                <Button type='plain' size='small' onClick={el.handleClick.bind(store)} key={index} disabled={el.disabled} >
                  {el.icon ? <i className={el.icon} style={{ marginRight: 3, color: '#20A0FF' }} /> : null}{el.text}<i className='el-icon-caret-bottom el-icon--right' />
                </Button>
              </Dropdown>)
              : (
                <Button disabled={el.disabled} size='small' onClick={el.handleClick.bind(store)} key={index}
                  style={{}}>{el.icon ? <i className={el.icon} style={{ marginRight: 3, color: '#20A0FF' }} /> : null}{el.text}</Button>
              )
        })}
      </div>)
       : null
    return ret
  })
})

const Filters = observer(({store, store: {
  isFirefox, handleSearch, reset, generateScheme, hiddenOrderButton, OrderPanelModel, MorePanelModel, numOfDisplayFilterItems, changedFilterNumInMorePanel, foldModel: {fullScreen}
}}) => {
  return (<div className='filtergroup-container' style={{display: fullScreen ? 'none' : ''}}>
    <div className='filtergroup-buttons-wrapper'>
      <Button icon='search' type='plain' size='small' className='btn-search' onClick={handleSearch}>查询</Button>
      <Button type='plain' size='small' className='btn-reset' onClick={reset}>重置</Button>
      <Button type='plain' size='small' className='btn-new' onClick={generateScheme}>生成方案</Button>
      <Badge style={{right: numOfDisplayFilterItems > 10 ? 0 : '-200px'}} className={changedFilterNumInMorePanel ? '' : 'count0'} value={changedFilterNumInMorePanel} >
        <Button type='plain' className='btn-more' icon={MorePanelModel.show ? 'arrow-up' : 'arrow-down'} size='small' onClick={MorePanelModel.toggleShow}>{MorePanelModel.show ? '收起' : '更多'}</Button>
      </Badge>
      {hiddenOrderButton ? null : <Button className='btn-order' type='plain' size='small' onClick={OrderPanelModel.toggleShow}>设置条件显示顺序</Button>}

    </div>
    <FilterGroup store={store} />
    <MoreFilterPanel store={store} />
    <OrderPanel store={store} />
  </div>)
})

const ToggleBtn = observer(({store: {
  foldFlag, fullScreen, onFold
}}) => {
  return (<div className='toggleBtn' style={{display: fullScreen ? 'none' : ''}}>
    <span className={'btn-wrapper' + (foldFlag ? ' fold' : '')} onClick={onFold}><Icon name='d-arrow-right' /></span>
  </div>)
})

const DropLine = observer(({store: {
 fullScreen, setDropLineRef, onDragStart, onDragEnd, foldFlag
}}) => {
  return (<div className='dropline' draggable ref={setDropLineRef}
    onDragStart={onDragStart} onDragEnd={onDragEnd} style={{display: fullScreen ? 'none' : ''}}>
    <div className='center-note' />
  </div>)
})

const SubContent = observer(({store: {
  foldModel: {fullScreen, height, toggleFullScreen}, subTablesModel
}}) => {
  const {activeTab, listModel, onClickTab} = subTablesModel
  return (<div className='subtable' style={{ flex: (fullScreen ? '1 1 ' : '1 0 ') + height + 'px' }}>
    <div className='detail-header'>
      <ul className='tabs'>
        {listModel.map(el => {
          const {
            tab: {name, value}
          } = el
          return (<li key={value} onClick={onClickTab.bind(this, value)}
            className={'tab' + (activeTab === value ? ' active' : '')}>{name}</li>)
        })}
      </ul>
      <i className={'fa tooltipstered fa-' + (fullScreen ? 'compress' : 'expand')} onClick={toggleFullScreen} />
    </div>
    <div className='tab-content' >
      {listModel.map(el => (<SubTable key={el.id} store={el} />))}
    </div>
  </div>)
})

const SubContentOfReport = observer(({store: {
  foldModel: {fullScreen, height, toggleFullScreen}, reportListModel
}}) => {
  return (<div className='subtable' style={{ flex: (fullScreen ? '1 1 ' : '1 0 ') + height + 'px' }}>
    <div className='detail-header'>
      {reportListModel.listModel.map(report => {
        const {id, isInited, isCursor, subTablesModel: {listModel, onClickTab, activeTab}} = report
        const ret = isInited ? <ul className='tabs' style={{display: isCursor ? '' : 'none'}} key={id}>
          {listModel.map(el => {
            const {
                tab: {name, value}
              } = el
            return (<li onClick={onClickTab.bind(this, value)} key={name}
              className={'tab' + (activeTab === value ? ' active' : '')}>{name}</li>)
          })}
        </ul>
          : null
        return ret
      })}
      <i className={'fa tooltipstered fa-' + (fullScreen ? 'compress' : 'expand')} onClick={toggleFullScreen} />
    </div>
    {reportListModel.listModel.map(report => {
      const {id, isInited, isCursor, subTablesModel: {listModel}} = report
      const ret = isInited ? <div className='tab-content' style={{display: isCursor ? '' : 'none'}} >
        {listModel.map(el => <SubTable store={el} key={id} />)}
      </div>
          : null
      return ret
    })}
  </div>)
})

const TabsHeaderOfReport = observer(({store: {
  foldModel: {fullScreen}, reportListModel: {listModel, onClickTab, showOtherTabs, toggleOtherTabs}, hiddenOrderButton
}}) => {
  return (fullScreen
    ? null
    : <div className={'filterset-report__tabs-container' + (showOtherTabs ? ' expand' : '') + (hiddenOrderButton ? '' : ' hasOrderBtn') + (listModel.length > 7 ? ' overMax' : '')} >
      <div className='filterset-report__tabs-wrapper' >
        {listModel.slice(0, 7).map(el => (<div key={el.id} className={`filterset-report__tabs-tab${el.isCursor ? ' current' : ''}`} onClick={onClickTab.bind(this, el.tab.value)} title={el.tab.name}>{el.tab.name}</div>))}
      </div>
      {listModel.length > 7
        ? <Button type='plain' className='filterset-report__btn-more' icon={showOtherTabs ? 'arrow-up' : 'arrow-down'} size='small' onClick={toggleOtherTabs}>{showOtherTabs ? '收起' : '更多'}</Button>
        : null
      }
      {listModel.length > 7
        ? <div className={'filterset-report__tabs-wrapper' + (showOtherTabs ? '' : ' hidden')} >
          {listModel.slice(7).map(el => (<div key={el.id} className={`filterset-report__tabs-tab${el.isCursor ? ' current' : ''}`} onClick={onClickTab.bind(this, el.tab.value)} title={el.tab.name}>{el.tab.name}</div>))}
        </div>
        : null
      }
    </div>)
})

const SumCardsOfReport = observer(({store: {
  foldModel: {fullScreen}, reportListModel: { listModel, onClickTab, sumCards }
}}) => {
  return (fullScreen
    ? null
    : sumCards && sumCards.length
      ? <div className='filterset-report__sumcards-wrappper'>
        {(sumCards || []).map(({label, field, ui, value}) => (<div className='filterset-report__sumcards-card' key={field}>
          <div className='left'>
            <div className='back' style={{backgroundColor: ui.color || '#4b56e1'}}>
              <i className={ui.icon || ''} />
            </div>
          </div>
          <div className='right'>
            <label>{label}</label>
            <p className='value' style={{color: ui.color || '#4b56e1'}}>{value || 0}</p>
          </div>
        </div>))}
      </div>
     : <div style={{flex: '0 0 5px'}} />
  )
})

const MainOfReport = observer(({store: {
  foldModel: {fullScreen}, reportListModel: {listModel}
}}) => {
  return (<div className='main' style={{display: fullScreen ? 'none' : '', height: '100%'}}>
    {listModel.map(el => {
      const {isCursor, isInited, gridModel} = el
      const ret = isInited ? <EgGrid store={gridModel} style={{display: isCursor ? 'flex' : 'none'}} /> : null
      return ret
    })}
  </div>)
})

const FilterSet = observer(class FilterSet extends Component {
  render () {
    const {hiddenSubTables} = this.props.store
    // report相关
    const {cursorTabModel} = this.props.store.reportListModel
    return (this.props.store.parent.isReport
        ? (<div className={'filterset-wrapper ' + this.props.store.name} ref='wrapper'>
          <Filters store={this.props.store} />
          <TabsHeaderOfReport store={this.props.store} />
          <SumCardsOfReport store={this.props.store} />
          <ButtonHeaderOfReport store={this.props.store} />
          <MainOfReport store={this.props.store} />
          {!cursorTabModel.hiddenSubTables ? <ToggleBtn store={this.props.store.foldModel} /> : null}
          {!cursorTabModel.hiddenSubTables ? <DropLine store={this.props.store.foldModel} /> : null}
          {!cursorTabModel.hiddenSubTables ? <SubContentOfReport store={this.props.store} /> : null}
        </div>)
        : (<div className={'filterset-wrapper ' + this.props.store.name} ref='wrapper'>
          <Filters store={this.props.store} />
          <ButtonHeader store={this.props.store} />
          <div className='main' style={{display: this.props.store.foldModel.fullScreen ? 'none' : '', height: '100%'}}>
            <EgGrid store={this.props.store.gridModel} />
          </div>
          {!hiddenSubTables ? <ToggleBtn store={this.props.store.foldModel} /> : null}
          {!hiddenSubTables ? <DropLine store={this.props.store.foldModel} /> : null}
          {!hiddenSubTables ? <SubContent store={this.props.store} /> : null}
        </div>)
    )
  }
})

export default FilterSet
