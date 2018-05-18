'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _FilterSetModel = require('./FilterSet/models/FilterSetModel');

var _FilterSetModel2 = _interopRequireDefault(_FilterSetModel);

var _elementReact = require('element-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterSetListModel = function FilterSetListModel() {
  var _this = this;

  (0, _classCallCheck3.default)(this, FilterSetListModel);
  this.getConfigOver = false;
  this.onTabsClick = (0, _mobx.action)(function (tab) {
    console.log('执行tab点击事件，参数tab的值为：', tab);
    // 初始化要执行一遍查询
    if (!_this.tabsFlag.inited[tab.props.name]) _this.filterSetList.find(function (el) {
      return el.name === tab.props.name;
    }).handleSearch();
    _this.tabsFlag.inited = (0, _extends4.default)({}, _this.tabsFlag.inited, (0, _defineProperty3.default)({}, tab.props.name, true));
    _this.activeTabName = tab.props.name;
    setTimeout(function () {
      return window.dispatchEvent(new Event('resize'));
    }, 0);
  });
  this.onAddNew = (0, _mobx.action)(function (data) {
    // this.configOfFilterItems = this.configOfFilterItems.concat([data])
    _this.filterSetList = _this.filterSetList.concat([_this.getFilterSetModelByConfig(data)]);
  });
  this.deleteFilterSet = (0, _mobx.action)(function (name) {
    console.log('执行删除方法，name：' + name);
    _elementReact.MessageBox.confirm('彻底删除后数据将无法恢复，您确定要删除吗？', '确认', { type: 'info' }).then(function () {
      // const idx = this.configOfFilterItems.findIndex(el => el.scheme_name === name)
      var idx = _this.filterSetList.findIndex(function (el) {
        return el.name === name;
      });
      if (~idx) {
        var middle = _this.filterSetList.slice(0);
        middle.splice(idx, 1);
        _this.filterSetList = middle;
        _this.api.deleteScheme(name); // TODO:需要在子类中设置
        _this.activeTabName = 'def';
      }
    });
  });

  this.assignFilterSetList = function () {
    var configOfFilterItems = _this.configOfFilterItems,
        getConfigOver = _this.getConfigOver;

    _this.filterSetList = getConfigOver ? _this.filterSetList.concat(configOfFilterItems.slice(1).map(_this.getFilterSetModelByConfig)) : configOfFilterItems.map(_this.getFilterSetModelByConfig);
  };

  this.getFilterSetModelByConfig = function (_ref) {
    var scheme_name = _ref.scheme_name,
        sys_setting = _ref.sys_setting,
        tab_label = _ref.tab_label,
        scheme_value = _ref.scheme_value,
        display_setting = _ref.display_setting;

    return new _FilterSetModel2.default((0, _extends4.default)({}, _this.getFilterSetConfig(), { // TODO:需要在子类中设置
      name: scheme_name,
      setValue: scheme_value,
      displaySetting: display_setting,
      // 下面两个涉及到方案标题栏，还有上方的scheme_name
      sysSetting: sys_setting,
      tabLabel: tab_label
    }));
  };

  (0, _mobx.extendObservable)(this, {
    id: _shortid2.default.generate(),
    tabsFlag: { // 对tabs渲染的控制
      inited: { def: true },
      searched: {}
    },
    activeTabName: 'def',
    configOfFilterItems: [// 查询方案的配置，在filteritems的render中装配，不过在顶层获取配置数据有要做一定的解析，统一格式，才能保证在filteritems中装配成功
    {
      scheme_name: 'def',
      scheme_value: '',
      tab_label: '默认方案',
      display_setting: null,
      item_list: {},
      old_set: [],
      dict_list: {},
      sys_setting: true
    }],
    permissionOfButton: null, // 按钮权限，从后台获取，目前只在非report页面有用
    get cursorFilterSetModel() {
      var _this2 = this;

      return this.filterSetList.find(function (el) {
        return el.name === _this2.activeTabName;
      });
    }
  });

  _promise2.default.resolve().then(function (v) {
    _this.assignFilterSetList();
    _this.cursorFilterSetModel.handleSearch();
    _this.isReport && _this.cursorFilterSetModel.reportListModel.cursorTabModel.querySumCards();
  });
}
// FilterSet生成方案后回调

// 根据configOfFilterItems装配filterSetList
;

exports.default = FilterSetListModel;