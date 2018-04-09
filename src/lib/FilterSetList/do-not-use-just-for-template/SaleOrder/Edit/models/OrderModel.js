'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mobx = require('mobx');

var _elementReact = require('element-react');

var _requests = require('../requests');

var _OrderDetailModel = require('./OrderDetailModel');

var _OrderDetailModel2 = _interopRequireDefault(_OrderDetailModel);

var _AddGoodsModel = require('./AddGoodsModel');

var _AddGoodsModel2 = _interopRequireDefault(_AddGoodsModel);

var _MultiEditModel = require('./MultiEditModel');

var _MultiEditModel2 = _interopRequireDefault(_MultiEditModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderModel = function () {
  function OrderModel(options) {
    var _this = this;

    (0, _classCallCheck3.default)(this, OrderModel);
    this.rules = {
      customer: [{ required: true, message: '请选择客户', trigger: 'change' }],
      saleDate: [{ required: true, message: '请选择销售日期', trigger: 'change' }]
    };

    this.testOp = function () {
      var a = _this.saveDataForEdit;
    };

    this.setFormRef = (0, _mobx.action)(function (form) {
      return _this.formRef = form;
    });
    this.getAllDicts = (0, _mobx.action)(function () {
      _this.getProvince();
      (0, _requests.getDictList)('product_type').then((0, _mobx.action)(function (v) {
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        _this.dict.product_type = v.data;
      }));
      (0, _requests.getPurchaseUnitDict)().then((0, _mobx.action)(function (v) {
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        _this.dict.purchase_unit = v.data;
      }));
      _this.getPayTypeDict();
      _this.getCustomerDict();
    });
    this.toggleFullScreen = (0, _mobx.action)(function () {
      _this.fullScreen = !_this.fullScreen;
    });
    this.onValueChange = (0, _mobx.action)(function (key, value) {
      // console.log('valueChange-------')
      _this[key] = value;
      if (key === 'warehouse_id') {
        if (value == null || value === '') return;
        (0, _requests.getAddressByWarehouseId)(value).then((0, _mobx.action)(function (v) {
          if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
          var _v$data = v.data,
              provinceType = _v$data.provinceType,
              cityType = _v$data.cityType,
              districtType = _v$data.districtType,
              address = _v$data.address;

          _this.provinceId = provinceType;
          _this.getCity(provinceType);
          _this.cityId = cityType;
          _this.getDistrict(_this.cityId);
          _this.districtId = districtType;
          _this.deliverAddress = address;
        }));
      }
      if (key === 'provinceId') {
        // 省改变，获取市下拉数据，清除区下拉数据，市，区的值置空
        _this.getCity(value);
        _this.cityId = '';
        _this.dict.districtId = [];
        _this.districtId = '';
      }
      if (key === 'cityId') {
        // 市改变，获取区下拉数据，区的值置空
        _this.getDistrict(value);
        _this.districtId = '';
      }
    });
    this.onSave = (0, _mobx.action)(function () {
      _this.formRef.validate(function (valid) {
        if (!valid) return false;
        if (_this.detailData.some(function (row) {
          return !row.planSendDate;
        })) return _elementReact.Message.error('明细的预计交货日期不能为空！');
        var op = _this.flag === 'add' ? _requests.doCreate : _requests.doUpdate;
        var data = _this.flag === 'add' ? _this.saveData : _this.saveDataForEdit;
        return _elementReact.MessageBox.confirm('是否确认进行保存操作？', '提示', { type: 'info' }).then(function () {
          op(data).then((0, _mobx.action)(function (v) {
            if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
            _elementReact.Message.success('保存成功！');
            _this.resetWhenClose();
            _this.show = false;
            _this.refreshMainPageContent();
          }));
        });
      });
    });
    this.resetWhenClose = (0, _mobx.action)(function () {
      (0, _assign2.default)(_this, _this.initValue);
      (0, _assign2.default)(_this.details.gridModel, { rows: [], currentPage: 1, selectedKeyValues: [], expanded: {}, cashSelectedRows: [] });
      _this.details.deleteIds.clear();
      _this.details.mapSkuIdToId = {};
      _this.details.gridModel.resetHeaderCheckBox();
      _this.fullScreen = false;
    });
    this.refreshMainPageContent = (0, _mobx.action)(function () {
      // 刷新主页面数据
      var filterSet = _this.parent.cursorFilterSetModel;
      filterSet.onRefresh();
      var _filterSet$subTablesM = filterSet.subTablesModel,
          cursorTabModel = _filterSet$subTablesM.cursorTabModel,
          tabsFlag = _filterSet$subTablesM.tabsFlag;

      tabsFlag.searched = {}; // 重置查询标记
      cursorTabModel && cursorTabModel.onSearch(); // 查询当前subTable
    });
    this.onClose = (0, _mobx.action)(function () {
      _elementReact.MessageBox.confirm('未保存, 是否确认关闭?', '提示', { type: 'warning' }).then((0, _mobx.action)(function () {
        _this.resetWhenClose();
        _this.show = false;
      }));
    });
    this.getProvince = (0, _mobx.action)(function () {
      (0, _requests.getProvinceList)().then((0, _mobx.action)(function (v) {
        if (v.status === 'Failed' || v.status === 'redirected') return _elementReact.Message.error(v.data);
        _this.dict.provinceId = v;
      }));
    });
    this.getCity = (0, _mobx.action)(function (id) {
      (0, _requests.getCityList)(id).then((0, _mobx.action)(function (v) {
        if (v.status === 'Failed' || v.status === 'redirected') return _elementReact.Message.error(v.data);
        _this.dict.cityId = v;
      }));
    });
    this.getDistrict = (0, _mobx.action)(function (id) {
      return (0, _requests.getDistrictList)(id).then((0, _mobx.action)(function (v) {
        if (v.status === 'Failed' || v.status === 'redirected') return _elementReact.Message.error(v.data);
        _this.dict.districtId = v;
      }));
    });
    this.getPayTypeDict = (0, _mobx.action)(function () {
      (0, _requests.getPayTypeDict)().then((0, _mobx.action)(function (v) {
        if (v.status === 'Failed') return _elementReact.Message.error(v.data);
        _this.dict.payType = v.data;
      }));
    });
    this.getCustomerDict = (0, _mobx.action)(function () {
      (0, _requests.getCustomerDict)().then((0, _mobx.action)(function (v) {
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        _this.dict.customer = v.data;
      }));
    });
    this.showWhenAdd = (0, _mobx.action)(function () {
      _this.show = true;
      _this.flag = 'add';
      // this.details.setGridPager()
      _this.saleDate = new Date();
      if (_this.marsterWarehouse) {
        var _marsterWarehouse = _this.marsterWarehouse,
            id = _marsterWarehouse.id,
            provinceType = _marsterWarehouse.provinceType,
            cityType = _marsterWarehouse.cityType,
            districtType = _marsterWarehouse.districtType,
            address = _marsterWarehouse.address;

        _this.warehouse_id = id;
        _this.provinceId = provinceType;
        _this.getCity(provinceType);
        _this.cityId = cityType;
        _this.getDistrict(_this.cityId);
        _this.districtId = districtType;
        _this.deliverAddress = address;
      }
    });
    this.showWhenEdit = (0, _mobx.action)(function (row) {
      _this.show = true;
      _this.flag = 'edit';
      // this.details.setGridPager()
      var customer = row.customer,
          rest = (0, _objectWithoutProperties3.default)(row, ['customer']);

      (0, _assign2.default)(_this, (0, _extends3.default)({}, rest, { customer: _this.transformCustomerNameToId(customer) }));
      // console.log(row)
      _this.saleDate = row.saleDate && new Date(row.saleDate); // 日期
      if (_this.provinceId) _this.getCity(_this.provinceId); // 省市区
      if (_this.cityId) _this.getDistrict(_this.cityId);
      // 获取detail信息
      _this.details.onSearch();
    });
    this.addPayTypeDict = (0, _mobx.action)(function () {
      _elementReact.MessageBox.prompt('请输入结算方式名称', '自定义结算方式', {}).then(function (_ref) {
        var value = _ref.value;

        if (!value || /\s/.test(value)) {
          return (0, _elementReact.Message)({ type: 'error', message: '名称不能有空格，请重试' });
        }
        (0, _requests.addPayTypeDict)(value).then((0, _mobx.action)(function (v) {
          if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
          _elementReact.Message.success(v.data);
          _this.getPayTypeDict();
        }));
      });
    });
    this.addCustomerDict = (0, _mobx.action)(function () {
      _elementReact.MessageBox.prompt('请输入客户名称', '自定义客户', {}).then(function (_ref2) {
        var value = _ref2.value;

        if (!value || /\s/.test(value)) {
          return (0, _elementReact.Message)({ type: 'error', message: '名称不能有空格，请重试' });
        }
        (0, _requests.addCustomerDict)({ name: value }).then((0, _mobx.action)(function (v) {
          if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
          _elementReact.Message.success(v.data);
          _this.getCustomerDict();
        }));
      });
    });
    this.showMultiEditDialog = (0, _mobx.action)(function () {
      if (!_this.details.gridModel.selectedKeyValues.length) {
        return _elementReact.Message.error('请至少选择一行数据');
      }
      _this.multiEditModel.toggleShow();
    });
    this.deletePayTypeDict = (0, _mobx.action)(function (key) {
      // console.log('点击了叉号！')
      (0, _requests.deletePayTypeDict)(key).then((0, _mobx.action)(function (v) {
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        _elementReact.Message.success(v.data);
        _this.getPayTypeDict();
        // this.details.gridRef.forceUpdate()
      }));
    });
    this.deleteCustomerDict = (0, _mobx.action)(function (key) {
      // console.log('点击了叉号！')
      (0, _requests.deleteCustomerDict)(key).then((0, _mobx.action)(function (v) {
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        _elementReact.Message.success(v.data);
        _this.getCustomerDict();
        // this.details.gridRef.forceUpdate()
      }));
    });

    this.getDeptValueById = function (id) {
      var path = _this._dict.idPathMapOfDept[id];
      var dept = _this._dict.dept;

      if (!path) return [];
      return path.split('.').reduce(function (res, p) {
        var item = dept.find(function (el) {
          var arr = el.path.split('.');
          return arr[arr.length - 1] == p;
        });
        if (!item) return res;
        res.push(item.id);
        dept = item.children || [];
        return res;
      }, []);
    };

    this.formatDateToString = function (date) {
      var left = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(function (el) {
        return String(el).padStart(2, 0);
      }).join('-');
      var right = [date.getHours(), date.getMinutes(), date.getSeconds()].map(function (el) {
        return String(el).padStart(2, '0');
      }).join(':');
      var ret = left + ' ' + right;
      console.log('进行日期格式化，结果为：' + ret);
      return ret;
    };

    this.transformCustomerNameToId = function (name) {
      var item = _this._dict.customer.find(function (el) {
        return el.label === name;
      });
      return item ? item.value : name;
    };

    this.initValue = {
      id: '', // id，用于查询，不显示
      saleDate: new Date(), // 销售日期,必填
      customer: '',
      salesType: '', // 销售方式，下拉
      productType: '', // 商品类型
      payType: '', // 结算方式
      deliveryType: '',
      deliverAddress: '', // 收货地址
      provinceId: '', // 省
      cityId: '', // 市
      districtId: '', // 区
      remark: '', // 备注
      contractTerms: '' // 合同条款
    };
    (0, _mobx.extendObservable)(this, this.initValue);
    (0, _mobx.extendObservable)(this, (0, _extends3.default)({
      parent: {}, // FilterSetList
      flag: 'edit', // add/edit
      show: false,
      fullScreen: false,
      deptProps: { value: 'id', label: 'name', children: 'children' },
      details: {},
      formRef: {},
      get formData() {
        return JSON.parse((0, _stringify2.default)(this, (0, _keys2.default)(this.initValue)));
      },
      addGoodsModel: new _AddGoodsModel2.default({ top: this }),
      get mainData() {
        var main = JSON.parse((0, _stringify2.default)(this, (0, _keys2.default)(this.initValue)));
        main.saleDate = this.formatDateToString(new Date(main.saleDate));
        main.customer = main.customer || '';
        main.customer = this.dict.customer[main.customer] || main.customer;
        main.id = main.id + '';
        return main;
      },
      get detailData() {
        var _this2 = this;

        return this.details.gridModel._rows.map(function (el) {
          el = (0, _extends3.default)({}, el);

          el.planSendDate = el.planSendDate ? _this2.formatDateToString((0, _typeof3.default)(el.planSendDate) === 'object' ? el.planSendDate : new Date(el.planSendDate)) : '';

          el.customer = el.customer || '';
          el.customer = _this2.dict.customer[el.customer] || el.customer;

          (0, _keys2.default)(el).forEach(function (key) {
            // 去除null,转换为字符串
            el[key] = el[key] == null ? '' : el[key] + '';
          });

          return el;
        });
      },
      get saveData() {
        var _mainData = this.mainData,
            id = _mainData.id,
            main = (0, _objectWithoutProperties3.default)(_mainData, ['id']);

        return { saleOrder: main, saleOrderDetailList: this.detailData };
      },
      get saveDataForEdit() {
        var _this3 = this;

        var main = this.mainData;
        var newDetailList = this.detailData.filter(function (el) {
          return el.dataStatusForApi == 1;
        });
        var updateDetailList = this.detailData.filter(function (el) {
          return el.dataStatusForApi == 2;
        }).map(function (el) {
          // 只留可编辑的字段
          return _this3.details.editableFields.reduce(function (res, key) {
            res[key] = el[key];
            return res;
          }, {});
        });
        var deleteDetailIds = [].concat((0, _toConsumableArray3.default)(this.details.deleteIds)).map(function (skuId) {
          return _this3.details.mapSkuIdToId[skuId] + '';
        }).join(',');
        console.log('newDetailList:', newDetailList.slice(0), 'updateDetailList:', updateDetailList.slice(0), 'deleteDetailIds:', deleteDetailIds, 'allRowsStauts:', this.detailData.map(function (el) {
          return el.dataStatusForApi;
        }).slice(0), 'allRows:', this.detailData);
        return { saleOrder: main, newDetailList: newDetailList, updateDetailList: updateDetailList, deleteDetailIds: deleteDetailIds };
      },
      multiEditModel: new _MultiEditModel2.default({ top: this }),
      dict: {
        productType: [{ value: 1, label: '成品' }, { value: 2, label: '半成品' }, { value: 3, label: '原材料' }], // 商品类型，下拉
        provinceId: [], // 省
        cityId: [], // 市
        districtId: [], // 区
        purchase_unit: {}, // 采购单位,eg.{009002:[]}
        payType: {}, // 结算方式
        customer: {} // 客户 {"100001": "客户xxx" }
      },
      get _dict() {
        var _this4 = this;

        var _dict = this.dict,
            purchase_unit = _dict.purchase_unit,
            productType = _dict.productType,
            customer = _dict.customer;

        var objToOptions = function objToOptions(obj) {
          return (0, _keys2.default)(obj).map(function (value) {
            return { value: value, label: obj[value] };
          });
        };
        return {
          salesType: this.parent._dict.salesType,
          tradeSaleOrderType: this.parent._dict.tradeSaleOrderType,
          deliveryType: this.parent._dict.deliveryType,
          payType: (0, _keys2.default)(this.dict.payType).map(function (key) {
            return { value: key, label: _this4.dict.payType[key] };
          }),
          provinceId: this.dict.provinceId.map(function (_ref3) {
            var province_id = _ref3.province_id,
                province_name = _ref3.province_name;
            return { value: province_id, label: province_name };
          }),
          cityId: this.dict.cityId.map(function (_ref4) {
            var city_id = _ref4.city_id,
                city_name = _ref4.city_name;
            return { value: city_id, label: city_name };
          }),
          districtId: this.dict.districtId.map(function (_ref5) {
            var district_id = _ref5.district_id,
                district_name = _ref5.district_name;
            return { value: district_id, label: district_name };
          }),
          customer: objToOptions(customer),
          productType: productType,
          base_unit: (0, _keys2.default)(purchase_unit).reduce(function (res, cid) {
            var item = purchase_unit[cid].find(function (unit) {
              return unit.basic;
            });
            if (item) res.push({ label: item.unitName, value: item.id });
            return res;
          }, []),
          conversion_rate: (0, _keys2.default)(purchase_unit).reduce(function (res, cid) {
            purchase_unit[cid].reduce(function (res, unit) {
              res[unit.id] = unit.conversionRate;
              return res;
            }, res);
            return res;
          }, {})
        };
      }
    }, options || {}));
    this.details = new _OrderDetailModel2.default({ top: this });
    this.getAllDicts();
  }
  /**
   * actions
   */


  (0, _createClass3.default)(OrderModel, [{
    key: 'getTreeOptions',

    /**
     * utils
     */

    value: function getTreeOptions(data) {
      data = data ? data.slice(0) : [];
      var postData = [];

      if (data && data.length > 0) {
        if (!data[0].hasOwnProperty('pid')) {
          postData = data;
        } else {
          (function () {
            var transformData = {};

            data.forEach(function (item) {
              if (item.pid == null || item.pid === '' || item.isParent === 'true') {
                // item.children = [];
                postData.push(item);
              } else {
                // item.children = [];
                if (transformData[item.pid]) {
                  transformData[item.pid].push(item);
                } else {
                  transformData[item.pid] = [item];
                }
              }
            });

            var classData = postData;

            var _loop = function _loop() {
              var arr = [];
              classData.forEach(function (item) {
                if (transformData[item.id]) {
                  item.children = transformData[item.id];
                  arr = arr.concat(item.children || []);
                  delete transformData[item.id];
                }
              });

              if (arr.length === 0) {
                (0, _keys2.default)(transformData).map(function (item) {
                  console.log(item);
                  transformData[item].map(function (obj) {
                    postData.push(obj);
                  });
                });
                return 'break';
              } else {
                classData = arr;
              }
            };

            while ((0, _keys2.default)(transformData).length !== 0) {
              var _ret2 = _loop();

              if (_ret2 === 'break') break;
            }
          })();
        }
      }
      return postData;
    }
  }]);
  return OrderModel;
}();

exports.default = OrderModel;