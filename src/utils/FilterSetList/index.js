// 框架
import React, {Component} from 'react'
import {Tabs, Button} from 'element-react'
import { observer } from 'mobx-react'
// import DevTools from 'mobx-react-devtools'
// 请求

// 模块
import FilterSet from './FilterSet'

const TabsLabel = observer(({name, onDelete}) => (
  <span>
    {name}
    <Button icon='delete2' style={{marginLeft: '5px'}} type='text' size='mini' onClick={(e) => {
      e.stopPropagation()
      onDelete(name)
    }} />
  </span>
))

const FilterSetList = observer(class FilterSetList extends Component {
  render () {
    const {
      activeTabName, onTabsClick, tabsFlag: { inited }, filterSetList, deleteFilterSet
    } = this.props.store
    const {_class} = this.props
    return (
      <div className={'filterset-top-container' + (_class ? ' ' + _class : '')}>
        {/* <DevTools /> */}
        <Tabs activeName={activeTabName} type='border-card' onTabClick={onTabsClick}>
          {filterSetList.map((filterset) => {
            const { name, sysSetting, tabLabel } = filterset
            return (
              <Tabs.Pane label={sysSetting ? (tabLabel || name) : <TabsLabel name={name} onDelete={deleteFilterSet.bind(this, name)} />} name={name} key={name}>
                {inited[name]
                ? (<FilterSet store={filterset} />)
                : null}
              </Tabs.Pane>
            )
          })}
        </Tabs>
      </div>
    )
  }
  componentDidMount () {
    // this.props.store.cursorFilterSetModel.handleSearch()
    // this.props.store.isReport && this.props.store.cursorFilterSetModel.reportListModel.cursorTabModel.querySumCards()
  }
})

export default FilterSetList
