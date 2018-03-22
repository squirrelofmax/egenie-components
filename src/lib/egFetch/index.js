'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Created by Max on 17/06/17
// import React from 'react'
// import { Message } from 'element-react'
exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _console;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var response, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (_console = console).log.apply(_console, _toConsumableArray(args).concat(['进入egFetch']));
            _context.next = 3;
            return fetch.apply(undefined, _toConsumableArray(args));

          case 3:
            response = _context.sent;

            if (response.ok) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return');

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return response.json();

          case 9:
            result = _context.sent;

            if (!(result.status === 'Unauthenticated')) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', result);

          case 12:
            return _context.abrupt('return', result);

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](6);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[6, 15]]);
  }));

  function egFetch() {
    return _ref.apply(this, arguments);
  }

  return egFetch;
}();