'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComputedValueFormatter = exports.MultiSelectFormatter = exports.TreeFormatter = exports.getTreeOptions = exports.getMapOfFieldToEditedCellModel = exports.SelectFormatter = exports.NumberFormatter = exports.DatePickerFormatter = exports.InputFormatter = undefined;

require('../../../css/EgGrid/EditedCellFormatter/index.css');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _model = require('./model');

var _InputFormatter = require('./InputFormatter');

var _InputFormatter2 = _interopRequireDefault(_InputFormatter);

var _NumberFormatter = require('./NumberFormatter');

var _NumberFormatter2 = _interopRequireDefault(_NumberFormatter);

var _DatePickerFormatter = require('./DatePickerFormatter');

var _DatePickerFormatter2 = _interopRequireDefault(_DatePickerFormatter);

var _SelectFormatter = require('./SelectFormatter');

var _SelectFormatter2 = _interopRequireDefault(_SelectFormatter);

var _MultiSelectFormatter = require('./MultiSelectFormatter');

var _MultiSelectFormatter2 = _interopRequireDefault(_MultiSelectFormatter);

var _TreeFormatter = require('./TreeFormatter');

var _TreeFormatter2 = _interopRequireDefault(_TreeFormatter);

var _ComputedValueFormatter = require('./ComputedValueFormatter');

var _ComputedValueFormatter2 = _interopRequireDefault(_ComputedValueFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)('#root').on('focus', '.ejl-grid-cell--editable', function (e) {
  e.stopPropagation();
}).on('dblclick', '.ejl-grid-cell--editable', function (e) {
  e.stopPropagation();
}).on('click', '.ejl-grid-cell--editable', function (e) {
  // if ($(e.target).hasClass('el-icon-close')) return // 否则不能清空
  // e.stopPropagation()
  var $ele = (0, _jquery2.default)(e.target);
  setTimeout(function () {
    return $ele.focus();
  }, 0);
}).on('keyup', '.ejl-grid-cell--editable .el-input__inner', function (e) {
  e.stopPropagation();
  if (e.keyCode == 13) (0, _jquery2.default)(this).blur();
}).on('click', '.ejl-grid-cell__select .el-select,.ejl-grid-cell__select .el-cascader', function (e) {
  var _this = this;

  (0, _jquery2.default)(this).closest('.react-grid-Cell').addClass('editing');
  setTimeout(function () {
    return (0, _jquery2.default)(_this).focus();
  }, 0);
});

exports.InputFormatter = _InputFormatter2.default;
exports.DatePickerFormatter = _DatePickerFormatter2.default;
exports.NumberFormatter = _NumberFormatter2.default;
exports.SelectFormatter = _SelectFormatter2.default;
exports.getMapOfFieldToEditedCellModel = _model.getMapOfFieldToEditedCellModel;
exports.getTreeOptions = _model.getTreeOptions;
exports.TreeFormatter = _TreeFormatter2.default;
exports.MultiSelectFormatter = _MultiSelectFormatter2.default;
exports.ComputedValueFormatter = _ComputedValueFormatter2.default;