'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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
          purchase_unit_options_key = _props$store.purchase_unit_options_key,
          warehouse_id = _props$store.warehouse_id,
          vendor_id = _props$store.vendor_id,
          purchase_unit_id = _props$store.purchase_unit_id,
          tax_rate = _props$store.tax_rate,
          plan_arrival_price = _props$store.plan_arrival_price,
          plan_arrival_date = _props$store.plan_arrival_date,
          plan_arrival_num = _props$store.plan_arrival_num,
          confirmed_price = _props$store.confirmed_price,
          confirmed_num = _props$store.confirmed_num,
          organization_id = _props$store.organization_id,
          formData = _props$store.formData,
          onValueChange = _props$store.onValueChange,
          onBlur = _props$store.onBlur,
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
              { labelWidth: '120',
                model: formData },
              _react2.default.createElement(
                _elementReact.Layout.Row,
                { gutter: 10 },
                _react2.default.createElement(
                  _elementReact.Layout.Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _elementReact.Form.Item,
                    { label: '\u4ED3\u5E93', prop: 'warehouse_id' },
                    _react2.default.createElement(
                      _elementReact.Select,
                      { filterable: top.dict.warehouse_id.length > 10, clearable: true, style: { width: '100%' }, value: warehouse_id != null ? String(warehouse_id) : '',
                        onChange: onValueChange.bind(this, 'warehouse_id')
                      },
                      top.dict.warehouse_id.map(function (el) {
                        return _react2.default.createElement(_elementReact.Select.Option, { label: el.warehouse_name, value: el.warehouse_id + '' });
                      })
                    )
                  )
                ),
                _react2.default.createElement(
                  _elementReact.Layout.Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _elementReact.Form.Item,
                    { label: '\u4F9B\u5E94\u5546', prop: 'vendor_id' },
                    _react2.default.createElement(
                      _elementReact.Select,
                      { disabled: !(0, _keys2.default)(top.dict.commonVendor).length, filterable: (0, _keys2.default)(top.dict.commonVendor).length > 5, clearable: true, style: { width: '100%' }, value: vendor_id != null ? String(vendor_id) : '',
                        onChange: onValueChange.bind(this, 'vendor_id')
                      },
                      (0, _keys2.default)(top.dict.commonVendor).map(function (key) {
                        return _react2.default.createElement(_elementReact.Select.Option, { key: key, value: key + '', label: top.dict.commonVendor[key] });
                      })
                    )
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
                    { label: '\u91C7\u8D2D\u5355\u4F4D', prop: 'purchase_unit_id' },
                    _react2.default.createElement(
                      _elementReact.Select,
                      { disabled: purchase_unit_options_key === 'none', filterable: top._dict.purchase_unit[purchase_unit_options_key].length > 10, clearable: true, style: { width: '100%' }, value: purchase_unit_id != null ? String(purchase_unit_id) : '',
                        onChange: onValueChange.bind(this, 'purchase_unit_id')
                      },
                      top._dict.purchase_unit[purchase_unit_options_key].map(function (_ref) {
                        var label = _ref.label,
                            value = _ref.value;
                        return _react2.default.createElement(_elementReact.Select.Option, { label: label, value: value + '' });
                      })
                    )
                  )
                ),
                _react2.default.createElement(
                  _elementReact.Layout.Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _elementReact.Form.Item,
                    { label: '\u7A0E\u7387(%)', prop: 'tax_rate' },
                    _react2.default.createElement(_elementReact.Input, { disabled: plan_arrival_price !== '', type: 'text', value: tax_rate || '',
                      onChange: onValueChange.bind(this, 'tax_rate'), onBlur: onBlur.bind(this, 'tax_rate')
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
                    { label: '\u542B\u7A0E\u5355\u4EF7', prop: 'plan_arrival_price' },
                    _react2.default.createElement(_elementReact.Input, { disabled: tax_rate !== '', type: 'text', value: plan_arrival_price || '',
                      onChange: onValueChange.bind(this, 'plan_arrival_price'), onBlur: onBlur.bind(this, 'plan_arrival_price')
                    })
                  )
                ),
                _react2.default.createElement(
                  _elementReact.Layout.Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _elementReact.Form.Item,
                    { label: '\u9884\u8BA1\u5230\u8D27\u65E5\u671F', prop: 'plan_arrival_date' },
                    _react2.default.createElement(_elementReact.DatePicker, { value: plan_arrival_date || null,
                      onChange: onValueChange.bind(this, 'plan_arrival_date')
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
                    { label: '\u8BA1\u5212\u91C7\u8D2D\u6570\u91CF', prop: 'plan_arrival_num' },
                    _react2.default.createElement(_elementReact.Input, { type: 'text', value: plan_arrival_num || '',
                      onChange: onValueChange.bind(this, 'plan_arrival_num'), onBlur: onBlur.bind(this, 'plan_arrival_num')
                    })
                  )
                ),
                _react2.default.createElement(
                  _elementReact.Layout.Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _elementReact.Form.Item,
                    { label: '\u4F9B\u5E94\u5546\u786E\u8BA4\u5355\u4EF7', prop: 'confirmed_price' },
                    _react2.default.createElement(_elementReact.Input, { type: 'text', value: confirmed_price || '',
                      onChange: onValueChange.bind(this, 'confirmed_price'), onBlur: onBlur.bind(this, 'confirmed_price')
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
                    { label: '\u4F9B\u5E94\u5546\u786E\u8BA4\u6570\u91CF', prop: 'confirmed_num' },
                    _react2.default.createElement(_elementReact.Input, { type: 'text', value: confirmed_num || '',
                      onChange: onValueChange.bind(this, 'confirmed_num'), onBlur: onBlur.bind(this, 'confirmed_num')
                    })
                  )
                ),
                _react2.default.createElement(
                  _elementReact.Layout.Col,
                  { span: 12 },
                  _react2.default.createElement(
                    _elementReact.Form.Item,
                    { label: '\u90E8\u95E8', prop: 'organization_id' },
                    _react2.default.createElement(_elementReact.Cascader, { value: (organization_id || []).slice(0), options: top._dict.dept, props: top.deptProps, filterable: true, clearable: true, changeOnSelect: true, showAllLevels: false,
                      onChange: onValueChange.bind(this, 'organization_id'), beforeFilter: function beforeFilter() {
                        return _promise2.default.resolve(true);
                      }
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