'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGoodsCategory = exports.getVendorDict = exports.getWarehouse = exports.queryDetailOfProduct = exports.queryByProduct = exports.queryBySku = exports.getPurchaseOrderById = exports.deletePurchaseOrder = exports.createStockInOrder = exports.closePurchaseOrder = exports.publishPurchaseOrder = exports.recheckPurchaseOrder = exports.checkPurchaseOrder = exports.getDictsByTypes = exports.updateSaleOrderDetail = exports.getSaleOrderLogList = exports.getDetailList = exports.getList = exports.deleteScheme = exports.getConfig = exports.saveAsNewFilterset = exports.getDomain = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getDomain = exports.getDomain = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/iac/getDomain';
            _context.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context.sent;
            result = response || { status: 'Failed', data: '网络错误：获取域名失败，请联系管理员！' };

            console.log(result);
            return _context.abrupt('return', result);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getDomain() {
    return _ref.apply(this, arguments);
  };
}();

var saveAsNewFilterset = exports.saveAsNewFilterset = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
    var obj, myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            obj = (0, _extends3.default)({}, data);
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(obj)
              // const url = '/api/filterSet2/save/CRM'
            };
            url = '/api/filterSet2/save/PurRadio';
            // document.cookie='JSESSIONID=cc55b564-02d5-494e-b1bf-6509147d2945'

            _context2.next = 5;
            return (0, _egFetch2.default)(url, myInit);

          case 5:
            response = _context2.sent;
            result = response || { status: 'Failed', data: '网络错误：保存失败，请联系管理员！' };

            console.log(result);
            return _context2.abrupt('return', result);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function saveAsNewFilterset(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var getConfig = exports.getConfig = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/filterSet2/getConfig2?dictList=&itemList=vendor,organization&module=PurRadio';
            _context3.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context3.sent;
            result = response || { status: 'Failed', data: '网络错误：获取配置信息失败，请联系管理员！' };

            console.log(result);
            return _context3.abrupt('return', result);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getConfig() {
    return _ref3.apply(this, arguments);
  };
}();

var deleteScheme = exports.deleteScheme = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(name) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            myInit = {
              method: 'DELETE',
              credentials: 'include'
            };
            url = '/api/filterSet/filterSets/' + name + '/PurRadio';
            _context4.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context4.sent;
            result = response || { status: 'Failed', data: '网络错误：删除失败，请联系管理员！' };

            console.log(result);
            return _context4.abrupt('return', result);

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function deleteScheme(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var getList = exports.getList = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: data
            };
            url = '/api/pms/old_purchaseOrder/querys';
            _context5.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context5.sent;
            result = response || { status: 'Failed', data: '网络错误：获取采购订单列表失败，请联系管理员！' };

            console.log(result);
            if (result.status !== 'Failed') {
              result = { status: 'Successful', data: result };
            }
            return _context5.abrupt('return', result);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getList(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

var getDetailList = exports.getDetailList = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/pms/purchaseOrderDetail/getPageDetailByPurchaseOrderIdAndCond';
            _context6.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context6.sent;
            result = response || { status: 'Failed', data: '网络错误：获取采购订单明细列表失败，请联系管理员！' };

            console.log(result);
            return _context6.abrupt('return', result);

          case 8:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getDetailList(_x4) {
    return _ref6.apply(this, arguments);
  };
}();

var getSaleOrderLogList = exports.getSaleOrderLogList = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(pid, data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            data = data || {
              'page': '1',
              'pageSize': '20',
              'sord': 'asc'
            };
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/baseinfo/logBizRecordController/getLogsById/pms_purchase_order/' + pid;
            _context7.next = 5;
            return (0, _egFetch2.default)(url, myInit);

          case 5:
            response = _context7.sent;
            result = response || { status: 'Failed', data: '网络错误：获取采购订单日志列表失败，请联系管理员！' };

            console.log(result);
            return _context7.abrupt('return', result);

          case 9:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getSaleOrderLogList(_x5, _x6) {
    return _ref7.apply(this, arguments);
  };
}();

