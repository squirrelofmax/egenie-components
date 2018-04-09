'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _elementReact = require('element-react');

var _requests = require('../requests');

var _EditedCellFormatter = require('../../../../modules/EditedCellFormatter');

var _ImgFormatter = require('../../../../modules/ImgFormatter');

var _ImgFormatter2 = _interopRequireDefault(_ImgFormatter);

var _validateNumber = require('../../../../modules/validateNumber');

var _validateNumber2 = _interopRequireDefault(_validateNumber);

var _EgGridModel = require('../../../../modules/EgGridModel');

var _EgGridModel2 = _interopRequireDefault(_EgGridModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = function Search(options) {
  (0, _classCallCheck3.default)(this, Search);

  (0, _mobx.extendObservable)(this, {
    history: (0, _extends4.default)({}, options, { page: 1, pageSize: 20, sidx: '', sord: '', center_table: 'sku' }),
    present: (0, _extends4.default)({}, options)
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
    _this.topGridModel.loading = true;
    var _searchObj = _this.searchObj,
        history = _searchObj.history,
        present = _searchObj.present;

    var data = (0, _extends4.default)({}, history, present, { page: 1 });
    _this.queryDataAndSetState(data);
    (0, _assign2.default)(_this.topGridModel, { currentPage: 1, selectedKeyValues: [], expanded: {}, cashSelectedRows: [] });
    // 操作MyGrid的虚拟DOM，设置页码为1，清空勾选数据,重置树表的expanded状态,清空缓存的Rows
  });
  this.queryDataAndSetState = (0, _mobx.action)(function (data) {
    // getProductList(data)
    _promise2.default.resolve({
      status: 'Successful',
      data: {
        list: [{ sku_id: '第一号sku', customer: '', confirmed_num: '', plan_arrival_date: '', plan_arrival_date2: '' }, { sku_id: '第二号sku', customer: '', confirmed_num: '123', plan_arrival_date: '', plan_arrival_date2: new Date() }],
        totalCount: 50
      }
    }).then(function (v) {
      _this.topGridModel.loading = false;
      (0, _assign2.default)(_this.searchObj.history, data);
      if (v.status !== 'Successful') {
        _this.topGridModel.rows = [];
        _this.totalCount = 0;
        // this.gridRef.forceUpdate()
        return _elementReact.Message.error(v.data);
      }
      _this.topGridModel.rows = v.data.list;
      _this.totalCount = v.data.totalCount;
      // this.gridRef.forceUpdate()
    });
  });
  this.onReset = (0, _mobx.action)(function () {
    console.log('执行onReset-------');
    _this.searchObj.present = (0, _extends4.default)({}, _this.initValue);
  });
  this.onPageOrSizeChange = (0, _mobx.action)(function (_ref) {
    var currentPage = _ref.currentPage,
        size = _ref.size;

    console.log('执行onPageOrSizeChange-------', currentPage, size);
    _this.topGridModel.loading = true;
    _this.queryDataAndSetState((0, _extends4.default)({}, _this.searchObj.history, { page: currentPage, pageSize: size }));
  });
  this.onSingleAdd = (0, _mobx.action)(function (row) {
    console.log('执行onSingleAdd-------');
    var isRepeat = false;
    if (_this.addedOnlyIds.length) {
      isRepeat = _this.addedOnlyIds.some(function (id) {
        return id === row.onlyId;
      });
    }
    if (isRepeat) {
      return _elementReact.Message.error('不能重复添加，重复行序号为：' + row.gridOrderNo);
    }

    _this.topGridModel.loading = true;
    var data = {
      skuIds: row.sku_id,
      vendorIds: row.vendor_id == null ? '0' : row.vendor_id
    };
    if (_this.top.flag === 'add') {
      (0, _requests.addWhenAdd)(data).then(function (v) {
        _this.topGridModel.loading = false;
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        _this.bottomGridModel.rows = _this.bottomGridModel.rows.concat(v.data || []);
      });
    } else {
      // addWhenEdit({ ...data, pmsPurchaseOrderId: this.top.pms_purchase_order_id })
      _promise2.default.resolve({
        status: 'Successful',
        data: {
          list: [{ plan_arrival_num: null, plan_arrival_price: '' }],
          totalCount: 50
        }
      }).then(function (v) {
        _this.topGridModel.loading = false;
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        _this.bottomGridModel.rows = _this.bottomGridModel.rows.concat(v.data || []);
      });
    }
  });
  this.onMultiAdd = (0, _mobx.action)(function () {
    console.log('执行onMultiAdd-------');
    var onlyIds = _this.topGridModel.selectedKeyValues;
    if (!onlyIds.length) {
      return _elementReact.Message.error('请至少选择一行');
    }
    var addedOnlyIds = _this.addedOnlyIds,
        displayList = _this.topGridModel.rows;

    var repeatItems = onlyIds.filter(function (onlyId) {
      return addedOnlyIds.find(function (el) {
        return el === onlyId;
      });
    });
    if (repeatItems.length) {
      return _elementReact.Message.error('不能重复添加，重复行序号为：' + displayList.filter(function (el) {
        return repeatItems.find(function (onlyId) {
          return el.onlyId === onlyId;
        });
      }).map(function (el) {
        return el.gridOrderNo;
      }).join(','));
    }

    _this.topGridModel.loading = true;
    var data = {
      skuIds: onlyIds.map(function (el) {
        return el.split(',')[0];
      }).join(','),
      vendorIds: onlyIds.map(function (el) {
        return el.split(',')[1];
      }).join(',')
    };
    if (_this.top.flag === 'add') {
      (0, _requests.addWhenAdd)(data).then(function (v) {
        _this.topGridModel.loading = false;
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        _this.bottomGridModel.rows = _this.bottomGridModel.rows.concat(v.data || []);
      });
    } else {
      (0, _requests.addWhenEdit)((0, _extends4.default)({}, data, { pmsPurchaseOrderId: _this.top.pms_purchase_order_id })).then(function (v) {
        _this.topGridModel.loading = false;
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        _this.bottomGridModel.rows = _this.bottomGridModel.rows.concat(v.data || []);
      });
    }
  });
  this.onSingleDelete = (0, _mobx.action)(function (row) {
    console.log('执行onSingleDelete-------');
    var index = _this.bottomGridModel.rows.findIndex(function (el) {
      return el.sku_id === row.sku_id && el.vendor_id === row.vendor_id;
    });
    ~index && _this.bottomGridModel.rows.splice(index, 1);
    if (_this.top.flag === 'edit') {
      (0, _requests.singleDelete)(row.pms_purchase_order_detail_id).then(function (v) {
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        _elementReact.Message.success('删除完成！');
      });
    }
  });
  this.onMultiDelete = (0, _mobx.action)(function () {
    console.log('执行onMultiDelete-------');
    var ids = _this.bottomGridModel.selectedKeyValues;
    if (!ids.length) {
      return _elementReact.Message.error('请至少选择一行');
    }
    if (_this.top.flag === 'add') {
      _this.bottomGridModel.resetHeaderCheckBox();
      _this.bottomGridModel.selectedKeyValues = [];
      return _this.bottomGridModel.rows = _this.bottomGridModel.rows.filter(function (el) {
        return !ids.find(function (id) {
          return (el.sku_id == null ? '' : el.sku_id) + ',' + (el.vendor_id == null ? '0' : el.vendor_id) === id;
        });
      });
    }

    (0, _requests.multiDelete)({ ids: ids.join(',') }).then(function (v) {
      if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
      _this.bottomGridModel.rows = _this.bottomGridModel.rows.filter(function (el) {
        return !ids.find(function (id) {
          return (el.sku_id == null ? '' : el.sku_id) + ',' + (el.vendor_id == null ? '0' : el.vendor_id) === id;
        });
      });
      _elementReact.Message.success('删除完成！');
      _this.bottomGridModel.resetHeaderCheckBox();
      _this.bottomGridModel.selectedKeyValues = [];
    });
  });
  this.handleCellValueChange = (0, _mobx.action)(function (key, value, row) {
    // 除了文本编辑框，返回true代表不执行handleCellBlur
    console.log('\u6267\u884C\u6700\u5916\u90E8\u7684handleCellValueChange,key:' + key + ',value:' + value + ',\u662F\u5426\u662F\u53EF\u89C2\u5BDF\u7684\uFF1A' + row + ',row:', row);
    row[key] = value;
    if (key === 'plan_arrival_date' && !value) {
      _elementReact.Message.warning('请填写预计到货日期');
      return true; // 返回ture则停止调用blur
    }
  });
  this.handleCellBlur = (0, _mobx.action)(function (key, value, row) {
    console.log('\u6267\u884C\u6700\u5916\u90E8\u7684handleCellBlur,key:' + key + ',value:' + value + ',row:', row);
  });
  this.onSingleUpdate = (0, _mobx.action)(function (key, value, row) {
    var _extends2;

    console.log('执行onSingleUpdate-------');
    var numberInputKeys = [{ key: 'plan_arrival_num' }, { key: 'plan_arrival_price' }];
    var numberItem = numberInputKeys.find(function (el) {
      return el.key === key;
    });
    if (numberItem) value = (0, _validateNumber2.default)((0, _extends4.default)({}, numberItem, { value: value }));
    var idx = _this._displayList.findIndex(function (el) {
      return el.onlyId === row.onlyId;
    });
    _this.bottomGridModel.rows[idx][key] = value;
    if (_this.top.flag === 'add') return;

    var key2 = key.replace(/^plan_arrival/, 'confirmed');
    var obj = key === 'plan_arrival_price' ? { contract_price: value } : {};
    (0, _requests.singleUpdate)((0, _extends4.default)((_extends2 = { pms_purchase_order_detail_id: row.pms_purchase_order_detail_id }, (0, _defineProperty3.default)(_extends2, key, value), (0, _defineProperty3.default)(_extends2, key2, value), _extends2), obj)).then(function (v) {
      if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
      var idx = _this._displayList.findIndex(function (el) {
        return el.onlyId === row.onlyId;
      });
      _this.bottomGridModel.rows[idx][key] = value;
    });
  });
  this.onRefresh = (0, _mobx.action)(function () {
    _this.queryDataAndSetState(_this.searchObj.history);
  });
  this.onSave = (0, _mobx.action)(function () {
    console.log('执行onSave-------');
    if (_this.top.flag === 'add') {
      var _top = _this.top,
          vendor_id = _top.vendor_id,
          warehouse_id = _top.warehouse_id,
          sales_type = _top.sales_type,
          pay_type = _top.pay_type,
          organization_id = _top.organization_id;

      var assignedRows = _this.bottomGridModel.rows.map(function (el) {
        // 如果新添加的数据的分供商id，仓库id，销售类型，结算类型为空，那么赋值为。。。
        el = (0, _extends4.default)({}, el);
        el.vendor_id = el.vendor_id || vendor_id;
        el.warehouse_id = el.warehouse_id || warehouse_id;
        el.sales_type_code = el.sales_type_code || sales_type;
        el.pay_type_code = el.pay_type_code || pay_type;
        el.confirmed_price = el.plan_arrival_price;
        el.confirmed_num = el.plan_arrival_num;
        el.onlyId = _shortid2.default.generate();
        el.contract_price = el.plan_arrival_price;
        el.organization_id = organization_id || [];
        el.isNoBaseUnit = !el.base_unit_id;
        el.purchase_unit_id = el.purchase_unit_id || el.base_unit_id;
        return el;
      });
      _this.top.details.rows = _this.top.details.rows.concat(assignedRows);
      _this.top.details.gridRef.resetHeaderCheckBox();
    } else {
      // 从后台查询数据
      _this.top.details.onRefresh();
    }
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
          return (0, _extends4.default)({}, el, { onlyId: (el.sku_id == null ? '' : el.sku_id) + ',' + (el.vendor_id == null ? '0' : el.vendor_id) });
        });
      },

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
        config: ['plan_arrival_num', 'plan_arrival_price'],
        context: _this
      },
      getDisplayRows: function getDisplayRows(rows) {
        return rows.map(function (el, index) {
          return (0, _extends4.default)({}, el, { onlyId: (el.sku_id == null ? '' : el.sku_id) + ',' + (el.vendor_id == null ? '0' : el.vendor_id) });
        });
      },

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
      formatter: function formatter(_ref2) {
        var dependentValues = _ref2.dependentValues;
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
      key: 'product_name',
      name: '商品名称',
      width: 150,
      resizable: true,
      draggable: true
    }, {
      key: 'product_no',
      name: '商品编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'sku_no',
      name: 'SKU编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'bar_code',
      name: '条形码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'color_type',
      name: '颜色',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'size_type',
      name: '尺码',
      width: 130,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'product_seller_outer_no',
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
      formatter: function formatter(_ref3) {
        var dependentValues = _ref3.dependentValues;
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
      key: 'plan_arrival_num',
      name: '数量',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: function formatter(_ref4) {
        var mapOfFieldToEditedCellModel = _ref4.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.NumberFormatter, { store: mapOfFieldToEditedCellModel['plan_arrival_num'] });
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'plan_arrival_price',
      name: '含税售价',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: function formatter(_ref5) {
        var mapOfFieldToEditedCellModel = _ref5.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.NumberFormatter, { store: mapOfFieldToEditedCellModel['plan_arrival_price'] });
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'product_name',
      name: '商品名称',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'product_no',
      name: '商品编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'sku_no',
      name: 'SKU编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'bar_code',
      name: '条形码',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'color_type',
      name: '颜色',
      width: 100,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'size_type',
      name: '尺码',
      width: 130,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'product_seller_outer_no',
      name: '商品货号',
      resizable: true,
      draggable: true,
      sortable: true
    }];
  };

  this.initValue = {
    product_name: '', // 商品名称
    product_no: '', // 商品编码
    seller_outer_no: '', // 商品货号
    sku_no: '', // SKU编码
    vendor_name: '', // 供应商
    bar_code: '', // 条形码
    color_type: '', // 颜色
    size_type: '' // 尺码
  };
  (0, _mobx.extendObservable)(this, (0, _extends4.default)({
    id: _shortid2.default.generate(),
    inited: false, // 是否第一次show，是的话resize window，使得表格正常渲染。
    show: false,
    searchObj: new Search(this.initValue),
    get addedOnlyIds() {
      return this.bottomGridModel.rows.map(function (el) {
        return el.onlyId;
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
}
/**
 actions
 */


/**
 * utils
 */

;

exports.default = AddGoodsModel;