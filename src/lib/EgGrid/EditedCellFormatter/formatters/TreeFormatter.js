'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elementReact = require('element-react');

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 框架
var TreeFormatter = (0, _mobxReact.observer)(function (_ref) {
  var store = _ref.store,
      _ref$store = _ref.store,
      disabled = _ref$store.disabled,
      style = _ref$store.style,
      value = _ref$store.value,
      _class = _ref$store._class,
      clearable = _ref$store.clearable,
      treeOptions = _ref$store.treeOptions,
      treeProps = _ref$store.treeProps,
      handleCellBlur = _ref$store.handleCellBlur,
      handleCellValueChange = _ref$store.handleCellValueChange;

  return _react2.default.createElement(
    'div',
    { className: 'ejl-grid-cell__select ejl-grid-cell--' + (disabled ? 'disabled' : 'editable') + (_class ? ' ' + _class : ''), style: (0, _extends3.default)({
        textAlign: 'left', padding: disabled ? '0px' : '10px 8px 10px 0px' }, style || {}) },
    disabled ? (value || []).join(',') : _react2.default.createElement(_elementReact.Cascader, { value: (value || []).slice(0), options: (0, _mobx.toJS)(treeOptions), props: treeProps, filterable: true, clearable: clearable, changeOnSelect: true,
      showAllLevels: false,
      beforeFilter: function beforeFilter() {
        return _promise2.default.resolve(true);
      },
      onKeyDown: function onKeyDown(e) {
        e.stopPropagation();
      },
      onChange: function onChange(v) {
        var stop = handleCellValueChange(v);
        if (!stop) handleCellBlur();
      } })
  );
});

exports.default = TreeFormatter;