'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _elementReact = require('element-react');

require('@/css/FilterSetList/FilterSet/OrderPanelItem.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderPanelItem = (0, _mobxReact.observer)(function (_ref) {
  var item = _ref.item,
      orderNo = _ref.orderNo,
      onSwitch = _ref.onSwitch;
  var _item$label = item.label,
      label = _item$label === undefined ? '默认标签' : _item$label,
      _item$display = item.display,
      display = _item$display === undefined ? true : _item$display,
      sliceFromIndex = item.top.sliceFromIndex;

  var defaultWrapperClassName = 'orderpanelitem-wrapper';

  return _react2.default.createElement(
    'div',
    { className: defaultWrapperClassName },
    _react2.default.createElement(
      'span',
      { className: 'orderNo' },
      orderNo + 1 + sliceFromIndex
    ),
    _react2.default.createElement(
      'span',
      { className: 'label' },
      label
    ),
    _react2.default.createElement(_elementReact.Switch, { value: display, onChange: onSwitch })
  );
});

exports.default = OrderPanelItem;