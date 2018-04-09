'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _FilterSetList = require('../../utils/FilterSetList');

var _FilterSetList2 = _interopRequireDefault(_FilterSetList);

var _Edit = require('./Edit');

var _Edit2 = _interopRequireDefault(_Edit);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 页面

// 请求
// model
// 框架
var SaleOrder = (0, _mobxReact.observer)(function (_Component) {
  (0, _inherits3.default)(SaleOrder, _Component);

  function SaleOrder(props) {
    (0, _classCallCheck3.default)(this, SaleOrder);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SaleOrder.__proto__ || (0, _getPrototypeOf2.default)(SaleOrder)).call(this, props));

    if (~window.location.pathname.indexOf('/ejl-oms/sale-order')) document.querySelectorAll('title')[0].text = '销售订单OMS';
    return _this;
  }

  (0, _createClass3.default)(SaleOrder, [{
    key: 'render',
    value: function render() {
      return [_react2.default.createElement(_FilterSetList2.default, { store: store, _class: 'oms-sale-order__container', key: store.id }), _react2.default.createElement(_Edit2.default, { ref: 'editDialog', store: store.editDialog, key: store.id + '-edit' })];
    }
  }]);
  return SaleOrder;
}(_react.Component));

// 样式

// 模块
exports.default = SaleOrder;


var store = new _model2.default();