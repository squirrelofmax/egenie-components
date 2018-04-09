'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterItemModel = function () {
  function FilterItemModel(options) {
    (0, _classCallCheck3.default)(this, FilterItemModel);

    _initialiseProps.call(this);

    options = this.initValueByType(options);
    (0, _mobx.extendObservable)(this, (0, _extends3.default)({
      id: _shortid2.default.generate(),
      field: '',
      type: '',
      label: '',
      hiddenColon: '',
      labelStyle: '',
      clearable: true,
      value: '',
      initValue: '', // 重置时用，只还原value，不还原顺序
      initIndex: '', // 恢复默认顺序时用,保存设置的顺序时会更新这个字段为当前index
      initDisplay: true, // 恢复默认显示时用
      options: [],
      labelField: '',
      valueField: '',
      display: true,
      disabledDate: function disabledDate() {
        return false;
      }, // 日期不可选范围
      top: {},
      get searchValue() {
        var type = this.type,
            value = this.value,
            label = this.label,
            options = this.options,
            valueField = this.valueField,
            labelField = this.labelField;

        if (type === 'date') return this.formatDateToStr(value);
        if (type === 'year') return this.formatYearToStr(value);
        if (type === 'numbergroup') {
          var _value$min = value.min,
              min = _value$min === undefined ? '' : _value$min,
              _value$max = value.max,
              max = _value$max === undefined ? '' : _value$max;

          return !min && !max ? '' : min + ',' + max;
        }
        if (label === '省' || label === '市' || label === '区县') {
          var item = options && options.find(function (ssq) {
            return ssq[valueField] === value;
          });
          return (item ? item[labelField] : '') + '';
        }
        return value + '';
      }
    }, options));
  }

  /**
   * actions
   */

  /**
   * utils
   */


  (0, _createClass3.default)(FilterItemModel, [{
    key: 'formatDateToStr',
    value: function formatDateToStr(ts) {
      if (!ts) {
        return '';
      }
      if (typeof ts === 'string') {
        return ts;
      }
      var d = typeof ts === 'number' ? new Date(ts) : ts;
      var ydm = [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(function (el) {
        return String(el).padStart(2, 0);
      }).join('-');
      var hms = [d.getHours(), d.getMinutes(), d.getSeconds()].map(function (el) {
        return String(el).padStart(2, 0);
      }).join(':');
      return ydm + ' ' + hms;
    }
  }, {
    key: 'formatYearToStr',
    value: function formatYearToStr(ts) {
      if (!ts) {
        return '';
      }
      if (typeof ts === 'string') {
        return ts;
      }
      var d = typeof ts === 'number' ? new Date(ts) : ts;
      return d.getFullYear() + '';
    }
  }]);
  return FilterItemModel;
}();

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.handleValueChange = (0, _mobx.action)(function (value) {
    _this.top.edited = true;
    var _v = _this.value;
    _this.value = value;
    var onItemsChange = _this.top.api.onItemsChange;

    onItemsChange && onItemsChange(_this, _this.field, value, _v);
  });
  this.handleTextChange = (0, _mobx.action)(function (value) {
    _this.handleValueChange(value);
  });
  this.handleSelectChange = (0, _mobx.action)(function (value) {
    _this.handleValueChange(value);
  });
  this.handleNumberGroupChange = (0, _mobx.action)(function (key, v) {
    _this.top.edited = true;
    var _v = _this.value[key];
    _this.value[key] = v;
    var onItemsChange = _this.top.api.onItemsChange;

    onItemsChange && onItemsChange(_this, _this.field, v, _v, key);
  });
  this.handleDateChange = (0, _mobx.action)(function (value) {
    _this.handleValueChange(value);
    if (_this.field === 'dateValueStart') {
      var item = _this.top.filteritems.find(function (_ref) {
        var field = _ref.field;
        return field === 'dateValueEnd';
      });
      item.disabledDate = function (time) {
        if (value == null) return false;
        return time.getTime() <= value.getTime() - 8.64e7;
      };
    }
    if (_this.field === 'dateValueEnd') {
      var _item = _this.top.filteritems.find(function (_ref2) {
        var field = _ref2.field;
        return field === 'dateValueStart';
      });
      _item.disabledDate = function (time) {
        if (value == null) return false;
        return time.getTime() >= value.getTime() + 1;
      };
    }
  });
  this.handleYearChange = (0, _mobx.action)(function (value) {
    _this.handleValueChange(value);
  });
  this.onKeyUp = (0, _mobx.action)(function (e) {
    if (e.keyCode === 13) {
      _this.top.handleSearch();
    }
  });

  this.initValueByType = function (options) {
    // 对初始值的解析可以放到这里
    if (!options || (typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) !== 'object') return {};
    var type = options.type,
        value = options.value;

    if (type === 'text') {
      if (!value) return (0, _extends3.default)({}, options, { value: '', initValue: '' });
    }
    if (type === 'select') {
      if (!value) return (0, _extends3.default)({}, options, { value: '', initValue: '' });
    }
    if (type === 'multiselect') {
      if (!value) return (0, _extends3.default)({}, options, { value: [], initValue: [] });
      if (typeof value === 'string') return (0, _extends3.default)({}, options, { value: value.split(','), initValue: value.split(',') });
    }
    if (type === 'numbergroup') {
      // 值为空
      if (!value) return (0, _extends3.default)({}, options, { value: { min: '', max: '' }, initValue: { min: '', max: '' }
        // 值符合标准
      });if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' && value.hasOwnProperty('min') && value.hasOwnProperty('max')) return (0, _extends3.default)({}, options, { initValue: value
        // 值是'0，100'这样的字符串
      });if (typeof value === 'string' && value.split(',').length == 2) {
        var arr = value.split(',');
        var newValue = { min: arr[0], max: arr[1] };
        return (0, _extends3.default)({}, options, { value: newValue, initValue: (0, _extends3.default)({}, newValue) });
      }
      // ...其他情况
    }
    if (type === 'date') {
      if (!value) return (0, _extends3.default)({}, options, { value: null, initValue: null });
      if (typeof value === 'string' || typeof value === 'number') return (0, _extends3.default)({}, options, { value: new Date(value), initValue: new Date(value)
        // ...其他情况
      });
    }
    return (0, _extends3.default)({}, options, { value: value, initValue: value });
  };
};

exports.default = FilterItemModel;