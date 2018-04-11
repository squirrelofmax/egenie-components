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

var SelectFormatter = (0, _mobxReact.observer)(function (_ref) {
  var store = _ref.store,
      _ref$store = _ref.store,
      disabled = _ref$store.disabled,
      style = _ref$store.style,
      value = _ref$store.value,
      _class = _ref$store._class,
      clearable = _ref$store.clearable,
      options = _ref$store.options,
      filterable = _ref$store.filterable,
      handleCellBlur = _ref$store.handleCellBlur,
      handleCellValueChange = _ref$store.handleCellValueChange;

  return _react2.default.createElement(
    'div',
    { className: 'ejl-grid-cell__select ejl-grid-cell--' + (disabled ? 'disabled' : 'editable') + (_class ? ' ' + _class : ''), style: (0, _extends3.default)({
        textAlign: 'left', padding: disabled ? '0px' : '10px 8px 10px 0px' }, style || {}) },
    disabled ? getLabelByValue(value, options) : _react2.default.createElement(
      _elementReact.Select,
      { value: String(value), clearable: clearable, filterable: filterable,
        onChange: function onChange(v) {
          console.log('执行Select内部的onChange，value：---', v);
          var stop = handleCellValueChange(v);
          if (!stop) handleCellBlur();
        } },
      options && options.length ? options.map(function (_ref2) {
        var label = _ref2.label,
            value = _ref2.value;

        return _react2.default.createElement(_elementReact.Select.Option, { label: label, value: String(value), key: label });
      }) : _react2.default.createElement('span', null)
    )
  );
}); // 框架
exports.default = SelectFormatter;


function getLabelByValue(value, options) {
  var item = options.find(function (el) {
    return String(el.value) === String(value);
  });
  return item ? item.label : '';
}