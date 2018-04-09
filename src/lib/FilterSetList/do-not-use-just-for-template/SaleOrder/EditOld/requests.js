'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findStockByWarehouseId = exports.findEmployeeByVendorId = exports.getAddressByWarehouseId = exports.findMasterWarehouse = exports.updatePurchaseOrderMain = exports.findCommonVendorBySkuIds = exports.getDetailListByCond = exports.getVendorDictBySkuId = exports.deletePayTypeDict = exports.getPayTypeDict = exports.addPayTypeDict = exports.getDictsByTypes = exports.savePurchaseOrder = exports.updateVendorProps = exports.multiUpdate = exports.singleUpdate = exports.multiDelete = exports.singleDelete = exports.addWhenEdit = exports.addWhenAdd = exports.getProductList = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getProductList = exports.getProductList = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/pms/vendorSupply/querybyctgr';
            _context.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context.sent;
            result = response || { status: 'Failed', data: '网络错误：获取商品列表失败，请联系管理员！' };

            console.log(result);
            return _context.abrupt('return', result);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getProductList(_x) {
    return _ref.apply(this, arguments);
  };
}();

var addWhenAdd = exports.addWhenAdd = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/pms/purchaseOrderDetail/initPurchaseOrderDetailsByVendor';
            _context2.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context2.sent;
            result = response || { status: 'Failed', data: '网络错误：（新建时）添加商品失败，请联系管理员！' };

            console.log(result);
            return _context2.abrupt('return', result);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function addWhenAdd(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var addWhenEdit = exports.addWhenEdit = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/pms/purchaseOrderDetail/initAndSavePurchaseOrderDetailsByVendor';
            _context3.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context3.sent;
            result = response || { status: 'Failed', data: '网络错误：（修改时）添加商品失败，请联系管理员！' };

            console.log(result);
            return _context3.abrupt('return', result);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function addWhenEdit(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var singleDelete = exports.singleDelete = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            myInit = {
              method: 'DELETE',
              credentials: 'include'
            };
            url = '/api/pms/purchaseOrderDetail/delete/' + id;
            _context4.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context4.sent;
            result = response || { status: 'Failed', data: '网络错误：删除商品失败，请联系管理员！' };

            console.log(result);
            return _context4.abrupt('return', result);

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function singleDelete(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var multiDelete = exports.multiDelete = function () {
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
            url = '/api/pms/purchaseOrderDetail/batchDelete';
            _context5.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context5.sent;
            result = response || { status: 'Failed', data: '网络错误：批量删除商品失败，请联系管理员！' };

            console.log(result);
            return _context5.abrupt('return', result);

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function multiDelete(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var singleUpdate = exports.singleUpdate = function () {
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
            url = '/api/pms/purchaseOrderDetail/updateNormalPurchaseOrderDetail';
            _context6.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context6.sent;
            result = response || { status: 'Failed', data: '网络错误：修改商品失败，请联系管理员！' };

            console.log(result);
            return _context6.abrupt('return', result);

          case 8:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function singleUpdate(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

var multiUpdate = exports.multiUpdate = function () {
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
            url = '/api/pms/purchaseOrderDetail/batchUpdateNormalPurchaseOrderDetail';
            _context7.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context7.sent;
            result = response || { status: 'Failed', data: '网络错误：批量修改商品失败，请联系管理员！' };

            console.log(result);
            return _context7.abrupt('return', result);

          case 8:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function multiUpdate(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

var updateVendorProps = exports.updateVendorProps = function () {
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
            url = '/api/pms/purchaseOrderDetail/updateVendorProps';
            _context8.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context8.sent;
            result = response || { status: 'Failed', data: '网络错误：修改失败，请联系管理员！' };

            console.log(result);
            return _context8.abrupt('return', result);

          case 8:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function updateVendorProps(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

var savePurchaseOrder = exports.savePurchaseOrder = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/pms/purchaseOrder/insert';
            _context9.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context9.sent;
            result = response || { status: 'Failed', data: '网络错误：保存失败，请联系管理员！' };

            console.log(result);
            return _context9.abrupt('return', result);

          case 8:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function savePurchaseOrder(_x9) {
    return _ref9.apply(this, arguments);
  };
}();

var getDictsByTypes = exports.getDictsByTypes = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(param) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/trade/dict/getDictsByTypes?types=' + param;
            _context10.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context10.sent;
            result = response || { status: 'Failed', data: '网络错误：获取字典项失败，请联系管理员！' };

            console.log(result);
            return _context10.abrupt('return', result);

          case 8:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function getDictsByTypes(_x10) {
    return _ref10.apply(this, arguments);
  };
}();

var addPayTypeDict = exports.addPayTypeDict = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(param) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/baseinfo/baseCustomPropsDict/insertCustomDict/5/' + encodeURI(param);
            _context11.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context11.sent;
            result = response || { status: 'Failed', data: '网络错误：自定义结算方式失败，请联系管理员！' };

            console.log(result);
            return _context11.abrupt('return', result);

          case 8:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function addPayTypeDict(_x11) {
    return _ref11.apply(this, arguments);
  };
}();

var getPayTypeDict = exports.getPayTypeDict = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/baseinfo/baseCustomPropsDict/findBaseCustomPropsDictMapByType/pay_type';
            _context12.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context12.sent;
            result = response || { status: 'Failed', data: '网络错误：获取结算方式字典项失败，请联系管理员！' };

            console.log(result);
            return _context12.abrupt('return', result);

          case 8:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function getPayTypeDict() {
    return _ref12.apply(this, arguments);
  };
}();

var deletePayTypeDict = exports.deletePayTypeDict = function () {
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
            url = '/api/baseinfo/baseCustomPropsDict/delete/5/' + id;
            _context13.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context13.sent;
            result = response || { status: 'Failed', data: '网络错误：删除结算方式失败，请联系管理员！' };

            console.log(result);
            return _context13.abrupt('return', result);

          case 8:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function deletePayTypeDict(_x12) {
    return _ref13.apply(this, arguments);
  };
}();

var getVendorDictBySkuId = exports.getVendorDictBySkuId = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(id) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/pms/vendorSupply/findVendorBySkuId/' + id;
            _context14.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context14.sent;
            result = response || { status: 'Failed', data: '网络错误：获取分供商字典项失败，请联系管理员！' };

            console.log(result);
            return _context14.abrupt('return', result);

          case 8:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function getVendorDictBySkuId(_x13) {
    return _ref14.apply(this, arguments);
  };
}();

var getDetailListByCond = exports.getDetailListByCond = function () {
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
            url = '/api/pms/purchaseOrderDetail/getPageDetailByPurchaseOrderIdAndCond';
            _context15.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context15.sent;
            result = response || { status: 'Failed', data: '网络错误：获取采购订单明细列表失败，请联系管理员！' };

            console.log(result);
            return _context15.abrupt('return', result);

          case 8:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));

  return function getDetailListByCond(_x14) {
    return _ref15.apply(this, arguments);
  };
}();

var findCommonVendorBySkuIds = exports.findCommonVendorBySkuIds = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(data) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            myInit = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: (0, _stringify2.default)(data)
            };
            url = '/api/pms/vendorSupply/findCommonVendorBySkuIds';
            _context16.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context16.sent;
            result = response || { status: 'Failed', data: '网络错误：获取供应商字典项交集失败，请联系管理员！' };

            console.log(result);
            return _context16.abrupt('return', result);

          case 8:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));

  return function findCommonVendorBySkuIds(_x15) {
    return _ref16.apply(this, arguments);
  };
}();

var updatePurchaseOrderMain = exports.updatePurchaseOrderMain = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(id, data) {
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
            url = '/api/pms/purchaseOrder/update/' + id;
            _context17.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context17.sent;
            result = response || { status: 'Failed', data: '网络错误：修改采购订单主表信息失败，请联系管理员！' };

            console.log(result);
            return _context17.abrupt('return', result);

          case 8:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, this);
  }));

  return function updatePurchaseOrderMain(_x16, _x17) {
    return _ref17.apply(this, arguments);
  };
}();

var findMasterWarehouse = exports.findMasterWarehouse = function () {
  var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/baseinfo/warehouse/findMasterWarehouse';
            _context18.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context18.sent;
            result = response || { status: 'Failed', data: '网络错误：获取主仓地址失败，请联系管理员！' };

            console.log(result);
            return _context18.abrupt('return', result);

          case 8:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, this);
  }));

  return function findMasterWarehouse() {
    return _ref18.apply(this, arguments);
  };
}();

var getAddressByWarehouseId = exports.getAddressByWarehouseId = function () {
  var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(id) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/api/baseinfo/warehouse/findById/' + id;
            _context19.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context19.sent;
            result = response || { status: 'Failed', data: '网络错误：获取仓库对应地址失败，请联系管理员！' };

            console.log(result);
            return _context19.abrupt('return', result);

          case 8:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, this);
  }));

  return function getAddressByWarehouseId(_x18) {
    return _ref19.apply(this, arguments);
  };
}();

//根据供应商id获取对应的采购员信息


var findEmployeeByVendorId = exports.findEmployeeByVendorId = function () {
  var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(id) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/employee/findByVendorId?vendorId=' + id;
            _context20.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context20.sent;
            result = response || { status: 'Failed', data: '网络错误：获取供应商对应的采购员信息失败，请联系管理员！' };

            console.log(result);
            return _context20.abrupt('return', result);

          case 8:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, this);
  }));

  return function findEmployeeByVendorId(_x19) {
    return _ref20.apply(this, arguments);
  };
}();

//根据仓库id获取对应的库存信息


var findStockByWarehouseId = exports.findStockByWarehouseId = function () {
  var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21(id, skuIds) {
    var myInit, url, response, result;
    return _regenerator2.default.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            myInit = {
              method: 'GET',
              credentials: 'include'
            };
            url = '/hack/stock/queryMultiAllStocks?warehouseId=' + id + '&' + 'skuIds=' + skuIds;
            _context21.next = 4;
            return (0, _egFetch2.default)(url, myInit);

          case 4:
            response = _context21.sent;
            result = response || { status: 'Failed', data: '网络错误：获取仓库对应的库存信息失败，请联系管理员！' };

            console.log(result);
            return _context21.abrupt('return', result);

          case 8:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, this);
  }));

  return function findStockByWarehouseId(_x20, _x21) {
    return _ref21.apply(this, arguments);
  };
}();

var _egFetch = require('../../../modules/egFetch');

var _egFetch2 = _interopRequireDefault(_egFetch);

var _elementReact = require('element-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }