'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumnsConfig = exports.saveColumnsConfig = exports.getUser = exports.cache = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var getUser = exports.getUser = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!getUser.cache) {
              myInit = {
                method: 'GET',
                credentials: 'include'
              };
              url = '/api/dashboard/user';

              getUser.cache = (0, _egFetch2.default)(url, myInit);
            }
            _context.next = 3;
            return getUser.cache;

          case 3:
            response = _context.sent;
            result = response || { status: 'Failed', data: '网络错误：获取用户信息失败，请联系管理员！' };

            console.log(result);
            return _context.abrupt('return', result);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getUser() {
    return _ref3.apply(this, arguments);
  };
}();

var saveColumnsConfig = exports.saveColumnsConfig = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cache.setCache(data);
            data = 'cacheKey=' + data.cacheKey + '&cacheValue=' + data.cacheValue;
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: data
            };
            url = '/api/dashboard/cache/save';
            _context2.next = 6;
            return (0, _egFetch2.default)(url, myInit);

          case 6:
            response = _context2.sent;
            result = response || { status: 'Failed', data: '网络错误：保存表格列配置失败，请联系管理员！' };

            console.log(result);
            if (result.status !== 'Failed') {
              result = { status: 'Successful', data: result };
            }
            return _context2.abrupt('return', result);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function saveColumnsConfig(_x) {
    return _ref4.apply(this, arguments);
  };
}();

var getColumnsConfig = exports.getColumnsConfig = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(params) {
    var item, myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            item = localStorage.getItem(params);

            if (!item) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt('return', { status: 'Successful', data: item });

          case 3:
            if (!getColumnsConfig.cache) getColumnsConfig.cache = {};
            if (!getColumnsConfig.cache[params]) {
              myInit = {
                method: 'GET',
                credentials: 'include'
              };
              url = '/api/dashboard/cache/get?cacheKey=' + params;

              getColumnsConfig.cache[params] = (0, _egFetch2.default)(url, myInit);
            }
            _context3.next = 7;
            return getColumnsConfig.cache[params];

          case 7:
            response = _context3.sent;
            result = response || { status: 'Failed', data: '网络错误：获取表格列配置失败，请联系管理员！' };

            console.log(result);
            return _context3.abrupt('return', result);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getColumnsConfig(_x2) {
    return _ref5.apply(this, arguments);
  };
}();

var _egFetch = require('../egFetch');

var _egFetch2 = _interopRequireDefault(_egFetch);

var _mobx = require('mobx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = exports.cache = (0, _mobx.observable)({ // columnsConfig的缓存，全局用
  value: {},
  setCache: (0, _mobx.action)(function (_ref) {
    var cacheKey = _ref.cacheKey,
        cacheValue = _ref.cacheValue;

    cache.setStorage({ cacheKey: cacheKey, cacheValue: cacheValue });
    if (cache.value[cacheKey] && cache.value[cacheKey] === cacheValue) return;
    cache.value = (0, _extends4.default)({}, cache.value, (0, _defineProperty3.default)({}, cacheKey, cacheValue));
  }),
  setStorage: (0, _mobx.action)(function (_ref2) {
    var cacheKey = _ref2.cacheKey,
        cacheValue = _ref2.cacheValue;

    var item = localStorage.getItem(cacheKey);
    if (!item || item !== cacheValue) localStorage.setItem(cacheKey, cacheValue);
  })
});