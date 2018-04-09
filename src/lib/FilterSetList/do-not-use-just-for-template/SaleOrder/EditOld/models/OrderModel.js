'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _elementReact = require('element-react');

var _requests = require('../requests');

var _requests2 = require('../../../../requests/requests');

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
    this.toggleFullScreen = (0, _mobx.action)(function () {
      _this.fullScreen = !_this.fullScreen;
    });
    this.onValueChange = (0, _mobx.action)(function (key, value) {
      // console.log('valueChange-------')
      _this[key] = value;
      if (key === 'warehouse_id') {
        if (value == null || value === '') return;
        (0, _requests.getAddressByWarehouseId)(value).then(function (v) {
          if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
          var _v$data = v.data,
              provinceType = _v$data.provinceType,
              cityType = _v$data.cityType,
              districtType = _v$data.districtType,
              address = _v$data.address;

          _this.province_id = provinceType;
          _this.getCity(provinceType);
          _this.city_id = cityType;
          _this.getDistrict(_this.city_id);
          _this.district_id = districtType;
          _this.deliver_address = address;
        });
      }
      if (key === 'province_id') {
        // 省改变，获取市下拉数据，清除区下拉数据，市，区的值置空
        _this.getCity(value);
        _this.city_id = '';
        _this.dict.district_id = [];
        _this.district_id = '';
      }
      if (key === 'city_id') {
        // 市改变，获取区下拉数据，区的值置空
        _this.getDistrict(value);
        _this.district_id = '';
      }
    });
    this.onSave = (0, _mobx.action)(function () {
      if (_this.flag === 'add') {
        if (_this.saveData.detailNewList.some(function (row) {
          return !row.plan_arrival_date;
        })) return _elementReact.Message.error('明细的预计到货日期不能为空！');
        if (_this.saveData.detailNewList.some(function (row) {
          return !row.base_unit_id;
        })) return _elementReact.Message.error('明细的基本计量单位不能为空！');
        return _elementReact.MessageBox.confirm('是否确认进行保存操作？', '提示', { type: 'info' }).then(function () {
          (0, _requests.savePurchaseOrder)(_this.saveData).then(function (v) {
            if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
            _elementReact.Message.success('保存成功！');
            _this.resetWhenClose();
            _this.show = false;
            _this.refreshMainPageContent();
          });
        });
      }

      // 修改时，保存主表信息
      var data = (0, _extends3.default)({}, _this.saveData);
      delete data.detailNewList;
      delete data.organization_id;

      (0, _requests.updatePurchaseOrderMain)(_this.pms_purchase_order_id, data).then(function (v) {
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        _this.resetWhenClose();
        _this.show = false;
        _this.refreshMainPageContent();
      });
    });
    this.resetWhenClose = (0, _mobx.action)(function () {
      (0, _assign2.default)(_this, _this.initValue);
      (0, _assign2.default)(_this.details.gridModel, { rows: [], currentPage: 1, selectedKeyValues: [], expanded: {}, cashSelectedRows: [] });
      _this.fullScreen = false;
    });
    this.refreshMainPageContent = (0, _mobx.action)(function () {
      // 刷新主页面数据
      var filterSet = _this.parent.cursorFilterSetModel;
      filterSet.handleRefresh();
      var _filterSet$subTableLi = filterSet.subTableListModel,
          cursorTabModel = _filterSet$subTableLi.cursorTabModel,
          tabsFlag = _filterSet$subTableLi.tabsFlag;

      tabsFlag.searched = {}; // 重置查询标记
      cursorTabModel && cursorTabModel.onSearch(); // 查询当前subTable
    });
    this.onClose = (0, _mobx.action)(function () {
      _elementReact.MessageBox.confirm('未保存, 是否确认关闭?', '提示', { type: 'warning' }).then(function () {
        _this.resetWhenClose();
        _this.show = false;
      });
    });
    this.getProvince = (0, _mobx.action)(function () {
      (0, _requests2.getProvinceList)().then(function (v) {
        _this.dict.province_id = v;
      });
    });
    this.getCity = (0, _mobx.action)(function (id) {
      (0, _requests2.getCityList)(id).then(function (v) {
        _this.dict.city_id = v;
      });
    });
    this.getDistrict = (0, _mobx.action)(function (id) {
      return (0, _requests2.getDistrictList)(id).then(function (v) {
        _this.dict.district_id = v;
      });
    });
    this.getPayTypeDict = (0, _mobx.action)(function () {
      (0, _requests.getPayTypeDict)().then(function (v) {
        if (v.status === 'Failed') return _elementReact.Message.error(v.data);
        _this.dict.pay_type = v.data;
      });
    });
    this.showWhenAdd = (0, _mobx.action)(function () {
      _this.show = true;
      _this.flag = 'add';
      // this.details.setGridPager()
      _this.purchase_date = new Date();
      if (_this.marsterWarehouse) {
        var _marsterWarehouse = _this.marsterWarehouse,
            id = _marsterWarehouse.id,
            provinceType = _marsterWarehouse.provinceType,
            cityType = _marsterWarehouse.cityType,
            districtType = _marsterWarehouse.districtType,
            address = _marsterWarehouse.address;

        _this.warehouse_id = id;
        _this.province_id = provinceType;
        _this.getCity(provinceType);
        _this.city_id = cityType;
        _this.getDistrict(_this.city_id);
        _this.district_id = districtType;
        _this.deliver_address = address;
      }
    });
    this.showWhenEdit = (0, _mobx.action)(function (row) {
      _this.show = true;
      _this.flag = 'edit';
      // this.details.setGridPager()
      (0, _assign2.default)(_this, row);
      // console.log(row)
      _this.organization_id = _this.getDeptValueById(row.organization_id);
      _this.purchase_date = row.purchase_date && new Date(row.purchase_date); // 日期
      if (_this.province_id) _this.getCity(_this.province_id); // 省市区
      if (_this.city_id) _this.getDistrict(_this.city_id);
      // 获取detail信息
      _this.details.onSearch();
    });
    this.addPayTypeDict = (0, _mobx.action)(function () {
      _elementReact.MessageBox.prompt('请输入结算方式名称', '自定义结算方式', {}).then(function (_ref) {
        var value = _ref.value;

        if (!value || /\s/.test(value)) {
          return (0, _elementReact.Message)({ type: 'error', message: '名称不能有空格，请重试' });
        }
        (0, _requests.addPayTypeDict)(value).then(function (v) {
          if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
          _elementReact.Message.success(v.data);
          _this.getPayTypeDict();
        });
      });
    });
    this.showMultiEditDialog = (0, _mobx.action)(function () {
      if (!_this.details.gridModel.selectedKeyValues.length) {
        return _elementReact.Message.error('请至少选择一行数据');
      }
      _this.multiEditModel.toggleShow();
      var rows = _this.details.gridModel.rows;

      var onlyIdKey = _this.flag === 'add' ? 'onlyId' : 'pms_purchase_order_detail_id';
      var _rows = _this.details.gridModel.selectedKeyValues.map(function (onlyId) {
        return rows.find(function (row) {
          return row[onlyIdKey] === onlyId;
        });
      });
      // 获取公共供货商
      (0, _requests.findCommonVendorBySkuIds)({ skuIds: [].concat((0, _toConsumableArray3.default)(new _set2.default(_rows.map(function (el) {
          return el.sku_id;
        })))).join(',') }).then(function (v) {
        if (v.status !== 'Successful') {
          _this.dict.commonVendor = {};
          return _elementReact.Message.error(v.data);
        }
        _this.dict.commonVendor = v.data;
      });

      // 判断采购单位的下拉选项
      var puids = _rows.map(function (row) {
        return row.purchase_unit_id;
      }); // 获取所有的采购单位id
      var getUnitCategoryByUnitId = _this.details.getUnitCategoryByUnitId;

      var categorys = puids.map(function (unitid) {
        return getUnitCategoryByUnitId(unitid);
      }).filter(function (c) {
        return c;
      }); // 转换为种类，并忽略所有无种类的
      if (!categorys.length) {
        return _this.multiEditModel.purchase_unit_options_key = 'all';
      } // 全为无种类的则为所有种类
      var res = [].concat((0, _toConsumableArray3.default)(new _set2.default(categorys))); // 去重
      if (res.length === 1) {
        return _this.multiEditModel.purchase_unit_options_key = res[0];
      } // 单个种类，则下拉为此种类的

      _this.multiEditModel.purchase_unit_options_key = 'none'; // 多个种类，则下拉为空
      _elementReact.Message.warning('某些选中行的采购单位互相不兼容，无法批量修改采购单位');
    });
    this.deletePayTypeDict = (0, _mobx.action)(function (key) {
      // console.log('点击了叉号！')
      (0, _requests.deletePayTypeDict)(key).then(function (v) {
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        _elementReact.Message.success(v.data);
        _this.getPayTypeDict();
        // this.details.gridRef.forceUpdate()
      });
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
      var left = date.toLocaleDateString().split('/').map(function (el) {
        return el.padStart(2, '0');
      }).join('-');
      var right = [date.getHours(), date.getMinutes(), date.getSeconds()].map(function (el) {
        return String(el).padStart(2, '0');
      }).join(':');
      var ret = left + ' ' + right;
      console.log('进行日期格式化，结果为：' + ret);
      return ret;
    };

    this.initValue = {
      pms_purchase_order_id: '', // id，用于查询，不显示
      pms_purchase_order_no: '', // 采购单号
      purchase_date: new Date(), // 采购日期,必填
      purchase_order_type_code: '0', // 采购订单类型，下拉
      product_type_code: '', // 商品类型，下拉
      vendor_id: '', // 供应商,下拉
      warehouse_id: '', // 仓库，下拉
      sales_type: '', // 销售方式，下拉
      pay_type: '', // 结算方式
      deliver_address: '', // 收货地址
      province_id: '', // 省
      city_id: '', // 市
      district_id: '', // 区
      remarks: '', // 备注
      contract_terms: '', // 合同条款
      organization_id: [] // 组织部门
    };
    (0, _mobx.extendObservable)(this, this.initValue);
    (0, _mobx.extendObservable)(this, (0, _extends3.default)({
      parent: {}, // FilterSetList
      id: _shortid2.default.generate(),
      flag: 'edit', // add/edit
      show: false,
      fullScreen: false,
      deptProps: { value: 'id', label: 'name', children: 'children' },
      details: {},
      get formData() {
        return JSON.parse((0, _stringify2.default)(this, (0, _keys2.default)(this.initValue)));
      },
      addGoodsModel: new _AddGoodsModel2.default({ top: this }),
      get saveData() {
        var main = JSON.parse((0, _stringify2.default)(this, (0, _keys2.default)(this.initValue)));
        main.purchase_order_type = main.purchase_order_type_code;
        main.product_type = main.product_type_code;
        delete main.purchase_order_type_code;
        delete main.product_type_code;
        main.purchase_date = this.formatDateToString(new Date(main.purchase_date));
        var reg = /_code$/;
        var detail = this.details.gridModel._rows.map(function (el) {
          el = (0, _extends3.default)({}, el);
          (0, _keys2.default)(el).forEach(function (key) {
            // 清除所有code
            delete el.is_usable_code;
            delete el.is_usable;
            delete el.version;
            delete el.conversion_rate;
            delete el.purchase_num;
            el[key] = el[key] == null ? '' : el[key];
            if (reg.test(key)) {
              el[key.replace(reg, '')] = el[key];
              delete el[key];
            }
          });
          el.organization_id = el.organization_id.length ? el.organization_id[el.organization_id.length - 1] : '';
          el.plan_arrival_date = el.plan_arrival_date ? ((0, _typeof3.default)(el.plan_arrival_date) === 'object' ? el.plan_arrival_date : new Date(el.plan_arrival_date)).toLocaleDateString().split('/').map(function (el) {
            return el.padStart(2, '0');
          }).join('-') : '';
          return el;
        });
        return (0, _extends3.default)({}, main, { detailNewList: detail });
      },
      multiEditModel: new _MultiEditModel2.default({ top: this }),
      dict: {
        purchase_order_type: [], // 采购订单类型，下拉
        product_type: [], // 商品类型，下拉
        vendor_id: {}, // 供应商,下拉
        warehouse_id: [], // 仓库，下拉
        sales_type: [], // 销售方式，下拉
        province_id: [], // 省
        city_id: [], // 市
        district_id: [], // 区
        purchase_unit: {}, // 采购单位,eg.{009002:[]}
        pay_type: {}, // 结算方式
        filterVendorById: {}, // 过滤后的vendor字典项，eg,10001:{}--//改了，10001:[{供应商1的信息},{供应商2的信息}]
        commonVendor: {}, // 批量修改页面要用到的vendor字典项{"2000021": "A100_F2_A002"}
        dept: []
      },
      get _dict() {
        var _this2 = this;

        var _dict = this.dict,
            filterVendorById = _dict.filterVendorById,
            purchase_unit = _dict.purchase_unit,
            dept = _dict.dept;

        var all = (0, _keys2.default)(purchase_unit).reduce(function (res, cid) {
          return res.concat(purchase_unit[cid].map(function (unit) {
            return { value: unit.id, label: unit.unitName };
          }));
        }, []);

        return {
          sales_type: this.dict.sales_type.map(function (el) {
            return { value: el.code, label: el.name };
          }),
          warehouse_id: this.dict.warehouse_id.map(function (el) {
            return { value: el.warehouse_id, label: el.warehouse_name };
          }),
          vendor_id: (0, _keys2.default)(this.dict.vendor_id).map(function (key) {
            return { label: key, value: _this2.dict.vendor_id[key] };
          }),
          purchase_unit: (0, _keys2.default)(purchase_unit).reduce(function (res, cid) {
            res[cid] = purchase_unit[cid].map(function (unit) {
              return { value: unit.id, label: unit.unitName };
            });
            return res;
          }, { all: all, none: [] }),
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
          }, {}),
          filterVendorById: (0, _keys2.default)(this.dict.filterVendorById).reduce(function (res, id) {
            res[id] = filterVendorById[id].map(function (_ref2) {
              var id = _ref2.id,
                  vendorName = _ref2.vendorName,
                  purchaserId = _ref2.purchaserId;
              return { value: id, label: vendorName, purchaserId: purchaserId == null ? '' : purchaserId };
            });
            return res;
          }, {}),
          pay_type: (0, _keys2.default)(this.dict.pay_type).map(function (key) {
            return { value: key, label: _this2.dict.pay_type[key] };
          }),
          dept: this.getTreeOptions(dept),
          idPathMapOfDept: dept.reduce(function (res, obj) {
            res[obj.id] = obj.path;
            return res;
          }, {})
        };
      }
    }, options || {}));
    setTimeout(function () {
      _this.dict.sales_type = [{ code: '0', name: '普通采购' }, { code: '3', name: '采购退货' }];
    }, 10000);
    this.details = new _OrderDetailModel2.default({ top: this });
    this.getProvince();
    (0, _requests2.getWarehouse)().then(function (v) {
      if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
      _this.dict.warehouse_id = v.data;
    });
    (0, _requests2.getVendorDict)().then(function (v) {
      if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
      _this.dict.vendor_id = v.data;
    });
    (0, _requests2.getDictList)('product_type').then(function (v) {
      if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
      _this.dict.product_type = v.data;
    });
    (0, _requests2.getDictList)('sales_type').then(function (v) {
      if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
      _this.dict.sales_type = v.data;
    });
    (0, _requests2.getPurchaseUnitDict)().then(function (v) {
      if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
      _this.dict.purchase_unit = v.data;
    });
    (0, _requests.findMasterWarehouse)().then(function (v) {
      if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
      _this.marsterWarehouse = v.data;
    });
    (0, _requests2.getAllDept)().then(function (v) {
      if (v.status === 'Failed') return _elementReact.Message.error(v.data);
      _this.dict.dept = v || [];
    });
    this.getPayTypeDict();
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