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

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _AddGoods = require('./partails/AddGoods');

var _AddGoods2 = _interopRequireDefault(_AddGoods);

var _MultiEdit = require('./partails/MultiEdit');

var _MultiEdit2 = _interopRequireDefault(_MultiEdit);

require('./index.css');

var _elementReact = require('element-react');

var _EgGridMobx = require('../../../modules/EgGridMobx.js');

var _EgGridMobx2 = _interopRequireDefault(_EgGridMobx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// element-UI
var Header = (0, _mobxReact.observer)(function (_ref) {
  var style = _ref.style,
      _ref$store = _ref.store,
      flag = _ref$store.flag,
      dict = _ref$store.dict,
      deptProps = _ref$store.deptProps,
      _dict = _ref$store._dict,
      pms_purchase_order_no = _ref$store.pms_purchase_order_no,
      purchase_date = _ref$store.purchase_date,
      purchase_order_type_code = _ref$store.purchase_order_type_code,
      product_type_code = _ref$store.product_type_code,
      vendor_id = _ref$store.vendor_id,
      warehouse_id = _ref$store.warehouse_id,
      sales_type = _ref$store.sales_type,
      pay_type = _ref$store.pay_type,
      deliver_address = _ref$store.deliver_address,
      province_id = _ref$store.province_id,
      city_id = _ref$store.city_id,
      district_id = _ref$store.district_id,
      remarks = _ref$store.remarks,
      contract_terms = _ref$store.contract_terms,
      organization_id = _ref$store.organization_id,
      onValueChange = _ref$store.onValueChange,
      formData = _ref$store.formData,
      deletePayTypeDict = _ref$store.deletePayTypeDict,
      addPayTypeDict = _ref$store.addPayTypeDict;
  return _react2.default.createElement(
    _elementReact.Form,
    { labelWidth: '80', model: formData, ref: 'form', style: style },
    _react2.default.createElement(
      _elementReact.Layout.Row,
      { gutter: 10 },
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u9500\u552E\u65E5\u671F:', prop: 'purchase_date' },
          _react2.default.createElement(_elementReact.DatePicker, { format: 'yyyy-MM-dd HH:mm:ss', isShowTime: true, style: { width: '100%' }, value: purchase_date || null,
            onChange: onValueChange.bind(undefined, 'purchase_date') })
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u5BA2\u6237:', prop: 'pay_type' },
          _react2.default.createElement(
            _elementReact.Select,
            { style: { width: 'calc(100% - 20px)' }, value: pay_type == null ? '' : String(pay_type), onChange: onValueChange.bind(undefined, 'pay_type') },
            (0, _keys2.default)(dict.pay_type).map(function (key) {
              return _react2.default.createElement(
                _elementReact.Select.Option,
                { style: { display: 'flex', alignItems: 'center' }, key: key, label: dict.pay_type[key], value: key + '' },
                _react2.default.createElement(
                  'span',
                  null,
                  dict.pay_type[key]
                ),
                _react2.default.createElement('i', { className: 'el-icon-close', style: { marginLeft: 'auto' }, onClick: function onClick(e) {
                    e.stopPropagation();
                    deletePayTypeDict(key);
                  } })
              );
            })
          ),
          _react2.default.createElement('i', { className: 'el-icon-plus', style: { marginLeft: 5, cursor: 'pointer' }, onClick: addPayTypeDict })
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u8BA2\u5355\u7C7B\u578B:', prop: 'purchase_order_type_code' },
          _react2.default.createElement(
            _elementReact.Select,
            { filterable: dict.purchase_order_type.length > 10, clearable: true, style: { width: '100%' }, value: purchase_order_type_code != null ? String(purchase_order_type_code) : '',
              onChange: onValueChange.bind(undefined, 'purchase_order_type_code') },
            dict.purchase_order_type.map(function (el) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: el.code, label: el.name, value: el.code + '' });
            })
          )
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u5546\u54C1\u7C7B\u578B:', prop: 'product_type_code' },
          _react2.default.createElement(
            _elementReact.Select,
            { filterable: dict.product_type.length > 10, clearable: true, style: { width: '100%' }, value: product_type_code != null ? String(product_type_code) : '',
              onChange: onValueChange.bind(undefined, 'product_type_code') },
            dict.product_type.map(function (el) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: el.code, label: el.name, value: el.code + '' });
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
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u9500\u552E\u65B9\u5F0F:', prop: 'sales_type' },
          _react2.default.createElement(
            _elementReact.Select,
            { filterable: dict.sales_type.length > 10, clearable: true, style: { width: '100%' }, value: sales_type != null ? sales_type + '' : '',
              onChange: onValueChange.bind(undefined, 'sales_type') },
            dict.sales_type.map(function (el) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: el.code, label: el.name, value: el.code + '' });
            })
          )
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u7ED3\u7B97\u65B9\u5F0F:', prop: 'pay_type' },
          _react2.default.createElement(
            _elementReact.Select,
            { style: { width: 'calc(100% - 20px)' }, value: pay_type == null ? '' : String(pay_type), onChange: onValueChange.bind(undefined, 'pay_type') },
            (0, _keys2.default)(dict.pay_type).map(function (key) {
              return _react2.default.createElement(
                _elementReact.Select.Option,
                { style: { display: 'flex', alignItems: 'center' }, key: key, label: dict.pay_type[key], value: key + '' },
                _react2.default.createElement(
                  'span',
                  null,
                  dict.pay_type[key]
                ),
                _react2.default.createElement('i', { className: 'el-icon-close', style: { marginLeft: 'auto' }, onClick: function onClick(e) {
                    e.stopPropagation();
                    deletePayTypeDict(key);
                  } })
              );
            })
          ),
          _react2.default.createElement('i', { className: 'el-icon-plus', style: { marginLeft: 5, cursor: 'pointer' }, onClick: addPayTypeDict })
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u4EA4\u8D27\u65B9\u5F0F:', prop: 'vendor_id' },
          _react2.default.createElement(
            _elementReact.Select,
            { filterable: (0, _keys2.default)(dict.vendor_id).length > 10, clearable: true, style: { width: '100%' }, value: vendor_id != null ? String(vendor_id) : '',
              onChange: onValueChange.bind(undefined, 'vendor_id') },
            (0, _keys2.default)(dict.vendor_id).map(function (key) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: dict.vendor_id[key], label: key, value: dict.vendor_id[key] + '' });
            })
          )
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u5907\u6CE8:', prop: 'remarks' },
          _react2.default.createElement(_elementReact.Input, { value: remarks || '',
            onChange: onValueChange.bind(undefined, 'remarks') })
        )
      )
    ),
    _react2.default.createElement(
      _elementReact.Layout.Row,
      { gutter: 10 },
      _react2.default.createElement(
        _elementReact.Form.Item,
        { label: '\u6536\u8D27\u5730\u5740:', prop: 'deliver_address' },
        _react2.default.createElement(
          _elementReact.Layout.Col,
          { span: 3 },
          _react2.default.createElement(
            _elementReact.Select,
            { style: { width: '100%' }, value: province_id != null ? String(province_id) : '', clearable: true, filterable: dict.province_id.length > 10,
              onChange: onValueChange.bind(undefined, 'province_id') },
            dict.province_id.map(function (el) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: el.province_id, label: el.province_name, value: el.province_id + '' });
            })
          )
        ),
        _react2.default.createElement(
          _elementReact.Layout.Col,
          { span: 3 },
          _react2.default.createElement(
            _elementReact.Select,
            { style: { width: '100%' }, value: city_id != null ? String(city_id) : '', clearable: true, filterable: dict.province_id.length > 10,
              onChange: onValueChange.bind(undefined, 'city_id') },
            dict.city_id.map(function (el) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: el.city_id, label: el.city_name, value: el.city_id + '' });
            })
          )
        ),
        _react2.default.createElement(
          _elementReact.Layout.Col,
          { span: 3 },
          _react2.default.createElement(
            _elementReact.Select,
            { style: { width: '100%' }, value: district_id != null ? String(district_id) : '', clearable: true, filterable: dict.province_id.length > 10,
              onChange: onValueChange.bind(undefined, 'district_id') },
            dict.district_id.map(function (el) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: el.district_id, label: el.district_name, value: el.district_id + '' });
            })
          )
        ),
        _react2.default.createElement(
          _elementReact.Layout.Col,
          { span: 15 },
          _react2.default.createElement(_elementReact.Input, { value: deliver_address || '',
            onChange: onValueChange.bind(undefined, 'deliver_address') })
        )
      )
    ),
    _react2.default.createElement(
      _elementReact.Layout.Row,
      { gutter: 10 },
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 14 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u5408\u540C\u6761\u6B3E:', prop: 'contract_terms' },
          _react2.default.createElement(_elementReact.Input, { value: contract_terms || '',
            onChange: onValueChange.bind(undefined, 'contract_terms') })
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 10 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u4E0A\u4F20\u9644\u4EF6:' },
          _react2.default.createElement(
            _elementReact.Button,
            { size: 'small' },
            '\u4E0A\u4F20'
          ),
          _react2.default.createElement(
            _elementReact.Button,
            { size: 'small' },
            '\u6E05\u9664'
          ),
          _react2.default.createElement(
            _elementReact.Button,
            { size: 'small' },
            '\u4E0B\u8F7D'
          )
        )
      )
    )
  );
});

