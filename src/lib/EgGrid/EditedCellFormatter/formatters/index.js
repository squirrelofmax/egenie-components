'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEditableCellFormatter = getEditableCellFormatter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

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

var map = {
  'text': _InputFormatter2.default,
  'number': _NumberFormatter2.default,
  'date': _DatePickerFormatter2.default,
  'select': _SelectFormatter2.default,
  'multiSelect': _MultiSelectFormatter2.default,
  'tree': _TreeFormatter2.default,
  'calc': _ComputedValueFormatter2.default
};

var EditableCellFormatter = (0, _mobxReact.observer)(function (_ref) {
  var store = _ref.store;

  var type = store.type;
  var Formatter = map[type] || _InputFormatter2.default;
  return _react2.default.createElement(Formatter, { store: store });
});

exports.default = EditableCellFormatter;
function getEditableCellFormatter(columnKey) {
  return function (_ref2) {
    var mapOfFieldToEditedCellModel = _ref2.dependentValues.mapOfFieldToEditedCellModel;

    return _react2.default.createElement(EditableCellFormatter, { store: mapOfFieldToEditedCellModel[columnKey] });
  };
}