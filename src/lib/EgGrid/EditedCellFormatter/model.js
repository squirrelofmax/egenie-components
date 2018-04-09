'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.getEditedCellModelList = getEditedCellModelList;
exports.getMapOfFieldToEditedCellModel = getMapOfFieldToEditedCellModel;
exports._getTreeOptions = _getTreeOptions;

var _mobx = require('mobx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * options:{
 *     rawRow,//用于直接操作源row
 *    isDisabled,//供调用的方法
 *    field,
 *    style,
 *    getClass,
 *    getValue:()=>{}
 *    accessor:{
 *      valueChange:'',//eg,handleCellValueChange
 *      blur:'handleCellBlur'
 *     }
 * }
 */
// 生成单元格的model
var EditedCellModel = function EditedCellModel(_ref) {
  var _this = this;

  var _ref$parent = _ref.parent,
      parent = _ref$parent === undefined ? {} : _ref$parent,
      _ref$rawRow = _ref.rawRow,
      rawRow = _ref$rawRow === undefined ? {} : _ref$rawRow,
      field = _ref.field,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$min = _ref.min,
      min = _ref$min === undefined ? 0 : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === undefined ? Infinity : _ref$max,
      _ref$step = _ref.step,
      step = _ref$step === undefined ? 1 : _ref$step,
      _ref$unit = _ref.unit,
      unit = _ref$unit === undefined ? '' : _ref$unit,
      _ref$clearable = _ref.clearable,
      clearable = _ref$clearable === undefined ? true : _ref$clearable,
      _ref$filterable = _ref.filterable,
      filterable = _ref$filterable === undefined ? true : _ref$filterable,
      _ref$getFilterable = _ref.getFilterable,
      getFilterable = _ref$getFilterable === undefined ? function (options) {
    return options && options.length > 10;
  } : _ref$getFilterable,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? [] : _ref$options,
      _ref$getOptions = _ref.getOptions,
      getOptions = _ref$getOptions === undefined ? function () {
    return options;
  } : _ref$getOptions,
      _ref$justOnceNotForev = _ref.justOnceNotForever,
      justOnceNotForever = _ref$justOnceNotForev === undefined ? false : _ref$justOnceNotForev,
      _ref$accessor = _ref.accessor,
      accessor = _ref$accessor === undefined ? {
    valueChange: 'handleCellValueChange',
    blur: 'handleCellBlur'
  } : _ref$accessor,
      _ref$isDisabled = _ref.isDisabled,
      isDisabled = _ref$isDisabled === undefined ? function () {
    return false;
  } : _ref$isDisabled,
      _ref$getClass = _ref.getClass,
      getClass = _ref$getClass === undefined ? function () {
    return '';
  } : _ref$getClass,
      _ref$disabledDate = _ref.disabledDate,
      disabledDate = _ref$disabledDate === undefined ? function () {
    return false;
  } : _ref$disabledDate,
      _ref$treeOptions = _ref.treeOptions,
      treeOptions = _ref$treeOptions === undefined ? [] : _ref$treeOptions,
      _ref$getTreeOptions = _ref.getTreeOptions,
      getTreeOptions = _ref$getTreeOptions === undefined ? _getTreeOptions : _ref$getTreeOptions,
      _ref$treeOptionsAcces = _ref.treeOptionsAccessor,
      treeOptionsAccessor = _ref$treeOptionsAcces === undefined ? '' : _ref$treeOptionsAcces,
      _ref$treeProps = _ref.treeProps,
      treeProps = _ref$treeProps === undefined ? { value: 'id', label: 'name', children: 'children' } : _ref$treeProps,
      getValue = _ref.getValue;
  (0, _classCallCheck3.default)(this, EditedCellModel);
  this.oldBlurValue = '';
  this.oldChangeValue = '';
  var valueChange = accessor.valueChange,
      blur = accessor.blur;

  (0, _mobx.extendObservable)(this, {
    parent: parent,
    rawRow: rawRow,
    field: field,
    style: style,
    min: min, // number组件专用
    max: max, // number组件专用
    step: step, // number组件专用
    unit: unit, // number组件专用
    options: options, // [{label:'',value:''}]
    clearable: clearable,
    justOnceNotForever: justOnceNotForever, // options只监听外部字典项的初始化
    treeOptions: getTreeOptions ? getTreeOptions(treeOptions) : treeOptions, // 默认执行数据格式转换，如果传的是转换好的treeOptions那么请把getTreeOptions设为null
    treeOptionsAccessor: treeOptionsAccessor,
    treeProps: treeProps,
    get value() {
      return typeof getValue === 'function' ? getValue(this.rawRow) : this.rawRow[field];
    },
    get disabled() {
      return isDisabled(this); // 可以通过this获取当前单元格信息，进而通过this.parent获取外层信息
    },
    get _class() {
      return getClass(this);
    },
    get filterable() {
      return filterable && getFilterable && getFilterable(this.options);
    }
  });
  this.handleCellValueChange = (0, _mobx.action)(function (value) {
    // 交给外部做，不仅仅改变row的值，还会发生各种联动
    var _value = Array.isArray(value) ? value.toString() : value; // 考虑到树形下拉组件传递进来的是个array，且每次只是内部value变，数组还是同一个数组
    if (_value === _this.oldChangeValue) return true;
    _this.oldChangeValue = _value;
    return _this.parent[valueChange] && _this.parent[valueChange](_this.field, value, _this.rawRow); // row确定是源row，可以直接操作
  });
  this.handleCellBlur = (0, _mobx.action)(function () {
    var _value = Array.isArray(_this.value) ? _this.value.toString() : _this.value;
    if (_value === _this.oldBlurValue) return;
    _this.oldBlurValue = _value;
    _this.parent[blur] && _this.parent[blur](_this.field, _this.value, _this.rawRow);
  });

  if (typeof getOptions === 'function') {
    _promise2.default.resolve(getOptions(this.rawRow, this.field, this.value)).then(function (v) {
      // 获取下拉选项，外部接口可根据参数做缓存
      if (!v || !Array.isArray(v)) return;
      _this.options = v;
    });
  }
  if (typeof getOptions === 'string') {
    console.log('getOptions----', getOptions);
    var getOptionsByAccessor = function getOptionsByAccessor() {
      return getOptions.split('.').reduce(function (res, key) {
        return res[key];
      }, _this.parent);
    };
    var setOptionsByAccessor = function setOptionsByAccessor() {
      _this.options = getOptionsByAccessor();
    };
    setOptionsByAccessor();
    if (!this.justOnceNotForever) (0, _mobx.autorun)(setOptionsByAccessor);else (0, _mobx.when)(function () {
      return getOptionsByAccessor().length > 0;
    }, setOptionsByAccessor);
  }

  if (treeOptionsAccessor) {
    var _getOptionsByAccessor = function _getOptionsByAccessor() {
      var ret = getOptions.split('.').reduce(function (res, key) {
        return res[key];
      }, _this.parent);
      return getTreeOptions ? getTreeOptions(ret) : ret;
    };
    var _setOptionsByAccessor = function _setOptionsByAccessor() {
      _this.treeOptions = _getOptionsByAccessor();
    };
    _setOptionsByAccessor();
    if (!this.justOnceNotForever) (0, _mobx.autorun)(_setOptionsByAccessor);else (0, _mobx.when)(function () {
      return _getOptionsByAccessor().length > 0;
    }, _setOptionsByAccessor);
  }
};

