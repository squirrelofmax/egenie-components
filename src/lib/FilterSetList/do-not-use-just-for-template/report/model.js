'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mobx = require('mobx');

var _elementReact = require('element-react');

var _Export = require('../../modules/ExportOrImport/Export/Export');

var _Tools = require('../../modules/Tools.js');

var _Tools2 = _interopRequireDefault(_Tools);

var _requests = require('./requests');

var _ImgFormatter = require('../../modules/ImgFormatter');

var _ImgFormatter2 = _interopRequireDefault(_ImgFormatter);

var _model = require('../../modules/FilterSetList/model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 模块
var _getConfig = (0, _requests.getConfig)();
// model

var WrapperOfFilterSetListModel = function (_FilterSetListModel) {
  (0, _inherits3.default)(WrapperOfFilterSetListModel, _FilterSetListModel);

  function WrapperOfFilterSetListModel(options) {
    (0, _classCallCheck3.default)(this, WrapperOfFilterSetListModel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (WrapperOfFilterSetListModel.__proto__ || (0, _getPrototypeOf2.default)(WrapperOfFilterSetListModel)).call(this));

    _this.api = { // 交给父类调用
      deleteScheme: _requests.deleteScheme
    };

    _this.getConfig = function () {
      _getConfig.then((0, _mobx.action)(function (v) {
        _this.getConfigOver = true; // 标记getConfig结束，assignFilterSetList要用到
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        console.log('getConfig的结果', v);
        var _v$data = v.data,
            item_list = _v$data.item_list,
            old_set = _v$data.old_set;

        _this.dict = (0, _extends3.default)({}, _this.dict, item_list);
        if (!old_set) return;
        // this.filterset.filters.config = this.filterset.filters.config.concat(old_set)
        _this.configOfFilterItems = _this.configOfFilterItems.concat(old_set);
        _this.assignFilterSetList(); // 定义于父类，作用是通过configOfFilterItems（定义与父类）生成filterSetList
      }));
    };

    _this.getFilterSetConfig = function () {
      return { // 非的filterset设置
        parent: _this,
        sliceFromIndex: 2, // 前两项固定
        hiddenOrderButton: false,
        filteritems: [{
          field: 'start_date',
          type: 'date',
          label: '日期',
          value: Date.now() - 30 * 24 * 3600 * 1000
        }, {
          field: 'end_date',
          type: 'date',
          label: '至',
          value: Date.now()
        }, {
          field: 'warehouse_id',
          type: 'select',
          label: '仓库',
          labelField: 'label',
          valueField: 'value',
          options: []
        }, {
          field: 'product_no',
          type: 'text',
          label: '商品编码'
        }, {
          field: 'product_name',
          type: 'text',
          label: '商品名称'
        }, {
          field: 'seller_outer_no',
          type: 'text',
          label: '商品货号'
        }, {
          field: 'sku_no',
          type: 'text',
          label: 'SKU编码'
        }, {
          field: 'bar_code',
          type: 'text',
          label: '条形码'
        }],
        reportList: _this.getReportList(),
        api: {
          queryData: function queryData() {}, // 因为是报表所以主表的queryData在report的配置里
          saveFilterSet: function saveFilterSet(data) {
            // 貌似保存顺序的接口跟这个是一样的，只是参数少了value那部分
            console.log('执行生成方案接口', 'data:', data);
            return (0, _requests.saveAsNewFilterset)(data);
          },
          onItemsChange: function onItemsChange(item, field, value, oldValue, key) {
            // filteritems的值改变的对外接口
            // console.log('执行onItemsChange方法','item:',item,'field:',field,'value:',value,'oldValue:',oldValue,'numbergroup组件的MinOrMax:',key)
            if ((field === 'start_date' || field === 'end_date') && !value) {
              item.value = oldValue;
              return _elementReact.Message.error('日期不可为空');
            }
          }
        }
      };
    };

    (0, _mobx.extendObservable)(_this, (0, _extends3.default)({
      dict: {
        warehouse: [{ value: 'check_date', label: '审核时间' }, { value: 'create_time', label: '入库时间' }]
      }, // 各种从后端获取的未处理数据
      get _dict() {
        // 对dict解析后的数据,filteritems中options都在这里找
        // 通过在FilterSetModel构造器中autorun(this.assignFilterOptions)实现了
        // 改变 _dict会自动改变filteritems中对应的options
        var warehouse = this.dict.warehouse;

        return {
          warehouse: warehouse
        };
      },
      isReport: true, // 报表页面
      filterSetList: []
    }, options || {}));

    // 调用请求接口iniit数据
    // this.getConfig()
    return _this;
  }

  /**
   * 调用请求接口iniit数据
   */

  /**
   * utils
   */
  // 父类中assembleFilterSetList方法会用到,TODO:主要工作量在这里


  (0, _createClass3.default)(WrapperOfFilterSetListModel, [{
    key: 'getReportList',
    value: function getReportList() {
      var _this2 = this;

      var tabs = [{ value: 'style', name: '按款式' }, { value: 'sku', name: '按SKU编码' }];
      var ret = {
        activeTab: 'sku',
        sumCards: [{
          field: 'real_arrival_num', // 用于获取值
          label: '销采到货', // 用于自定义label，没有就用列名
          ui: { icon: 'icon-share_stock' }, //
          value: 0
        }, {
          field: 'stock_in_num', // 用于获取值
          label: '备货入库', // 用于自定义label，没有就用列名
          ui: { icon: 'icon-share_stock' }, //
          value: 0
        }, {
          field: 'arrived_count', // 用于获取值
          label: '确认退货', // 用于自定义label，没有就用列名
          ui: { color: '#66c36b', icon: 'icon-share_stock' }, //
          value: 0
        }, {
          field: 'stock_out_num', // 用于获取值
          label: '采购退货出库', // 用于自定义label，没有就用列名
          ui: { color: '#66c36b', icon: 'icon-share_stock' }, //
          value: 0
        }],
        tabsFlag: {
          inited: tabs.reduce(function (a, b) {
            a[b.value] = b.value === 'sku';
            return a;
          }, {}),
          searched: tabs.reduce(function (a, b) {
            a[b.value] = false;
            return a;
          }, {})
        },
        list: [],
        showOtherTabs: false
      };
      var list = tabs.map(function (_ref) {
        var value = _ref.value,
            name = _ref.name;

        return {
          tab: { name: name, value: value },
          hiddenSubTables: true,
          api: {
            queryData: function queryData(data, tabValue, reportModel) {
              var cond = data.cond,
                  page = data.page,
                  pageSize = data.pageSize,
                  _data$sidx = data.sidx,
                  sidx = _data$sidx === undefined ? '' : _data$sidx,
                  _data$sord = data.sord,
                  sord = _data$sord === undefined ? '' : _data$sord;

              var group_by_key = tabValue === 'sku' ? 'sku_id' : 'product_id';
              cond = (0, _extends3.default)({}, cond); // 因为会对cond对象修改，所以还是不要影响到源数据
              cond.create_time_start = cond.start_date;
              cond.create_time_end = cond.end_date;
              cond.group_by_key = group_by_key;
              delete cond.start_date;
              delete cond.end_date;
              return (0, _requests.getList)('vo=' + (0, _stringify2.default)(cond) + '&page=' + page + '&pageSize=' + pageSize + '&sidx=' + sidx + '&sord=' + sord);
            },
            querySumCards: function querySumCards(data) {
              // 接口返回的data是{[field]:[sumValue]}
              var ret = (0, _requests.getTotalNums)(data);
              return ret;
            }
          },
          grid: {
            getDisplayRows: function getDisplayRows(rows) {
              return rows;
            },
            getColumns: function getColumns(reportModel) {
              return _this2.generateColumn(reportModel.tab.value);
            },
            columnsConfig: { type: '', getColumns: '' }, // 顺序，显示，宽度，最好的数据结构是[{key:xx,width:xx},{}],需要在grid的render方法中装配
            primaryKeyField: 'gridOrderNo',
            sumColumns: [],
            cashOn: true,
            sortAll: false,
            showCheckBox: true
          },
          getButtons: function getButtons(report) {
            return [{
              permissionId: '1',
              text: '导出',
              handleClick: function handleClick() {
                var cashRows = (report.gridModel.cashSelectedRows || []).map(function (_ref2) {
                  var mapOfFieldToEditedCellModel = _ref2.mapOfFieldToEditedCellModel,
                      rest = (0, _objectWithoutProperties3.default)(_ref2, ['mapOfFieldToEditedCellModel']);
                  return rest;
                });
                var exportProperties = {};
                exportProperties.dataIsComplete = true;
                var sheet_name = report.tab.value === 'sku' ? 'sku_sum_export' : 'product_sum_export';
                var group_by_key = report.tab.value === 'sku' ? 'sku_id' : 'product_id';
                var title = '商品汇总表导出';
                if (cashRows.length) {
                  _elementReact.MessageBox.confirm('确定导出选中的数据吗?', '提示', {
                    type: 'warning'
                  }).then(function () {
                    _Export.excelExport.exportData(sheet_name, title, cashRows);
                  }).catch(function () {
                    (0, _elementReact.Message)({
                      type: 'info',
                      message: '已取消导出'
                    });
                  });
                } else if (!cashRows.length) {
                  _elementReact.MessageBox.confirm('未选择数据将导出全部数据?', '提示', {
                    type: 'warning'
                  }).then(function () {
                    var _report$top$history = report.top.history,
                        cond = _report$top$history.cond,
                        rest = (0, _objectWithoutProperties3.default)(_report$top$history, ['cond']);

                    var create_time_start = cond.start_date,
                        create_time_end = cond.end_date,
                        _cond = (0, _objectWithoutProperties3.default)(cond, ['start_date', 'end_date']);

                    var params = (0, _extends3.default)({
                      vo: (0, _stringify2.default)((0, _extends3.default)({ create_time_start: create_time_start, create_time_end: create_time_end }, _cond, { group_by_key: group_by_key }))
                    }, rest);
                    var totalCount = report.gridModel.total;
                    console.log(totalCount);
                    console.log(params, 'params');
                    _Export.excelExport.exportUrl(sheet_name, title, '/api/productStatisticsController/getDetailNums', params, totalCount, exportProperties);
                  }).catch(function () {
                    (0, _elementReact.Message)({
                      type: 'info',
                      message: '已取消导出'
                    });
                  });
                }
              }
            }];
          }
        };
      });
      ret.list = list;
      return ret;
    }
  }, {
    key: 'generateColumn',
    value: function generateColumn() {
      var tab = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'sku';
      var report = arguments[1];

      var fixColumn = [{
        key: 'product_name',
        name: '商品名称',
        width: 370,
        resizable: true,
        draggable: true
      }, {
        key: 'product_no',
        name: '商品编码',
        width: 130,
        resizable: true,
        draggable: true
      }, {
        key: 'seller_outer_no',
        name: '商品货号',
        width: 130,
        resizable: true,
        draggable: true
      }, {
        key: 'pic',
        name: '图片',
        width: 90,
        resizable: true,
        draggable: true,
        formatter: _ImgFormatter2.default
      }, {
        key: 'sku_no',
        name: 'SKU编码',
        width: 130,
        resizable: true,
        draggable: true
      }, {
        key: 'bar_code',
        name: '条形码',
        width: 130,
        resizable: true,
        draggable: true
      }, {
        key: 'color_type',
        name: '颜色',
        width: 60,
        resizable: true,
        draggable: true
      }, {
        key: 'size_type',
        name: '尺码',
        width: 60,
        resizable: true,
        draggable: true
      }, {
        key: 'cost_price',
        name: '成本价',
        width: 60,
        resizable: true,
        draggable: true
      }, {
        key: 'warehouse_name',
        name: '仓库',
        width: 90,
        resizable: true,
        draggable: true
      }, {
        key: 'real_arrival_num',
        name: '销采到货',
        width: 90,
        resizable: true,
        draggable: true
      }, {
        key: 'stock_in_num',
        name: '备货入库',
        width: 90,
        resizable: true,
        draggable: true
      }, {
        key: 'arrived_count',
        name: '确认退货',
        width: 90,
        resizable: true,
        draggable: true
      }, {
        key: 'stock_out_num',
        name: '采购退货出库',
        width: 100,
        resizable: true,
        draggable: true
      }];

      if (tab === 'style') return fixColumn.filter(function (el) {
        return !~['sku_no', 'bar_code', 'color_type', 'size_type'].indexOf(el.key);
      });

      return fixColumn;
    }
  }]);
  return WrapperOfFilterSetListModel;
}(_model2.default);

exports.default = WrapperOfFilterSetListModel;