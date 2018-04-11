'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ComputedValueFormatter组件的onBlur方法没有用
// 框架
var ComputedValueFormatter = (0, _mobxReact.observer)(function (_ref) {
  var store = _ref.store,
      _ref$store = _ref.store,
      style = _ref$store.style,
      value = _ref$store.value,
      _class = _ref$store._class;

  return _react2.default.createElement(
    'div',
    { className: 'ejl-grid-cell--computed-value' + (_class ? ' ' + _class : ''), style: (0, _extends3.default)({
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: 0 }, style || {}) },
    value
  );
});

exports.default = ComputedValueFormatter;