var updateSaleOrderDetail = exports.updateSaleOrderDetail = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(data, id) {
    var obj, myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            obj = (0, _extends3.default)({}, data);
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(obj)
            };
            url = '/api/trade/saleOrderDetail/update/' + id;
            _context8.next = 5;
            return (0, _egFetch2.default)(url, myInit);

          case 5:
            response = _context8.sent;
            result = response || { status: 'Failed', data: '网络错误：修改销售订单明细失败，请联系管理员！' };

            console.log(result);
            return _context8.abrupt('return', result);

          case 9:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function updateSaleOrderDetail(_x7, _x8) {
    return _ref8.apply(this, arguments);
  };
}();

var getDictsByTypes = exports.getDictsByTypes = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(param) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/trade/dict/getDictsByTypes?types=' + param;
            _context9.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context9.sent;
            result = response || { status: 'Failed', data: '网络错误：获取字典项失败，请联系管理员！' };

            console.log(result);
            return _context9.abrupt('return', result);

          case 8:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function getDictsByTypes(_x9) {
    return _ref9.apply(this, arguments);
  };
}();

var checkPurchaseOrder = exports.checkPurchaseOrder = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/pms/purchaseOrder/check/true';
            _context10.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context10.sent;
            result = response || { status: 'Failed', data: '网络错误：审核采购订单失败，请联系管理员！' };

            console.log(result);
            return _context10.abrupt('return', result);

          case 8:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function checkPurchaseOrder(_x10) {
    return _ref10.apply(this, arguments);
  };
}();

var recheckPurchaseOrder = exports.recheckPurchaseOrder = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/pms/purchaseOrder/check/false';
            _context11.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context11.sent;
            result = response || { status: 'Failed', data: '网络错误：反审核采购订单失败，请联系管理员！' };

            console.log(result);
            return _context11.abrupt('return', result);

          case 8:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function recheckPurchaseOrder(_x11) {
    return _ref11.apply(this, arguments);
  };
}();

var publishPurchaseOrder = exports.publishPurchaseOrder = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(ids) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/pms/tradeSaleOrder/pushSaleOrder/' + ids;
            _context12.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context12.sent;
            result = response || { status: 'Failed', data: '网络错误：发布采购订单失败，请联系管理员！' };

            console.log(result);
            return _context12.abrupt('return', result);

          case 8:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function publishPurchaseOrder(_x12) {
    return _ref12.apply(this, arguments);
  };
}();

var closePurchaseOrder = exports.closePurchaseOrder = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/pms/purchaseOrder/closeSimpleOrder';
            _context13.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context13.sent;
            result = response || { status: 'Failed', data: '网络错误：关闭销售订单失败，请联系管理员！' };

            console.log(result);
            return _context13.abrupt('return', result);

          case 8:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function closePurchaseOrder(_x13) {
    return _ref13.apply(this, arguments);
  };
}();

var createStockInOrder = exports.createStockInOrder = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/wms/bill/other/purchase/create';
            _context14.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context14.sent;
            result = response || { status: 'Failed', data: '网络错误：生成入库单失败，请联系管理员！' };

            console.log(result);
            return _context14.abrupt('return', result);

          case 8:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function createStockInOrder(_x14) {
    return _ref14.apply(this, arguments);
  };
}();

var deletePurchaseOrder = exports.deletePurchaseOrder = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/pms/purchaseOrder/cancel';
            _context15.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context15.sent;
            result = response || { status: 'Failed', data: '网络错误：删除采购订单失败，请联系管理员！' };

            console.log(result);
            return _context15.abrupt('return', result);

          case 8:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));

  return function deletePurchaseOrder(_x15) {
    return _ref15.apply(this, arguments);
  };
}();

