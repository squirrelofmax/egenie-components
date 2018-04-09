'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

exports.default = getNewFormatter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNewFormatter(comp, foo) {
  return function (_Component) {
    (0, _inherits3.default)(NewFormatter, _Component);

    function NewFormatter() {
      (0, _classCallCheck3.default)(this, NewFormatter);
      return (0, _possibleConstructorReturn3.default)(this, (NewFormatter.__proto__ || (0, _getPrototypeOf2.default)(NewFormatter)).apply(this, arguments));
    }

    (0, _createClass3.default)(NewFormatter, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(comp, (0, _assign2.default)({}, this.props, { foo: foo }));
      }
    }]);
    return NewFormatter;
  }(_react.Component);
} // Created by Vincent on 17/08/2