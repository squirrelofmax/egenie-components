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

var _ReportModel = require('./ReportModel');

var _ReportModel2 = _interopRequireDefault(_ReportModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReportListModel = function ReportListModel(_ref) {
  var list = _ref.list,
      options = (0, _objectWithoutProperties3.default)(_ref, ['list']);
  (0, _classCallCheck3.default)(this, ReportListModel);

  _initialiseProps.call(this);

  (0, _mobx.extendObservable)(this, (0, _extends4.default)({
    id: _shortid2.default.generate(),
    top: {},
    activeTab: '',
    get cursorTabModel() {
      var activeTab = this.activeTab;

      return this.listModel.find(function (el) {
        return el.tab.value === activeTab;
      });
    },
    tabsFlag: {
      inited: {},
      searched: {}
    },
    showOtherTabs: false, // 是否show第二行tabs
    sumCards: [], // sumCards的配置，它的值跟tab无关，只跟filteritems的查询条件有关
    listModel: []
  }, options || {}));

  this.setListModel(list);
};
// model


var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.onClickTab = (0, _mobx.action)(function (tabValue) {
    var _tabsFlag = _this.tabsFlag,
        inited = _tabsFlag.inited,
        searched = _tabsFlag.searched;
    // inited[tabValue]=true

    _this.tabsFlag.inited = (0, _extends4.default)({}, inited, (0, _defineProperty3.default)({}, tabValue, true));
    _this.activeTab = tabValue;
    if (!searched[tabValue]) _this.top.handleSearch();
  });
  this.toggleOtherTabs = (0, _mobx.action)(function () {
    _this.showOtherTabs = !_this.showOtherTabs;
  });
  this.setListModel = (0, _mobx.action)(function (list) {
    _this.listModel = list.map(function (el) {
      return new _ReportModel2.default((0, _extends4.default)({}, el, { top: _this.top, parent: _this }));
    }, _this);
  });
};

exports.default = ReportListModel;