// modules

// requests
// 样式

// models
// partails
// 框架


var EditPurchaseOrder = (0, _mobxReact.observer)(function (_Component) {
  (0, _inherits3.default)(EditPurchaseOrder, _Component);

  function EditPurchaseOrder() {
    (0, _classCallCheck3.default)(this, EditPurchaseOrder);
    return (0, _possibleConstructorReturn3.default)(this, (EditPurchaseOrder.__proto__ || (0, _getPrototypeOf2.default)(EditPurchaseOrder)).apply(this, arguments));
  }

  (0, _createClass3.default)(EditPurchaseOrder, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props$store = this.props.store,
          details = _props$store.details,
          flag = _props$store.flag,
          onSave = _props$store.onSave,
          onClose = _props$store.onClose,
          fullScreen = _props$store.fullScreen,
          toggleFullScreen = _props$store.toggleFullScreen,
          show = _props$store.show,
          showMultiEditDialog = _props$store.showMultiEditDialog;
      var gridModel = details.gridModel,
          onSearch = details.onSearch,
          onMultiDelete = details.onMultiDelete,
          filteritems = details.filteritems,
          cursorFilteritem = details.cursorFilteritem,
          numOfHasValue = details.numOfHasValue,
          onFilterValueChange = details.onFilterValueChange,
          getDisplayValueOfFilteritem = details.getDisplayValueOfFilteritem,
          onCursorFilteritemFieldChange = details.onCursorFilteritemFieldChange;

      return _react2.default.createElement(
        'div',
        { className: 'purchase-order-edit' },
        _react2.default.createElement(
          _elementReact.Dialog,
          { title: flag === 'add' ? '新建采购订单' : '编辑采购订单', size: 'large', visible: show, top: '4%', onCancel: onClose, closeOnClickModal: false },
          _react2.default.createElement(
            _elementReact.Dialog.Body,
            null,
            _react2.default.createElement(Header, { store: this.props.store, style: { display: fullScreen ? 'none' : '' } }),
            _react2.default.createElement(
              'div',
              { className: 'purchase-order-edit__grid-header', style: { display: 'flex', paddingTop: 5, position: 'relative' } },
              _react2.default.createElement(
                _elementReact.Button,
                { style: { marginBottom: 10 }, size: 'small', onClick: function onClick() {
                    var _props$store2 = _this2.props.store,
                        addGoodsModel = _props$store2.addGoodsModel,
                        _props$store2$addGood = _props$store2.addGoodsModel,
                        onSearch = _props$store2$addGood.onSearch,
                        onReset = _props$store2$addGood.onReset,
                        rows = _props$store2$addGood.topGridModel.rows;

                    addGoodsModel.show = true;
                    addGoodsModel.inited = true;
                    onReset();
                    if (!rows.length) onSearch();
                  } },
                '\u6DFB\u52A0\u5546\u54C1'
              ),
              _react2.default.createElement(
                _elementReact.Button,
                { size: 'small', onClick: onMultiDelete },
                '\u6279\u91CF\u5220\u9664'
              ),
              _react2.default.createElement(
                _elementReact.Button,
                { size: 'small', onClick: showMultiEditDialog },
                '\u6279\u91CF\u4FEE\u6539'
              ),
              _react2.default.createElement('i', { className: 'fa tooltipstered fa-' + (fullScreen ? 'compress' : 'expand'), onClick: toggleFullScreen }),
              _react2.default.createElement(
                'div',
                { className: 'search-key', style: { marginLeft: 'auto', display: flag === 'add' ? 'none' : 'flex', flex: '0 0 420px' } },
                _react2.default.createElement(
                  _elementReact.Badge,
                  { style: { flex: '0 0 180px', marginRight: 10 }, className: numOfHasValue ? '' : 'count0', value: numOfHasValue },
                  _react2.default.createElement(
                    _elementReact.Select,
                    { size: 'small', style: { width: '100%' }, value: cursorFilteritem ? cursorFilteritem.field : '', onChange: onCursorFilteritemFieldChange },
                    filteritems.map(function (el) {
                      return _react2.default.createElement(
                        _elementReact.Select.Option,
                        { key: el.field, label: el.label, value: el.field },
                        _react2.default.createElement(
                          'span',
                          { style: { float: 'left', fontSize: 11 } },
                          el.label
                        ),
                        _react2.default.createElement(
                          'span',
                          { style: { float: 'right', color: '#ff4949', fontSize: 11, maxWidth: 100, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } },
                          getDisplayValueOfFilteritem(el)
                        )
                      );
                    })
                  )
                ),
                cursorFilteritem && cursorFilteritem.type === 'select' ? _react2.default.createElement(
                  _elementReact.Select,
                  { clearable: true, size: 'small', style: { flex: 'auto' }, value: cursorFilteritem.value, onChange: onFilterValueChange.bind(this, null) },
                  cursorFilteritem.options.map(function (el) {
                    return _react2.default.createElement(_elementReact.Select.Option, { key: el.value, label: el.label, value: el.value });
                  })
                ) : _react2.default.createElement(_elementReact.Input, { size: 'small', style: {}, value: cursorFilteritem ? cursorFilteritem.value : '', onChange: onFilterValueChange.bind(this, null) }),
                _react2.default.createElement(
                  _elementReact.Button,
                  { size: 'small', type: 'primary', icon: 'search', onClick: onSearch, style: { marginLeft: 10 } },
                  '\u67E5\u8BE2'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'purchase-order-edit__grid-container', style: { height: fullScreen ? 555 : 410 } },
              _react2.default.createElement(_EgGridMobx2.default, { store: gridModel })
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
          ),
          _react2.default.createElement(_MultiEdit2.default, { store: this.props.store.multiEditModel })
        ),
        _react2.default.createElement(_AddGoods2.default, { store: this.props.store.addGoodsModel })
      );
    }
  }]);
  return EditPurchaseOrder;
}(_react.Component));
exports.default = EditPurchaseOrder;