var getPurchaseOrderById = exports.getPurchaseOrderById = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(id) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/pms/purchaseOrder/' + id;
            _context16.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context16.sent;
            result = response || { status: 'Failed', data: '网络错误：获取采购订单失败，请联系管理员！' };

            console.log(result);
            return _context16.abrupt('return', result);

          case 8:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));

  return function getPurchaseOrderById(_x16) {
    return _ref16.apply(this, arguments);
  };
}();

var queryBySku = exports.queryBySku = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/pms/vendorSupply/queryBySku';
            _context17.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context17.sent;
            result = response || { status: 'Failed', data: '网络错误：获取共享库存列表失败，请联系管理员！' };

            console.log(result);
            return _context17.abrupt('return', result);

          case 8:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, this);
  }));

  return function queryBySku(_x17) {
    return _ref17.apply(this, arguments);
  };
}();

var queryByProduct = exports.queryByProduct = function () {
  var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: data
            };
            url = '/api/bi/purchaseOrder/compareQuerys';
            _context18.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context18.sent;
            result = response || { status: 'Failed', data: '网络错误：获取列表失败，请联系管理员！' };

            console.log(result);
            return _context18.abrupt('return', result);

          case 8:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, this);
  }));

  return function queryByProduct(_x18) {
    return _ref18.apply(this, arguments);
  };
}();

var queryDetailOfProduct = exports.queryDetailOfProduct = function () {
  var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(id, wid) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/pms/vendorSupply/getDetail/' + id + '/' + wid;
            _context19.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context19.sent;
            result = response || { status: 'Failed', data: '网络错误：获取共享库存明细列表失败，请联系管理员！' };

            console.log(result);
            return _context19.abrupt('return', result);

          case 8:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, this);
  }));

  return function queryDetailOfProduct(_x19, _x20) {
    return _ref19.apply(this, arguments);
  };
}();

// 仓库下拉


var getWarehouse = exports.getWarehouse = function () {
  var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/warehouse/listAll?_=' + Date.now();
            _context20.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context20.sent;
            result = response || { status: 'Failed', data: '网络错误：获取仓库下拉数据失败，请重试'
              // console.log(result)
            };
            return _context20.abrupt('return', result);

          case 7:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, this);
  }));

  return function getWarehouse(_x21) {
    return _ref20.apply(this, arguments);
  };
}();

// //供应商下拉
// export async function getVendorDict (data) {
//   const myInit = {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({})
//   }
//   const url = '/api/baseinfo/vendor/vendorNameAndVendorIdMap'
//   const response = await egFetch(url, myInit)
//
//   const result = response || {status:'Failed',data:'网络错误：获取供应商下拉数据失败，请重试'}
//   //console.log(result)
//   return result
// }

// 供应商下拉


var getVendorDict = exports.getVendorDict = function () {
  var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/tenant/tenant/findCurrentAllVendor';
            _context21.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context21.sent;
            result = response || { status: 'Failed', data: '网络错误：获取供应商下拉数据失败，请重试'
              // console.log(result)
            };
            return _context21.abrupt('return', result);

          case 7:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, this);
  }));

  return function getVendorDict(_x22) {
    return _ref21.apply(this, arguments);
  };
}();

// 商品类型下拉


var getGoodsCategory = exports.getGoodsCategory = function () {
  var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)({})
            };
            url = '/api/baseinfo/category/categoryNameAndCategoryNoMapByType/1';
            _context22.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context22.sent;
            result = response || { status: 'Failed', data: '网络错误：获取商品类型下拉数据失败，请重试'
              // console.log(result)
            };
            return _context22.abrupt('return', result);

          case 7:
          case 'end':
            return _context22.stop();
        }
      }
    }, _callee22, this);
  }));

  return function getGoodsCategory(_x23) {
    return _ref22.apply(this, arguments);
  };
}();

var _egFetch = require('../../modules/egFetch.js');

var _egFetch2 = _interopRequireDefault(_egFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }