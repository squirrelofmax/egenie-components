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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeStampFormatter = function (_Component) {
  (0, _inherits3.default)(TimeStampFormatter, _Component);

  function TimeStampFormatter() {
    (0, _classCallCheck3.default)(this, TimeStampFormatter);
    return (0, _possibleConstructorReturn3.default)(this, (TimeStampFormatter.__proto__ || (0, _getPrototypeOf2.default)(TimeStampFormatter)).apply(this, arguments));
  }

  (0, _createClass3.default)(TimeStampFormatter, [{
    key: 'render',
    value: function render() {
      var dateStr = this.timeStampFormatToStr(this.props.value);
      return _react2.default.createElement(
        'div',
        { style: { textAlign: 'left' }, title: dateStr },
        dateStr
      );
    }
  }, {
    key: 'timeStampFormatToStr',
    value: function timeStampFormatToStr(ts) {
      if (!ts) {
        return '';
      }
      if (typeof ts === 'string') {
        return ts;
      }
      var d = new Date(ts);
      var ydm = [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(function (el) {
        return String(el).padStart(2, 0);
      }).join('-');
      var hms = [d.getHours(), d.getMinutes(), d.getSeconds()].map(function (el) {
        return String(el).padStart(2, 0);
      }).join(':');
      return ydm + ' ' + hms;
    }
  }]);
  return TimeStampFormatter;
}(_react.Component);

exports.default = TimeStampFormatter;