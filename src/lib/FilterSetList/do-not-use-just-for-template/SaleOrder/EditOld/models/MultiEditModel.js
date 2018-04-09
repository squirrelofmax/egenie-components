'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _elementReact = require('element-react');

var _validateNumber = require('../../../../modules/validateNumber');

var _validateNumber2 = _interopRequireDefault(_validateNumber);

var _requests = require('../requests');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MultiEditModel = function () {
  function MultiEditModel(options) {
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
    this.onBlur = (0, _mobx.action)(function (key) {
      var _validateNumberAndCha = _this.validateNumberAndChangeItIfNeed(key, _this[key]),
          value = _validateNumberAndCha.value,
          change = _validateNumberAndCha.change;

      if (change) {
        _this.sideEffectWhenValueChange(key, value);
        _this[key] = value;
      }
    });
    this.onReset = (0, _mobx.action)(function () {
      console.log('执行onReset-------');
      (0, _assign2.default)(_this, _this.initValue);
      _this.purchase_unit_options_key = 'all';
    });
    this.onSave = (0, _mobx.action)(function () {
      console.log('执行onSave-------');
      var ids = _this.top.details.gridRef.state.selectedKeyValues;
      var idKey = _this.top.flag === 'add' ? 'onlyId' : 'pms_purchase_order_detail_id';
      var items = _this.top.details.rows.filter(function (el) {
        var onlyId = el[idKey];
        return ids.find(function (id) {
          return id === onlyId;
        });
      });

      var formData = _this.formData,
          purchase_unit_id = _this.purchase_unit_id,
          changeNumAndPriceWhenUintChange = _this.top.details.changeNumAndPriceWhenUintChange;

      var finalData = (0, _keys2.default)(formData).reduce(function (a, b) {
        if (formData[b]) a[b] = b === 'tax_rate' ? formData[b] + '%' : formData[b];
        return a;
      }, {});

      var foo = function foo() {
        if (purchase_unit_id) // 采购单位改变时的联动
          {
            items.forEach(function (item) {
              return changeNumAndPriceWhenUintChange(item, purchase_unit_id);
            });
          }

        // 统一赋值,空白就忽略,税率+%
        items.forEach(function (el) {
          (0, _keys2.default)(finalData).forEach(function (key) {
            el[key] = finalData[key];
          });
        });

        _this.show = false;
        _this.onReset();
        return _elementReact.Message.success('修改完成！');
      };

      if (_this.top.flag === 'add') return foo();
      if (finalData['plan_arrival_date']) {
        finalData['plan_arrival_date'] = finalData['plan_arrival_date'].toLocaleDateString().split('/').map(function (el) {
          return el.padStart(2, '0');
        }).join('-');
      }
      var organization_id = finalData.organization_id,
          rest = (0, _objectWithoutProperties3.default)(finalData, ['organization_id']);

      organization_id = organization_id.length ? organization_id[organization_id.length - 1] : null;
      rest = organization_id == null ? rest : (0, _extends3.default)({}, rest, { organization_id: organization_id });
      (0, _requests.multiUpdate)((0, _extends3.default)({ ids: ids.join(',') }, rest)).then(function (v) {
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        foo();
      });
    });
    this.onClose = (0, _mobx.action)(function () {
      console.log('执行onClose-------');
      _elementReact.MessageBox.confirm('未保存, 是否确认关闭?', '提示', { type: 'warning' }).then(function () {
        _this.show = false;
        _this.onReset();
      });
    });

    this.initValue = {
      warehouse_id: '', // 仓库
      vendor_id: '', // 供应商
      purchase_unit_id: '', // 采购单位
      tax_rate: '', // 税率
      plan_arrival_price: '', // 含税单价
      plan_arrival_date: '', // 预计到货日期
      sales_type: '', // 销售方式
      pay_type: '', // 结算方式
      plan_arrival_num: '', // 计划采购数量
      confirmed_price: '', // 供应商确认含税单价
      confirmed_num: '', // 供应商确认数量
      organization_id: []
    };
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
    }, this.initValue, options || {}));
  }

  /**
   * actions
   */


  (0, _createClass3.default)(MultiEditModel, [{
    key: 'validateNumberAndChangeItIfNeed',


    /**
     * utils
     */

    value: function validateNumberAndChangeItIfNeed(key, value) {
      var ruleItem = this.top.details.numValidateRules[key];
      if (ruleItem) return { value: (0, _validateNumber2.default)((0, _extends3.default)({}, ruleItem, { value: value })), change: true };
      return { value: value };
    }
  }]);
  return MultiEditModel;
}(); /* eslint-disable camelcase */


exports.default = MultiEditModel;