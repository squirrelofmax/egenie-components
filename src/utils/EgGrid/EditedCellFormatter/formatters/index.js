import React from 'react'
import { observer } from 'mobx-react'

import InputFormatter from './InputFormatter'
import NumberFormatter from './NumberFormatter'
import DatePickerFormatter from './DatePickerFormatter'
import SelectFormatter from './SelectFormatter'
import MultiSelectFormatter from './MultiSelectFormatter'
import TreeFormatter from './TreeFormatter'
import ComputedValueFormatter from './ComputedValueFormatter'

const map = {
  'text': InputFormatter,
  'number': NumberFormatter,
  'date': DatePickerFormatter,
  'select': SelectFormatter,
  'multiSelect': MultiSelectFormatter,
  'tree': TreeFormatter,
  'calc': ComputedValueFormatter
}

const EditableCellFormatter = observer(({ store }) => {
  const type = store.type
  const Formatter = map[type] || InputFormatter
  return (<Formatter store={store} />)
})

export default EditableCellFormatter

export function getEditableCellFormatter (columnKey) {
  return function ({ dependentValues: { mapOfFieldToEditedCellModel } }) {
    return (<EditableCellFormatter store={mapOfFieldToEditedCellModel[columnKey]} />)
  }
}
