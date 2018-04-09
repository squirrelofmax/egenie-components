'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _elementReact = require('element-react');

var _requests = require('../requests');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
var MultiEditModel = function MultiEditModel(options) {
  var _this = this;

  (0, _classCallCheck3.default)(this, MultiEditModel);
  this.toggleShow = (0, _mobx.action)(function () {
    _this.show = !_this.show;
  });
  this.onValueChange = (0, _mobx.action)(function (key, value) {
    _this.sideEffectWhenValueChange(key, value);
    _this[key] = value;
  });
  this.sideEffectWhenValueChange = (0, _mobx.action)(function (key, value) {
    if (key === 'plan_arrival_num') _this.confirmed_num = value;
    if (key === 'plan_arrival_price') _this.confirmed_price = value;
  });
  this.onReset = (0, _mobx.action)(function () {
    console.log('执行onReset-------');
    (0, _assign2.default)(_this, _this.initValue);
    _this.purchase_unit_options_key = 'all';
  });
  this.onSave = (0, _mobx.action)(function () {
    console.log('执行onSave-------');
    var ids = _this.top.details.gridModel.selectedKeyValues;
    var idKey = 'skuId';
    var items = _this.top.details.gridModel.rows.filter(function (el) {
      var onlyId = el[idKey];
      return ids.find(function (id) {
        return id === onlyId;
      });
    });

    var formData = _this.formData;

    var finalData = (0, _keys2.default)(formData).reduce(function (a, b) {
      if (formData[b]) a[b] = formData[b];
      return a;
    }, {});

    items.forEach(function (el) {
      if (el.dataStatusForApi == null) el.dataStatusForApi = 2;
      (0, _keys2.default)(finalData).forEach(function (key) {
        el[key] = finalData[key];
      });
    });

    _this.show = false;
    _this.onReset();
    _elementReact.Message.success('修改完成！');
  });
  this.onClose = (0, _mobx.action)(function () {
    console.log('执行onClose-------');
    _elementReact.MessageBox.confirm('未保存, 是否确认关闭?', '提示', { type: 'warning' }).then(function () {
      _this.show = false;
      _this.onReset();
    });
  });

  this.initValue = {
    customer: '', // 客户
    taxRate: null, // 税率
    salePrice: null, // 含税售价
    planSendDate: null, // 预计送货日期
    saleNum: null // 销售数量
  };
  (0, _mobx.extendObservable)(this, this.initValue);
  (0, _mobx.extendObservable)(this, (0, _extends3.default)({
    id: _shortid2.default.generate(),
    show: false,
    purchase_unit_options_key: 'all',
    get formData() {
      var ret = JSON.parse((0, _stringify2.default)(this, (0, _keys2.default)(this.initValue)));
      ret.plan_arrival_date = this.plan_arrival_date;
      return ret;
    },
    top: {}
  }, options || {}));
}

/**
 * actions
 */
;

exports.default = MultiEditModel;