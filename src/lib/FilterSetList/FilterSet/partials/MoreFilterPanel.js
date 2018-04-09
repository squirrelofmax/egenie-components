'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _elementReact = require('element-react');

var _FilterItem = require('./FilterItem');

var _FilterItem2 = _interopRequireDefault(_FilterItem);

require('@/css/FilterSetList/FilterSet/MoreFilterPanel.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MoreFilterPanel = (0, _mobxReact.observer)(function (_ref) {
  var _ref$store = _ref.store,
      filteritems = _ref$store.filteritems,
      _ref$store$MorePanelM = _ref$store.MorePanelModel,
      show = _ref$store$MorePanelM.show,
      toggleShow = _ref$store$MorePanelM.toggleShow;

  var children = filteritems.slice(10).map(function (el, index) {
    return _react2.default.createElement(_FilterItem2.default, { key: el.id, store: el });
  });
  return _react2.default.createElement(
    'div',
    { className: 'morefilterpanel-wrapper' },
    _react2.default.createElement(
      _elementReact.Dialog,
      { title: '\u8BE2\u4EF7', modal: false, visible: show, onCancel: function onCancel() {}, top: 6 + '' },
      _react2.default.createElement('div', { className: 'arrow' }),
      _react2.default.createElement('div', { className: 'arrow-border' }),
      _react2.default.createElement(
        _elementReact.Dialog.Body,
        null,
        children
      )
    )
  );
});
// 样式
// 框架
exports.default = MoreFilterPanel;