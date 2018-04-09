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

var _FilterSet = require('./FilterSet');

var _FilterSet2 = _interopRequireDefault(_FilterSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 框架
var TabsLabel = (0, _mobxReact.observer)(function (_ref) {
  var name = _ref.name,
      onDelete = _ref.onDelete;
  return _react2.default.createElement(
    'span',
    null,
    name,
    _react2.default.createElement(_elementReact.Button, { icon: 'delete2', style: { marginLeft: '5px' }, type: 'text', size: 'mini', onClick: function onClick(e) {
        e.stopPropagation();
        onDelete(name);
      } })
  );
});
// import DevTools from 'mobx-react-devtools'
// 请求

// 模块


var FilterSetList = (0, _mobxReact.observer)(function (_Component) {
  (0, _inherits3.default)(FilterSetList, _Component);

  function FilterSetList() {
    (0, _classCallCheck3.default)(this, FilterSetList);
    return (0, _possibleConstructorReturn3.default)(this, (FilterSetList.__proto__ || (0, _getPrototypeOf2.default)(FilterSetList)).apply(this, arguments));
  }
  // this.props.store.cursorFilterSetModel.handleSearch()
  // this.props.store.isReport && this.props.store.cursorFilterSetModel.reportListModel.cursorTabModel.querySumCards()


  (0, _createClass3.default)(FilterSetList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props$store = this.props.store,
          activeTabName = _props$store.activeTabName,
          onTabsClick = _props$store.onTabsClick,
          inited = _props$store.tabsFlag.inited,
          filterSetList = _props$store.filterSetList,
          deleteFilterSet = _props$store.deleteFilterSet;
      var _class = this.props._class;

      return _react2.default.createElement(
        'div',
        { className: 'filterset-top-container' + (_class ? ' ' + _class : '') },
        _react2.default.createElement(
          _elementReact.Tabs,
          { activeName: activeTabName, type: 'border-card', onTabClick: onTabsClick },
          filterSetList.map(function (filterset) {
            var name = filterset.name,
                sysSetting = filterset.sysSetting,
                tabLabel = filterset.tabLabel;

            return _react2.default.createElement(
              _elementReact.Tabs.Pane,
              { label: sysSetting ? tabLabel || name : _react2.default.createElement(TabsLabel, { name: name, onDelete: deleteFilterSet.bind(_this2, name) }), name: name, key: name },
              inited[name] ? _react2.default.createElement(_FilterSet2.default, { store: filterset }) : null
            );
          })
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }]);
  return FilterSetList;
}(_react.Component));

exports.default = FilterSetList;