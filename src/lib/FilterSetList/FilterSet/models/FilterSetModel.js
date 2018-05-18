'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _FilterItemModel = require('./FilterItemModel');

var _FilterItemModel2 = _interopRequireDefault(_FilterItemModel);

var _MorePanelModel = require('./MorePanelModel');

var _MorePanelModel2 = _interopRequireDefault(_MorePanelModel);

var _OrderPanelModel = require('./OrderPanelModel');

var _OrderPanelModel2 = _interopRequireDefault(_OrderPanelModel);

var _SubTableListModel = require('./SubTableListModel');

var _SubTableListModel2 = _interopRequireDefault(_SubTableListModel);

var _ReportListModel = require('./ReportListModel');

var _ReportListModel2 = _interopRequireDefault(_ReportListModel);

var _EgGridModel = require('../../../EgGrid/EgGridModel');

var _EgGridModel2 = _interopRequireDefault(_EgGridModel);

var _elementReact = require('element-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 api:{
   queryData,saveFilterSet,onItemsChange
 }
*/
var FilterSetModel = function FilterSetModel(_ref) {
  var _this = this;

  var api = _ref.api,
      _ref$grid = _ref.grid,
      grid = _ref$grid === undefined ? {} : _ref$grid,
      _ref$subTables = _ref.subTables,
      subTables = _ref$subTables === undefined ? {} : _ref$subTables,
      _ref$reportList = _ref.reportList,
      reportList = _ref$reportList === undefined ? {} : _ref$reportList,
      _ref$filteritems = _ref.filteritems,
      filteritems = _ref$filteritems === undefined ? [] : _ref$filteritems,
      _ref$getButtons = _ref.getButtons,
      getButtons = _ref$getButtons === undefined ? function () {
    return [];
  } : _ref$getButtons,
      options = (0, _objectWithoutProperties3.default)(_ref, ['api', 'grid', 'subTables', 'reportList', 'filteritems', 'getButtons']);
  (0, _classCallCheck3.default)(this, FilterSetModel);

  _initialiseProps.call(this);

  this.api = api;
  (0, _mobx.extendObservable)(this, (0, _extends3.default)({
    isFirefox: ~navigator.userAgent.indexOf('Firefox'),
    parent: {},
    hiddenSubTables: false,
    subTablesModel: {},
    buttons: getButtons(this),
    get buttonsPassPermissionValidate() {
      if (!this.buttons.length) return this.buttons;
      var permissionOfButton = this.parent.permissionOfButton;

      var buttons = this.buttons.map(function (el, idx) {
        // 给group按钮加idx属性
        var group = el.group;

        if (!group) return (0, _extends3.default)({}, el);
        var ret = (0, _extends3.default)({}, el, { idx: 0 });
        ret.group = ret.group.map(function (el, index) {
          return (0, _extends3.default)({}, el, { idx: index + 1 });
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
      // 如果没有cashRows就不处理直接返回,这种处理方式被废弃

      if (!buttonsPassPermissionValidate.length) return buttonsPassPermissionValidate;
      if (!cashOn || !cashSelectedRows || !cashSelectedRows.length) cashSelectedRows = [];
      return buttonsPassPermissionValidate.map(function (button) {
        var group = button.group,
            firstButton = (0, _objectWithoutProperties3.default)(button, ['group']);
        var display = button.display;

        if (!group) {
          if (group) return button; // group留给下一步处理
          if (!display) return button;
          if (typeof display !== 'function') return button; // 如果没有display方法或者display不合法，那么就跟主按钮一起显隐
          return (0, _extends3.default)({}, button, { disabled: !display(cashSelectedRows) });
        }
        group = group.slice(0);
        group.unshift(firstButton); // 先把gourp放到同一个arr中
        var arr = group.map(function (button) {
          // 设置disabled
          var display = button.display;

          if (!display) return button;
          if (typeof display !== 'function') return button; // 如果没有display方法或者display不合法，那么就跟主按钮一起显隐
          return (0, _extends3.default)({}, button, { disabled: !display(cashSelectedRows) });
        });
        var idx = arr.findIndex(function (el) {
          return !el.disabled;
        }); // 第一个可用的坐标
        if (!~idx) return (0, _extends3.default)({}, arr[0], { group: arr.slice(1) // 全禁用，则以最初的第一按钮显示，并禁用
        });var item = arr.splice(idx, 1)[0];
        item.group = arr;
        if (item.isLabel && !~arr.findIndex(function (el) {
          return !el.disabled;
        })) item.disabled = true; // 如果剩余全禁用，第一个又只是label则全禁用
        return item;
      });
    },
    name: 'def',
    setValue: '', // 用于设置查询方案的值
    displaySetting: '', // 用于设置查询方案的顺序与显隐
    foldModel: { // 用于控制dropline
      height: 300,
      foldFlag: false,
      fullScreen: false,
      subTableOldHeight: 0,
      onFold: (0, _mobx.action)(function () {
        var _foldModel = _this.foldModel,
            subTableOldHeight = _foldModel.subTableOldHeight,
            foldFlag = _foldModel.foldFlag,
            height = _foldModel.height;

        var nextHeight = subTableOldHeight;
        if (!foldFlag) {
          nextHeight = 0;
          _this.foldModel.subTableOldHeight = height;
        }
        _this.foldModel.foldFlag = !_this.foldModel.foldFlag;
        _this.foldModel.height = nextHeight;
        setTimeout(function () {
          return window.dispatchEvent(new Event('resize'));
        }, 0);
      }),
      dropLineRef: {},
      dragStartClintY: 0,
      setDropLineRef: (0, _mobx.action)(function (item) {
        _this.dropLineRef = item;
        setTimeout(function () {
          return window.dispatchEvent(new Event('resize'));
        }, 0);
      }),
      onDragStart: (0, _mobx.action)(function (e) {
        e.stopPropagation();
        _this.foldModel.dragStartClintY = e.clientY;
      }),
      onDragEnd: (0, _mobx.action)(function (e) {
        e.stopPropagation();e.preventDefault();console.log('结束', e.clientY);
        e = (0, _extends3.default)({}, e);
        _this.foldModel.height += _this.foldModel.dragStartClintY - e.clientY;
        setTimeout(function () {
          return window.dispatchEvent(new Event('resize'));
        }, 0);
      }),
      toggleFullScreen: (0, _mobx.action)(function () {
        _this.foldModel.fullScreen = !_this.foldModel.fullScreen;
        setTimeout(function () {
          return window.dispatchEvent(new Event('resize'));
        }, 0);
      })
    },
    edited: false, // filteritems是否在查询过后改变，目前只有在report中会用到。
    reportListModel: {},
    id: _shortid2.default.generate(),
    gridModel: {}, // subModel
    MorePanelModel: new _MorePanelModel2.default({ top: this }),
    OrderPanelModel: new _OrderPanelModel2.default({ top: this }),
    filteritems: [],
    history: {},
    sliceFromIndex: 0, // OrderPanel中filteritems.slice()要用到的，它的值value可以理解为前value个filteritem是固定的
    hiddenOrderButton: false,
    get searchData() {
      return this.filteritems.reduce(function (data, item) {
        if (item.display) {
          data[item.field] = item.searchValue;
        }
        return data;
      }, {});
    },
    get changedFilterNumInMorePanel() {
      return this.filteritems.slice(10).reduce(function (count, item) {
        if (item.display && item.value) {
          if (item.type === 'numbergroup') {
            (item.value.min || item.value.min === 0) && count++;
            item.value.max && count++;
          } else {
            count++;
          }
        }
        return count;
      }, 0);
    },
    get numOfDisplayFilterItems() {
      var idx = this.filteritems.findIndex(function (item) {
        return !item.display;
      });
      return ~idx ? idx : this.filteritems.length;
    },
    get dataForGenerateScheme() {
      var display_setting = {};
      var scheme_value = {};
      this.filteritems.forEach(function (el, index) {
        display_setting[el.label] = {
          display_sequence: index,
          display_hidden: el.display
        };
        if (el.searchValue && !(el.type === 'numbergroup' && el.searchValue === ',')) {
          scheme_value[el.field] = el.searchValue;
        }
      });
      return { display_setting: (0, _stringify2.default)(display_setting), scheme_value: (0, _stringify2.default)(scheme_value) };
    }
  }, options || {}));
  this.setFilteritemsModel(filteritems);
  if (this.parent.isReport) {
    this.setReportListModel(reportList);
  } else {
    this.setGridModel(grid);
    this.setSubTablesModel(subTables);
  }
  // 给filteritems装配options
  this.assignFilterOptions();
  (0, _mobx.autorun)(this.assignFilterOptions);
}

// 给filteritems装配options


/* 设置model */
;
// model


var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.assignFilterOptions = function () {
    // 字典项都加载完毕后仍有必要，比如类似于省市区的变化
    var _dict = _this2.parent._dict;

    if (!_dict) return;
    (0, _keys2.default)(_dict).forEach(function (key) {
      var options = _dict[key];
      var item = _this2.filteritems.find(function (el) {
        return el.field === key;
      });
      if (item) item.options = options;
    });
  };

  this.getFilteritemByField = function (field) {
    return _this2.filteritems.find(function (el) {
      return el.field === field;
    });
  };

  this.generateScheme = (0, _mobx.action)(function () {
    _elementReact.MessageBox.prompt('请输入新方案名称', '生成查询方案', {}).then(function (_ref2) {
      var value = _ref2.value;

      if (!value || /\s/.test(value)) return (0, _elementReact.Message)({ type: 'error', message: '名称不能有空格，请重试' });
      var data = _this2.dataForGenerateScheme;
      data.scheme_name = value;
      // console.log(data,JSON.stringify(data),'转换数据for保存')
      _this2.api.saveFilterSet && _this2.api.saveFilterSet(data).then(function (v) {
        // 前端直接添加
        _this2.parent.onAddNew && _this2.parent.onAddNew(data);
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        return _elementReact.Message.success('保存成功！');
      });
    });
  });
  this.handleSearch = (0, _mobx.action)(function () {
    if (_this2.parent.isReport) {
      var cursorTabModel = _this2.reportListModel.cursorTabModel;

      if (cursorTabModel) {
        cursorTabModel.onSearch();
      }
      return;
    }
    _this2.gridModel.resetCursorRow();
    _this2.gridModel.resetHeaderCheckBox(); // 重置表头的勾选框
    var data = _this2.searchData;
    /// /console.log(data, '点击搜索')
    var page = '1';
    var _history = _this2.history,
        _history$pageSize = _history.pageSize,
        pageSize = _history$pageSize === undefined ? '50' : _history$pageSize,
        sidx = _history.sidx,
        sord = _history.sord;

    _this2.queryDataAndSetState({ cond: data, page: page, pageSize: pageSize, sidx: sidx, sord: sord });
    // 操作EgGrid，设置页码为1，清空勾选数据,重置树表的expanded状态
    // this.gridModel.currentPage = 1
    _this2.gridModel.selectedKeyValues = [];
    _this2.gridModel.expanded = {};
    _this2.gridModel.cashSelectedRows = [];
  });
  this.queryDataAndSetState = (0, _mobx.action)(function (data) {
    var flagOfRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _this2.gridModel.loading = true;
    _this2.history = (0, _extends3.default)({}, data);
    _this2.api.queryData && _this2.api.queryData(data, _this2).then((0, _mobx.action)(function (v) {
      _this2.gridModel.loading = false;
      _this2.gridModel.currentPage = data.page;
      _this2.gridModel.size = data.pageSize;
      if (v.status !== 'Successful') {
        _this2.gridModel.rows = [];
        _this2.gridModel.total = 0;
        _this2.gridModel.callbackAfterRefresh(flagOfRefresh);
        return _elementReact.Message.error(v.data);
      }
      _this2.gridModel.rows = v.data.list;
      _this2.gridModel.total = v.data.totalCount;
      _this2.gridModel.callbackAfterRefresh(flagOfRefresh);
    }));
  });
  this.prevHandleDataFromInner = (0, _mobx.action)(function (innerState) {
    var history = _this2.history;
    var data = (0, _assign2.default)({}, history);
    data.page = innerState.currentPage + '';
    data.pageSize = innerState.size + '';
    return data;
  });
  this.handlePageOrSizeChange = (0, _mobx.action)(function (innerState) {
    var data = _this2.prevHandleDataFromInner(innerState);
    _this2.queryDataAndSetState(data);
  });
  this.onRefresh = (0, _mobx.action)(function (flagKey) {
    var data = _this2.history;
    var flagObj = flagKey ? (0, _defineProperty3.default)({}, flagKey, true) : {};
    _this2.queryDataAndSetState(data, flagObj);
  });
  this.onSortAll = (0, _mobx.action)(function (_ref4) {
    var sidx = _ref4.sidx,
        sord = _ref4.sord;

    var data = (0, _extends3.default)({}, _this2.history, { sidx: sidx, sord: sord });
    _this2.queryDataAndSetState(data);
  });
  this.onRowClick = (0, _mobx.action)(function (id, row) {
    // 一般用id就可以，特殊需求就用第二个参数row
    var _subTablesModel = _this2.subTablesModel,
        activeTab = _subTablesModel.activeTab,
        listModel = _subTablesModel.listModel,
        tabsFlag = _subTablesModel.tabsFlag;

    tabsFlag.searched = {}; // 能进来说明点击的是不同行，所以清空searchFlag
    var table = listModel.find(function (el) {
      return el.tab.value === activeTab;
    });
    if (table) table.onSearch();
  });
  this.setGridModel = (0, _mobx.action)(function (grid) {
    var handlePageOrSizeChange = _this2.handlePageOrSizeChange,
        onSortAll = _this2.onSortAll,
        onRowClick = _this2.onRowClick,
        onRefresh = _this2.onRefresh;
    // 配置

    _this2.gridModel = new _EgGridModel2.default((0, _extends3.default)({}, grid, {
      columns: grid.getColumns(_this2),
      api: {
        onPageChange: handlePageOrSizeChange,
        onSizeChange: handlePageOrSizeChange,
        onSortAll: onSortAll, // 排序
        onRowClick: onRowClick, // 行点击
        onRefresh: onRefresh
      },
      parent: _this2
    }));
  });
  this.setFilteritemsModel = (0, _mobx.action)(function (filteritems) {
    var setModel = _this2;
    var ret = filteritems;

    if (_this2.setValue) {
      console.log('执行到设置setValue这一步', _this2.setValue);
      var setValue = JSON.parse(_this2.setValue);
      (0, _keys2.default)(setValue).forEach(function (field) {
        var item = ret.find(function (el) {
          return el.field === field;
        });
        if (!item) return;
        item.value = setValue[field];
      });
    }

    if (_this2.displaySetting) {
      console.log('执行到设置displaySetting这一步', _this2.displaySetting);
      var displaySetting = JSON.parse(_this2.displaySetting);
      (0, _keys2.default)(displaySetting).forEach(function (label) {
        var item = ret.find(function (el) {
          return el.label === label;
        });
        if (!item) return;
        item.orginalIndex = item.initIndex = displaySetting[label].display_sequence;
        item.display = displaySetting[label].display_hidden;
      });
      ret.sort(function (a, b) {
        return Number(a.initIndex) - Number(b.initIndex);
      });
    }

    _this2.filteritems = ret.map(function (item, index) {
      return new _FilterItemModel2.default((0, _extends3.default)({
        initIndex: index, originalIndex: index }, item, { top: setModel, initValue: item.value
      }));
    });
  });
  this.setSubTablesModel = (0, _mobx.action)(function (subTables) {
    _this2.subTablesModel = new _SubTableListModel2.default((0, _extends3.default)({}, subTables, { top: _this2 }));
  });
  this.setReportListModel = (0, _mobx.action)(function (reportList) {
    _this2.reportListModel = new _ReportListModel2.default((0, _extends3.default)({}, reportList, { top: _this2 }));
  });
  this.reset = (0, _mobx.action)(function () {
    _this2.filteritems.forEach(function (item) {
      item.value = item.type === 'numbergroup' ? (0, _extends3.default)({}, item.initValue) : item.initValue;
    });
  });
};

exports.default = FilterSetModel;