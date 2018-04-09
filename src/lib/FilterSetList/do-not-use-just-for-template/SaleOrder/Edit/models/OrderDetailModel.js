'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _elementReact = require('element-react');

var _EditedCellFormatter = require('@/utils/EgGrid/EditedCellFormatter');

var _ImgFormatter = require('@/utils/EgGrid/ImgFormatter');

var _ImgFormatter2 = _interopRequireDefault(_ImgFormatter);

var _EgGridModel = require('@/utils/EgGrid/EgGridModel');

var _EgGridModel2 = _interopRequireDefault(_EgGridModel);

var _requests = require('../requests');

var _requests2 = require('../../requests');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderDetailModel = function () {
  function OrderDetailModel(options) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, OrderDetailModel);

    _initialiseProps.call(this);

    (0, _mobx.extendObservable)(this, (0, _extends3.default)({
      id: _shortid2.default.generate(),
      top: {},
      gridModel: {},
      filteritems: [{ label: 'SKU编码', field: 'skuNo', value: '' }], // {label,field,,value}
      _filteritems: [], // 用于前端过滤
      cursorFilteritemField: '',
      history: { pageSize: '50', sidx: '', sord: 'asc', page: '1' },
      get numOfHasValue() {
        return this.filteritems.reduce(function (res, el) {
          return Number(!!el.value) + res;
        }, 0);
      },
      get searchData() {
        return this.filteritems.reduce(function (data, item) {
          data[item.field] = item.value + '';
          return data;
        }, {});
      },
      get cursorFilteritem() {
        var _this = this;

        return this.filteritems.find(function (_ref) {
          var field = _ref.field;
          return field === _this.cursorFilteritemField;
        });
      }
    }, options || {}));
    this.gridModel = this.getGridModel();
    // this.setGridPager()
    // autorun(this.setGridPager)
    (0, _mobx.autorun)(function () {
      _this2.gridModel.total = _this2.gridModel.rows.length;
    });
    (0, _mobx.autorun)(function () {
      _this2.gridModel.columns = _this2.getColumns();
    });
    this.onFilter();
  }

  /**
   * autorun
   */
  // 编辑保存时用

  /**
   * actions
   */


  /**
   * utils
   */


  (0, _createClass3.default)(OrderDetailModel, [{
    key: 'getDisplayValueOfFilteritem',
    value: function getDisplayValueOfFilteritem(item) {
      if (!item) return '';
      var type = item.type,
          value = item.value,
          options = item.options;

      if (type === 'select') return (options.find(function (el) {
        return el.value === value;
      }) || {}).label || '';
      return value || '';
    }
  }, {
    key: 'getOptionsOfCustomer',
    value: function getOptionsOfCustomer(skuId) {
      var cash = {};
      return !cash[skuId] ? cash[skuId] = _promise2.default.resolve([{ label: skuId + '\u7684Hello', value: '1' }, { label: skuId + '\u7684World', value: '2' }]) : cash[skuId];
    }
  }]);
  return OrderDetailModel;
}();

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.deleteIds = new _set2.default([]);
  this.removePreErp = {
    erpPic: 'pic',
    erpProductName: 'productName',
    erpProductNo: 'productNo',
    erpProductSellerOuterNo: 'productSellerOuterNo',
    erpSkuNo: 'skuNo',
    erpBarCode: 'barCode',
    erpColorType: 'colorType',
    erpSizeType: 'sizeType',
    erpSkuId: 'skuId'
  };
  this.editableFields = ['id', 'customer', 'saleNum', 'taxRate', 'salePrice', 'planSendDate'];
  this.mapSkuIdToId = {};

  this.setGridPager = function () {
    console.log('top:', _this3.top, 'flag:', _this3.top.flag);
    _this3.gridModel.pagerSetting = _this3.top.flag === 'add' ? 'total' : '';
    _this3.gridModel.hiddenRefresh = _this3.top.flag === 'add';
  };

  this.onFilterValueChange = (0, _mobx.action)(function (key, value) {
    _this3.cursorFilteritem && (_this3.cursorFilteritem.value = value);
  });
  this.onCursorFilteritemFieldChange = (0, _mobx.action)(function (field) {
    var clearAfterChangeFilteritem = _this3.clearAfterChangeFilteritem,
        cursorFilteritem = _this3.cursorFilteritem;

    if (clearAfterChangeFilteritem && cursorFilteritem) cursorFilteritem.value = '';
    _this3.cursorFilteritemField = field;
  });
  this.onSearch = (0, _mobx.action)(function () {
    // console.log('执行查询操作')
    _this3.gridModel.resetHeaderCheckBox(); // 重置表头的勾选框
    // const data = this.searchData
    var data = {};
    console.log(data, '点击搜索');
    _this3.queryDataAndSetState({ cond: data, page: '1', pageSize: '1000' });
    (0, _assign2.default)(_this3.gridModel, { currentPage: 1, selectedKeyValues: [], expanded: {}, cashSelectedRows: [] });
  });
  this.onFilter = (0, _mobx.action)(function () {
    console.log('点击搜索进行前端过滤');
    _this3._filteritems = _this3.filteritems.map(function (el) {
      return (0, _extends3.default)({}, el);
    });
    console.log('点击搜索进行前端过滤', _this3._filteritems.slice(0));
  });
  this.onSingleDelete = (0, _mobx.action)(function (row) {
    // console.log('执行onSingleDelete-------')
    _elementReact.MessageBox.confirm('您确定要删除该商品信息吗？(删除后取消保存可以恢复数据)', '提醒', { type: 'info' }).then((0, _mobx.action)(function () {
      // 清空勾选缓存
      var ids = _this3.gridModel.selectedKeyValues; // TODO:id字段变的化用cashSelectedRows
      var skuId = row.skuId;

      var idx = ids.findIndex(function (id) {
        return id === skuId;
      });
      ~idx && _this3.gridModel.selectedKeyValues.splice(idx, 1);
      var i = _this3.gridModel.cashSelectedRows.findIndex(function (row) {
        return row.skuId === skuId;
      });
      ~i && _this3.gridModel.cashSelectedRows.splice(i, 1);
      // 删除该行数据
      var idKey = 'skuId';
      var index = _this3.gridModel.rows.findIndex(function (el) {
        return el[idKey] === skuId;
      });
      ~index && _this3.gridModel.rows.splice(index, 1);
      if (_this3.top.flag === 'edit' && (row.dataStatusForApi == null || row.dataStatusForApi === 2)) {
        _this3.deleteIds.add(skuId);
        _this3.mapSkuIdToId[skuId] = row.id;
      }
    }));
  });
  this.onMultiDelete = (0, _mobx.action)(function () {
    // console.log('执行onMultiDelete-------')
    var ids = _this3.gridModel.selectedKeyValues;
    if (!ids.length) {
      return _elementReact.Message.error('请至少选择一行');
    }

    _elementReact.MessageBox.confirm('您确定要删除勾选的商品信息吗？(删除后取消保存可以恢复数据)', '提醒', { type: 'info' }).then((0, _mobx.action)(function () {
      var idKey = 'skuId';
      _this3.gridModel.resetHeaderCheckBox();

      if (_this3.top.flag === 'edit') {
        _this3.gridModel.cashSelectedRows.forEach(function (el) {
          if (el.dataStatusForApi == null || el.dataStatusForApi === 2) {
            _this3.deleteIds.add(el[idKey]);
            _this3.mapSkuIdToId[el.skuId] = el.id;
          }
        });
      }

      (0, _assign2.default)(_this3.gridModel, { selectedKeyValues: [], cashSelectedRows: [] });
      _this3.gridModel.rows = _this3.gridModel.rows.filter(function (el) {
        return !ids.find(function (id) {
          return el[idKey] === id;
        });
      });
    }));
  });
  this.changeAllRowsOfSameVendor = (0, _mobx.action)(function (key, vendorId, value) {
    _this3.gridModel.rows.forEach(function (el) {
      if (el.vendor_id === vendorId) {
        el[key] = value;
      }
    });
  });
  this.handleCellValueChange = (0, _mobx.action)(function (key, value, row) {
    // 除了文本编辑框，返回true代表不执行handleCellBlur
    console.log('\u6267\u884C\u6700\u5916\u90E8\u7684handleCellValueChange,key:' + key + ',value:' + value + ',row:', row);
    row[key] = value;
    // this.sideEffectOfValueChange(row)
    if (row.dataStatusForApi == null) row.dataStatusForApi = 2; // 添加商品过来的数据都带有dataStatusForApi标记，没带说明是后端查的且为改变过
    if (key === 'plan_arrival_date' && !value) {
      _elementReact.Message.warning('请填写预计到货日期');
      return true; // 返回ture则停止调用blur
    }
  });
  this.handleCellBlur = (0, _mobx.action)(function (key, value, row) {
    console.log('\u6267\u884C\u6700\u5916\u90E8\u7684handleCellBlur,key:' + key + ',value:' + value + ',row:', row);
  });
  this.onRefresh = (0, _mobx.action)(function () {
    var data = _this3.history;
    _this3.queryDataAndSetState(data);
  });
  this.onPageOrSizeChange = (0, _mobx.action)(function (innerState) {
    var data = _this3.getDataFromInnder(innerState);
    _this3.queryDataAndSetState(data);
  });
  this.getDataFromInnder = (0, _mobx.action)(function (_ref2) {
    var currentPage = _ref2.currentPage,
        size = _ref2.size;

    return { page: currentPage, pageSize: size };
  });
  this.queryDataAndSetState = (0, _mobx.action)(function (data) {
    _this3.gridModel.loading = true;
    var obj = (0, _extends3.default)({}, _this3.history, data, {
      purchaseOrderId: _this3.top.id
    });
    _this3.history = (0, _extends3.default)({}, obj);
    (0, _requests2.getSaleOrderDetailList)(obj, _this3.top.id).then((0, _mobx.action)(function (v) {
      _this3.gridModel.loading = false;
      if (v.status !== 'Successful') {
        _this3.gridModel.rows = [];
        _this3.gridModel.totalCount = 0;
        return _elementReact.Message.error(v.data);
      }
      var data = v.data ? v.data.list : [];
      data.forEach(function (el) {
        el.customer = _this3.top.transformCustomerNameToId(el.customer);
        el.salePrice = el.priceIncludeTax;
        // 去掉erp前缀
        (0, _keys2.default)(_this3.removePreErp).forEach(function (erpField) {
          var field = _this3.removePreErp[erpField];
          el[field] = el[erpField];
          delete el[erpField];
        });
      });
      _this3.gridModel.rows = data;
      _this3.gridModel.totalCount = v.data ? v.data.totalCount : 0;
    }));
  });
  this.getVendorDictBySkuId = (0, _mobx.action)(function (skuid) {
    if (_this3.top._dict.filterVendorById[skuid]) {
      return _this3.top._dict.filterVendorById[skuid];
    }
    return _promise2.default.resolve();
  });

  this.getGridModel = function () {
    var onPageOrSizeChange = _this3.onPageOrSizeChange,
        onRefresh = _this3.onRefresh;

    console.log('下拉选项-----', _this3.top._dict.sales_type);
    return new _EgGridModel2.default({
      interceptorOfRows: {
        config: [{
          field: 'customer',
          getOptions: 'top._dict.customer'
        }, 'saleNum', { field: 'taxRate', max: 100, unit: '%' }, 'salePrice', 'planSendDate', {
          field: 'salePriceNoTax',
          getValue: function getValue(row) {
            return (parseFloat(row.salePrice || 0) * 100 / (parseFloat(row.taxRate || 0) + 100)).toFixed(2);
          }
        }, {
          field: 'XSJE',
          getValue: function getValue(row) {
            var price = parseFloat(row.salePrice || 0) * 100 / (parseFloat(row.taxRate || 0) + 100);
            return (price * parseFloat(row.saleNum || 0)).toFixed(2);
          }
        }, {
          field: 'XSJEHS',
          getValue: function getValue(row) {
            return (parseFloat(row.salePrice || 0) * parseFloat(row.saleNum || 0)).toFixed(2);
          }
        }, {
          field: 'tax',
          getValue: function getValue(row) {
            var price = parseFloat(row.salePrice || 0) * 100 / (parseFloat(row.taxRate || 0) + 100);
            return (parseFloat(row.salePrice || 0) - price).toFixed(2);
          }
        }],
        context: _this3
      },
      primaryKeyField: 'skuId',
      getDisplayRows: function getDisplayRows(rows, rawRows) {
        var _filteritems = _this3._filteritems,
            getFilter = _this3.getFilter;

        var ret = rows.filter(getFilter(_filteritems)).map(function (el) {
          var price = (parseFloat(el.salePrice || 0) * 100 / (parseFloat(el.taxRate || 0) + 100)).toFixed(2);
          return (0, _extends3.default)({}, el, {
            salePriceNoTax: price,
            XSJE: (price * parseFloat(el.saleNum || 0)).toFixed(2),
            XSJEHS: (parseFloat(el.salePrice || 0) * parseFloat(el.saleNum || 0)).toFixed(2),
            tax: (parseFloat(el.salePrice || 0) - price).toFixed(2)
          });
        });
        console.log('执行getDisplayRows方法', ret.length);
        return ret;
      },
      pagerSetting: 'total',
      hiddenRefresh: true,
      cashOn: true, // 因为批量修改，删除
      sortAll: false,
      showCheckBox: true,
      sumColumns: ['saleNum', 'XSJEHS'],
      columns: _this3.getColumns(),
      api: {
        onPageChange: onPageOrSizeChange, onSizeChange: onPageOrSizeChange, onRefresh: onRefresh
        //  onSortAll, onRowClick,
      }
    });
  };

  this.getUnitCategoryByUnitId = function (unitid) {
    var dict = _this3.top.dict.purchase_unit;
    return (0, _keys2.default)(dict).find(function (c) {
      return dict[c].some(function (unit) {
        return unit.id == unitid;
      });
    });
  };

  this.changeNumAndPriceWhenUintChange = function (item, value) {// 需求改变，不必改相关的数量，价格，只有一个采购单位数，完全可以派生
    // const cid=this.getUnitCategoryByUnitId(value) //获取单位类别，value必不为空,即不可清空
    // const {purchase_unit_id}=item
    // const rate2=this.top.dict.purchase_unit[cid].find(unit => unit.id == value).conversionRate || 1
    // const _item=this.top.dict.purchase_unit[cid].find(unit => unit.id == purchase_unit_id)
    // const rate1=_item ? _item.conversionRate : 1
    // item.plan_arrival_price *= rate2
    // item.plan_arrival_price /=rate1
    // item.confirmed_price *= rate2
    // item.confirmed_price /= rate1
    // item.plan_arrival_num *= rate1
    // item.plan_arrival_num /= rate2
    // item.plan_arrival_num = Math.floor(item.plan_arrival_num)
    // item.confirmed_num  *= rate1
    // item.confirmed_num  /= rate2
    // item.confirmed_num = Math.floor(item.confirmed_num)
  };

  this.updateRowWhenVendorChange = function (value, item) {
    (0, _requests.findEmployeeByVendorId)(value).then((0, _mobx.action)(function (v) {
      if (v.status !== 'Successful') return _elementReact.Message.error(v.data || '');
      item.purchaser_tel = v.data.tel || '';
    }));
  };

  this.updateRowWhenWarehouseChange = function (value, skuIds, item) {
    (0, _requests.findStockByWarehouseId)(value, skuIds).then((0, _mobx.action)(function (v) {
      if (v.status !== 'Successful') return _elementReact.Message.error(v.data || '');
      item.sale_stock = v.data[skuIds]['saleStock'];
      item.on_way_stock = v.data[skuIds]['onWayStock'];
      item.entity_stock = v.data[skuIds]['entityStock'];
    }));
  };

  this.getColumns = function () {
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
            { type: 'text', size: 'small', onClick: _this3.onSingleDelete.bind(_this3, dependentValues) },
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
      formatter: _ImgFormatter2.default
    }, {
      key: 'flag',
      name: '标记',
      width: 100
    }, {
      key: 'customer',
      name: '客户',
      width: 160,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref4) {
        var mapOfFieldToEditedCellModel = _ref4.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.SelectFormatter, { store: mapOfFieldToEditedCellModel['customer'] });
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
      sortable: true,
      // formatter: ({ dependentValues: { mapOfFieldToEditedCellModel } }) => (<TreeFormatter store={mapOfFieldToEditedCellModel['product_name']} />),
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'productNo',
      name: '商品编码',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true,
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'productSellerOuterNo',
      name: '商品货号',
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
      draggable: true
    }, {
      key: 'colorType',
      name: '颜色',
      width: 100,
      resizable: true,
      draggable: true
    }, {
      key: 'sizeType',
      name: '尺码',
      width: 130,
      resizable: true,
      draggable: true
    }, {
      key: 'saleNum',
      name: '销售数量',
      width: 185,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref5) {
        var mapOfFieldToEditedCellModel = _ref5.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.NumberFormatter, { store: mapOfFieldToEditedCellModel['saleNum'] });
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'baseUnitId',
      name: '基本计量单位',
      width: 120,
      resizable: true,
      draggable: true,
      formatter: (0, _mobxReact.observer)(function (_ref6) {
        var value = _ref6.value;

        var options = _this3.top._dict['base_unit'];
        var item = options && options.find(function (el) {
          return el.value == value;
        });
        var displayValue = item ? item.label : value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', marginLeft: -8 } },
          displayValue
        );
      }),
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'salePriceNoTax',
      name: '售价',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref7) {
        var mapOfFieldToEditedCellModel = _ref7.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.ComputedValueFormatter, { store: mapOfFieldToEditedCellModel['salePriceNoTax'] });
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      } // formatter: observer(({ value }) => (<div style={{ textAlign: 'right' }}>{value}</div>))
    }, {
      key: 'taxRate',
      name: '税率',
      width: 120,
      resizable: true,
      draggable: true, // InputFormatterForTaxRate
      formatter: function formatter(_ref8) {
        var mapOfFieldToEditedCellModel = _ref8.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.NumberFormatter, { store: mapOfFieldToEditedCellModel['taxRate'] });
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'tax',
      name: '税额',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref9) {
        var mapOfFieldToEditedCellModel = _ref9.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.ComputedValueFormatter, { store: mapOfFieldToEditedCellModel['tax'] });
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      } // formatter: observer(({ value }) => (<div style={{ textAlign: 'right' }}>{value}</div>))
    }, {
      key: 'salePrice',
      name: '含税售价',
      width: 100,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref10) {
        var mapOfFieldToEditedCellModel = _ref10.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.NumberFormatter, { store: mapOfFieldToEditedCellModel['salePrice'] });
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'XSJE',
      name: '销售金额',
      width: 100,
      resizable: true,
      draggable: true,
      // formatter: observer(({ value }) => (
      //   <div style={{ textAlign: 'right' }}>{value}</div>
      // )),
      formatter: function formatter(_ref11) {
        var mapOfFieldToEditedCellModel = _ref11.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.ComputedValueFormatter, { store: mapOfFieldToEditedCellModel['XSJE'] });
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'XSJEHS',
      name: '销售金额(含税)',
      width: 140,
      resizable: true,
      draggable: true,
      // formatter: observer(({ value }) => (
      //   <div style={{ textAlign: 'right' }}>{value}</div>
      // )),
      formatter: function formatter(_ref12) {
        var mapOfFieldToEditedCellModel = _ref12.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.ComputedValueFormatter, { store: mapOfFieldToEditedCellModel['XSJEHS'] });
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'planSendDate',
      name: '预计交货日期',
      width: 220,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref13) {
        var mapOfFieldToEditedCellModel = _ref13.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.DatePickerFormatter, { store: mapOfFieldToEditedCellModel['planSendDate'] });
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
      // ...(this.top.flag === 'edit' ? [{
      //   key: 'realSendDate',
      //   name: '实际交货日期',
      //   width: 220,
      //   resizable: true,
      //   draggable: true,
      //   formatter: ({ dependentValues: { mapOfFieldToEditedCellModel } }) => (<DatePickerFormatter store={mapOfFieldToEditedCellModel['realSendDate']} />),
      //   getRowMetaData: row => row
      // }] : [])
    }];
  };

  this.getFilter = function (filteritems) {
    var _filteritems = filteritems.filter(function (el) {
      return el.value != null && el.value !== '';
    });
    if (!_filteritems.length) return function (el) {
      return el;
    };
    return function (el) {
      return filteritems.every(function (_ref14) {
        var type = _ref14.type,
            value = _ref14.value,
            field = _ref14.field,
            filetrField = _ref14.filetrField;
        // 目前只考虑下拉filter与文本filter
        return type === 'select' ? el[filetrField || field] + '' === value + '' : ~el[filetrField || field].indexOf(value);
      });
    };
  };
};

exports.default = OrderDetailModel;