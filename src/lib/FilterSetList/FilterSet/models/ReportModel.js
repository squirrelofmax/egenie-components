'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _SubTableListModel = require('./SubTableListModel');

var _SubTableListModel2 = _interopRequireDefault(_SubTableListModel);

var _EgGridModel = require('../../../EgGrid/EgGridModel');

var _EgGridModel2 = _interopRequireDefault(_EgGridModel);

var _elementReact = require('element-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
api:{
  queryData,querySumCards
}
 */
var ReportModel = function ReportModel(_ref) {
  var _ref$getButtons = _ref.getButtons,
      getButtons = _ref$getButtons === undefined ? function () {
    return [];
  } : _ref$getButtons,
      grid = _ref.grid,
      subTables = _ref.subTables,
      options = (0, _objectWithoutProperties3.default)(_ref, ['getButtons', 'grid', 'subTables']);
  (0, _classCallCheck3.default)(this, ReportModel);

  _initialiseProps.call(this);

  (0, _mobx.extendObservable)(this, (0, _extends4.default)({
    parent: {},
    top: {},
    tab: { name: '', value: '' },
    hiddenSubTables: false,
    id: _shortid2.default.generate(),
    subTablesModel: {},
    gridModel: {},
    history: { cond: {} },
    buttons: getButtons(this),
    get buttonsPassPermissionValidate() {
      if (!this.buttons.length) return this.buttons;
      var permissionOfButton = this.top.parent.permissionOfButton;

      var buttons = this.buttons.map(function (el, idx) {
        // 给group按钮加idx属性
        var group = el.group;

        if (!group) return (0, _extends4.default)({}, el);
        var ret = (0, _extends4.default)({}, el, { idx: 0 });
        ret.group = ret.group.map(function (el, index) {
          return (0, _extends4.default)({}, el, { idx: index + 1 });
        });
        console.log('group的idx-------:', ret);
        return ret;
      });
      if (permissionOfButton == null) return buttons; // 没有权限控制，则全部显示
      return buttons.filter(function (el) {
        var permissionId = el.permissionId,
            group = el.group;

        if (group) return true; // group留给下一步处理
        if (permissionId == null) return true; // 没有permissionId字段说明不受权限影响
        return ~permissionOfButton.indexOf(permissionId);
      }).map(function (button) {
        var group = button.group,
            firstButton = (0, _objectWithoutProperties3.default)(button, ['group']);

        if (!group) {
          return button;
        }
        group = group.slice(0);
        group.unshift(firstButton); // 先把gourp放到同一个arr中
        var arr = group.filter(function (el) {
          return el.permissionId == null || ~permissionOfButton.indexOf(el.permissionId);
        }); // 过滤掉没权限的
        if (!arr.length) return false; // 如果都没权限，返回false，留给下一步再过滤掉
        var ret = arr.shift(); // 提出第一项为主按钮
        if (!arr.length) return ret; // 如果剩余的是空数组，直接返回第一项作为按钮而不是按钮组
        ret.group = arr; // 否则把剩余arr的装配个ret
        return ret;
      }).filter(function (button) {
        return button;
      }); // 过滤掉false
    },
    get _buttons() {
      // 最终页面展示的buttons，跟cashRows联动
      var buttonsPassPermissionValidate = this.buttonsPassPermissionValidate,
          _gridModel = this.gridModel,
          cashOn = _gridModel.cashOn,
          cashSelectedRows = _gridModel.cashSelectedRows;
      // 如果没有cashRows就不处理直接返回

      if (!buttonsPassPermissionValidate.length || !cashOn || !cashSelectedRows || !cashSelectedRows.length) return buttonsPassPermissionValidate;
      return buttonsPassPermissionValidate.map(function (button) {
        var group = button.group,
            firstButton = (0, _objectWithoutProperties3.default)(button, ['group']);
        var display = button.display;

        if (!group) {
          if (group) return button; // group留给下一步处理
          if (!display) return button;
          if (typeof display !== 'function') return button; // 如果没有display方法或者display不合法，那么就跟主按钮一起显隐
          return (0, _extends4.default)({}, button, { disabled: !display(cashSelectedRows) });
        }
        group = group.slice(0);
        group.unshift(firstButton); // 先把gourp放到同一个arr中
        var arr = group.map(function (button) {
          // 设置disabled
          var display = button.display;

          if (!display) return button;
          if (typeof display !== 'function') return button; // 如果没有display方法或者display不合法，那么就跟主按钮一起显隐
          return (0, _extends4.default)({}, button, { disabled: !display(cashSelectedRows) });
        });
        var idx = arr.findIndex(function (el) {
          return !el.disabled;
        }); // 第一个可用的坐标
        if (!~idx) return (0, _extends4.default)({}, arr[0], { group: arr.slice(1) // 全禁用，则以最初的第一按钮显示，并禁用
        });var item = arr.splice(idx, 1)[0];
        item.group = arr;
        if (item.isLabel && !~arr.findIndex(function (el) {
          return !el.disabled;
        })) item.disabled = true; // 如果剩余全禁用，第一个又只是label则全禁用
        return item;
      });
    },
    get searchData() {
      return this.top.searchData;
    },
    get isCursor() {
      return this.parent.activeTab === this.tab.value;
    },
    get isInited() {
      return this.parent.tabsFlag.inited[this.tab.value];
    },
    get isSearched() {
      return this.parent.tabsFlag.searched[this.tab.value];
    }
  }, options || {}));

  this.setGridModel(grid);
  this.setSubTablesModel(subTables);
}
/* 设置model */
;
// model


var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.onSearch = (0, _mobx.action)(function () {
    _this.gridModel.resetHeaderCheckBox(); // 重置表头的勾选框
    _this.gridModel.loading = true;
    var data = _this.searchData;
    /// /console.log(data, '点击搜索')
    var page = '1';
    var _history = _this.history,
        _history$pageSize = _history.pageSize,
        pageSize = _history$pageSize === undefined ? '50' : _history$pageSize,
        sidx = _history.sidx,
        sord = _history.sord;

    if (_this.top.edited && _this.parent.sumCards && _this.parent.sumCards.length) _this.querySumCards();
    _this.queryDataAndSetState({ cond: data, page: page, pageSize: pageSize, sidx: sidx, sord: sord }, true);
    // 操作EgGrid，设置页码为1，清空勾选数据,重置树表的expanded状态
    // this.gridModel.currentPage = 1
    _this.gridModel.selectedKeyValues = [];
    _this.gridModel.expanded = {};
    _this.gridModel.cashSelectedRows = [];
  });
  this.queryDataAndSetState = (0, _mobx.action)(function (data, isSearch) {
    var tabValue = _this.tab.value;
    var _data = JSON.parse((0, _stringify2.default)(data));
    _this.api.queryData && _this.api.queryData(_data, tabValue, _this).then((0, _mobx.action)(function (v) {
      if (isSearch) {
        // 点击查询才会恢复edited状态
        if (_this.top.edited) {
          // 条件修改过那么清空searched，edited恢复false
          _this.parent.tabsFlag.searched = {};
          _this.top.edited = false;
        }
        _this.parent.tabsFlag.searched = (0, _extends4.default)({}, _this.parent.tabsFlag.searched, (0, _defineProperty3.default)({}, tabValue, true));
      }
      _this.gridModel.loading = false;
      _this.top.history = data;
      _this.gridModel.currentPage = data.page;
      _this.gridModel.size = data.pageSize;
      if (v.status !== 'Successful') {
        _this.gridModel.rows = [];
        _this.gridModel.total = 0;
        return _elementReact.Message.error(v.data);
      }
      _this.gridModel.rows = v.data ? v.data.list : [];
      _this.gridModel.total = v.data ? v.data.totalCount : 0;
    }));
  });
  this.prevHandleDataFromInner = (0, _mobx.action)(function (innerState) {
    var history = _this.top.history;
    var data = (0, _assign2.default)({}, history);
    data.page = innerState.currentPage + '';
    data.pageSize = innerState.size + '';
    return data;
  });
  this.handlePageOrSizeChange = (0, _mobx.action)(function (innerState) {
    var data = _this.prevHandleDataFromInner(innerState);
    _this.queryDataAndSetState(data);
  });
  this.querySumCards = (0, _mobx.action)(function () {
    _this.api.querySumCards && _this.api.querySumCards(_this.searchData).then((0, _mobx.action)(function (sumData) {
      if (sumData.status !== 'Successful') return _elementReact.Message.error(sumData.data);
      var sumCards = _this.parent.sumCards;

      (0, _keys2.default)(sumData.data).forEach((0, _mobx.action)(function (key) {
        var item = sumCards.find(function (el) {
          return el.field === key;
        });
        if (item) item.value = sumData.data[key];
      }));
    }));
  });
  this.onRefresh = (0, _mobx.action)(function () {
    var data = _this.top.history;
    _this.queryDataAndSetState(data);
  });
  this.onSortAll = (0, _mobx.action)(function (_ref2) {
    var sidx = _ref2.sidx,
        sord = _ref2.sord;

    var data = (0, _extends4.default)({}, _this.history, { sidx: sidx, sord: sord });
    _this.queryDataAndSetState(data);
  });
  this.onRowClick = (0, _mobx.action)(function (id, row) {
    // 一般用id就可以，特殊需求就用第二个参数row
    var _subTablesModel = _this.subTablesModel,
        cursorTabModel = _subTablesModel.cursorTabModel,
        tabsFlag = _subTablesModel.tabsFlag;

    tabsFlag.searched = {}; // 能进来说明点击的是不同行，所以清空searchFlag
    cursorTabModel && cursorTabModel.onSearch();
  });
  this.setGridModel = (0, _mobx.action)(function (grid) {
    var handlePageOrSizeChange = _this.handlePageOrSizeChange,
        onSortAll = _this.onSortAll,
        onRowClick = _this.onRowClick,
        onRefresh = _this.onRefresh;
    // 配置

    _this.gridModel = new _EgGridModel2.default((0, _extends4.default)({}, grid, {
      columns: grid.getColumns(_this),
      api: {
        onPageChange: handlePageOrSizeChange,
        onSizeChange: handlePageOrSizeChange,
        onSortAll: onSortAll, // 排序
        onRowClick: onRowClick, // 行点击
        onRefresh: onRefresh
      }
    }));
  });
  this.setSubTablesModel = (0, _mobx.action)(function (subTables) {
    _this.subTablesModel = new _SubTableListModel2.default((0, _extends4.default)({}, subTables, { top: _this }));
  });
};

exports.default = ReportModel;