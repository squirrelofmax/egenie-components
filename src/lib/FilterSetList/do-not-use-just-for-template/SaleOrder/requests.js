'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePurchaseOrder = exports.deleteSaleOrder = exports.updateSaleOrder = exports.closeSaleOrder = exports.doConfirmAndCheck = exports.recheckSaleOrder = exports.checkSaleOrder = exports.doConfirmed = exports.getSaleOrderLogList = exports.getSaleOrderDetailList = exports.getDictsByTypes = exports.getSaleOrderList = exports.getGoodsCategory = exports.getVendorDict = exports.getWarehouse = exports.queryDetailOfProduct = exports.queryByProduct = exports.queryBySku = exports.getPurchaseOrderById = exports.deletePurchaseOrder = exports.createStockInOrder = exports.closePurchaseOrder = exports.publishPurchaseOrder = exports.recheckPurchaseOrder = exports.checkPurchaseOrder = exports.updateSaleOrderDetail = exports.getDetailList = exports.getList = exports.deleteScheme = exports.getConfig = exports.saveAsNewFilterset = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var saveAsNewFilterset = exports.saveAsNewFilterset = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
    var obj, myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
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
            url = '/api/filterSet2/save/OmsSaleOrder';
            // document.cookie='JSESSIONID=cc55b564-02d5-494e-b1bf-6509147d2945'

            _context.next = 5;
            return (0, _egFetch2.default)(url, myInit);

          case 5:
            response = _context.sent;
            result = response || { status: 'Failed', data: '网络错误：保存失败，请联系管理员！' };

            console.log(result);
            return _context.abrupt('return', result);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function saveAsNewFilterset(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getConfig = exports.getConfig = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/filterSet2/getConfig2?dictList=&itemList=vendor,organization&module=OmsSaleOrder';
            _context2.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context2.sent;
            result = response || { status: 'Failed', data: '网络错误：获取配置信息失败，请联系管理员！' };

            console.log(result);
            return _context2.abrupt('return', result);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getConfig() {
    return _ref2.apply(this, arguments);
  };
}();

