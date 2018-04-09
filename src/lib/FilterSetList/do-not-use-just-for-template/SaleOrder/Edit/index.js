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

var _EgGridMobx = require('../../../utils/EgGrid/EgGridMobx.js');

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
      saleDate = _ref$store.saleDate,
      tradeSaleOrderType = _ref$store.tradeSaleOrderType,
      productType = _ref$store.productType,
      deliveryType = _ref$store.deliveryType,
      warehouse_id = _ref$store.warehouse_id,
      salesType = _ref$store.salesType,
      payType = _ref$store.payType,
      customer = _ref$store.customer,
      deliverAddress = _ref$store.deliverAddress,
      provinceId = _ref$store.provinceId,
      cityId = _ref$store.cityId,
      districtId = _ref$store.districtId,
      remark = _ref$store.remark,
      contractTerms = _ref$store.contractTerms,
      organization_id = _ref$store.organization_id,
      onValueChange = _ref$store.onValueChange,
      formData = _ref$store.formData,
      deletePayTypeDict = _ref$store.deletePayTypeDict,
      addPayTypeDict = _ref$store.addPayTypeDict,
      deleteCustomerDict = _ref$store.deleteCustomerDict,
      addCustomerDict = _ref$store.addCustomerDict,
      testOp = _ref$store.testOp,
      rules = _ref$store.rules,
      setFormRef = _ref$store.setFormRef;
  return _react2.default.createElement(
    _elementReact.Form,
    { labelWidth: '82', model: formData, ref: setFormRef, style: style, rules: rules },
    _react2.default.createElement(
      _elementReact.Layout.Row,
      { gutter: 10 },
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u9500\u552E\u65E5\u671F:', prop: 'saleDate' },
          _react2.default.createElement(_elementReact.DatePicker, { format: 'yyyy-MM-dd HH:mm:ss', isShowTime: true, style: { width: '100%' }, value: saleDate || null,
            onChange: onValueChange.bind(undefined, 'saleDate') })
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u5BA2\u6237:', prop: 'customer' },
          _react2.default.createElement(
            _elementReact.Select,
            { style: { width: 'calc(100% - 20px)' }, value: customer == null ? '' : String(customer), onChange: onValueChange.bind(undefined, 'customer') },
            _dict.customer.map(function (_ref2) {
              var value = _ref2.value,
                  label = _ref2.label;

              return _react2.default.createElement(
                _elementReact.Select.Option,
                { style: { display: 'flex', alignItems: 'center' }, key: value, label: label, value: value + '' },
                _react2.default.createElement(
                  'span',
                  null,
                  label
                ),
                _react2.default.createElement('i', { className: 'el-icon-close', style: { marginLeft: 'auto' }, onClick: function onClick(e) {
                    e.stopPropagation();
                    deleteCustomerDict(value);
                  } })
              );
            })
          ),
          _react2.default.createElement('i', { className: 'el-icon-plus', style: { marginLeft: 5, cursor: 'pointer' }, onClick: addCustomerDict })
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u8BA2\u5355\u7C7B\u578B:', prop: 'tradeSaleOrderType' },
          _react2.default.createElement(
            _elementReact.Select,
            { filterable: _dict.tradeSaleOrderType.length > 10, clearable: true, style: { width: '100%' }, value: tradeSaleOrderType != null ? String(tradeSaleOrderType) : '',
              onChange: onValueChange.bind(undefined, 'tradeSaleOrderType') },
            _dict.tradeSaleOrderType.map(function (el) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: el.value, label: el.label, value: el.value + '' });
            })
          )
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u5546\u54C1\u7C7B\u578B:', prop: 'productType' },
          _react2.default.createElement(
            _elementReact.Select,
            { filterable: _dict.productType.length > 10, clearable: true, style: { width: '100%' }, value: productType != null ? String(productType) : '',
              onChange: onValueChange.bind(undefined, 'productType') },
            _dict.productType.map(function (el) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: el.value, label: el.label, value: el.value + '' });
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
          { label: '\u9500\u552E\u65B9\u5F0F:', prop: 'salesType' },
          _react2.default.createElement(
            _elementReact.Select,
            { filterable: _dict.salesType.length > 10, clearable: true, style: { width: '100%' }, value: salesType != null ? salesType + '' : '',
              onChange: onValueChange.bind(undefined, 'salesType') },
            _dict.salesType.map(function (el) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: el.value, label: el.label, value: el.value + '' });
            })
          )
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u7ED3\u7B97\u65B9\u5F0F:', prop: 'payType' },
          _react2.default.createElement(
            _elementReact.Select,
            { style: { width: 'calc(100% - 20px)' }, value: payType == null ? '' : String(payType), onChange: onValueChange.bind(undefined, 'payType') },
            _dict.payType.map(function (el) {
              return _react2.default.createElement(
                _elementReact.Select.Option,
                { style: { display: 'flex', alignItems: 'center' }, key: el.value, label: el.label, value: el.value + '' },
                _react2.default.createElement(
                  'span',
                  null,
                  el.label
                ),
                _react2.default.createElement('i', { className: 'el-icon-close', style: { marginLeft: 'auto' }, onClick: function onClick(e) {
                    e.stopPropagation();
                    deletePayTypeDict(el.value);
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
          { label: '\u4EA4\u8D27\u65B9\u5F0F:', prop: 'deliveryType' },
          _react2.default.createElement(
            _elementReact.Select,
            { filterable: (0, _keys2.default)(_dict.deliveryType).length > 10, clearable: true, style: { width: '100%' }, value: deliveryType != null ? String(deliveryType) : '',
              onChange: onValueChange.bind(undefined, 'deliveryType') },
            _dict.deliveryType.map(function (el) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: el.value, label: el.label, value: el.value + '' });
            })
          )
        )
      ),
      _react2.default.createElement(
        _elementReact.Layout.Col,
        { span: 6 },
        _react2.default.createElement(
          _elementReact.Form.Item,
          { label: '\u5907\u6CE8:', prop: 'remark' },
          _react2.default.createElement(_elementReact.Input, { value: remark || '',
            onChange: onValueChange.bind(undefined, 'remark') })
        )
      )
    ),
    _react2.default.createElement(
      _elementReact.Layout.Row,
      { gutter: 10 },
      _react2.default.createElement(
        _elementReact.Form.Item,
        { label: '\u6536\u8D27\u5730\u5740:', prop: 'deliverAddress' },
        _react2.default.createElement(
          _elementReact.Layout.Col,
          { span: 3 },
          _react2.default.createElement(
            _elementReact.Select,
            { style: { width: '100%' }, value: provinceId != null ? String(provinceId) : '', clearable: true, filterable: _dict.provinceId.length > 10,
              onChange: onValueChange.bind(undefined, 'provinceId') },
            _dict.provinceId.map(function (el) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: el.value, label: el.label, value: el.value + '' });
            })
          )
        ),
        _react2.default.createElement(
          _elementReact.Layout.Col,
          { span: 3 },
          _react2.default.createElement(
            _elementReact.Select,
            { style: { width: '100%' }, value: cityId != null ? String(cityId) : '', clearable: true, filterable: _dict.provinceId.length > 10,
              onChange: onValueChange.bind(undefined, 'cityId') },
            _dict.cityId.map(function (el) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: el.value, label: el.label, value: el.value + '' });
            })
          )
        ),
        _react2.default.createElement(
          _elementReact.Layout.Col,
          { span: 3 },
          _react2.default.createElement(
            _elementReact.Select,
            { style: { width: '100%' }, value: districtId != null ? String(districtId) : '', clearable: true, filterable: _dict.provinceId.length > 10,
              onChange: onValueChange.bind(undefined, 'districtId') },
            _dict.districtId.map(function (el) {
              return _react2.default.createElement(_elementReact.Select.Option, { key: el.value, label: el.label, value: el.value + '' });
            })
          )
        ),
        _react2.default.createElement(
          _elementReact.Layout.Col,
          { span: 15 },
          _react2.default.createElement(_elementReact.Input, { value: deliverAddress || '',
            onChange: onValueChange.bind(undefined, 'deliverAddress') })
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
          { label: '\u5408\u540C\u6761\u6B3E:', prop: 'contractTerms' },
          _react2.default.createElement(_elementReact.Input, { value: contractTerms || '',
            onChange: onValueChange.bind(undefined, 'contractTerms') })
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
            { size: 'small', onClick: testOp },
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
          onFilter = details.onFilter,
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
          { title: flag === 'add' ? '新建销售订单' : '编辑销售订单', size: 'large', visible: show, top: '4%', onCancel: onClose, closeOnClickModal: false },
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
                { className: 'search-key', style: { marginLeft: 'auto', display: 'flex', flex: '0 0 420px' } },
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
                  { size: 'small', type: 'primary', icon: 'search', onClick: onFilter, style: { marginLeft: 10 } },
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