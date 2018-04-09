'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _EgGridModel = require('@/utils/EgGrid/EgGridModel');

var _EgGridModel2 = _interopRequireDefault(_EgGridModel);

var _elementReact = require('element-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
api:{
  queryData
}
 */

// model
var SubTableModel = function () {
  function SubTableModel(_ref) {
    var _this = this;

    var api = _ref.api,
        grid = _ref.grid,
        _ref$getButtons = _ref.getButtons,
        getButtons = _ref$getButtons === undefined ? function () {
      return [];
    } : _ref$getButtons,
        options = (0, _objectWithoutProperties3.default)(_ref, ['api', 'grid', 'getButtons']);
    (0, _classCallCheck3.default)(this, SubTableModel);
    this.onFilterValueChange = (0, _mobx.action)(function (key, value) {
      if (_this.allFilteritemsInOneGroup) return _this.cursorFilteritem && (_this.cursorFilteritem.value = value);
      var item = _this.filteritems.find(function (el) {
        return el.field === key;
      });
      if (item) item.value = value;
    });
    this.onCursorFilteritemFieldChange = (0, _mobx.action)(function (field) {
      var clearAfterChangeFilteritem = _this.clearAfterChangeFilteritem,
          cursorFilteritem = _this.cursorFilteritem;

      if (clearAfterChangeFilteritem && cursorFilteritem) cursorFilteritem.value = '';
      _this.cursorFilteritemField = field;
    });
    this.onSearch = (0, _mobx.action)(function () {
      _this.gridModel.resetHeaderCheckBox(); // 重置表头的勾选框
      _this.gridModel.loading = true;
      var data = _this.searchData;
      console.log(data, '点击搜索');
      var page = '1';
      var _history = _this.history,
          _history$pageSize = _history.pageSize,
          pageSize = _history$pageSize === undefined ? '50' : _history$pageSize,
          sidx = _history.sidx,
          sord = _history.sord;

      if (_this.gridModel.hiddenPager) {
        _this.queryDataAndSetState({ cond: data });
      } else {
        _this.queryDataAndSetState({ cond: data, page: page, pageSize: pageSize, sidx: sidx, sord: sord });
      }
      // 操作EgGrid，设置页码为1，清空勾选数据,重置树表的expanded状态
      // this.gridModel.currentPage = 1
      _this.gridModel.selectedKeyValues = [];
      _this.gridModel.expanded = {};
      _this.gridModel.cashSelectedRows = [];
    });
    this.queryDataAndSetState = (0, _mobx.action)(function (data) {
      var _top$gridModel = _this.top.gridModel,
          cursorRow = _top$gridModel.cursorRow,
          primaryKeyField = _top$gridModel.primaryKeyField;

      var pid = cursorRow[primaryKeyField];
      if (!pid) return _this.gridModel.loading = false;
      _this.api.queryData && _this.api.queryData(data, pid, cursorRow, _this.gridModel).then((0, _mobx.action)(function (v) {
        // gridModel用于设置动态列columns
        var searched = _this.top.subTablesModel.tabsFlag.searched;
        _this.top.subTablesModel.tabsFlag.searched = (0, _extends4.default)({}, searched, (0, _defineProperty3.default)({}, _this.tab.value, true));
        _this.gridModel.loading = false;
        _this.history = data;
        if (!_this.gridModel.hiddenPager) {
          _this.gridModel.currentPage = data.page;
          _this.gridModel.size = data.pageSize;
        }
        if (v.status !== 'Successful') {
          _this.gridModel.rows = [];
          _this.gridModel.total = 0;
          return _elementReact.Message.error(v.data);
        }
        _this.gridModel.rows = v.data ? _this.gridModel.hiddenPager ? v.data : v.data.list : [];
        _this.gridModel.total = v.data && !_this.gridModel.hiddenPager ? v.data.totalCount : 0;
      }));
    });
    this.prevHandleDataFromInner = (0, _mobx.action)(function (innerState) {
      var history = _this.history;
      var data = (0, _assign2.default)({}, history);
      data.page = innerState.currentPage + '';
      data.pageSize = innerState.size + '';
      return data;
    });
    this.handlePageOrSizeChange = (0, _mobx.action)(function (innerState) {
      var data = _this.prevHandleDataFromInner(innerState);
      _this.queryDataAndSetState(data);
    });
    this.onRefresh = (0, _mobx.action)(function () {
      var data = _this.history;
      _this.queryDataAndSetState(data);
    });
    this.onSortAll = (0, _mobx.action)(function (_ref2) {
      var sidx = _ref2.sidx,
          sord = _ref2.sord;

      var data = (0, _extends4.default)({}, _this.history, { sidx: sidx, sord: sord });
      _this.queryDataAndSetState(data);
    });
    this.onRowClick = (0, _mobx.action)(function (id, row) {// 一般用id就可以，特殊需求就用第二个参数row

    });

    this.api = api;
    (0, _mobx.extendObservable)(this, (0, _extends4.default)({
      parent: {},
      top: {},
      hidden: false, // 是否隐藏
      tab: { name: '', value: '' },
      id: _shortid2.default.generate(),
      gridModel: {},
      filteritems: [], // {label,field,,value}
      allFilteritemsInOneGroup: true,
      clearAfterChangeFilteritem: false, // 改变filteritem后是否清空
      cursorFilteritemField: '',
      buttons: getButtons(this),
      get buttonsPassPermissionValidate() {
        if (!this.buttons.length) return this.buttons;
        var permissionOfButton = this.parent.permissionOfButton;

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
      get numOfHasValue() {
        return this.filteritems.reduce(function (res, el) {
          return Number(!!el.value) + res;
        }, 0);
      },
      history: { pageSize: '50', sidx: '', sord: 'asc', page: '1' },
      get searchData() {
        return this.filteritems.reduce(function (data, item) {
          data[item.field] = item.value + '';
          return data;
        }, {});
      },
      get isCursor() {
        return this.parent.activeTab === this.tab.value;
      },
      get isInited() {
        return this.parent.tabsFlag.inited[this.tab.value];
      },
      get isSearched() {
        return this.parent.tabsFlag.searched[this.tab.value];
      },
      get cursorFilteritem() {
        var _this2 = this;

        return this.filteritems.find(function (_ref3) {
          var field = _ref3.field;
          return field === _this2.cursorFilteritemField;
        });
      }
    }, options || {}));
    var handlePageOrSizeChange = this.handlePageOrSizeChange,
        onSortAll = this.onSortAll,
        onRowClick = this.onRowClick,
        onRefresh = this.onRefresh;
    // 配置

    this.gridModel = new _EgGridModel2.default((0, _extends4.default)({}, grid, {
      api: {
        onPageChange: handlePageOrSizeChange,
        onSizeChange: handlePageOrSizeChange,
        onSortAll: onSortAll, // 排序
        onRowClick: onRowClick, // 行点击
        onRefresh: onRefresh
      }
    }));
  }

  /**
   * actions
   */


  (0, _createClass3.default)(SubTableModel, [{
    key: 'getDisplayValueOfFilteritem',


    /**
     utils
     */
    value: function getDisplayValueOfFilteritem(item) {
      if (!item) return '';
      var type = item.type,
          value = item.value,
          options = item.options;

      if (type === 'select') return (options.find(function (el) {
        return el.value === value;
      }) || {}).label || '';
      return value || '';
    }
  }]);
  return SubTableModel;
}();

exports.default = SubTableModel;