var deleteScheme = exports.deleteScheme = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(name) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            myInit = {
              method: 'DELETE',
              credentials: 'include'
            };
            url = '/api/filterSet/filterSets/' + name + '/OmsSaleOrder';
            _context3.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context3.sent;
            result = response || { status: 'Failed', data: '网络错误：删除失败，请联系管理员！' };

            console.log(result);
            return _context3.abrupt('return', result);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function deleteScheme(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var getList = exports.getList = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
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
            _context4.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context4.sent;
            result = response || { status: 'Failed', data: '网络错误：获取采购订单列表失败，请联系管理员！' };

            console.log(result);
            if (result.status !== 'Failed') {
              result = { status: 'Successful', data: result };
            }
            return _context4.abrupt('return', result);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getList(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var getDetailList = exports.getDetailList = function () {
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
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/pms/purchaseOrderDetail/getPageDetailByPurchaseOrderIdAndCond';
            _context5.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context5.sent;
            result = response || { status: 'Failed', data: '网络错误：获取采购订单明细列表失败，请联系管理员！' };

            console.log(result);
            return _context5.abrupt('return', result);

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getDetailList(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

var updateSaleOrderDetail = exports.updateSaleOrderDetail = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(data, id) {
    var obj, myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
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
            _context6.next = 5;
            return (0, _egFetch2.default)(url, myInit);

          case 5:
            response = _context6.sent;
            result = response || { status: 'Failed', data: '网络错误：修改销售订单明细失败，请联系管理员！' };

            console.log(result);
            return _context6.abrupt('return', result);

          case 9:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function updateSaleOrderDetail(_x5, _x6) {
    return _ref6.apply(this, arguments);
  };
}();

var checkPurchaseOrder = exports.checkPurchaseOrder = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
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
            _context7.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context7.sent;
            result = response || { status: 'Failed', data: '网络错误：审核采购订单失败，请联系管理员！' };

            console.log(result);
            return _context7.abrupt('return', result);

          case 8:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function checkPurchaseOrder(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

var recheckPurchaseOrder = exports.recheckPurchaseOrder = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
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
            _context8.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context8.sent;
            result = response || { status: 'Failed', data: '网络错误：反审核采购订单失败，请联系管理员！' };

            console.log(result);
            return _context8.abrupt('return', result);

          case 8:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function recheckPurchaseOrder(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

var publishPurchaseOrder = exports.publishPurchaseOrder = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(ids) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/pms/tradeSaleOrder/pushSaleOrder/' + ids;
            _context9.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context9.sent;
            result = response || { status: 'Failed', data: '网络错误：发布采购订单失败，请联系管理员！' };

            console.log(result);
            return _context9.abrupt('return', result);

          case 8:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function publishPurchaseOrder(_x9) {
    return _ref9.apply(this, arguments);
  };
}();

var closePurchaseOrder = exports.closePurchaseOrder = function () {
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
            url = '/api/pms/purchaseOrder/closeSimpleOrder';
            _context10.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context10.sent;
            result = response || { status: 'Failed', data: '网络错误：关闭销售订单失败，请联系管理员！' };

            console.log(result);
            return _context10.abrupt('return', result);

          case 8:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function closePurchaseOrder(_x10) {
    return _ref10.apply(this, arguments);
  };
}();

var createStockInOrder = exports.createStockInOrder = function () {
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
            url = '/wms/bill/other/purchase/create';
            _context11.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context11.sent;
            result = response || { status: 'Failed', data: '网络错误：生成入库单失败，请联系管理员！' };

            console.log(result);
            return _context11.abrupt('return', result);

          case 8:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function createStockInOrder(_x11) {
    return _ref11.apply(this, arguments);
  };
}();

var deletePurchaseOrder = exports.deletePurchaseOrder = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
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
            _context12.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context12.sent;
            result = response || { status: 'Failed', data: '网络错误：删除采购订单失败，请联系管理员！' };

            console.log(result);
            return _context12.abrupt('return', result);

          case 8:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function deletePurchaseOrder(_x12) {
    return _ref12.apply(this, arguments);
  };
}();

var getPurchaseOrderById = exports.getPurchaseOrderById = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(id) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/pms/purchaseOrder/' + id;
            _context13.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context13.sent;
            result = response || { status: 'Failed', data: '网络错误：获取采购订单失败，请联系管理员！' };

            console.log(result);
            return _context13.abrupt('return', result);

          case 8:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function getPurchaseOrderById(_x13) {
    return _ref13.apply(this, arguments);
  };
}();

var queryBySku = exports.queryBySku = function () {
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
            url = '/api/pms/vendorSupply/queryBySku';
            _context14.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context14.sent;
            result = response || { status: 'Failed', data: '网络错误：获取共享库存列表失败，请联系管理员！' };

            console.log(result);
            return _context14.abrupt('return', result);

          case 8:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function queryBySku(_x14) {
    return _ref14.apply(this, arguments);
  };
}();

var queryByProduct = exports.queryByProduct = function () {
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
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: data
            };
            url = '/api/bi/purchaseOrder/compareQuerys';
            _context15.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context15.sent;
            result = response || { status: 'Failed', data: '网络错误：获取列表失败，请联系管理员！' };

            console.log(result);
            return _context15.abrupt('return', result);

          case 8:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));

  return function queryByProduct(_x15) {
    return _ref15.apply(this, arguments);
  };
}();

var queryDetailOfProduct = exports.queryDetailOfProduct = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(id, wid) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/pms/vendorSupply/getDetail/' + id + '/' + wid;
            _context16.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context16.sent;
            result = response || { status: 'Failed', data: '网络错误：获取共享库存明细列表失败，请联系管理员！' };

            console.log(result);
            return _context16.abrupt('return', result);

          case 8:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));

  return function queryDetailOfProduct(_x16, _x17) {
    return _ref16.apply(this, arguments);
  };
}();

// 仓库下拉


var getWarehouse = exports.getWarehouse = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/warehouse/listAll?_=' + Date.now();
            _context17.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context17.sent;
            result = response || { status: 'Failed', data: '网络错误：获取仓库下拉数据失败，请重试'
              // console.log(result)
            };
            return _context17.abrupt('return', result);

          case 7:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, this);
  }));

  return function getWarehouse(_x18) {
    return _ref17.apply(this, arguments);
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
  var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/tenant/tenant/findCurrentAllVendor';
            _context18.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context18.sent;
            result = response || { status: 'Failed', data: '网络错误：获取供应商下拉数据失败，请重试'
              // console.log(result)
            };
            return _context18.abrupt('return', result);

          case 7:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, this);
  }));

  return function getVendorDict(_x19) {
    return _ref18.apply(this, arguments);
  };
}();

// 商品类型下拉


var getGoodsCategory = exports.getGoodsCategory = function () {
  var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
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
            _context19.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context19.sent;
            result = response || { status: 'Failed', data: '网络错误：获取商品类型下拉数据失败，请重试'
              // console.log(result)
            };
            return _context19.abrupt('return', result);

          case 7:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, this);
  }));

  return function getGoodsCategory(_x20) {
    return _ref19.apply(this, arguments);
  };
}();

// ----------------------


var getSaleOrderList = exports.getSaleOrderList = function () {
  var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(data) {
    var myInit, params, url, response, result;
    return _regenerator2.default.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            params = (0, _keys2.default)(data).reduce(function (res, key) {
              return res + '&' + key + '=' + data[key];
            }, '?temp=1');
            url = '/api/trade/saleOrder/queryPage' + params;
            _context20.next = 5;
            return (0, _egFetch2.default)(url, myInit);

          case 5:
            response = _context20.sent;
            result = response || { status: 'Failed', data: '网络错误：获取销售订单列表失败，请联系管理员！' };

            console.log(result);
            return _context20.abrupt('return', result);

          case 9:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, this);
  }));

  return function getSaleOrderList(_x21) {
    return _ref20.apply(this, arguments);
  };
}();

var getDictsByTypes = exports.getDictsByTypes = function () {
  var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21(param) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/trade/dict/getDictsByTypes?types=' + param;
            _context21.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context21.sent;
            result = response || { status: 'Failed', data: '网络错误：获取字典项失败，请联系管理员！' };

            console.log(result);
            return _context21.abrupt('return', result);

          case 8:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, this);
  }));

  return function getDictsByTypes(_x22) {
    return _ref21.apply(this, arguments);
  };
}();

var getSaleOrderDetailList = exports.getSaleOrderDetailList = function () {
  var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22(data, pid) {
    var myInit, params, url, response, result;
    return _regenerator2.default.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            params = (0, _keys2.default)(data).reduce(function (res, key) {
              return res + '&' + key + '=' + data[key];
            }, '?temp=1');
            url = '/api/trade/saleOrderDetail/queryPage/' + pid + params;
            _context22.next = 5;
            return (0, _egFetch2.default)(url, myInit);

          case 5:
            response = _context22.sent;
            result = response || { status: 'Failed', data: '网络错误：获取销售订单明细列表失败，请联系管理员！' };

            console.log(result);
            return _context22.abrupt('return', result);

          case 9:
          case 'end':
            return _context22.stop();
        }
      }
    }, _callee22, this);
  }));

  return function getSaleOrderDetailList(_x23, _x24) {
    return _ref22.apply(this, arguments);
  };
}();

var getSaleOrderLogList = exports.getSaleOrderLogList = function () {
  var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23(data, pid) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/baseinfo/logBizRecordController/getLogsById/trade_sale_order/' + pid;
            _context23.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context23.sent;
            result = response || { status: 'Failed', data: '网络错误：获取销售订单日志列表失败，请联系管理员！' };

            console.log(result);
            return _context23.abrupt('return', result);

          case 8:
          case 'end':
            return _context23.stop();
        }
      }
    }, _callee23, this);
  }));

  return function getSaleOrderLogList(_x25, _x26) {
    return _ref23.apply(this, arguments);
  };
}();

var doConfirmed = exports.doConfirmed = function () {
  var _ref24 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee24(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/trade/saleOrder/doConfirmed';
            _context24.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context24.sent;
            result = response || { status: 'Failed', data: '网络错误：提交确认失败，请联系管理员！' };

            console.log(result);
            return _context24.abrupt('return', result);

          case 8:
          case 'end':
            return _context24.stop();
        }
      }
    }, _callee24, this);
  }));

  return function doConfirmed(_x27) {
    return _ref24.apply(this, arguments);
  };
}();

