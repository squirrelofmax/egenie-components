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

var InputFormatter = (0, _mobxReact.observer)(function (_ref) {
  var store = _ref.store,
      _ref$store = _ref.store,
      disabled = _ref$store.disabled,
      style = _ref$store.style,
      value = _ref$store.value,
      _class = _ref$store._class,
      handleCellBlur = _ref$store.handleCellBlur,
      handleCellValueChange = _ref$store.handleCellValueChange;

  return _react2.default.createElement(
    'div',
    { className: 'ejl-grid-cell--' + (disabled ? 'disabled' : 'editable') + (_class ? ' ' + _class : ''), style: (0, _extends3.default)({
        textAlign: 'left', padding: disabled ? '0px' : '10px 8px 10px 0px' }, style || {}) },
    disabled ? value : _react2.default.createElement(_elementReact.Input, { value: value, onKeyDown: function onKeyDown(e) {
        e.stopPropagation();
      },
      onKeyUp: function onKeyUp(e) {
        e.stopPropagation();
        if (e.keyCode == 13) handleCellBlur();
      },
      onBlur: handleCellBlur, onChange: handleCellValueChange })
  );
}); // 框架
exports.default = InputFormatter;