
import '../../../css/EgGrid/EditedCellFormatter/index.css'
import $ from 'jquery'
import { getMapOfFieldToEditedCellModel, getTreeOptions } from './model'
import InputFormatter from './InputFormatter'
import NumberFormatter from './NumberFormatter'
import DatePickerFormatter from './DatePickerFormatter'
import SelectFormatter from './SelectFormatter'
import MultiSelectFormatter from './MultiSelectFormatter'
import TreeFormatter from './TreeFormatter'
import ComputedValueFormatter from './ComputedValueFormatter'

$('#root').on('focus', '.ejl-grid-cell--editable', function (e) { e.stopPropagation() })
    .on('dblclick', '.ejl-grid-cell--editable', function (e) { e.stopPropagation() })
  .on('click', '.ejl-grid-cell--editable', function (e) {
      // if ($(e.target).hasClass('el-icon-close')) return // 否则不能清空
      // e.stopPropagation()
    var $ele = $(e.target)
    setTimeout(() => $ele.focus(), 0)
  })
    .on('keyup', '.ejl-grid-cell--editable .el-input__inner', function (e) {
      e.stopPropagation()
      if (e.keyCode == 13) $(this).blur()
    })
  .on('click', '.ejl-grid-cell__select .el-select,.ejl-grid-cell__select .el-cascader', function (e) {
    $(this).closest('.react-grid-Cell').addClass('editing')
    setTimeout(() => $(this).focus(), 0)
  })

export {
  InputFormatter, DatePickerFormatter, NumberFormatter, SelectFormatter,
  getMapOfFieldToEditedCellModel, getTreeOptions, TreeFormatter, MultiSelectFormatter, ComputedValueFormatter
}
