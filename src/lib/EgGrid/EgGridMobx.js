'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDataGrid = require('react-data-grid');

var _reactDataGrid2 = _interopRequireDefault(_reactDataGrid);

var _reactDataGridAddons = require('react-data-grid-addons');

var _mobxReact = require('mobx-react');

var _elementReact = require('element-react');

require('../../css/EgGrid/EgGrid.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
props属性
columns:定义表头,例如[{ key: 'num', name: '数量' },  { key: 'color', name: '颜色' }] 两列
rows:存放表体数据，例如 [{"num":"30","color": "白色"},{xx},{xx},{xx}]  4条数据 ，仅仅用于初始化
size:设置每页的行数，例如 5,只用于初始化
pageSizes:设置分页选项，例如[50,100, 200, 300,400, 20000]
total:总数据量
onPageChange:接收外界函数，在切换页码时调用，传给该函数两个参数--size,currentPage(改变后的页码)
onSizeChange:接收外界函数，在改变每页数据量的时候调用，传参size--改变后的size
treeField:树结构的字段
primaryKeyField:标识字段，用于树结构以及复选框选择列
treeSearchKeyField：树结构的查询字段
onOutCellExpand:树结构展开时查询数据
showCheckBox:是否展示复选框列,默认不显示
pagerSetting:分页器设置
hiddenRefresh：是否显示刷新按钮
hiddenReset ：是否显示重置按钮
hiddenPager:是否显示分页器
onRowsDeselected：取消勾选时触发,传参被取消勾选的行数据,eg.[row1]
onRowsSelected：勾选时触发，传参新勾选的行数据,eg.[row1,row2,...]
onSortAll:按照整体排序时的方法

onEgRowClick:点击获取字表信息接口
onEgRowSelectChange：选中行改变接口

this.cashSelectedRows:缓存选中的Rows
 */
var SelectedCountOfPager = (0, _mobxReact.observer)(function (_ref) {
  var _ref$store = _ref.store,
      showCheckBox = _ref$store.showCheckBox,
      hiddenReset = _ref$store.hiddenReset,
      selectedKeyValues = _ref$store.selectedKeyValues,
      resetAllSelectedRows = _ref$store.resetAllSelectedRows;

  return showCheckBox && !hiddenReset ? _react2.default.createElement(
    'div',
    { style: { fontSize: 11, lineHeight: '23px', marginTop: 3, marginLeft: 0, marginRight: 'auto', width: 110, fontWeight: 400, float: 'left' } },
    '\u5DF2\u52FE\u9009',
    _react2.default.createElement(
      'span',
      { style: { fontSize: 18, color: 'red', fontWeight: 700 } },
      selectedKeyValues.length
    ),
    '\u6761',
    _react2.default.createElement(
      'span',
      { style: { marginLeft: 4, color: 'rgb(57, 57, 57)', fontSize: 12, cursor: 'pointer' }, onClick: resetAllSelectedRows },
      '\u91CD\u7F6E'
    )
  ) : null;
});

var PagationOfPager = (0, _mobxReact.observer)(function (_ref2) {
  var _ref2$store = _ref2.store,
      hiddenPager = _ref2$store.hiddenPager,
      pagerSetting = _ref2$store.pagerSetting,
      pageChange = _ref2$store.pageChange,
      sizeChange = _ref2$store.sizeChange,
      total = _ref2$store.total,
      pageSizes = _ref2$store.pageSizes,
      _size = _ref2$store._size,
      _currentPage = _ref2$store._currentPage;

  return hiddenPager ? null : _react2.default.createElement(_elementReact.Pagination, { style: { float: 'right', marginTop: 2, marginBottom: -10, fontWeight: 400 }, layout: pagerSetting || 'total, sizes, prev, pager, next, jumper',
    onCurrentChange: pageChange, total: total, pageSize: _size, onSizeChange: sizeChange, pageSizes: pageSizes.slice(0), currentPage: _currentPage });
});

var Pager = (0, _mobxReact.observer)(function (_ref3) {
  var store = _ref3.store,
      _ref3$store = _ref3.store,
      hiddenPager = _ref3$store.hiddenPager,
      hiddenRefresh = _ref3$store.hiddenRefresh,
      hiddenReset = _ref3$store.hiddenReset,
      showCheckBox = _ref3$store.showCheckBox,
      sumColumns = _ref3$store.sumColumns,
      _rows = _ref3$store._rows,
      columns = _ref3$store.columns,
      onRefresh = _ref3$store.onRefresh;

  return hiddenPager && hiddenRefresh && (hiddenReset || !showCheckBox) && !(sumColumns && sumColumns.length) ? null : _react2.default.createElement(
    _elementReact.Layout.Row,
    { key: 'egl-grid-pager-wrapper-layou-row', type: 'flex', justify: 'end' },
    _react2.default.createElement(
      'div',
      { key: 'egl-grid-pager-wrapper', style: { width: '100%', lineHeight: 2, fontWeight: 700, color: '#333' } },
      _react2.default.createElement(SelectedCountOfPager, { store: store }),
      hiddenRefresh ? null : _react2.default.createElement(
        'div',
        { style: { float: 'right', fontSize: 13, cursor: 'pointer', marginTop: 5, fontWeight: 400 }, onClick: onRefresh },
        _react2.default.createElement('i', { className: 'fa fa-refresh', style: { color: '#13A0FF', marginRight: 5 } }),
        _react2.default.createElement(
          'span',
          null,
          '\u5237\u65B0'
        )
      ),
      _react2.default.createElement(PagationOfPager, { store: store }),
      sumColumns && sumColumns.length ? _react2.default.createElement(
        'strong',
        { style: { color: '#333' } },
        _react2.default.createElement(
          'span',
          { style: { fontSize: 14 } },
          '\u672C\u9875\u7EDF\u8BA1'
        ),
        _react2.default.createElement(
          'span',
          { style: { marginLeft: 10, fontSize: 16, fontWeight: 400 } },
          '|'
        )
      ) : null,
      sumColumns && sumColumns.length ? sumColumns.reduce(function (res, columnKey) {
        var item = void 0;
        if ((typeof columnKey === 'undefined' ? 'undefined' : (0, _typeof3.default)(columnKey)) === 'object') {
          item = columns.find(function (el) {
            return el.key === columnKey.key;
          });
        } else {
          item = columns.find(function (el) {
            return el.key === columnKey;
          });
        }
        var label = _react2.default.createElement(
          'label',
          { key: item ? item.name : '', style: { marginTop: 2, marginLeft: 10, marginRight: 5 } },
          item ? item.name : ''
        );
        var value = void 0;
        if ((typeof columnKey === 'undefined' ? 'undefined' : (0, _typeof3.default)(columnKey)) === 'object') {
          value = _rows.reduce(function (res, row) {
            return res + columnKey.rule(row);
          }, 0);
        } else {
          value = _rows.reduce(function (res, row) {
            return res + Number(row[columnKey] || 0);
          }, 0);
        }
        return res.concat([label, parseInt(value)]);
      }, []) : null
    )
  );
});

var EgGrid = (0, _mobxReact.observer)(function (props) {
  // console.log('EgGrid进行渲染render()',this.state.selectedKeyValues)
  var _props$store = props.store,
      _class = _props$store._class,
      columns = _props$store.columns,
      selectedKeyValues = _props$store.selectedKeyValues,
      primaryKeyField = _props$store.primaryKeyField,
      loading = _props$store.loading,
      showCheckBox = _props$store.showCheckBox,
      sortAll = _props$store.sortAll,
      RowRenderer = _props$store.RowRenderer,
      setWrapperRef = _props$store.setWrapperRef,
      handleHeaderDrop = _props$store.handleHeaderDrop,
      handleGridSort = _props$store.handleGridSort,
      handleGridSortAll = _props$store.handleGridSortAll,
      getSubRowDetails = _props$store.getSubRowDetails,
      onCellExpand = _props$store.onCellExpand,
      handleRowsSelected = _props$store.handleRowsSelected,
      handleRowsDeselected = _props$store.handleRowsDeselected,
      onRowClick = _props$store.onRowClick,
      rowGetter = _props$store.rowGetter,
      rowsCount = _props$store.rowsCount;
  var _props$style = props.style,
      style = _props$style === undefined ? {} : _props$style;

  return _react2.default.createElement(
    _elementReact.Loading,
    { className: 'grid-loading' + (_class ? ' ' + _class : ''), loading: loading, style: (0, _extends3.default)({ display: 'flex', height: '100%', flexFlow: 'column nowrap' }, style) },
    _react2.default.createElement(
      'div',
      { key: '1', className: 'EgGrid', ref: setWrapperRef },
      _react2.default.createElement(
        _reactDataGridAddons.DraggableHeader.DraggableContainer,
        { key: '1', onHeaderDrop: handleHeaderDrop },
        _react2.default.createElement(_reactDataGrid2.default, { columns: columns.slice(0), rowGetter: rowGetter, rowsCount: rowsCount, onGridSort: sortAll ? handleGridSortAll : handleGridSort,
          getSubRowDetails: getSubRowDetails, onCellExpand: onCellExpand, rowSelection: {
            showCheckbox: !!showCheckBox,
            enableShiftSelect: true,
            onRowsSelected: handleRowsSelected,
            onRowsDeselected: handleRowsDeselected,
            selectBy: {
              keys: {
                rowKey: primaryKeyField,
                values: selectedKeyValues.slice(0)
              }
            }
          }, onRowClick: onRowClick, rowRenderer: RowRenderer })
      ),
      _react2.default.createElement(Pager, { key: '2', store: props.store })
    ),
    _react2.default.createElement('div', { key: '2', style: { flex: '0 0 8px' } })
  );
});

exports.default = EgGrid;