var checkSaleOrder = exports.checkSaleOrder = function () {
  var _ref25 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee25(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/trade/saleOrder/doCheck';
            _context25.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context25.sent;
            result = response || { status: 'Failed', data: '网络错误：审核销售订单失败，请联系管理员！' };

            console.log(result);
            return _context25.abrupt('return', result);

          case 8:
          case 'end':
            return _context25.stop();
        }
      }
    }, _callee25, this);
  }));

  return function checkSaleOrder(_x28) {
    return _ref25.apply(this, arguments);
  };
}();

var recheckSaleOrder = exports.recheckSaleOrder = function () {
  var _ref26 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee26(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/trade/saleOrder/reCheck';
            _context26.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context26.sent;
            result = response || { status: 'Failed', data: '网络错误：反审核销售订单失败，请联系管理员！' };

            console.log(result);
            return _context26.abrupt('return', result);

          case 8:
          case 'end':
            return _context26.stop();
        }
      }
    }, _callee26, this);
  }));

  return function recheckSaleOrder(_x29) {
    return _ref26.apply(this, arguments);
  };
}();

var doConfirmAndCheck = exports.doConfirmAndCheck = function () {
  var _ref27 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee27(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/trade/saleOrder/doConfirmCheck';
            _context27.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context27.sent;
            result = response || { status: 'Failed', data: '网络错误：提交确认并审核失败，请联系管理员！' };

            console.log(result);
            return _context27.abrupt('return', result);

          case 8:
          case 'end':
            return _context27.stop();
        }
      }
    }, _callee27, this);
  }));

  return function doConfirmAndCheck(_x30) {
    return _ref27.apply(this, arguments);
  };
}();

var closeSaleOrder = exports.closeSaleOrder = function () {
  var _ref28 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee28(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/trade/saleOrder/doClose';
            _context28.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context28.sent;
            result = response || { status: 'Failed', data: '网络错误：关闭销售订单失败，请联系管理员！' };

            console.log(result);
            return _context28.abrupt('return', result);

          case 8:
          case 'end':
            return _context28.stop();
        }
      }
    }, _callee28, this);
  }));

  return function closeSaleOrder(_x31) {
    return _ref28.apply(this, arguments);
  };
}();

var updateSaleOrder = exports.updateSaleOrder = function () {
  var _ref29 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee29(data, id) {
    var obj, myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
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
            url = '/api/trade/saleOrder/update/' + id;
            _context29.next = 5;
            return (0, _egFetch2.default)(url, myInit);

          case 5:
            response = _context29.sent;
            result = response || { status: 'Failed', data: '网络错误：修改销售订单失败，请联系管理员！' };

            console.log(result);
            return _context29.abrupt('return', result);

          case 9:
          case 'end':
            return _context29.stop();
        }
      }
    }, _callee29, this);
  }));

  return function updateSaleOrder(_x32, _x33) {
    return _ref29.apply(this, arguments);
  };
}();

var deleteSaleOrder = exports.deleteSaleOrder = function () {
  var _ref30 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee30(ids) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/trade/saleOrder/delete?ids=' + ids;
            _context30.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context30.sent;
            result = response || { status: 'Failed', data: '网络错误：删除销售订单失败，请联系管理员！' };

            console.log(result);
            return _context30.abrupt('return', result);

          case 8:
          case 'end':
            return _context30.stop();
        }
      }
    }, _callee30, this);
  }));

  return function deleteSaleOrder(_x34) {
    return _ref30.apply(this, arguments);
  };
}();

var generatePurchaseOrder = exports.generatePurchaseOrder = function () {
  var _ref31 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee31(ids) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/trade/saleOrder/generatePurchaseOrder?ids=' + ids;
            _context31.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context31.sent;
            result = response || { status: 'Failed', data: '网络错误：生成采购单失败，请联系管理员！' };

            console.log(result);
            return _context31.abrupt('return', result);

          case 8:
          case 'end':
            return _context31.stop();
        }
      }
    }, _callee31, this);
  }));

  return function generatePurchaseOrder(_x35) {
    return _ref31.apply(this, arguments);
  };
}();

var _egFetch = require('@/utils/egFetch');

var _egFetch2 = _interopRequireDefault(_egFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }