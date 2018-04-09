'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _SubTableModel = require('./SubTableModel');

var _SubTableModel2 = _interopRequireDefault(_SubTableModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubTableListModel = function SubTableListModel(_ref) {
  var _ref$list = _ref.list,
      list = _ref$list === undefined ? [] : _ref$list,
      options = (0, _objectWithoutProperties3.default)(_ref, ['list']);
  (0, _classCallCheck3.default)(this, SubTableListModel);

  _initialiseProps.call(this);

  (0, _mobx.extendObservable)(this, (0, _extends4.default)({
    id: _shortid2.default.generate(),
    activeTab: '',
    tabsFlag: {
      inited: {},
      searched: {}
    },
    list: [],
    listModel: [],
    top: {},
    get cursorTabModel() {
      var _this = this;

      return this.listModel.find(function (el) {
        return el.tab.value === _this.activeTab;
      });
    }
  }, options || {}));
  this.setListModel(list);
};
// model


var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onClickTab = (0, _mobx.action)(function (tabName) {
    _this2.activeTab = tabName;
    var _tabsFlag = _this2.tabsFlag,
        inited = _tabsFlag.inited,
        searched = _tabsFlag.searched;

    _this2.tabsFlag.inited = (0, _extends4.default)({}, inited, (0, _defineProperty3.default)({}, tabName, true)); // 初始化开关开，查询开关由内部的subTableModel设置，只要查了就设置
    if (!searched[tabName]) {
      // 如果该页签在最近一次行点击后还未获取过数据，那么search
      if (_this2.cursorTabModel) _this2.cursorTabModel.onSearch();
    }
  });
  this.setListModel = (0, _mobx.action)(function (list) {
    _this2.listModel = list.map(function (el) {
      var _el$grid = el.grid,
          getColumns = _el$grid.getColumns,
          restOfGrid = (0, _objectWithoutProperties3.default)(_el$grid, ['getColumns']);

      var grid = (0, _extends4.default)({ columns: getColumns(_this2.top) }, restOfGrid);
      return new _SubTableModel2.default((0, _extends4.default)({}, el, { grid: grid, parent: _this2, top: _this2.top }));
    }, _this2);
  });
  this.resetWhenDeleteCursorRowOfMainGrid = (0, _mobx.action)(function (id) {
    // 供外部调用
    var _top$gridModel = _this2.top.gridModel,
        cursorRow = _top$gridModel.cursorRow,
        primaryKeyField = _top$gridModel.primaryKeyField;

    if (id == null || id !== cursorRow[primaryKeyField]) return;
    console.log('执行resetWhenDeleteCursorRowOfMainGrid');
    _this2.top.gridModel.cursorRow = {};
    _this2.listModel.forEach(function (el) {
      (0, _mobx.set)(el.gridModel, {
        rows: [], total: 0, currentPage: 1, selectedKeyValues: [], cashSelectedRows: [], expanded: {}, treeCash: {}
      });
      el.gridModel.resetHeaderCheckBox();
    });
  });
};

exports.default = SubTableListModel;