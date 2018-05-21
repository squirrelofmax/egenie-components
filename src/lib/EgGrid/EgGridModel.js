'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDataGrid = require('react-data-grid');

var _reactDataGrid2 = _interopRequireDefault(_reactDataGrid);

var _mobx = require('mobx');

var _EditedCellFormatter = require('./EditedCellFormatter');

var _mobxReact = require('mobx-react');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _requests = require('./requests');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// model

/*
api:{
  onPageChange,onSizeChange,onSortAll,onRowClick,onRefresh
}
*/
var EgGridModel = function () {
  function EgGridModel(_ref) {
    var _this = this;

    var columns = _ref.columns,
        interceptorOfRows = _ref.interceptorOfRows,
        _ref$user = _ref.user,
        user = _ref$user === undefined ? _requests.getUser : _ref$user,
        getDisplayRows = _ref.getDisplayRows,
        getDisplayColumns = _ref.getDisplayColumns,
        _ref$api = _ref.api,
        api = _ref$api === undefined ? {} : _ref$api,
        _ref$parent = _ref.parent,
        parent = _ref$parent === undefined ? {} : _ref$parent,
        options = (0, _objectWithoutProperties3.default)(_ref, ['columns', 'interceptorOfRows', 'user', 'getDisplayRows', 'getDisplayColumns', 'api', 'parent']);
    (0, _classCallCheck3.default)(this, EgGridModel);

    _initialiseProps.call(this);

    this.api = api;
    this.setRowRender();
    (0, _mobx.extendObservable)(this, (0, _extends3.default)({
      parent: parent,
      id: _shortid2.default.generate(),
      cache: _requests.cache,
      user: '',
      _class: '', // 特殊样式的类
      columns: this.prevHandleColumns(columns),
      rows: [],
      size: 50,
      total: 0,
      cursorIdx: '',
      pageSizes: [10, 20, 50, 100, 200, 500, 1000],
      currentPage: 1,
      expanded: {},
      treeCash: {},
      selectedKeyValues: [],
      cashSelectedRows: [],
      cursorRow: {},
      treeField: '', // 树结构的字段
      primaryKeyField: '', // 标识字段，用于树结构以及复选框选择列
      treeSearchKeyField: '', // 树结构的查询字段
      loading: false,
      showCheckBox: false, // 是否展示复选框列,默认不显示
      pagerSetting: '', // 分页器设置
      hiddenRefresh: false, // 是否隐藏刷新按钮
      hiddenReset: false, // 是否隐藏重置按钮
      hiddenPager: false, // 是否隐藏分页器
      gridIdForColumnConfig: '',
      // 非state中的属性
      sumColumns: [],
      refreshWhenRowsSelectChange: false, // 貌似跟表格没关系，就算有关系，用mobx也可以省略之
      cashOn: false,
      sortAll: false,
      cacheColumnConfig: true,
      // ignoreCacheChange: true,
      wrapperRef: {},
      get _size() {
        return this.size ? Number(this.size) : 0;
      },
      get _currentPage() {
        return this.currentPage ? Number(this.currentPage) : 0;
      },
      get _rows() {
        // getDisplayRows是rows的转换规则，prevHandleRows是内置的预处理规则，主要用于转换树结构
        var rows = this.rows;

        if (!getDisplayRows) return this.prevHandleRows(rows);
        var ret = getDisplayRows(this.prevHandleRows(rows), rows);
        return ret; // 传源rows的目的是在产生可编辑单元格的model时可以直接操作当前行
      },
      get rowsCount() {
        return this._rows.length;
      },
      get _columns() {
        var ret = [{
          key: 'gridOrderNo',
          width: 50,
          name: '序号',
          locked: true,
          ejlHidden: false,
          ejlOriginalIndex: 0,
          ejlIndex: 0,
          formatter: function formatter(_ref2) {
            var value = _ref2.value;
            return _react2.default.createElement(
              'div',
              { style: { marginLeft: -8, textAlign: 'center' } },
              value
            );
          },
          getRowMetaData: function getRowMetaData(row) {
            return row;
          }
        }].concat((0, _toConsumableArray3.default)(this.columns)).filter(function (el) {
          return !el.ejlHidden;
        });
        if (this.cacheColumnConfig) {
          ret.sort(function (a, b) {
            return a.ejlIndex - b.ejlIndex;
          });
        }
        if (getDisplayColumns) ret = getDisplayColumns(ret, this);
        return ret;
      },
      get cacheKeyForColumnsConfig() {
        return this.user + '__' + this.gridIdForColumnConfig;
      }
    }, options || {}));

    interceptorOfRows = typeof interceptorOfRows === 'function' ? interceptorOfRows(this) : interceptorOfRows;
    if (interceptorOfRows) {
      (0, _mobx.intercept)(this, 'rows', function (change) {
        change.newValue = _this.getMapOfFieldToEditedCellModel(change.newValue, interceptorOfRows);
        return change;
      });
    }
    if (this.cacheColumnConfig) {
      this.getUser(user);
      (0, _mobx.autorun)(this.updateColumnsWhenCacheChange);
    }
  }
  // 工具方法


  (0, _createClass3.default)(EgGridModel, [{
    key: 'setRowRender',
    value: function setRowRender() {
      var that = this;
      this.RowRenderer = (0, _mobxReact.observer)(function (_React$Component) {
        (0, _inherits3.default)(RowRenderer, _React$Component);

        function RowRenderer() {
          (0, _classCallCheck3.default)(this, RowRenderer);
          return (0, _possibleConstructorReturn3.default)(this, (RowRenderer.__proto__ || (0, _getPrototypeOf2.default)(RowRenderer)).apply(this, arguments));
        }

        (0, _createClass3.default)(RowRenderer, [{
          key: 'setScrollLeft',
          value: function setScrollLeft(scrollBy) {
            // if you want freeze columns to work, you need to make sure you implement this as apass through
            this.row.setScrollLeft(scrollBy);
          }
        }, {
          key: 'getRowStyle',
          value: function getRowStyle() {
            return {
              backgroundColor: this.getRowBackground()
            };
          }
        }, {
          key: 'getRowBackground',
          value: function getRowBackground() {
            return this.props.idx === that.cursorIdx ? '#fee48d' : '#fff';
          }
        }, {
          key: 'getClass',
          value: function getClass() {
            return this.props.idx === that.cursorIdx ? 'eg-row-wrapper cursor' : 'eg-row-wrapper';
          }
        }, {
          key: 'render',
          value: function render() {
            var _this3 = this;

            // here we are just changing the style
            // but we could replace this with anything we liked, cards, images, etc
            // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
            return _react2.default.createElement(
              'div',
              { className: this.getClass(), style: this.getRowStyle() },
              _react2.default.createElement(_reactDataGrid2.default.Row, (0, _extends3.default)({ ref: function ref(node) {
                  return _this3.row = node;
                } }, this.props))
            );
          }
        }]);
        return RowRenderer;
      }(_react2.default.Component));
    }

    // actions

    /* 排序相关 */

    /* 树结构相关方法 */

    /* 勾选复选框相关方法 */

    /* 重置相关 */

  }, {
    key: 'getMapOfFieldToEditedCellModel',


    /**
     * utils
     */

    value: function getMapOfFieldToEditedCellModel(sourceRows, _ref3) {
      var config = _ref3.config,
          context = _ref3.context;

      return (0, _mobx.observable)((sourceRows || []).map(function (el, idx) {
        if (el.hasOwnProperty('mapOfFieldToEditedCellModel')) return el;
        el = (0, _mobx.observable)(el);
        (0, _mobx.extendObservable)(el, { mapOfFieldToEditedCellModel: {} });
        var mapOfFieldToEditedCellModel = (0, _EditedCellFormatter.getMapOfFieldToEditedCellModel)(el, config, context);
        el.mapOfFieldToEditedCellModel = mapOfFieldToEditedCellModel;
        return el;
      }));
    }
  }, {
    key: 'parseJSON',
    value: function parseJSON(str) {
      var ret = void 0;
      try {
        ret = JSON.parse(str);
      } catch (e) {
        var temp = void 0,
            i = void 0,
            j = void 0,
            kv = void 0;
        if (str.startsWith('[')) {
          try {
            str = str.slice(2, str.length - 2).split('},{');
            temp = [];
            for (var _i = 0, len = str.length; _i < len; _i++) {
              var item = str[_i].split(','),
                  obj = {};
              for (j = 0; j < item.length; j++) {
                kv = item[j].split(':');
                obj[kv[0]] = kv[1];
              }
              temp.push(obj);
            }
            ret = temp;
          } catch (e) {
            ret = null;
            console.warn('parseJSON 失败', str);
          }
        } else {
          try {
            str = str.slice(1, str.length - 1).split(',');
            temp = {};
            for (i = 0; i < str.length; i++) {
              kv = str[i].split(':');
              temp[kv[0]] = kv[1];
            }
            ret = temp;
          } catch (e) {
            ret = null;
            console.warn('parseJSON 失败', str);
          }
        }
      }
      for (var key in ret) {
        try {
          ret[key] = JSON.parse(ret[key]);
        } catch (e) {}
      }
      return ret;
    }
  }]);
  return EgGridModel;
}();

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.prevHandleRows = function (rows) {
    if (!rows || !rows.length) return [];
    var size = _this4.size,
        currentPage = _this4.currentPage;

    rows = rows.map(function (el, index) {
      el = (0, _extends3.default)({}, el);
      el.gridOrderNo = (currentPage - 1) * size + index + 1;
      return el;
    });
    if (!_this4.treeField) {
      return rows;
    }
    var len = rows && rows.length;
    var res = rows.map(function (el, i) {
      el.treeDepth = el.hasOwnProperty('treeDepth') ? el.treeDepth : 0;
      el.siblingIndex = el.hasOwnProperty('siblingIndex') ? el.siblingIndex : i;
      el.numberSiblings = el.hasOwnProperty('numberSiblings') ? el.numberSiblings : len;
      el.children = el.hasOwnProperty('children') || el.treeDepth ? [{}] : el.children;
      return el;
    });
    return res;
  };

  this.prevHandleColumns = function () {
    var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (!columns.length) return columns;
    return columns.map(function (el, index) {
      return (0, _extends3.default)({ ejlHidden: false }, el, { ejlOriginalIndex: index + 1, ejlIndex: index + 1 });
    });
  };

  this.rowGetter = function (i) {
    return _this4._rows[i];
  };

  this.setWrapperRef = (0, _mobx.action)(function (wrapperRef) {
    _this4.wrapperRef = wrapperRef;
  });
  this.pageChange = (0, _mobx.action)(function (currentPage) {
    _this4.resetCursorRow();
    var size = _this4.size,
        onPageChange = _this4.api.onPageChange;

    _this4.showCheckBox && _this4.resetHeaderCheckBox(); // 重置表头勾选框
    // pageChange与sizeChange不需要物理上reset，需要清空状态值expanded，这样渲染时自动就重置了
    // this.props.treeSearchKeyField&&this.resetTreeArrow();
    _this4.currentPage = currentPage;
    _this4.expanded = {}; // 重置树结构的展开/收缩状态
    if (onPageChange) {
      _this4.loading = true;
      _this4.resetHeaderCheckBox();
      onPageChange({ currentPage: currentPage, size: size });
    }
  });
  this.sizeChange = (0, _mobx.action)(function (size) {
    _this4.resetCursorRow();
    var showCheckBox = _this4.showCheckBox,
        resetHeaderCheckBox = _this4.resetHeaderCheckBox,
        onSizeChange = _this4.api.onSizeChange;

    showCheckBox && resetHeaderCheckBox(); // 重置表头勾选框
    _this4.currentPage = 1;
    _this4.size = size;
    _this4.expanded = {}; // 重置树结构的展开/收缩状态
    if (onSizeChange) {
      _this4.loading = true;
      _this4.resetHeaderCheckBox();
      onSizeChange({ currentPage: 1, size: size });
    }
  });
  this.handleHeaderDrop = (0, _mobx.action)(function (source, target) {
    var _copy;

    if (source === target) return;
    var copy = _this4.columns.slice(0);
    copy.sort(function (a, b) {
      return a.ejlIndex - b.ejlIndex;
    });
    var columnSourceIndex = copy.findIndex(function (i) {
      return i.key === source;
    });
    var columnTargetIndex = copy.findIndex(function (i) {
      return i.key === target;
    });
    copy[columnSourceIndex].ejlIndex = columnTargetIndex;
    var indexChangeDirection = columnSourceIndex < columnTargetIndex ? -1 : 1;
    var params = columnSourceIndex < columnTargetIndex ? [columnSourceIndex + 1, columnTargetIndex + 1] : [columnTargetIndex, columnSourceIndex];
    (_copy = copy).slice.apply(_copy, params).forEach(function (el) {
      el.ejlIndex += indexChangeDirection;
    });
    copy = _this4.columns.slice(0); // 只改ejlIndex，不更改数组顺序
    //  要先清空columns 再赋值，必须！涉及到了DraggableHeader组件
    _this4.columns = [];
    setTimeout((0, _mobx.action)(function () {
      return _this4.columns = copy;
    }), 0);
    // 保存columnsConfig到后端以及localStorage
    if (!_this4.cacheColumnConfig) return;
    var configObj = copy.reduce(function (res, column) {
      var ejlIndex = column.ejlIndex,
          ejlOriginalIndex = column.ejlOriginalIndex;

      if (ejlOriginalIndex !== ejlIndex) res[ejlOriginalIndex] = ejlIndex;
      return res;
    }, {});
    _this4.saveColumnsConfig(configObj);
  });
  this.saveColumnsConfig = (0, _mobx.action)(function (config) {
    var data = {
      cacheKey: _this4.cacheKeyForColumnsConfig,
      cacheValue: (0, _stringify2.default)(config)
    };
    (0, _requests.saveColumnsConfig)(data);
  });
  this.handleGridSort = (0, _mobx.action)(function (sortColumn, sortDirection) {
    if (sortDirection === 'ASC') {
      _this4.defaultRows = _this4._rows.slice(0);
    }

    var topLevelRows = _this4.treeSearchKeyField ? _this4._rows.filter(function (el) {
      // 排除子节点
      return el.treeDepth === 0;
    }).slice(0) : _this4._rows.slice(0);

    _this4.treeSearchKeyField && _this4.resetTreeArrow(); // 物理重置树结构的箭头

    var comparer = function comparer(a, b) {
      var res = Number(a[sortColumn]) - Number(b[sortColumn]);
      if ((0, _isNan2.default)(res)) {
        a = a[sortColumn] ? a[sortColumn] + '' : '';
        b = b[sortColumn] ? b[sortColumn] + '' : '';
      }
      var ret = (0, _isNan2.default)(res) ? a.toLowerCase().localeCompare(b.toLowerCase()) : res;
      if (sortDirection === 'ASC') {
        return ret;
      }
      if (sortDirection === 'DESC') {
        return -ret;
      }
    };

    var rows = sortDirection === 'NONE' ? _this4.defaultRows.slice(0) : topLevelRows.sort(comparer);

    _this4.rows = rows;
    _this4.expanded = {};
    // setTimeout(() => { this.comp.forceUpdate() })// 树结构按钮都归位,TODO,需要强制刷新？如果需要，只能找Grid的Ref了
  });
  this.handleGridSortAll = (0, _mobx.action)(function (sortColumn, sortDirection) {
    var param = sortDirection === 'NONE' ? {} : { sidx: sortColumn, sord: sortDirection.toLowerCase() };
    _this4.api.onSortAll && _this4.api.onSortAll(param);
  });
  this.getSubRowDetails = (0, _mobx.action)(function (rowItem) {
    if (_this4.treeField) {
      var _rowKeyValue = rowItem[_this4.primaryKeyField];
      var isExpanded = !!_this4.expanded[_rowKeyValue];
      return { // 该节点的信息+其children，后者用假数据，只为了保证展开按钮存在。信息貌似也没啥用处----Grid组件内部用
        group: rowItem.children && rowItem.children.length > 0, // 这个貌似真没用，也许是供外部读取的数据，是不是叶子节点的标记，不过完全不影响展开按钮的存在。
        // 研究发现，在有children属性时group没用，否则group就决定了展开按钮的存在与否，完全可以
        expanded: isExpanded, // 保证了重新渲染的时候展开按钮的状态会保持
        children: rowItem.children, // 固定值[{}]会造成，子节点也可展开，现在的情况是props改变的都赋值了[{}]，state改变的row都没，所以子节点没有展开按钮
        field: _this4.treeField,
        treeDepth: rowItem.treeDepth || 0, // 后三项用于形成树形结构，如果没有就失去了前边的结构线
        siblingIndex: rowItem.siblingIndex,
        numberSiblings: rowItem.numberSiblings
      };
    }
  });
  this.onCellExpand = (0, _mobx.action)(function (args) {
    var afterStep = function afterStep(subRows) {
      treeCash[treeSearchKeyValue] = subRows; // 放到缓存中
      if (expanded && !expanded[rowKeyValue]) {
        expanded[rowKeyValue] = true;
        rows.splice.apply(rows, [rowIndex + 1, 0].concat((0, _toConsumableArray3.default)(subRows)));
      } else if (expanded[rowKeyValue]) {
        expanded[rowKeyValue] = false;
        rows.splice(rowIndex + 1, subRows.length);
      }
    };

    var defaultSubRows = [{}];
    var rows = _this4.rows;
    var treeCash = _this4.treeCash;
    var rowKeyValue = args.rowData[_this4.primaryKeyField];
    var treeSearchKeyValue = args.rowData[_this4.treeSearchKeyField];
    var rowIndex = rows.indexOf(args.rowData);
    var expanded = _this4.expanded;
    // console.log(args, 'treeCash:', treeCash, 'rowKeyValue:', rowKeyValue, 'rowIndex:', rowIndex, 'expanded:', expanded, 'treeSearchKeyValue:', treeSearchKeyValue, '执行树结构展开/收缩操作')

    // 有缓存就取缓存，否则就从后端获取数据，如果外部没传相关方法，就返回空行
    treeCash.hasOwnProperty(treeSearchKeyValue) ? afterStep(treeCash[treeSearchKeyValue]) : !_this4.api.onOutCellExpand ? afterStep(defaultSubRows) : _this4.api.onOutCellExpand(args.rowData).then(function (v) {
      // console.log(v, '回到内部执行then方法')

      if (v && v.length && v.length > 1) {
        // 加工数据，赋值给children
        var afterUpdateSubRows = _this4.updateSubRowDetails(v, args.rowData.treeDepth, rowKeyValue);
        afterStep(afterUpdateSubRows);
      } else {
        afterStep(defaultSubRows);
      }
    });
  });
  this.updateSubRowDetails = (0, _mobx.action)(function (subRows, parentTreeDepth, rowKeyValue) {
    var treeDepth = parentTreeDepth || 0;
    subRows = subRows.filter(function (el) {
      return el[_this4.primaryKeyField] !== rowKeyValue;
    }, _this4);
    subRows.forEach(function (sr, i) {
      sr.treeDepth = treeDepth + 1;
      sr.siblingIndex = i;
      sr.numberSiblings = subRows.length;
    });
    return subRows;
  });
  this.handleRowsSelected = (0, _mobx.action)(function (rows) {
    var primaryKeyField = _this4.primaryKeyField;

    if (_this4.cashOn) _this4.cashSelectedRows = _this4.cashSelectedRows.concat(rows.map(function (el) {
      return el.row;
    }));
    _this4.selectedKeyValues = _this4.selectedKeyValues.concat(rows.map(function (r) {
      return r.row[primaryKeyField];
    }));
    _this4.api.onRowsSelected && _this4.api.onRowsSelected(rows);
    _this4.api.onEgRowSelectChange && _this4.api.onEgRowSelectChange(rows, 'select'); // 与上一行接口重复了
  });
  this.handleRowsDeselected = (0, _mobx.action)(function (rows) {
    // 被取消选中的行
    // console.log(rows, '--rows,取消选中行')
    var primaryKeyField = _this4.primaryKeyField;

    var rowKeyValues = rows.map(function (r) {
      return r.row[primaryKeyField];
    });
    if (_this4.cashOn) _this4.cashSelectedRows = _this4.cashSelectedRows.filter(function (row) {
      return rowKeyValues.indexOf(row[primaryKeyField]) === -1;
    });
    _this4.selectedKeyValues = _this4.selectedKeyValues.filter(function (v) {
      return rowKeyValues.indexOf(v) === -1;
    });
    _this4.api.onRowsDeselected && _this4.api.onRowsDeselected(rows);
    _this4.api.onEgRowSelectChange && _this4.api.onEgRowSelectChange(rows, 'deselected');
  });
  this.resetHeaderCheckBox = (0, _mobx.action)(function () {
    var headerCheckBox = _this4.wrapperRef.querySelectorAll && _this4.wrapperRef.querySelectorAll('.react-grid-HeaderCell input[type="checkbox"')[0];
    if (headerCheckBox) {
      headerCheckBox.checked = false;
    }
  });
  this.resetTreeArrow = (0, _mobx.action)(function () {
    _this4.wrapperRef.querySelectorAll && _this4.wrapperRef.querySelectorAll('.rdg-cell-expand').forEach(function (el) {
      el.innerText = '▶';
    });
  });
  this.onRowClick = (0, _mobx.action)(function (rowIdx, row) {
    // console.log('EgGrid内部的onRowClick')
    if (~rowIdx) {
      _this4.beforeIdx = _this4.cursorIdx;
      _this4.cursorIdx = rowIdx;
      _this4.cursorRow = row;
    }
    row && _this4.beforeIdx !== _this4.cursorIdx && _this4.triggerCursorRowClick();
  });
  this.onRefresh = (0, _mobx.action)(function () {
    if (_this4.api.onRefresh) {
      _this4.loading = true;
      // this.resetHeaderCheckBox()
      _this4.api.onRefresh();
    }
  });
  this.resetAllSelectedRows = (0, _mobx.action)(function () {
    _this4.resetHeaderCheckBox();
    _this4.selectedKeyValues = [];
    _this4.cashSelectedRows = [];
    _this4.api.onEgRowSelectChange && _this4.api.onEgRowSelectChange();
  });
  this.resetCursorRow = (0, _mobx.action)(function () {
    _this4.beforeIdx = _this4.cursorIdx;
    _this4.cursorIdx = '';
    _this4.cursorRow = {};
    _this4.triggerCursorRowClick();
  });
  this.setCursorRowToFirst = (0, _mobx.action)(function () {
    if (!(_this4.rows && _this4.rows.length)) return _this4.resetCursorRow();
    _this4.beforeIdx = _this4.cursorIdx;
    _this4.cursorIdx = 0;
    _this4.cursorRow = _this4.rows[0];
    _this4.triggerCursorRowClick();
  });
  this.triggerCursorRowClick = (0, _mobx.action)(function () {
    _this4.api && _this4.api.onRowClick && _this4.api.onRowClick(_this4.cursorRow[_this4.primaryKeyField], _this4.cursorRow);
  });
  this.clearToOriginal = (0, _mobx.action)(function () {
    // 主表清空字表
    (0, _mobx.set)(_this4, {
      rows: [], total: 0, currentPage: 1, selectedKeyValues: [], cashSelectedRows: [], expanded: {}, treeCash: {}, cursorIdx: '', cursorRow: {}
    });
    _this4.resetHeaderCheckBox();
  });
  this.callbackAfterRefresh = (0, _mobx.action)(function (_ref4) {
    var add = _ref4.add,
        edit = _ref4.edit,
        remove = _ref4.remove;

    if (add) return _this4.gridModel.setCursorRowToFirst();
    if (edit) return _this4.gridModel.triggerCursorRowClick();
    if (remove) {
      var _gridModel = _this4.gridModel,
          cashSelectedRows = _gridModel.cashSelectedRows,
          selectedKeyValues = _gridModel.selectedKeyValues,
          primaryKeyField = _gridModel.primaryKeyField,
          cursorRow = _gridModel.cursorRow;

      var id = cursorRow[primaryKeyField];
      var cashItem = cashSelectedRows.find(function (el) {
        return el[primaryKeyField] == id;
      });
      cashItem && cashSelectedRows.remove(cashItem);
      var selectedId = selectedKeyValues.find(function (el) {
        return el == id;
      });
      selectedId && selectedKeyValues.remove(selectedId);
      return _this4.gridModel.resetCursorRow();
    }
  });
  this.getUser = (0, _mobx.action)(function (user) {
    if (typeof user === 'function') {
      return _promise2.default.resolve(user()).then((0, _mobx.action)(function (v) {
        if (!v) return;
        _this4.user = v.username;
      })).then(_this4.getColumnsConfig);
    }
    _promise2.default.resolve(user).then((0, _mobx.action)(function (v) {
      _this4.user = v;
    })).then(_this4.getColumnsConfig);
  });
  this.getColumnsConfig = (0, _mobx.action)(function () {
    // 只会在页面初始化的时候调用
    (0, _requests.getColumnsConfig)(_this4.cacheKeyForColumnsConfig).then((0, _mobx.action)(function (v) {
      if (v.status !== 'Successful') return;
      // this.ignoreCacheChange = true
      _requests.cache.setStorage({ cacheKey: _this4.cacheKeyForColumnsConfig, cacheValue: v.data || '{}' });
      if (!v.data) return;
      // this.updateColumnsWhenCacheChange()
      _this4.updateColumns(v.data);
      var copy = _this4.columns.slice(0);
      _this4.columns = [];
      setTimeout((0, _mobx.action)(function () {
        _this4.columns = copy;
      }), 0);
    }));
  });

  this.updateColumnsWhenCacheChange = function () {
    // if (this.ignoreCacheChange) return (this.ignoreCacheChange = false)
    var columnsConfig = _requests.cache.value[_this4.cacheKeyForColumnsConfig];
    if (!columnsConfig) return;
    _this4.updateColumns(columnsConfig);
  };

  this.updateColumns = function (columnsConfig) {
    if (!_this4.columns.length) return;
    _this4.columns.forEach(function (el) {
      el.ejlIndex = el.ejlOriginalIndex;
    });
    var params = {};
    params = _this4.parseJSON(columnsConfig);
    (0, _entries2.default)(params).forEach(function (_ref5) {
      var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
          key = _ref6[0],
          value = _ref6[1];

      _this4.columns[key].ejlIndex = value;
    });
  };
};

exports.default = EgGridModel;