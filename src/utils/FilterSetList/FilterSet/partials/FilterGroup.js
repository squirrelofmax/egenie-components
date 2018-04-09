import React from 'react'
import { observer } from 'mobx-react'

import FilterItem from './FilterItem'
import '../../../../css/FilterSetList/FilterSet/FilterGroup.css'

const FilterGroup = observer(({store: {filteritems}}) => {
  const children = filteritems.slice(0, 10).map((item, index) => (<FilterItem key={item.id} store={item} />))
  return (<div className='filtergroup-wrapper'> {children}</div>)
})

export default FilterGroup
