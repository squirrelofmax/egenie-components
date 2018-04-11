'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elementReact = require('element-react');

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// InputNumber组件的onBlur方法没有用
var NumberFormatter = (0, _mobxReact.observer)(function (_ref) {
  var store = _ref.store,
      _ref$store = _ref.store,
      disabled = _ref$store.disabled,
      style = _ref$store.style,
      value = _ref$store.value,
      min = _ref$store.min,
      max = _ref$store.max,
      step = _ref$store.step,
      unit = _ref$store.unit,
      _class = _ref$store._class,
      handleCellBlur = _ref$store.handleCellBlur,
      handleCellValueChange = _ref$store.handleCellValueChange;

  return _react2.default.createElement(
    'div',
    { className: 'ejl-grid-cell--' + (disabled ? 'disabled' : 'editable') + (_class ? ' ' + _class : ''), style: (0, _extends3.default)({
        display: 'flex', alignItems: 'center', textAlign: 'right', padding: disabled ? '0px' : '10px 8px 10px 0px' }, style || {}) },
    disabled ? value : _react2.default.createElement(_elementReact.InputNumber, {
      value: value == null ? value : +value, min: min, step: step, defaultValue: value == null ? value : +value,
      max: max, onKeyDown: function onKeyDown(e) {
        e.stopPropagation();
      },
      onChange: function onChange(v) {
        var stop = handleCellValueChange(v);
        if (!stop) handleCellBlur();
      }
    }),
    unit
  );
}); // 框架
exports.default = NumberFormatter;