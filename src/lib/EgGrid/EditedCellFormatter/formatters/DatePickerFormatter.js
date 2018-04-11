'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elementReact = require('element-react');

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePickerFormatter = (0, _mobxReact.observer)(function (_ref) {
  var store = _ref.store,
      _ref$store = _ref.store,
      disabled = _ref$store.disabled,
      style = _ref$store.style,
      value = _ref$store.value,
      _class = _ref$store._class,
      handleCellBlur = _ref$store.handleCellBlur,
      handleCellValueChange = _ref$store.handleCellValueChange,
      disabledDate = _ref$store.disabledDate;

  return _react2.default.createElement(
    'div',
    { className: 'ejl-grid-cell--' + (disabled ? 'disabled' : 'editable') + (_class ? ' ' + _class : ''), style: (0, _extends3.default)({
        textAlign: 'left', padding: disabled ? '0px' : '10px 8px 10px 0px' }, style || {}) },
    disabled ? formatDateToStr(value) : _react2.default.createElement(_elementReact.DatePicker, { value: value ? (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' ? value : new Date(value) : null,
      onKeyDown: function onKeyDown(e) {
        e.stopPropagation();
      },
      format: 'yyyy-MM-dd HH:mm:ss', isShowTime: true, disabledDate: disabledDate,
      onChange: function onChange(v) {
        var stop = handleCellValueChange(v);
        if (!stop) handleCellBlur();
      }
    })
  );
}); // 框架
exports.default = DatePickerFormatter;


function formatDateToStr(ts) {
  if (!ts) {
    return '';
  }
  if (typeof ts === 'string') {
    return ts;
  }
  var d = (typeof ts === 'undefined' ? 'undefined' : (0, _typeof3.default)(ts)) === 'object' ? ts : new Date(ts);
  var ydm = [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(function (el) {
    return String(el).padStart(2, 0);
  }).join('-');
  var hms = [d.getHours(), d.getMinutes(), d.getSeconds()].map(function (el) {
    return String(el).padStart(2, 0);
  }).join(':');
  return ydm + ' ' + hms;
}