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

var _FilterSetList = require('../../modules/FilterSetList');

var _FilterSetList2 = _interopRequireDefault(_FilterSetList);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 模块
var PurchaseOrder = (0, _mobxReact.observer)(function (_Component) {
  (0, _inherits3.default)(PurchaseOrder, _Component);

  function PurchaseOrder(props) {
    (0, _classCallCheck3.default)(this, PurchaseOrder);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PurchaseOrder.__proto__ || (0, _getPrototypeOf2.default)(PurchaseOrder)).call(this, props));

    if (~window.location.pathname.indexOf('/ejl-report/goods-stats')) document.querySelectorAll('title')[0].text = '商品汇总表';
    return _this;
  }

  (0, _createClass3.default)(PurchaseOrder, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_FilterSetList2.default, { store: store, _class: 'goods-stats-report__container' });
    }
  }]);
  return PurchaseOrder;
}(_react.Component));

// 样式

// 请求
// model
// 框架
exports.default = PurchaseOrder;


var store = new _model2.default();