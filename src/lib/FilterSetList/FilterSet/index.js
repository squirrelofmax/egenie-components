'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elementReact = require('element-react');

var _mobxReact = require('mobx-react');

var _EgGridMobx = require('../../EgGrid/EgGridMobx');

var _EgGridMobx2 = _interopRequireDefault(_EgGridMobx);

var _FilterGroup = require('./partials/FilterGroup');

var _FilterGroup2 = _interopRequireDefault(_FilterGroup);

var _MoreFilterPanel = require('./partials/MoreFilterPanel');

var _MoreFilterPanel2 = _interopRequireDefault(_MoreFilterPanel);

var _OrderPanel = require('./partials/OrderPanel/OrderPanel');

var _OrderPanel2 = _interopRequireDefault(_OrderPanel);

require('../../../css/FilterSetList/FilterSet/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 框架
var ButtonsOfSubTable = (0, _mobxReact.observer)(function (_ref) {
  var store = _ref.store,
      _buttons = _ref.store._buttons;

  if (!_buttons.length) return null;
  return _react2.default.createElement(
    'div',
    { className: 'filterset__subtable__header', style: {
        position: 'absolute',
        top: -37,
        left: 140,
        display: 'flex',
        height: 26,
        alignItems: 'center' } },
    _buttons.map(function (el, index) {
      var group = el.group;

      return group ? _react2.default.createElement(
        _elementReact.Dropdown,
        { key: index, style: { marginRight: 10 }, onCommand: function onCommand(idx) {
            return group.find(function (el) {
              return String(el.idx) === idx;
            }).handleClick();
          }, menu: _react2.default.createElement(
            _elementReact.Dropdown.Menu,
            null,
            group.map(function (item) {
              return _react2.default.createElement(
                _elementReact.Dropdown.Item,
                { key: item.idx, disabled: item.disabled, style: { fontSize: 12 }, command: item.idx + '' },
                el.icon ? _react2.default.createElement('i', { className: el.icon, style: { marginRight: 3 } }) : null,
                item.text
              );
            })
          ) },
        _react2.default.createElement(
          _elementReact.Button,
          { type: 'plain', size: 'small', onClick: el.handleClick.bind(store), key: index, disabled: el.disabled },
          el.icon ? _react2.default.createElement('i', { className: el.icon, style: { marginRight: 3, color: '#20A0FF' } }) : null,
          el.text,
          _react2.default.createElement('i', { className: 'el-icon-caret-bottom el-icon--right' })
        )
      ) : _react2.default.createElement(
        _elementReact.Button,
        { disabled: el.disabled, size: 'small', onClick: el.handleClick.bind(store), key: index,
          style: {} },
        el.icon ? _react2.default.createElement('i', { className: el.icon, style: { marginRight: 3, color: '#20A0FF' } }) : null,
        el.text
      );
    })
  );
});

// 关联页面
// 样式

// 请求

// 模块


var FilterItemsOfSubTable = (0, _mobxReact.observer)(function (_ref2) {
  var _ref2$store = _ref2.store,
      filteritems = _ref2$store.filteritems,
      onFilterValueChange = _ref2$store.onFilterValueChange,
      onSearch = _ref2$store.onSearch,
      allFilteritemsInOneGroup = _ref2$store.allFilteritemsInOneGroup,
      clearAfterChangeFilteritem = _ref2$store.clearAfterChangeFilteritem,
      cursorFilteritem = _ref2$store.cursorFilteritem,
      onCursorFilteritemFieldChange = _ref2$store.onCursorFilteritemFieldChange,
      numOfHasValue = _ref2$store.numOfHasValue,
      getDisplayValueOfFilteritem = _ref2$store.getDisplayValueOfFilteritem;

  return filteritems.length ? _react2.default.createElement(
    'div',
    { className: 'right-corner', style: {
        position: 'absolute',
        top: -37,
        right: 0,
        display: 'flex',
        height: 26,
        width: 420,
        alignItems: 'center'
      } },
    allFilteritemsInOneGroup ? [_react2.default.createElement(
      _elementReact.Badge,
      { key: '1', style: { flex: '0 0 180px', marginRight: 10 }, className: numOfHasValue ? '' : 'count0', value: numOfHasValue },
      _react2.default.createElement(
        _elementReact.Select,
        { size: 'small', style: { width: '100%' }, value: cursorFilteritem ? cursorFilteritem.field : '', onChange: onCursorFilteritemFieldChange },
        filteritems.map(function (el) {
          return _react2.default.createElement(
            _elementReact.Select.Option,
            { key: el.field, label: el.label, value: el.field },
            _react2.default.createElement(
              'span',
              { style: { float: 'left', fontSize: 11 } },
              el.label
            ),
            _react2.default.createElement(
              'span',
              { style: { float: 'right', color: '#ff4949', fontSize: 11, maxWidth: 100, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } },
              getDisplayValueOfFilteritem(el)
            )
          );
        })
      )
    ), cursorFilteritem && cursorFilteritem.type === 'select' ? _react2.default.createElement(
      _elementReact.Select,
      { key: '2', clearable: true, size: 'small', style: { marginRight: 10, flex: 'auto' }, value: cursorFilteritem.value, onChange: onFilterValueChange.bind(undefined, null) },
      cursorFilteritem.options.map(function (el) {
        return _react2.default.createElement(_elementReact.Select.Option, { key: el.value, label: el.label, value: el.value });
      })
    ) : _react2.default.createElement(_elementReact.Input, { key: '2', size: 'small', style: { marginRight: 10 }, value: cursorFilteritem ? cursorFilteritem.value : '', onChange: onFilterValueChange.bind(undefined, null) })] : filteritems.map(function (el, index) {
      var label = el.label,
          field = el.field,
          type = el.type,
          value = el.value,
          options = el.options;

      return _react2.default.createElement(
        'label',
        { style: { display: 'flex', whiteSpace: 'nowrap', alignItems: 'center', marginRight: 10, width: 170 } },
        label + ':',
        type === 'select' ? _react2.default.createElement(
          _elementReact.Select,
          { key: index, clearable: true, size: 'small', style: { marginRight: 10, flex: 'auto' }, value: value, onChange: onFilterValueChange.bind(undefined, field) },
          options.map(function (el) {
            return _react2.default.createElement(_elementReact.Select.Option, { key: el.value, label: el.label, value: el.value });
          })
        ) : _react2.default.createElement(_elementReact.Input, { key: index, size: 'small', style: { marginRight: 10 }, value: value, onChange: onFilterValueChange.bind(undefined, field) })
      );
    }),
    _react2.default.createElement(
      _elementReact.Button,
      { size: 'mini', icon: 'search', onClick: onSearch },
      '\u67E5\u8BE2'
    )
  ) : null;
});

var SubTable = (0, _mobxReact.observer)(function (_ref3) {
  var activeTab = _ref3.activeTab,
      store = _ref3.store,
      _ref3$store = _ref3.store,
      value = _ref3$store.tab.value,
      gridModel = _ref3$store.gridModel,
      isInited = _ref3$store.isInited,
      isCursor = _ref3$store.isCursor;

  return isInited ? _react2.default.createElement(
    'div',
    { className: 'tab-content__detail ' + value, style: { position: 'relative',
        height: '100%',
        flexFlow: 'column nowrap',
        margin: '10px 18px 0',
        display: isCursor ? 'flex' : 'none' } },
    _react2.default.createElement(_EgGridMobx2.default, { store: gridModel }),
    _react2.default.createElement(FilterItemsOfSubTable, { store: store }),
    _react2.default.createElement(ButtonsOfSubTable, { store: store })
  ) : null;
});

var ButtonHeader = (0, _mobxReact.observer)(function (_ref4) {
  var store = _ref4.store,
      _ref4$store = _ref4.store,
      _buttons = _ref4$store._buttons,
      fullScreen = _ref4$store.foldModel.fullScreen;

  return _react2.default.createElement(
    'div',
    { className: 'header', style: { display: fullScreen ? 'none' : '' } },
    _buttons.map(function (el, index) {
      var group = el.group;

      return group ? _react2.default.createElement(
        _elementReact.Dropdown,
        { key: index, style: { marginRight: 10 }, onCommand: function onCommand(idx) {
            return group.find(function (el) {
              return String(el.idx) === idx;
            }).handleClick();
          }, menu: _react2.default.createElement(
            _elementReact.Dropdown.Menu,
            null,
            group.map(function (item) {
              return _react2.default.createElement(
                _elementReact.Dropdown.Item,
                { key: item.idx, disabled: item.disabled, style: { fontSize: 12 }, command: item.idx + '' },
                el.icon ? _react2.default.createElement('i', { className: el.icon, style: { marginRight: 3 } }) : null,
                item.text
              );
            })
          ) },
        _react2.default.createElement(
          _elementReact.Button,
          { type: 'plain', size: 'small', onClick: el.handleClick.bind(store), key: index, disabled: el.disabled },
          el.icon ? _react2.default.createElement('i', { className: el.icon, style: { marginRight: 3, color: '#20A0FF' } }) : null,
          el.text,
          _react2.default.createElement('i', { className: 'el-icon-caret-bottom el-icon--right' })
        )
      ) : _react2.default.createElement(
        _elementReact.Button,
        { disabled: el.disabled, size: 'small', onClick: el.handleClick.bind(store), key: index,
          style: {} },
        el.icon ? _react2.default.createElement('i', { className: el.icon, style: { marginRight: 3, color: '#20A0FF' } }) : null,
        el.text
      );
    })
  );
});

var ButtonHeaderOfReport = (0, _mobxReact.observer)(function (_ref5) {
  var store = _ref5.store,
      _ref5$store = _ref5.store,
      fullScreen = _ref5$store.foldModel.fullScreen,
      listModel = _ref5$store.reportListModel.listModel;

  if (!listModel.length) return null;
  return listModel.map(function (el) {
    var isCursor = el.isCursor,
        isInited = el.isInited,
        _buttons = el._buttons;

    var ret = _buttons.length && isInited ? _react2.default.createElement(
      'div',
      { className: 'filterset__report__header', style: { display: fullScreen ? 'none' : isCursor ? 'flex' : 'none', alignItems: 'center', padding: '0px 18px 5px', flexFlow: 'row nowrap', flex: '0 0 28px' } },
      _buttons.map(function (el, index) {
        var group = el.group;

        return group ? _react2.default.createElement(
          _elementReact.Dropdown,
          { key: index, style: { marginRight: 10 }, onCommand: function onCommand(idx) {
              return group.find(function (el) {
                return String(el.idx) === idx;
              }).handleClick();
            }, menu: _react2.default.createElement(
              _elementReact.Dropdown.Menu,
              null,
              group.map(function (item) {
                return _react2.default.createElement(
                  _elementReact.Dropdown.Item,
                  { key: item.idx, disabled: item.disabled, style: { fontSize: 12 }, command: item.idx + '' },
                  el.icon ? _react2.default.createElement('i', { className: el.icon, style: { marginRight: 3 } }) : null,
                  item.text
                );
              })
            ) },
          _react2.default.createElement(
            _elementReact.Button,
            { type: 'plain', size: 'small', onClick: el.handleClick.bind(store), key: index, disabled: el.disabled },
            el.icon ? _react2.default.createElement('i', { className: el.icon, style: { marginRight: 3, color: '#20A0FF' } }) : null,
            el.text,
            _react2.default.createElement('i', { className: 'el-icon-caret-bottom el-icon--right' })
          )
        ) : _react2.default.createElement(
          _elementReact.Button,
          { disabled: el.disabled, size: 'small', onClick: el.handleClick.bind(store), key: index,
            style: {} },
          el.icon ? _react2.default.createElement('i', { className: el.icon, style: { marginRight: 3, color: '#20A0FF' } }) : null,
          el.text
        );
      })
    ) : null;
    return ret;
  });
});

var Filters = (0, _mobxReact.observer)(function (_ref6) {
  var store = _ref6.store,
      _ref6$store = _ref6.store,
      isFirefox = _ref6$store.isFirefox,
      handleSearch = _ref6$store.handleSearch,
      reset = _ref6$store.reset,
      generateScheme = _ref6$store.generateScheme,
      hiddenOrderButton = _ref6$store.hiddenOrderButton,
      OrderPanelModel = _ref6$store.OrderPanelModel,
      MorePanelModel = _ref6$store.MorePanelModel,
      numOfDisplayFilterItems = _ref6$store.numOfDisplayFilterItems,
      changedFilterNumInMorePanel = _ref6$store.changedFilterNumInMorePanel,
      fullScreen = _ref6$store.foldModel.fullScreen;

  return _react2.default.createElement(
    'div',
    { className: 'filtergroup-container', style: { display: fullScreen ? 'none' : '' } },
    _react2.default.createElement(
      'div',
      { className: 'filtergroup-buttons-wrapper' },
      _react2.default.createElement(
        _elementReact.Button,
        { icon: 'search', type: 'plain', size: 'small', className: 'btn-search', onClick: handleSearch },
        '\u67E5\u8BE2'
      ),
      _react2.default.createElement(
        _elementReact.Button,
        { type: 'plain', size: 'small', className: 'btn-reset', onClick: reset },
        '\u91CD\u7F6E'
      ),
      _react2.default.createElement(
        _elementReact.Button,
        { type: 'plain', size: 'small', className: 'btn-new', onClick: generateScheme },
        '\u751F\u6210\u65B9\u6848'
      ),
      _react2.default.createElement(
        _elementReact.Badge,
        { style: { right: numOfDisplayFilterItems > 10 ? 0 : '-200px' }, className: changedFilterNumInMorePanel ? '' : 'count0', value: changedFilterNumInMorePanel },
        _react2.default.createElement(
          _elementReact.Button,
          { type: 'plain', className: 'btn-more', icon: MorePanelModel.show ? 'arrow-up' : 'arrow-down', size: 'small', onClick: MorePanelModel.toggleShow },
          MorePanelModel.show ? '收起' : '更多'
        )
      ),
      hiddenOrderButton ? null : _react2.default.createElement(
        _elementReact.Button,
        { className: 'btn-order', type: 'plain', size: 'small', onClick: OrderPanelModel.toggleShow },
        '\u8BBE\u7F6E\u6761\u4EF6\u663E\u793A\u987A\u5E8F'
      )
    ),
    _react2.default.createElement(_FilterGroup2.default, { store: store }),
    _react2.default.createElement(_MoreFilterPanel2.default, { store: store }),
    _react2.default.createElement(_OrderPanel2.default, { store: store })
  );
});

var ToggleBtn = (0, _mobxReact.observer)(function (_ref7) {
  var _ref7$store = _ref7.store,
      foldFlag = _ref7$store.foldFlag,
      fullScreen = _ref7$store.fullScreen,
      onFold = _ref7$store.onFold;

  return _react2.default.createElement(
    'div',
    { className: 'toggleBtn', style: { display: fullScreen ? 'none' : '' } },
    _react2.default.createElement(
      'span',
      { className: 'btn-wrapper' + (foldFlag ? ' fold' : ''), onClick: onFold },
      _react2.default.createElement(_elementReact.Icon, { name: 'd-arrow-right' })
    )
  );
});

var DropLine = (0, _mobxReact.observer)(function (_ref8) {
  var _ref8$store = _ref8.store,
      fullScreen = _ref8$store.fullScreen,
      setDropLineRef = _ref8$store.setDropLineRef,
      onDragStart = _ref8$store.onDragStart,
      onDragEnd = _ref8$store.onDragEnd,
      foldFlag = _ref8$store.foldFlag;

  return _react2.default.createElement(
    'div',
    { className: 'dropline', draggable: true, ref: setDropLineRef,
      onDragStart: onDragStart, onDragEnd: onDragEnd, style: { display: fullScreen ? 'none' : '' } },
    _react2.default.createElement('div', { className: 'center-note' })
  );
});

var SubContent = (0, _mobxReact.observer)(function (_ref9) {
  var _ref9$store = _ref9.store,
      _ref9$store$foldModel = _ref9$store.foldModel,
      fullScreen = _ref9$store$foldModel.fullScreen,
      height = _ref9$store$foldModel.height,
      toggleFullScreen = _ref9$store$foldModel.toggleFullScreen,
      subTablesModel = _ref9$store.subTablesModel;
  var activeTab = subTablesModel.activeTab,
      listModel = subTablesModel.listModel,
      onClickTab = subTablesModel.onClickTab;

  return _react2.default.createElement(
    'div',
    { className: 'subtable', style: { flex: (fullScreen ? '1 1 ' : '1 0 ') + height + 'px' } },
    _react2.default.createElement(
      'div',
      { className: 'detail-header' },
      _react2.default.createElement(
        'ul',
        { className: 'tabs' },
        listModel.map(function (el) {
          var _el$tab = el.tab,
              name = _el$tab.name,
              value = _el$tab.value;

          return _react2.default.createElement(
            'li',
            { key: value, onClick: onClickTab.bind(undefined, value),
              className: 'tab' + (activeTab === value ? ' active' : '') },
            name
          );
        })
      ),
      _react2.default.createElement('i', { className: 'fa tooltipstered fa-' + (fullScreen ? 'compress' : 'expand'), onClick: toggleFullScreen })
    ),
    _react2.default.createElement(
      'div',
      { className: 'tab-content' },
      listModel.map(function (el) {
        return _react2.default.createElement(SubTable, { key: el.id, store: el });
      })
    )
  );
});

var SubContentOfReport = (0, _mobxReact.observer)(function (_ref10) {
  var _ref10$store = _ref10.store,
      _ref10$store$foldMode = _ref10$store.foldModel,
      fullScreen = _ref10$store$foldMode.fullScreen,
      height = _ref10$store$foldMode.height,
      toggleFullScreen = _ref10$store$foldMode.toggleFullScreen,
      reportListModel = _ref10$store.reportListModel;

  return _react2.default.createElement(
    'div',
    { className: 'subtable', style: { flex: (fullScreen ? '1 1 ' : '1 0 ') + height + 'px' } },
    _react2.default.createElement(
      'div',
      { className: 'detail-header' },
      reportListModel.listModel.map(function (report) {
        var id = report.id,
            isInited = report.isInited,
            isCursor = report.isCursor,
            _report$subTablesMode = report.subTablesModel,
            listModel = _report$subTablesMode.listModel,
            onClickTab = _report$subTablesMode.onClickTab,
            activeTab = _report$subTablesMode.activeTab;

        var ret = isInited ? _react2.default.createElement(
          'ul',
          { className: 'tabs', style: { display: isCursor ? '' : 'none' }, key: id },
          listModel.map(function (el) {
            var _el$tab2 = el.tab,
                name = _el$tab2.name,
                value = _el$tab2.value;

            return _react2.default.createElement(
              'li',
              { onClick: onClickTab.bind(undefined, value), key: name,
                className: 'tab' + (activeTab === value ? ' active' : '') },
              name
            );
          })
        ) : null;
        return ret;
      }),
      _react2.default.createElement('i', { className: 'fa tooltipstered fa-' + (fullScreen ? 'compress' : 'expand'), onClick: toggleFullScreen })
    ),
    reportListModel.listModel.map(function (report) {
      var id = report.id,
          isInited = report.isInited,
          isCursor = report.isCursor,
          listModel = report.subTablesModel.listModel;

      var ret = isInited ? _react2.default.createElement(
        'div',
        { className: 'tab-content', style: { display: isCursor ? '' : 'none' } },
        listModel.map(function (el) {
          return _react2.default.createElement(SubTable, { store: el, key: id });
        })
      ) : null;
      return ret;
    })
  );
});

var TabsHeaderOfReport = (0, _mobxReact.observer)(function (_ref11) {
  var _ref11$store = _ref11.store,
      fullScreen = _ref11$store.foldModel.fullScreen,
      _ref11$store$reportLi = _ref11$store.reportListModel,
      listModel = _ref11$store$reportLi.listModel,
      onClickTab = _ref11$store$reportLi.onClickTab,
      showOtherTabs = _ref11$store$reportLi.showOtherTabs,
      toggleOtherTabs = _ref11$store$reportLi.toggleOtherTabs,
      hiddenOrderButton = _ref11$store.hiddenOrderButton;

  return fullScreen ? null : _react2.default.createElement(
    'div',
    { className: 'filterset-report__tabs-container' + (showOtherTabs ? ' expand' : '') + (hiddenOrderButton ? '' : ' hasOrderBtn') + (listModel.length > 7 ? ' overMax' : '') },
    _react2.default.createElement(
      'div',
      { className: 'filterset-report__tabs-wrapper' },
      listModel.slice(0, 7).map(function (el) {
        return _react2.default.createElement(
          'div',
          { key: el.id, className: 'filterset-report__tabs-tab' + (el.isCursor ? ' current' : ''), onClick: onClickTab.bind(undefined, el.tab.value), title: el.tab.name },
          el.tab.name
        );
      })
    ),
    listModel.length > 7 ? _react2.default.createElement(
      _elementReact.Button,
      { type: 'plain', className: 'filterset-report__btn-more', icon: showOtherTabs ? 'arrow-up' : 'arrow-down', size: 'small', onClick: toggleOtherTabs },
      showOtherTabs ? '收起' : '更多'
    ) : null,
    listModel.length > 7 ? _react2.default.createElement(
      'div',
      { className: 'filterset-report__tabs-wrapper' + (showOtherTabs ? '' : ' hidden') },
      listModel.slice(7).map(function (el) {
        return _react2.default.createElement(
          'div',
          { key: el.id, className: 'filterset-report__tabs-tab' + (el.isCursor ? ' current' : ''), onClick: onClickTab.bind(undefined, el.tab.value), title: el.tab.name },
          el.tab.name
        );
      })
    ) : null
  );
});

var SumCardsOfReport = (0, _mobxReact.observer)(function (_ref12) {
  var _ref12$store = _ref12.store,
      fullScreen = _ref12$store.foldModel.fullScreen,
      _ref12$store$reportLi = _ref12$store.reportListModel,
      listModel = _ref12$store$reportLi.listModel,
      onClickTab = _ref12$store$reportLi.onClickTab,
      sumCards = _ref12$store$reportLi.sumCards;

  return fullScreen ? null : sumCards && sumCards.length ? _react2.default.createElement(
    'div',
    { className: 'filterset-report__sumcards-wrappper' },
    (sumCards || []).map(function (_ref13) {
      var label = _ref13.label,
          field = _ref13.field,
          ui = _ref13.ui,
          value = _ref13.value;
      return _react2.default.createElement(
        'div',
        { className: 'filterset-report__sumcards-card', key: field },
        _react2.default.createElement(
          'div',
          { className: 'left' },
          _react2.default.createElement(
            'div',
            { className: 'back', style: { backgroundColor: ui.color || '#4b56e1' } },
            _react2.default.createElement('i', { className: ui.icon || '' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'right' },
          _react2.default.createElement(
            'label',
            null,
            label
          ),
          _react2.default.createElement(
            'p',
            { className: 'value', style: { color: ui.color || '#4b56e1' } },
            value || 0
          )
        )
      );
    })
  ) : _react2.default.createElement('div', { style: { flex: '0 0 5px' } });
});

var MainOfReport = (0, _mobxReact.observer)(function (_ref14) {
  var _ref14$store = _ref14.store,
      fullScreen = _ref14$store.foldModel.fullScreen,
      listModel = _ref14$store.reportListModel.listModel;

  return _react2.default.createElement(
    'div',
    { className: 'main', style: { display: fullScreen ? 'none' : '', height: '100%' } },
    listModel.map(function (el) {
      var isCursor = el.isCursor,
          isInited = el.isInited,
          gridModel = el.gridModel;

      var ret = isInited ? _react2.default.createElement(_EgGridMobx2.default, { store: gridModel, style: { display: isCursor ? 'flex' : 'none' } }) : null;
      return ret;
    })
  );
});

var FilterSet = (0, _mobxReact.observer)(function (_Component) {
  (0, _inherits3.default)(FilterSet, _Component);

  function FilterSet() {
    (0, _classCallCheck3.default)(this, FilterSet);
    return (0, _possibleConstructorReturn3.default)(this, (FilterSet.__proto__ || (0, _getPrototypeOf2.default)(FilterSet)).apply(this, arguments));
  }

  (0, _createClass3.default)(FilterSet, [{
    key: 'render',
    value: function render() {
      var hiddenSubTables = this.props.store.hiddenSubTables;
      // report相关

      var cursorTabModel = this.props.store.reportListModel.cursorTabModel;

      return this.props.store.parent.isReport ? _react2.default.createElement(
        'div',
        { className: 'filterset-wrapper ' + this.props.store.name, ref: 'wrapper' },
        _react2.default.createElement(Filters, { store: this.props.store }),
        _react2.default.createElement(TabsHeaderOfReport, { store: this.props.store }),
        _react2.default.createElement(SumCardsOfReport, { store: this.props.store }),
        _react2.default.createElement(ButtonHeaderOfReport, { store: this.props.store }),
        _react2.default.createElement(MainOfReport, { store: this.props.store }),
        !cursorTabModel.hiddenSubTables ? _react2.default.createElement(ToggleBtn, { store: this.props.store.foldModel }) : null,
        !cursorTabModel.hiddenSubTables ? _react2.default.createElement(DropLine, { store: this.props.store.foldModel }) : null,
        !cursorTabModel.hiddenSubTables ? _react2.default.createElement(SubContentOfReport, { store: this.props.store }) : null
      ) : _react2.default.createElement(
        'div',
        { className: 'filterset-wrapper ' + this.props.store.name, ref: 'wrapper' },
        _react2.default.createElement(Filters, { store: this.props.store }),
        _react2.default.createElement(ButtonHeader, { store: this.props.store }),
        _react2.default.createElement(
          'div',
          { className: 'main', style: { display: this.props.store.foldModel.fullScreen ? 'none' : '', height: '100%' } },
          _react2.default.createElement(_EgGridMobx2.default, { store: this.props.store.gridModel })
        ),
        !hiddenSubTables ? _react2.default.createElement(ToggleBtn, { store: this.props.store.foldModel }) : null,
        !hiddenSubTables ? _react2.default.createElement(DropLine, { store: this.props.store.foldModel }) : null,
        !hiddenSubTables ? _react2.default.createElement(SubContent, { store: this.props.store }) : null
      );
    }
  }]);
  return FilterSet;
}(_react.Component));

exports.default = FilterSet;