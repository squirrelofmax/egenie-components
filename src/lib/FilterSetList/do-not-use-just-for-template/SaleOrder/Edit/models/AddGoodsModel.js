'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _elementReact = require('element-react');

var _requests = require('../requests');

var _EditedCellFormatter = require('@/utils/EgGrid/EditedCellFormatter');

var _ImgFormatter = require('@/utils/EgGrid/ImgFormatter');

var _ImgFormatter2 = _interopRequireDefault(_ImgFormatter);

var _EgGridModel = require('@/utils/EgGrid/EgGridModel');

var _EgGridModel2 = _interopRequireDefault(_EgGridModel);

var _mock = require('./mock');

var _mock2 = _interopRequireDefault(_mock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = function Search(options) {
  (0, _classCallCheck3.default)(this, Search);

  (0, _mobx.extendObservable)(this, {
    history: (0, _extends3.default)({}, options, { page: 1, pageSize: 50, sidx: '', sord: '' }),
    present: (0, _extends3.default)({}, options)
  });
};

var AddGoodsModel = function AddGoodsModel(options) {
  var _this = this;

  (0, _classCallCheck3.default)(this, AddGoodsModel);
  this.onValueChange = (0, _mobx.action)(function (key, value) {
    console.log('valueChange-------');
    _this.searchObj.present[key] = value;
  });
  this.onSearch = (0, _mobx.action)(function () {
    console.log('执行onSearch-------');
    var _searchObj = _this.searchObj,
        history = _searchObj.history,
        present = _searchObj.present;

    var data = (0, _extends3.default)({}, history, present, { page: 1 });
    _this.queryDataAndSetState(data);
    (0, _assign2.default)(_this.topGridModel, { currentPage: 1, selectedKeyValues: [], expanded: {}, cashSelectedRows: [] });
    // 操作MyGrid的虚拟DOM，设置页码为1，清空勾选数据,重置树表的expanded状态,清空缓存的Rows
  });
  this.queryDataAndSetState = (0, _mobx.action)(function (data) {
    _this.topGridModel.loading = true;
    // getProductList(data).then(action(v => {
    _promise2.default.resolve(_mock2.default).then((0, _mobx.action)(function (v) {
      _this.topGridModel.loading = false;
      (0, _assign2.default)(_this.searchObj.history, data);
      if (v.status !== 'Successful') {
        _this.topGridModel.rows = [];
        _this.topGridModel.total = 0;
        return _elementReact.Message.error(v.data);
      }
      _this.topGridModel.rows = v.data.list;
      _this.topGridModel.total = v.data.totalCount;
    }));
  });
  this.onReset = (0, _mobx.action)(function () {
    console.log('执行onReset-------');
    _this.searchObj.present = (0, _extends3.default)({}, _this.initValue);
  });
  this.onPageOrSizeChange = (0, _mobx.action)(function (_ref) {
    var currentPage = _ref.currentPage,
        size = _ref.size;

    console.log('执行onPageOrSizeChange-------', currentPage, size);
    _this.queryDataAndSetState((0, _extends3.default)({}, _this.searchObj.history, { page: currentPage, pageSize: size }));
  });
  this.onSingleAdd = (0, _mobx.action)(function (row) {
    console.log('执行onSingleAdd-------');
    var item = _this.bottomGridModel.rows.find(function (_ref2) {
      var skuId = _ref2.skuId;
      return skuId === row.skuId;
    });
    if (item) return item.saleNum += 1;
    _this.bottomGridModel.rows = _this.bottomGridModel.rows.concat([(0, _extends3.default)({}, row, { saleNum: 1 })]);
  });
  this.onMultiAdd = (0, _mobx.action)(function () {
    console.log('执行onMultiAdd-------');
    var topRows = _this.topGridModel.cashSelectedRows;
    if (!topRows.length) {
      return _elementReact.Message.error('请至少选择一行');
    }
    // 上下交集对应的下方的rows
    var repeatRowsOfBottom = _this.bottomGridModel.rows.filter(function (_ref3) {
      var skuId = _ref3.skuId;
      return topRows.find(function (el) {
        return el.skuId === skuId;
      });
    });
    repeatRowsOfBottom.forEach(function (el) {
      el.saleNum += 1;
    });
    // 上下差集对应的上方的rows
    var specialRowsOfTop = topRows.filter(function (_ref4) {
      var skuId = _ref4.skuId;
      return !_this.bottomGridModel.rows.find(function (el) {
        return el.skuId === skuId;
      });
    }).map(function (el) {
      el = (0, _extends3.default)({}, el, { saleNum: 1 });
      return el;
    });
    _this.bottomGridModel.rows = _this.bottomGridModel.rows.concat(specialRowsOfTop);
  });
  this.onSingleDelete = (0, _mobx.action)(function (row) {
    console.log('执行onSingleDelete-------');
    var index = _this.bottomGridModel.rows.findIndex(function (el) {
      return el.skuId === row.skuId;
    });
    ~index && _this.bottomGridModel.rows.splice(index, 1);
    _this.bottomGridModel.selectedKeyValues = _this.bottomGridModel.selectedKeyValues.filter(function (skuId) {
      return skuId !== row.skuId;
    });
  });
  this.onMultiDelete = (0, _mobx.action)(function () {
    console.log('执行onMultiDelete-------');
    var ids = _this.bottomGridModel.selectedKeyValues;
    if (!ids.length) {
      return _elementReact.Message.error('请至少选择一行');
    }
    _this.bottomGridModel.resetHeaderCheckBox();
    _this.bottomGridModel.selectedKeyValues = [];
    _this.bottomGridModel.rows = _this.bottomGridModel.rows.filter(function (el) {
      return !ids.find(function (id) {
        return el.skuId === id;
      });
    });
  });
  this.handleCellValueChange = (0, _mobx.action)(function (key, value, row) {
    // 除了文本编辑框，返回true代表不执行handleCellBlur
    console.log('\u6267\u884C\u6700\u5916\u90E8\u7684handleCellValueChange,key:' + key + ',value:' + value + ',\u662F\u5426\u662F\u53EF\u89C2\u5BDF\u7684\uFF1A' + row + ',row:', row);
    row[key] = value;
  });
  this.handleCellBlur = (0, _mobx.action)(function (key, value, row) {
    console.log('\u6267\u884C\u6700\u5916\u90E8\u7684handleCellBlur,key:' + key + ',value:' + value + ',row:', row);
  });
  this.onRefresh = (0, _mobx.action)(function () {
    _this.queryDataAndSetState(_this.searchObj.history);
  });
  this.onSave = (0, _mobx.action)(function () {
    console.log('执行onSave-------');
    var _top = _this.top,
        customer = _top.customer,
        flag = _top.flag;

    var assignedRows = _this.bottomGridModel.rows.map(function (_ref5) {
      var mapOfFieldToEditedCellModel = _ref5.mapOfFieldToEditedCellModel,
          el = (0, _objectWithoutProperties3.default)(_ref5, ['mapOfFieldToEditedCellModel']);
      // 必须排除mapOfFieldToEditedCellModel否则就会影响新建页面的interceptor工作
      el = (0, _extends3.default)({}, el);
      el.planSendDate = new Date();
      el.realSendDate = null;
      el.customer = customer;
      el.dataStatusForApi = 1;
      return el;
    });

    assignedRows.forEach(function (_ref6) {
      var skuId = _ref6.skuId,
          saleNum = _ref6.saleNum;

      var item = _this.top.details.gridModel.rows.find(function (el) {
        return el.skuId === skuId;
      });

      if (item) {
        item.saleNum = Number(item.saleNum || 0) + saleNum;
        if (flag === 'edit' && item.dataStatusForApi == null) item.dataStatusForApi = 2; // null 未编辑 , 1 新增 , 2 编辑
      }
    });
    // 如果编辑页面删除了一条后台数据，又在添加商品页面把该数据添加进来，那么这条数据的状态是“编辑”，deleteIds中改条数据的id被排除，TODO:测试
    if (flag === 'edit' && assignedRows.some(function (el) {
      return _this.top.details.deleteIds.has(el.skuId);
    })) {
      assignedRows.forEach(function (el) {
        if (_this.top.details.deleteIds.has(el.skuId)) {
          el.dataStatusForApi = 2;
          el.id = _this.top.details.mapSkuIdToId[el.skuId];
          _this.top.details.deleteIds.delete(el.skuId);
        }
      });
    }

    var specialRows = assignedRows.filter(function (_ref7) {
      var skuId = _ref7.skuId;
      return !_this.top.details.gridModel.rows.find(function (el) {
        return el.skuId === skuId;
      });
    });
    _this.top.details.gridModel.rows = _this.top.details.gridModel.rows.concat(specialRows);

    _this.top.details.gridModel.resetHeaderCheckBox();
    _this.resetWhenClose();
  });
  this.onClose = (0, _mobx.action)(function () {
    console.log('执行onClose-------');
    _elementReact.MessageBox.confirm('未保存, 是否确认关闭?', '提示', { type: 'warning' }).then(function () {
      _this.resetWhenClose();
    });
  });
  this.resetWhenClose = (0, _mobx.action)(function () {
    _this.show = false;
    // this.searchObj=new Search(this.initValue)
    // this.list=[]
    _this.topGridModel.resetHeaderCheckBox();
    (0, _assign2.default)(_this.topGridModel, { selectedKeyValues: [], cashSelectedRows: [] });
    // this.totalCount=0
    _this.bottomGridModel.rows = [];
    _this.bottomGridModel.resetHeaderCheckBox();
    (0, _assign2.default)(_this.bottomGridModel, { selectedKeyValues: [], cashSelectedRows: [] });
  });

  this.getTopGridModel = function () {
    var onPageOrSizeChange = _this.onPageOrSizeChange,
        onRefresh = _this.onRefresh;

    return new _EgGridModel2.default({
      getDisplayRows: function getDisplayRows(rows) {
        return rows.map(function (el, index) {
          return (0, _extends3.default)({}, el, { onlyId: el.sku_id });
        });
      },

      primaryKeyField: 'skuId',
      cashOn: true,
      sortAll: false,
      showCheckBox: true,
      sumColumns: [],
      columns: _this.getColumns(),
      api: {
        onPageChange: onPageOrSizeChange, onSizeChange: onPageOrSizeChange, onRefresh: onRefresh
        //  onSortAll, onRowClick,
      }
    });
  };

  this.getBottomGridModel = function () {
    return new _EgGridModel2.default({
      interceptorOfRows: {
        config: ['saleNum', 'salePrice'],
        context: _this
      },
      getDisplayRows: function getDisplayRows(rows) {
        return rows.map(function (el, index) {
          return (0, _extends3.default)({}, el, { onlyId: el.sku_id });
        });
      },

      primaryKeyField: 'skuId',
      cashOn: false,
      sortAll: false,
      showCheckBox: true,
      sumColumns: [],
      pagerSetting: 'total',
      hiddenRefresh: true,
      columns: _this._getColumns()
    });
  };

  this.getColumns = function () {
    return [{
      key: 'operation',
      width: 77,
      name: '操作',
      locked: true,
      formatter: function formatter(_ref8) {
        var dependentValues = _ref8.dependentValues;
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _elementReact.Button,
            { type: 'text', size: 'small', onClick: _this.onSingleAdd.bind(_this, dependentValues) },
            '\u6DFB\u52A0'
          )
        );
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'pic',
      name: '图片',
      width: 100,
      resizable: true,
      draggable: true,
      formatter: _ImgFormatter2.default
    }, {
      key: 'productName',
      name: '商品名称',
      width: 150,
      resizable: true,
      draggable: true
    }, {
      key: 'productNo',
      name: '商品编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'skuNo',
      name: 'SKU编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'barCode',
      name: '条形码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'colorType',
      name: '颜色',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'sizeType',
      name: '尺码',
      width: 130,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'productSellerOuterNo',
      name: '商品货号',
      resizable: true,
      draggable: true,
      sortable: true
    }];
  };

  this._getColumns = function () {
    return [{
      key: 'operation',
      width: 77,
      name: '操作',
      locked: true,
      formatter: function formatter(_ref9) {
        var dependentValues = _ref9.dependentValues;
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _elementReact.Button,
            { type: 'text', size: 'small', onClick: _this.onSingleDelete.bind(_this, dependentValues) },
            '\u5220\u9664'
          )
        );
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'pic',
      name: '图片',
      width: 100,
      resizable: true,
      draggable: true,
      formatter: _ImgFormatter2.default
    }, {
      key: 'saleNum',
      name: '销售数量',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: function formatter(_ref10) {
        var mapOfFieldToEditedCellModel = _ref10.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.NumberFormatter, { store: mapOfFieldToEditedCellModel['saleNum'] });
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'salePrice',
      name: '含税售价',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: function formatter(_ref11) {
        var mapOfFieldToEditedCellModel = _ref11.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.NumberFormatter, { store: mapOfFieldToEditedCellModel['salePrice'] });
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'productName',
      name: '商品名称',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'productNo',
      name: '商品编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'skuNo',
      name: 'SKU编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'barCode',
      name: '条形码',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'colorType',
      name: '颜色',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'sizeType',
      name: '尺码',
      width: 130,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'productSellerOuterNo',
      name: '商品货号',
      resizable: true,
      draggable: true,
      sortable: true
    }];
  };

  this.initValue = {
    product_name: '', // 商品名称
    product_no: '', // 商品编码
    product_seller_outer_no: '', // 商品货号
    sku_no: '', // SKU编码
    bar_code: '', // 条形码
    color: '', // 颜色
    size: '' // 尺码
  };
  (0, _mobx.extendObservable)(this, (0, _extends3.default)({
    id: _shortid2.default.generate(),
    inited: false, // 是否第一次show，是的话resize window，使得表格正常渲染。
    show: false,
    searchObj: new Search(this.initValue),
    get addedOnlyIds() {
      return this.bottomGridModel.rows.map(function (el) {
        return el.skuId;
      });
    },
    get formData() {
      return JSON.parse((0, _stringify2.default)(this.searchObj.present, ['product_name', 'product_code', 'product_seller_outer_no', 'sku_no', 'vendor_name', 'warehouse_id', 'bar_code', 'color_type', 'size_type']));
    },
    top: {},
    topGridModel: this.getTopGridModel(),
    bottomGridModel: this.getBottomGridModel()
  }, options || {}));
  (0, _mobx.when)(function () {
    return _this.inited;
  }, function () {
    return setTimeout(function () {
      return window.dispatchEvent(new Event('resize'));
    });
  });
  (0, _mobx.autorun)(function () {
    _this.bottomGridModel.total = _this.bottomGridModel.rows.length;
  });
}
/**
 actions
 */


/**
 * utils
 */

;

exports.default = AddGoodsModel;