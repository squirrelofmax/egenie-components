'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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
        getDisplayRows = _ref.getDisplayRows,
        _ref$api = _ref.api,
        api = _ref$api === undefined ? {} : _ref$api,
        options = (0, _objectWithoutProperties3.default)(_ref, ['columns', 'interceptorOfRows', 'getDisplayRows', 'api']);
    (0, _classCallCheck3.default)(this, EgGridModel);

    _initialiseProps.call(this);

    this.api = api;
    this.setRowRender();
    (0, _mobx.extendObservable)(this, (0, _extends3.default)({
      id: _shortid2.default.generate(),
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
      // 非state中的属性
      sumColumns: [],
      refreshWhenRowsSelectChange: false, // 貌似跟表格没关系，就算有关系，用mobx也可以省略之
      cashOn: false,
      sortAll: false,
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
        return getDisplayRows(this.prevHandleRows(rows), rows); // 传源rows的目的是在产生可编辑单元格的model时可以直接操作当前行
      },
      get rowsCount() {
        return this._rows.length;
      }
    }, options || {}));

    (0, _mobx.intercept)(this, 'columns', function (change) {
      change.newValue = _this.prevHandleColumns(change.newValue);
      return change;
    });

    if (interceptorOfRows) {
      (0, _mobx.intercept)(this, 'rows', typeof interceptorOfRows === 'function' ? interceptorOfRows : function (change) {
        change.newValue = _this.getMapOfFieldToEditedCellModel(change.newValue, interceptorOfRows);
        return change;
      });
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

    value: function getMapOfFieldToEditedCellModel(sourceRows, _ref2) {
      var config = _ref2.config,
          context = _ref2.context;

      return (0, _mobx.observable)((sourceRows || []).map(function (el, idx) {
        if (el.hasOwnProperty('mapOfFieldToEditedCellModel')) return el;
        el = (0, _mobx.observable)(el);
        (0, _mobx.extendObservable)(el, { mapOfFieldToEditedCellModel: {} });
        var mapOfFieldToEditedCellModel = (0, _EditedCellFormatter.getMapOfFieldToEditedCellModel)(el, config, context);
        el.mapOfFieldToEditedCellModel = mapOfFieldToEditedCellModel;
        return el;
      }));
    }
  }]);
  return EgGridModel;
}();

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.prevHandleRows = function (rows) {
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
    if (columns[0].key === 'gridOrderNo') return columns;
    return [{
      key: 'gridOrderNo',
      width: 50,
      name: '序号',
      locked: true,
      formatter: function formatter(_ref3) {
        var value = _ref3.value;
        return _react2.default.createElement(
          'div',
          { style: { marginLeft: -8, textAlign: 'center' } },
          value
        );
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }].concat((0, _toConsumableArray3.default)(columns));
  };

  this.rowGetter = function (i) {
    return _this4._rows[i];
  };

  this.setWrapperRef = (0, _mobx.action)(function (wrapperRef) {
    _this4.wrapperRef = wrapperRef;
  });
  this.pageChange = (0, _mobx.action)(function (currentPage) {
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
    // console.log(source, target, '--source, target--列拖拽')
    var columnSourceIndex = _this4.columns.findIndex(function (i) {
      return i.key === source;
    });
    var columnTargetIndex = _this4.columns.findIndex(function (i) {
      return i.key === target;
    });
    var copy = _this4.columns.slice(0);
    copy.splice(columnTargetIndex, 0, copy.splice(columnSourceIndex, 1)[0]);
    //  要先清空columns 再赋值
    _this4.columns = [];
    setTimeout(function () {
      _this4.columns = copy;
    }, 0);
  });
  this.handleGridSort = (0, _mobx.action)(function (sortColumn, sortDirection) {
    // console.log(sortColumn, sortDirection, '--sortColumn, sortDirection--执行列排序')
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
    // console.log(sortColumn, sortDirection, '--sortColumn, sortDirection--执行列排序')
    var param = sortDirection === 'NONE' ? {} : { sidx: sortColumn, sord: sortDirection.toLowerCase() };
    _this4.api.onSortAll && _this4.api.onSortAll(param);
  });
  this.getSubRowDetails = (0, _mobx.action)(function (rowItem) {
    if (_this4.treeField) {
      // console.log('执行getSubRowDetails方法') // 随滚动条实时刷新
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
      // console.log(this, rows, '第一次Expand的最后一步')
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
    if (~rowIdx) {
      _this4.beforeIdx = _this4.cursorIdx;
      _this4.cursorIdx = rowIdx;
      _this4.cursorRow = row;
    }
    row && _this4.beforeIdx !== _this4.cursorIdx && _this4.api && _this4.api.onRowClick && _this4.api.onRowClick(row[_this4.primaryKeyField], row);
  });
  this.onRefresh = (0, _mobx.action)(function () {
    if (_this4.api.onRefresh) {
      _this4.loading = true;
      _this4.resetHeaderCheckBox();
      _this4.api.onRefresh();
    }
  });
  this.resetAllSelectedRows = (0, _mobx.action)(function () {
    _this4.resetHeaderCheckBox();
    _this4.selectedKeyValues = [];
    _this4.cashSelectedRows = [];
    _this4.api.onEgRowSelectChange && _this4.api.onEgRowSelectChange();
  });
};

exports.default = EgGridModel;