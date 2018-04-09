'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _FilterItem = require('./FilterItem');

var _FilterItem2 = _interopRequireDefault(_FilterItem);

require('@/css/FilterSetList/FilterSet/FilterGroup.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterGroup = (0, _mobxReact.observer)(function (_ref) {
  var filteritems = _ref.store.filteritems;

  var children = filteritems.slice(0, 10).map(function (item, index) {
    return _react2.default.createElement(_FilterItem2.default, { key: item.id, store: item });
  });
  return _react2.default.createElement(
    'div',
    { className: 'filtergroup-wrapper' },
    ' ',
    children
  );
});

exports.default = FilterGroup;