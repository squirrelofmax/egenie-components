'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _elementReact = require('element-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _console;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var response, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (_console = console).log.apply(_console, (0, _toConsumableArray3.default)(args).concat(['进入egFetch']));
            _context.next = 3;
            return fetch.apply(undefined, (0, _toConsumableArray3.default)(args));

          case 3:
            response = _context.sent;

            if (response.ok) {
              _context.next = 7;
              break;
            }

            _elementReact.Message.error({ message: '网络错误，请检查！', showClose: true });
            return _context.abrupt('return');

          case 7:
            _context.prev = 7;
            _context.next = 10;
            return response.json();

          case 10:
            result = _context.sent;

            if (!(result.status === 'Unauthenticated')) {
              _context.next = 14;
              break;
            }

            _elementReact.Message.error(result.data);
            return _context.abrupt('return', result);

          case 14:
            return _context.abrupt('return', result);

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](7);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[7, 17]]);
  }));

  function egFetch() {
    return _ref.apply(this, arguments);
  }

  return egFetch;
}(); // Created by Max on 17/06/17