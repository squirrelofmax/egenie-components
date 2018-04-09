'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MorePanelModel = function MorePanelModel(options) {
  var _this = this;

  (0, _classCallCheck3.default)(this, MorePanelModel);
  this.toggleShow = (0, _mobx.action)(function () {
    _this.show = !_this.show;
  });

  (0, _mobx.extendObservable)(this, (0, _extends3.default)({
    id: _shortid2.default.generate(),
    show: false
  }, options || {}));
}
/**
 * actions
 */
;

exports.default = MorePanelModel;