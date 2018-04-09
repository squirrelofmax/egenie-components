'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _formatter = require('../formatter');

var _elementReact = require('element-react');

var _EditedCellFormatter = require('../../../../modules/EditedCellFormatter');

var _ImgFormatter = require('../../../../modules/ImgFormatter');

var _ImgFormatter2 = _interopRequireDefault(_ImgFormatter);

var _validateNumber = require('../../../../modules/validateNumber');

var _validateNumber2 = _interopRequireDefault(_validateNumber);

var _EgGridModel = require('../../../../modules/EgGridModel');

var _EgGridModel2 = _interopRequireDefault(_EgGridModel);

var _requests = require('../requests');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderDetailModel = function () {
  function OrderDetailModel(options) {
    var _this = this;

    (0, _classCallCheck3.default)(this, OrderDetailModel);

    this.setGridPager = function () {
      console.log('top:', _this.top, 'flag:', _this.top.flag);
      _this.gridModel.pagerSetting = _this.top.flag === 'add' ? 'total' : '';
      _this.gridModel.hiddenRefresh = _this.top.flag === 'add';
    };

    this.onFilterValueChange = (0, _mobx.action)(function (key, value) {
      _this.cursorFilteritem && (_this.cursorFilteritem.value = value);
    });
    this.onCursorFilteritemFieldChange = (0, _mobx.action)(function (field) {
      var clearAfterChangeFilteritem = _this.clearAfterChangeFilteritem,
          cursorFilteritem = _this.cursorFilteritem;

      if (clearAfterChangeFilteritem && cursorFilteritem) cursorFilteritem.value = '';
      _this.cursorFilteritemField = field;
    });
    this.onSearch = (0, _mobx.action)(function () {
      // console.log('执行查询操作')
      _this.gridModel.resetHeaderCheckBox(); // 重置表头的勾选框
      var data = _this.searchData;
      console.log(data, '点击搜索');
      _this.queryDataAndSetState({ cond: data, page: '1' });
      (0, _assign2.default)(_this.gridModel, { currentPage: 1, selectedKeyValues: [], expanded: {}, cashSelectedRows: [] });
    });
    this.onSingleDelete = (0, _mobx.action)(function (row) {
      // console.log('执行onSingleDelete-------')
      _elementReact.MessageBox.confirm('请确认是否删除该商品信息', '提醒', { type: 'info' }).then(function () {
        var foo = function foo() {
          // 清空勾选缓存
          var ids = _this.gridModel.selectedKeyValues;
          var onlyId = row.onlyId;

          var idx = ids.findIndex(function (id) {
            return id === onlyId;
          });
          ~idx && _this.gridModel.selectedKeyValues.splice(idx, 1);
          var i = _this.gridModel.cashSelectedRows.findIndex(function (row) {
            return row.onlyId === onlyId;
          });
          ~i && _this.gridModel.cashSelectedRows.splice(i, 1);
          // 删除该行数据
          var idKey = _this.top.flag === 'add' ? 'onlyId' : 'pms_purchase_order_detail_id';
          var index = _this.gridModel.rows.findIndex(function (el) {
            return el[idKey] === onlyId;
          });
          ~index && _this.gridModel.rows.splice(index, 1);
          _elementReact.Message.success('删除完成！');
        };

        if (_this.top.flag === 'add') return foo();

        (0, _requests.singleDelete)(row.pms_purchase_order_detail_id).then(function (v) {
          if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
          foo();
        });
      });
    });
    this.onMultiDelete = (0, _mobx.action)(function () {
      // console.log('执行onMultiDelete-------')
      var ids = _this.gridModel.selectedKeyValues;
      if (!ids.length) {
        return _elementReact.Message.error('请至少选择一行');
      }

      _elementReact.MessageBox.confirm('请确认是否删除勾选的商品信息', '提醒', { type: 'info' }).then(function () {
        var idKey = _this.top.flag === 'add' ? 'onlyId' : 'pms_purchase_order_detail_id';
        var foo = function foo() {
          _this.gridModel.resetHeaderCheckBox();
          (0, _assign2.default)(_this.gridModel, { selectedKeyValues: [], cashSelectedRows: [] });
          _this.gridModel.rows = _this.gridModel.rows.filter(function (el) {
            return !ids.find(function (id) {
              return el[idKey] === id;
            });
          });
          return _elementReact.Message.success('删除完成！');
        };

        if (_this.top.flag === 'add') return foo();

        (0, _requests.multiDelete)({ ids: ids.join(',') }).then(function (v) {
          if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
          foo();
        });
      });
    });
    this.changeAllRowsOfSameVendor = (0, _mobx.action)(function (key, vendorId, value) {
      _this.gridModel.rows.forEach(function (el) {
        if (el.vendor_id === vendorId) {
          el[key] = value;
        }
      });
    });
    this.handleCellValueChange = (0, _mobx.action)(function (key, value, row) {
      // 除了文本编辑框，返回true代表不执行handleCellBlur
      console.log('\u6267\u884C\u6700\u5916\u90E8\u7684handleCellValueChange,key:' + key + ',value:' + value + ',row:', row);
      row[key] = value;
      if (key === 'plan_arrival_date' && !value) {
        _elementReact.Message.warning('请填写预计到货日期');
        return true; // 返回ture则停止调用blur
      }
    });
    this.handleCellBlur = (0, _mobx.action)(function (key, value, row) {
      console.log('\u6267\u884C\u6700\u5916\u90E8\u7684handleCellBlur,key:' + key + ',value:' + value + ',row:', row);
      // const idKey = this.top.flag === 'add' ? 'onlyId' : 'pms_purchase_order_detail_id'
      // const item = this.gridModel.rows.find(el => el[idKey] === row.onlyId)
      // if (item) {
      //   const numberInputKeys = [{ key: 'plan_arrival_num' }, { key: 'plan_arrival_price' }, { key: 'confirmed_price' }, { key: 'confirmed_num' }, { key: 'tax_rate', min: 0, max: 100 }]
      //   const numberItem = numberInputKeys.find(el => el.key === key)
      //   if (numberItem) value = validateNumber({ ...numberItem, value })
      //   if (key === 'sales_type_code' || key === 'pay_type_code') this.changeAllRowsOfSameVendor(key, row.vendor_id, value)
      //   if (key === 'purchase_unit_id') this.changeNumAndPriceWhenUintChange(item, value)
      //   if (key === 'base_unit_id') {
      //     item.purchase_unit_id = value
      //     this.changeNumAndPriceWhenUintChange(item, value)
      //   }
      //   if (key === 'vendor_id') { // 获取其他的供应商的销售方式与结算方式，赋值
      //     const otherItem = this.gridModel.rows.find(el => el.onlyId !== row.onlyId && el.vendor_id == value)
      //     if (otherItem) {
      //       const { sales_type, pay_type } = otherItem
      //       Object.assign(item, { sales_type, pay_type })
      //     }
      //     const vendorItem = this.top.dict.filterVendorById[item.sku_id].find(el => el.id == value) || {}
      //     item.purchaser_id = vendorItem.purchaserId || ''
      //     this.updateRowWhenVendorChange(value, item)
      //   }
      //   if (key === 'plan_arrival_price') item.confirmed_price = value
      //   if (key === 'plan_arrival_num') item.confirmed_num = value
      //   if (key === 'warehouse_id') {
      //     this.updateRowWhenWarehouseChange(value, item.sku_id, item)
      //   }
      //   // if(key === 'tax_rate') value = validateNumber({value,min:0,max:100})
      //   item[key] = value
      //   if (key === 'plan_arrival_date' && !value) return Message.warning('请填写预计到货日期')// 不符合条件就不保存

      //   const finalItem = JSON.parse(JSON.stringify(
      //     this.displayRows.find(el => el[idKey] === row.onlyId),
      //     this.columns.slice(3).map(el => el.key).concat(['pms_purchase_order_detail_id'])
      //   ))
      //   finalItem.organization_id = finalItem.organization_id.length ? finalItem.organization_id[finalItem.organization_id.length - 1] : ''
      //   finalItem.plan_arrival_date = finalItem.plan_arrival_date && new Date(finalItem.plan_arrival_date).toLocaleDateString().split('/')
      //     .map(el => el.padStart(2, '0')).join('-')
      //   // delete finalItem.version
      //   delete finalItem.conversion_rate
      //   delete finalItem.purchase_num
      //   const reg = /_code$/
      //   Object.keys(finalItem).forEach(key => { // 清除所有code
      //     if (reg.test(key)) {
      //       finalItem[key.replace(reg, '')] = finalItem[key]
      //       delete finalItem[key]
      //     }
      //   })
      //   // delete finalItem.is_usable
      //   if (key !== 'tax_rate') { delete finalItem.tax_rate }
      //   if (key !== 'plan_arrival_price') { delete finalItem.plan_arrival_price }
      //   if (key !== 'sales_type_code') { delete finalItem.sales_type }
      //   if (key !== 'pay_type_code') { delete finalItem.pay_type }
      //   if (key !== 'organization_id') { delete finalItem.organization_id }
      //   if (this.top.flag === 'edit') {
      //     if (key === 'sales_type_code' || key === 'pay_type_code') {
      //       const { pms_purchase_order_id, vendor_id } = finalItem
      //       return updateVendorProps({
      //         pms_purchase_order_id,
      //         vendor_id,
      //         [key.replace(reg, '')]: finalItem[key.replace(reg, '')]
      //       }).then(v => {
      //         if (v.status !== 'Successful') return Message.error(v.data)
      //       })
      //     }
      //     singleUpdate(finalItem).then(v => {
      //       if (v.status !== 'Successful') return Message.error(v.data)
      //     })
      //   }
      // }
    });
    this.onRefresh = (0, _mobx.action)(function () {
      var data = _this.history;
      _this.queryDataAndSetState(data);
    });
    this.onPageOrSizeChange = (0, _mobx.action)(function (innerState) {
      var data = _this.getDataFromInnder(innerState);
      _this.queryDataAndSetState(data);
    });
    this.getDataFromInnder = (0, _mobx.action)(function (_ref) {
      var currentPage = _ref.currentPage,
          size = _ref.size;

      return { page: currentPage, pageSize: size };
    });
    this.queryDataAndSetState = (0, _mobx.action)(function (data) {
      _this.gridModel.loading = true;
      var obj = (0, _extends3.default)({}, _this.history, data, {
        purchaseOrderId: _this.top.pms_purchase_order_id
      });
      _this.history = (0, _extends3.default)({}, obj);
      // getDetailListByCond(obj).then(v => {
      _promise2.default.resolve({
        status: 'Successful',
        data: {
          list: [{ product_name: '', sku_id: '第一号sku', customer: '', confirmed_num: '', plan_arrival_date: '', plan_arrival_date2: '' }, { product_name: '', sku_id: '第二号sku', customer: '', confirmed_num: '123', plan_arrival_date: '', plan_arrival_date2: new Date() }],
          totalCount: 50
        }
      }).then(function (v) {
        _this.gridModel.loading = false;
        if (v.status !== 'Successful') {
          _this.gridModel.rows = [];
          _this.gridModel.totalCount = 0;
          return _elementReact.Message.error(v.data);
        }
        var getDeptValueById = _this.top.getDeptValueById;

        var data = v.data ? v.data.list : [];
        data.forEach(function (el) {
          var res = getDeptValueById(el.organization_id);
          el.organization_id = res;
          el.isNoBaseUnit = !el.base_unit_id;
          el.purchase_unit_id = el.purchase_unit_id || el.base_unit_id;
        });
        _this.gridModel.rows = data;
        _this.gridModel.totalCount = v.data ? v.data.totalCount : 0;
      });
    });
    this.getVendorDictBySkuId = (0, _mobx.action)(function (skuid) {
      if (_this.top._dict.filterVendorById[skuid]) {
        return _this.top._dict.filterVendorById[skuid];
      }
      return (0, _requests.getVendorDictBySkuId)(skuid).then(function (v) {
        var res = v.data;
        if (v.status !== 'Successful') res = [];
        _this.top.dict.filterVendorById[skuid] = res;
        return res.map(function (_ref2) {
          var id = _ref2.id,
              vendorName = _ref2.vendorName,
              purchaserId = _ref2.purchaserId;
          return { value: id, label: vendorName, purchaserId: purchaserId == null ? '' : purchaserId };
        });
      });
    });

    this.getGridModel = function () {
      var onPageOrSizeChange = _this.onPageOrSizeChange,
          onRefresh = _this.onRefresh;

      console.log('下拉选项-----', _this.top._dict.sales_type);
      return new _EgGridModel2.default({
        interceptorOfRows: {
          config: [{
            field: 'product_name',
            treeOptions: [{ pid: null, id: '1', name: '总公司' }, { pid: '1', id: '101', name: '分公司' }, { pid: '101', id: '10101', name: '叶子公司' }]
          }, {
            field: 'customer',
            // options: this.top._dict.sales_type
            getOptions: 'top._dict.sales_type'
          }, { field: 'confirmed_num', max: 100, unit: '%' }, 'plan_arrival_date', 'plan_arrival_date2'],
          context: _this
        },
        getDisplayRows: function getDisplayRows(rows, rawRows) {
          var _top = _this.top,
              flag = _top.flag,
              _dict = _top._dict;

          return rows.map(function (el) {
            var price = (parseFloat(el.plan_arrival_price || 0) * 100 / (parseFloat(el.tax_rate || 0) + 100)).toFixed(2);
            var conversion_rate = !el.purchase_unit_id ? 1 : _dict.conversion_rate[el.purchase_unit_id] || 1;
            return (0, _extends3.default)({}, el, {
              onlyId: flag === 'add' ? el.onlyId : el.pms_purchase_order_detail_id,
              price: price,
              plan_arrival_total_price: (parseFloat(el.plan_arrival_price || 0) * parseFloat(el.plan_arrival_num || 0)).toFixed(2),
              no_tax_plan_arrival_total_price: (price * parseFloat(el.plan_arrival_num || 0)).toFixed(2),
              confirmed_total_price: (parseFloat(el.confirmed_price || 0) * parseFloat(el.confirmed_num || 0)).toFixed(2),
              real_arrival_total_price: (parseFloat(el.confirmed_price || 0) * parseFloat(el.real_storage_num || 0)).toFixed(2),
              tax: (parseFloat(el.plan_arrival_price || 0) - price).toFixed(2),
              conversion_rate: conversion_rate,
              purchase_num: Math.round((el.plan_arrival_num || 0) / conversion_rate)
            });
          });
        },
        cashOn: true, // 因为批量修改，删除
        sortAll: false,
        showCheckBox: true,
        sumColumns: ['plan_arrival_num', 'plan_arrival_total_price'],
        columns: _this.getColumns(),
        api: {
          onPageChange: onPageOrSizeChange, onSizeChange: onPageOrSizeChange, onRefresh: onRefresh
          //  onSortAll, onRowClick,
        }
      });
    };

    this.getUnitCategoryByUnitId = function (unitid) {
      var dict = _this.top.dict.purchase_unit;
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
      (0, _requests.findEmployeeByVendorId)(value).then(function (v) {
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data || '');
        item.purchaser_tel = v.data.tel || '';
      });
    };

    this.updateRowWhenWarehouseChange = function (value, skuIds, item) {
      (0, _requests.findStockByWarehouseId)(value, skuIds).then(function (v) {
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data || '');
        item.sale_stock = v.data[skuIds]['saleStock'];
        item.on_way_stock = v.data[skuIds]['onWayStock'];
        item.entity_stock = v.data[skuIds]['entityStock'];
      });
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
        formatter: _ImgFormatter2.default
      }, {
        key: 'flag',
        name: '标记',
        width: 100
      }, {
        key: 'customer',
        name: '客户', // TODO:下拉选择
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
        key: 'product_name',
        name: '商品名称',
        width: 150,
        resizable: true,
        draggable: true,
        sortable: true,
        formatter: function formatter(_ref5) {
          var mapOfFieldToEditedCellModel = _ref5.dependentValues.mapOfFieldToEditedCellModel;
          return _react2.default.createElement(_EditedCellFormatter.TreeFormatter, { store: mapOfFieldToEditedCellModel['product_name'] });
        },
        getRowMetaData: function getRowMetaData(row) {
          return row;
        }
      }, {
        key: 'product_no',
        name: '商品编码',
        width: 150,
        resizable: true,
        draggable: true,
        sortable: true
      }, {
        key: 'product_out_no',
        name: '商品货号',
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
        draggable: true
      }, {
        key: 'color_type',
        name: '颜色',
        width: 100,
        resizable: true,
        draggable: true
      }, {
        key: 'size_type',
        name: '尺码',
        width: 130,
        resizable: true,
        draggable: true
      }, {
        key: 'confirmed_num',
        name: '销售数量',
        width: 185,
        resizable: true,
        draggable: true,
        formatter: function formatter(_ref6) {
          var mapOfFieldToEditedCellModel = _ref6.dependentValues.mapOfFieldToEditedCellModel;
          return _react2.default.createElement(_EditedCellFormatter.NumberFormatter, { store: mapOfFieldToEditedCellModel['confirmed_num'] });
        },
        getRowMetaData: function getRowMetaData(row) {
          return row;
        }
      }, {
        key: 'base_unit_id',
        name: '基本计量单位',
        width: 120,
        resizable: true,
        draggable: true,
        getRowMetaData: function getRowMetaData(row) {
          return row;
        }
      }, {
        key: 'price',
        name: '售价',
        width: 85,
        resizable: true,
        draggable: true,
        formatter: function formatter(_ref7) {
          var value = _ref7.value;
          return _react2.default.createElement(
            'div',
            { style: { textAlign: 'right' } },
            value
          );
        }
      }, {
        key: 'tax_rate',
        name: '税率',
        width: 120,
        resizable: true,
        draggable: true, // InputFormatterForTaxRate
        // formatter: (props) => (<InputFormatter store={this.mapOfFieldToEditedCellModel['tax_rate']} dependentValues={props.dependentValues} />),
        getRowMetaData: function getRowMetaData(row) {
          return row;
        }
      }, {
        key: 'tax',
        name: '税额',
        width: 85,
        resizable: true,
        draggable: true,
        formatter: function formatter(_ref8) {
          var value = _ref8.value;
          return _react2.default.createElement(
            'div',
            { style: { textAlign: 'right' } },
            value
          );
        }
      }, {
        key: 'plan_arrival_price',
        name: '含税售价',
        width: 100,
        resizable: true,
        draggable: true,
        // formatter: (props) => (<InputFormatter {...props} foo={{
        //   onBlur: this.onCellChange.bind(this, 'plan_arrival_price'),
        //   onChange: null,
        //   _class: Number(props.dependentValues.contract_price) === Number(props.value) ? '' : 'red'
        // }}
        // />),
        getRowMetaData: function getRowMetaData(row) {
          return row;
        }
      }, {
        key: 'no_tax_plan_arrival_total_price',
        name: '销售金额',
        width: 100,
        resizable: true,
        draggable: true,
        formatter: function formatter(_ref9) {
          var value = _ref9.value;
          return _react2.default.createElement(
            'div',
            { style: { textAlign: 'right' } },
            value
          );
        },
        getRowMetaData: function getRowMetaData(row) {
          return row;
        }
      }, {
        key: 'plan_arrival_total_price',
        name: '销售金额(含税)',
        width: 140,
        resizable: true,
        draggable: true,
        formatter: function formatter(_ref10) {
          var value = _ref10.value;
          return _react2.default.createElement(
            'div',
            { style: { textAlign: 'right' } },
            value
          );
        },
        getRowMetaData: function getRowMetaData(row) {
          return row;
        }
      }, {
        key: 'plan_arrival_date',
        name: '预计到货日期',
        width: 220,
        resizable: true,
        draggable: true,
        formatter: function formatter(_ref11) {
          var mapOfFieldToEditedCellModel = _ref11.dependentValues.mapOfFieldToEditedCellModel;
          return _react2.default.createElement(_EditedCellFormatter.DatePickerFormatter, { store: mapOfFieldToEditedCellModel['plan_arrival_date'] });
        },
        getRowMetaData: function getRowMetaData(row) {
          return row;
        }
      }, {
        key: 'plan_arrival_date2',
        name: '实际送货日期',
        width: 220,
        resizable: true,
        draggable: true,
        formatter: function formatter(_ref12) {
          var mapOfFieldToEditedCellModel = _ref12.dependentValues.mapOfFieldToEditedCellModel;
          return _react2.default.createElement(_EditedCellFormatter.DatePickerFormatter, { store: mapOfFieldToEditedCellModel['plan_arrival_date2'] });
        },
        getRowMetaData: function getRowMetaData(row) {
          return row;
        }
      }];
    };

    (0, _mobx.extendObservable)(this, (0, _extends3.default)({
      id: _shortid2.default.generate(),
      top: {},
      gridModel: {},
      filteritems: [{ label: '供应商名称', field: 'vendor_name', value: '', type: 'select', options: [{ label: '供应商AAA', value: 'a' }] }, { label: 'SKU编码', field: 'sku_no', value: '' }], // {label,field,,value}
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
        var _this2 = this;

        return this.filteritems.find(function (_ref13) {
          var field = _ref13.field;
          return field === _this2.cursorFilteritemField;
        });
      }
    }, options || {}));
    this.gridModel = this.getGridModel();
    this.setGridPager();
    (0, _mobx.autorun)(this.setGridPager);
  }

  /**
   * autorun
   */


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

exports.default = OrderDetailModel;