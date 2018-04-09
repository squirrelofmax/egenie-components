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

var _elementReact = require('element-react');

var _EgGridMobx = require('../../../../modules/EgGridMobx.js');

var _EgGridMobx2 = _interopRequireDefault(_EgGridMobx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// partails

// requests

// element-UI
// 框架
var Header = (0, _mobxReact.observer)(function (_ref) {
  var _ref$store = _ref.store,
      _ref$store$searchObj$ = _ref$store.searchObj.present,
      product_name = _ref$store$searchObj$.product_name,
      product_no = _ref$store$searchObj$.product_no,
      seller_outer_no = _ref$store$searchObj$.seller_outer_no,
      sku_no = _ref$store$searchObj$.sku_no,
      vendor_name = _ref$store$searchObj$.vendor_name,
      bar_code = _ref$store$searchObj$.bar_code,
      color_type = _ref$store$searchObj$.color_type,
      size_type = _ref$store$searchObj$.size_type,
      onValueChange = _ref$store.onValueChange,
      onSearch = _ref$store.onSearch,
      onReset = _ref$store.onReset,
      formData = _ref$store.formData;
  return _react2.default.createElement(
    _elementReact.Form,
    { labelWidth: '80'
      // rules={rules}
      , model: formData
      // ref="form"
    },
    _react2.default.createElement(
      _elementReact.Layout.Row,
      { gutter: 10 },
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 5 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u5546\u54C1\u540D\u79F0', prop: 'product_name' },
          _react2.default.createElement(_elementReact.Input, { type: 'text', value: product_name || '', onKeyUp: function onKeyUp(e) {
              if (e.keyCode == 13) return onSearch();
            },
            onChange: onValueChange.bind(undefined, 'product_name')
          })
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 5 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u5546\u54C1\u7F16\u7801', prop: 'product_no' },
          _react2.default.createElement(_elementReact.Input, { value: product_no || '', onKeyUp: function onKeyUp(e) {
              if (e.keyCode == 13) return onSearch();
            },
            onChange: onValueChange.bind(undefined, 'product_no')
          })
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 5 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u5546\u54C1\u8D27\u53F7', prop: 'seller_outer_no' },
          _react2.default.createElement(_elementReact.Input, { value: seller_outer_no || '', onKeyUp: function onKeyUp(e) {
              if (e.keyCode == 13) return onSearch();
            },
            onChange: onValueChange.bind(undefined, 'seller_outer_no')
          })
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 5 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: 'SKU\u7F16\u7801', prop: 'sku_no' },
          _react2.default.createElement(_elementReact.Input, { value: sku_no || '', onKeyUp: function onKeyUp(e) {
              if (e.keyCode == 13) return onSearch();
            },
            onChange: onValueChange.bind(undefined, 'sku_no')
          })
        )
      )
    ),
    _react2.default.createElement(
      _elementReact.Layout.Row,
      { gutter: 10 },
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 5 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u6761\u5F62\u7801', prop: 'bar_code' },
          _react2.default.createElement(_elementReact.Input, { value: bar_code || '', onKeyUp: function onKeyUp(e) {
              if (e.keyCode == 13) return onSearch();
            },
            onChange: onValueChange.bind(undefined, 'bar_code')
          })
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 5 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u989C\u8272', prop: 'color_type' },
          _react2.default.createElement(_elementReact.Input, { value: color_type || '', onKeyUp: function onKeyUp(e) {
              if (e.keyCode == 13) return onSearch();
            },
            onChange: onValueChange.bind(undefined, 'color_type')
          })
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 5 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u5C3A\u7801', prop: 'size_type' },
          _react2.default.createElement(_elementReact.Input, { type: 'text', value: size_type || '', onKeyUp: function onKeyUp(e) {
              if (e.keyCode == 13) return onSearch();
            },
            onChange: onValueChange.bind(undefined, 'size_type')
          })
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 5 },
        _react2.default.createElement('div', { style: { height: 1 } })
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 4 },
        _react2.default.createElement(
          _elementReact.Button,
          { style: { marginTop: 5 }, size: 'small', type: 'primary', icon: 'search', onClick: onSearch },
          '\u67E5\u8BE2'
        ),
        _react2.default.createElement(
          _elementReact.Button,
          { size: 'small', onClick: onReset },
          '\u91CD\u7F6E'
        )
      )
    )
  );
});
// modules


var AddGoods = (0, _mobxReact.observer)(function (_Component) {
  (0, _inherits3.default)(AddGoods, _Component);

  function AddGoods() {
    (0, _classCallCheck3.default)(this, AddGoods);
    return (0, _possibleConstructorReturn3.default)(this, (AddGoods.__proto__ || (0, _getPrototypeOf2.default)(AddGoods)).apply(this, arguments));
  }

  (0, _createClass3.default)(AddGoods, [{
    key: 'render',
    value: function render() {
      var _props$store = this.props.store,
          show = _props$store.show,
          onSave = _props$store.onSave,
          onClose = _props$store.onClose,
          topGridModel = _props$store.topGridModel,
          bottomGridModel = _props$store.bottomGridModel,
          onMultiAdd = _props$store.onMultiAdd,
          onMultiDelete = _props$store.onMultiDelete,
          loading = _props$store.loading;


      return _react2.default.createElement(
        'div',
        { className: 'purchase-order-add-goods' },
        _react2.default.createElement(
          _elementReact.Dialog,
          { title: '\u9500\u552E\u8BA2\u5355\u6DFB\u52A0\u5546\u54C1', size: 'large', visible: show, top: '4%', onCancel: onClose, closeOnClickModal: false },
          _react2.default.createElement(
            _elementReact.Dialog.Body,
            null,
            _react2.default.createElement(Header, { store: this.props.store }),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _elementReact.Button,
                { disabled: loading, style: { marginBottom: 10 }, size: 'small', onClick: onMultiAdd },
                '\u6279\u91CF\u6DFB\u52A0'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'purchase-order-edit__grid-container', style: { height: 380 } },
              _react2.default.createElement(_EgGridMobx2.default, { store: topGridModel })
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _elementReact.Button,
                { style: { marginBottom: 10 }, size: 'small', onClick: onMultiDelete },
                '\u6279\u91CF\u5220\u9664'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'purchase-order-edit__grid-container', style: { height: 380 } },
              _react2.default.createElement(_EgGridMobx2.default, { store: bottomGridModel })
            ),
            _react2.default.createElement(
              'div',
              { className: 'button-wrapper', style: { display: 'flex' } },
              _react2.default.createElement(
                _elementReact.Button,
                { type: 'primary', size: 'small', style: { width: 70, marginLeft: 'auto' }, onClick: onSave },
                '\u4FDD\u5B58'
              ),
              _react2.default.createElement(
                _elementReact.Button,
                { size: 'small', style: { width: 70 }, onClick: onClose },
                '\u53D6\u6D88'
              )
            )
          )
        )
      );
    }
  }]);
  return AddGoods;
}(_react.Component));
exports.default = AddGoods;