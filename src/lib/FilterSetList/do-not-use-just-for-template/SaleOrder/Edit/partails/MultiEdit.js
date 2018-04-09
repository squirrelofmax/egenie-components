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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MultiEdit = (0, _mobxReact.observer)(function (_Component) {
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
          taxRate = _props$store.taxRate,
          salePrice = _props$store.salePrice,
          saleNum = _props$store.saleNum,
          planSendDate = _props$store.planSendDate,
          customer = _props$store.customer,
          formData = _props$store.formData,
          onValueChange = _props$store.onValueChange,
          onSave = _props$store.onSave,
          onClose = _props$store.onClose,
          top = _props$store.top;

      return _react2.default.createElement(
        'div',
        { className: 'purchase-order-multi-edit' },
        _react2.default.createElement(
          _elementReact.Dialog,
          { title: '\u6279\u91CF\u4FEE\u6539', size: 'small', visible: show, top: '4%', onCancel: onClose, closeOnClickModal: false },
          _react2.default.createElement(
            _elementReact.Dialog.Body,
            null,
            _react2.default.createElement(
              _elementReact.Form,
              { labelWidth: '100',
                model: formData },
              _react2.default.createElement(
                _elementReact.Layout.Row,
                { gutter: 10 },
                _react2.default.createElement(
                  _elementReact.Layout.Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _elementReact.Form.Item,
                    { label: '\u5BA2\u6237', prop: 'customer' },
                    _react2.default.createElement(
                      _elementReact.Select,
                      { filterable: top._dict.customer.length > 10, clearable: true, style: { width: '100%' }, value: customer != null ? String(customer) : '',
                        onChange: onValueChange.bind(this, 'customer') },
                      top._dict.customer.map(function (el) {
                        return _react2.default.createElement(_elementReact.Select.Option, { key: el.value, label: el.label, value: el.value + '' });
                      })
                    )
                  )
                ),
                _react2.default.createElement(
                  _elementReact.Layout.Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _elementReact.Form.Item,
                    { label: '\u9500\u552E\u6570\u91CF', prop: 'saleNum' },
                    _react2.default.createElement(_elementReact.InputNumber, { value: saleNum == null ? saleNum : +saleNum,
                      defaultValue: undefined, onKeyDown: function onKeyDown(e) {
                        e.stopPropagation();
                      },
                      onChange: onValueChange.bind(this, 'saleNum')
                    })
                  )
                )
              ),
              _react2.default.createElement(
                _elementReact.Layout.Row,
                { gutter: 10 },
                _react2.default.createElement(
                  _elementReact.Layout.Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _elementReact.Form.Item,
                    { label: '\u7A0E\u7387(%)', prop: 'taxRate' },
                    _react2.default.createElement(_elementReact.InputNumber, { disabled: salePrice != null, value: taxRate == null ? taxRate : +taxRate,
                      min: 0, step: 1, defaultValue: undefined,
                      max: 100, onKeyDown: function onKeyDown(e) {
                        e.stopPropagation();
                      },
                      onChange: onValueChange.bind(this, 'taxRate')
                    })
                  )
                ),
                _react2.default.createElement(
                  _elementReact.Layout.Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _elementReact.Form.Item,
                    { label: '\u542B\u7A0E\u552E\u4EF7', prop: 'salePrice' },
                    _react2.default.createElement(_elementReact.InputNumber, { disabled: taxRate != null, value: salePrice == null ? salePrice : +salePrice,
                      defaultValue: undefined, onKeyDown: function onKeyDown(e) {
                        e.stopPropagation();
                      },
                      onChange: onValueChange.bind(this, 'salePrice')
                    })
                  )
                )
              ),
              _react2.default.createElement(
                _elementReact.Layout.Row,
                { gutter: 10 },
                _react2.default.createElement(
                  _elementReact.Layout.Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _elementReact.Form.Item,
                    { label: '\u9884\u8BA1\u9001\u8D27\u65E5\u671F', prop: 'planSendDate' },
                    _react2.default.createElement(_elementReact.DatePicker, { value: planSendDate,
                      format: 'yyyy-MM-dd HH:mm:ss', isShowTime: true, onKeyDown: function onKeyDown(e) {
                        e.stopPropagation();
                      },
                      onChange: onValueChange.bind(this, 'planSendDate')
                    })
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'button-wrapper', style: { display: 'flex', marginTop: 5 } },
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
// partails

// requests

// element-UI
// 框架
exports.default = MultiEdit;