function getEditedCellModelList(rawRow, config, parent) {
  // config是array,['field1',{field:'',isDisabled:()=>{}},'field3']
  return config.map(function (el) {
    var field = typeof el === 'string' ? el : el.field;
    if (!rawRow.hasOwnProperty(field)) (0, _mobx.extendObservable)(rawRow, (0, _defineProperty3.default)({}, field, null));
    if (typeof el === 'string') return new EditedCellModel({ field: el, parent: parent, rawRow: rawRow });
    return new EditedCellModel((0, _extends3.default)({}, el, { parent: parent, rawRow: rawRow }));
  });
}

function getMapOfFieldToEditedCellModel(rawRow, config, parent) {
  // config是array,['field1',{field:'',isDisabled:()=>{}},'field3']
  return getEditedCellModelList(rawRow, config, parent).reduce(function (res, a) {
    res[a.field] = a;
    return res;
  }, {});
}

exports.default = EditedCellModel;
function _getTreeOptions(data) {
  data = data ? data.slice(0) : [];
  var postData = [];

  if (data && data.length > 0) {
    if (!data[0].hasOwnProperty('pid')) {
      postData = data;
    } else {
      (function () {
        var transformData = {};

        data.forEach(function (item) {
          if (item.pid == null || item.pid === '' || item.isParent === 'true') {
            // item.children = [];
            postData.push(item);
          } else {
            // item.children = [];
            if (transformData[item.pid]) {
              transformData[item.pid].push(item);
            } else {
              transformData[item.pid] = [item];
            }
          }
        });

        var classData = postData;

        var _loop = function _loop() {
          var arr = [];
          classData.forEach(function (item) {
            if (transformData[item.id]) {
              item.children = transformData[item.id];
              arr = arr.concat(item.children || []);
              delete transformData[item.id];
            }
          });

          if (arr.length === 0) {
            (0, _keys2.default)(transformData).forEach(function (item) {
              console.log(item);
              transformData[item].forEach(function (obj) {
                postData.push(obj);
              });
            });
            return 'break';
          } else {
            classData = arr;
          }
        };

        while ((0, _keys2.default)(transformData).length !== 0) {
          var _ret2 = _loop();

          if (_ret2 === 'break') break;
        }
      })();
    }
  }
  return postData;
}