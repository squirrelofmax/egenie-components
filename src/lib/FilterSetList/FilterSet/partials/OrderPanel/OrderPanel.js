'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSortableHoc = require('react-sortable-hoc');

var _elementReact = require('element-react');

var _mobxReact = require('mobx-react');

var _OrderPanelItem = require('./OrderPanelItem');

var _OrderPanelItem2 = _interopRequireDefault(_OrderPanelItem);

require('@/css/FilterSetList/FilterSet/OrderPanel.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 框架
var SortableItem = (0, _reactSortableHoc.SortableElement)(_OrderPanelItem2.default);
// 样式


var SortableList = (0, _reactSortableHoc.SortableContainer)(function (_ref) {
  var items = _ref.items,
      onSwitch = _ref.onSwitch;

  return _react2.default.createElement(
    'div',
    { className: 'scroll-container' },
    _react2.default.createElement(
      'div',
      { className: 'scroll-wrapper' },
      _react2.default.createElement(
        'div',
        { className: 'items-container' },
        items.map(function (el, index) {
          return _react2.default.createElement(SortableItem, { key: el.id, index: index, item: el, onSwitch: onSwitch.bind(undefined, index), orderNo: index });
        })
      )
    )
  );
});

var OrderPanel = (0, _mobxReact.observer)(function (_ref2) {
  var _ref2$store = _ref2.store,
      filteritems = _ref2$store.filteritems,
      sliceFromIndex = _ref2$store.sliceFromIndex,
      _ref2$store$OrderPane = _ref2$store.OrderPanelModel,
      show = _ref2$store$OrderPane.show,
      diaY = _ref2$store$OrderPane.diaY,
      toggleShow = _ref2$store$OrderPane.toggleShow,
      onSave = _ref2$store$OrderPane.onSave,
      onCancel = _ref2$store$OrderPane.onCancel,
      resetToOriginalOrder = _ref2$store$OrderPane.resetToOriginalOrder,
      onSortEnd = _ref2$store$OrderPane.onSortEnd,
      onSwitch = _ref2$store$OrderPane.onSwitch;

  return _react2.default.createElement(
    'div',
    { className: 'orderpanel-wrapper' },
    _react2.default.createElement(
      _elementReact.Dialog,
      { closeOnClickModal: false, closeOnPressEscape: false, title: '\u8BE2\u4EF7', visible: show, onCancel: onCancel, top: diaY + '' },
      _react2.default.createElement('div', { className: 'arrow' }),
      _react2.default.createElement(
        _elementReact.Dialog.Body,
        null,
        _react2.default.createElement(
          'div',
          { className: 'info' },
          '\u62D6\u52A8\u4EE5\u8BBE\u7F6E\u641C\u7D22\u6761\u4EF6\u663E\u793A\u987A\u5E8F\uFF0C\u5E8F\u53F7\u5C0F\u4E8E\u7B49\u4E8E10\u7684\u6761\u4EF6\u4F1A\u663E\u793A\u5728\u641C\u7D22\u680F\uFF0C\u8BBE\u7F6E\u6761\u4EF6\u4E3A\u9690\u85CF\u4F1A\u5C06\u6761\u4EF6\u7684\u663E\u793A\u987A\u5E8F\u79FB\u52A8\u5230\u6700\u540E\u3002'
        ),
        _react2.default.createElement(SortableList, { items: filteritems.slice(sliceFromIndex), onSortEnd: onSortEnd, axis: 'xy', helperClass: 'sortableHelper', onSwitch: onSwitch }),
        _react2.default.createElement(
          'div',
          { className: 'button-wrapper' },
          _react2.default.createElement(
            _elementReact.Button,
            { type: 'primary', size: 'small', onClick: onSave },
            '\u4FDD\u5B58'
          ),
          _react2.default.createElement(
            _elementReact.Button,
            { size: 'small', onClick: resetToOriginalOrder },
            '\u6062\u590D\u9ED8\u8BA4\u987A\u5E8F'
          ),
          _react2.default.createElement(
            _elementReact.Button,
            { size: 'small', onClick: onCancel },
            '\u53D6\u6D88'
          )
        )
      )
    )
  );
});

exports.default = OrderPanel;