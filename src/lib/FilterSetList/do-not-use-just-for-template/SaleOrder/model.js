'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _elementReact = require('element-react');

var _requests = require('./requests');

var _ImgFormatter = require('@/utils/EgGrid/ImgFormatter');

var _ImgFormatter2 = _interopRequireDefault(_ImgFormatter);

var _TimeStampFormatter = require('@/utils/EgGrid/TimeStampFormatter');

var _TimeStampFormatter2 = _interopRequireDefault(_TimeStampFormatter);

var _EditedCellFormatter = require('@/utils/EgGrid/EditedCellFormatter');

var _model = require('@/utils/FilterSetList/model');

var _model2 = _interopRequireDefault(_model);

var _OrderModel = require('./Edit/models/OrderModel');

var _OrderModel2 = _interopRequireDefault(_OrderModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// model
var _getConfig = (0, _requests.getConfig)();

// 模块

var WrapperOfFilterSetListModel = function (_FilterSetListModel) {
  (0, _inherits3.default)(WrapperOfFilterSetListModel, _FilterSetListModel);

  function WrapperOfFilterSetListModel(options) {
    (0, _classCallCheck3.default)(this, WrapperOfFilterSetListModel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (WrapperOfFilterSetListModel.__proto__ || (0, _getPrototypeOf2.default)(WrapperOfFilterSetListModel)).call(this));

    _initialiseProps.call(_this);

    (0, _mobx.extendObservable)(_this, (0, _extends3.default)({
      dict: {
        isChecked: [{ value: '0', label: '未审核' }, { value: '1', label: '已审核' }],
        confirmed_status: [],
        delivery_type: [],
        is_close: [],
        purchase_order_type: [],
        sales_type: [],
        send_status: [],
        trade_sale_order_type: []
      }, // 各种从后端获取的未处理数据
      get _dict() {
        // 对dict解析后的数据,filteritems中options都在这里找
        // 通过在FilterSetModel构造器中autorun(this.assignFilterOptions)实现了
        // 改变 _dict会自动改变filteritems中对应的options
        var _dict = this.dict,
            isChecked = _dict.isChecked,
            confirmed_status = _dict.confirmed_status,
            delivery_type = _dict.delivery_type,
            is_close = _dict.is_close,
            purchase_order_type = _dict.purchase_order_type,
            sales_type = _dict.sales_type,
            send_status = _dict.send_status,
            trade_sale_order_type = _dict.trade_sale_order_type;

        var util = function util(obj) {
          return (0, _keys2.default)(obj).map(function (value) {
            return { value: value, label: obj[value] };
          });
        };
        return {
          isChecked: isChecked,
          confirmedStatus: util(confirmed_status),
          deliveryType: util(delivery_type),
          isClose: util(is_close),
          purchaseOrderType: util(purchase_order_type),
          salesType: util(sales_type),
          sendStatus: util(send_status),
          tradeSaleOrderType: util(trade_sale_order_type)
        };
      },
      isReport: false, // 报表页面
      filterSetList: [],
      editDialog: {}
    }, options || {}));

    _this.editDialog = new _OrderModel2.default({ parent: _this });
    // 调用请求接口iniit数据
    _this.getConfig();
    _this.getDictsByTypes();
    // const o = observable
    // debugger
    return _this;
  }

  /**
   * 调用请求接口iniit数据
   */

  /**
   * utils
   */

  // 父类中assembleFilterSetList方法会用到,TODO:主要工作量在这里

  /**
   供getFilterSetConfig调用的比较长的utils
   */

  /**
   * actions
   */

  return WrapperOfFilterSetListModel;
}(_model2.default);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.api = { // 交给父类调用
    deleteScheme: _requests.deleteScheme
  };

  this.getConfig = function () {
    _getConfig.then((0, _mobx.action)(function (v) {
      _this2.getConfigOver = true; // 标记getConfig结束，assignFilterSetList要用到
      if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
      console.log('getConfig的结果', v);
      var _v$data = v.data,
          item_list = _v$data.item_list,
          old_set = _v$data.old_set;

      _this2.dict = (0, _extends3.default)({}, _this2.dict, item_list);
      if (!old_set) return;
      _this2.configOfFilterItems = _this2.configOfFilterItems.concat(old_set);
      _this2.assignFilterSetList(); // 定义于父类，作用是通过configOfFilterItems（定义与父类）生成filterSetList
    }));
  };

  this.getDictsByTypes = (0, _mobx.action)(function () {
    if (!_this2.getDictsByTypes.cache) _this2.getDictsByTypes.cache = (0, _requests.getDictsByTypes)('is_close,confirmed_status,delivery_type,sales_type,send_status,trade_sale_order_type,purchase_order_type');
    _this2.getDictsByTypes.cache.then((0, _mobx.action)(function (v) {
      if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
      (0, _assign2.default)(_this2.dict, v.data);
    }));
  });

  this.getFilterSetConfig = function () {
    return { // 非的filterset设置
      parent: _this2,
      sliceFromIndex: 3, // 前三项filteritem固定
      hiddenOrderButton: false,
      filteritems: _this2.getFilteritems(),
      grid: _this2.getGrid(),
      getButtons: _this2.getButtons, // 获取buttons配置的接口，传进去在FilterSetModel构造器中调用，调用时会把FilterSetModel的实例传进来当参数
      api: _this2.getApi(),
      subTables: _this2.getSubTables()
    };
  };

  this.getFilteritems = function () {
    return [{
      field: 'dateType',
      type: 'select',
      label: '日期类型',
      labelField: 'label',
      valueField: 'value',
      clearable: false,
      value: 'createdAt',
      display_sequence: 0,
      options: [{
        value: 'createdAt',
        label: '创建时间'
      }, {
        value: 'checkedTime',
        label: '审核时间'
      }, {
        value: 'closeTime',
        label: '关闭时间'
      }]
    }, {
      field: 'dateValueStart',
      type: 'date',
      label: '日期',
      display_sequence: 1
    }, {
      field: 'dateValueEnd',
      type: 'date',
      label: '至',
      display_sequence: 2,
      hiddenColon: true,
      labelStyle: {
        justifyContent: 'center'
      }
    }, {
      field: 'isChecked',
      type: 'select',
      label: '审核状态',
      labelField: 'label',
      valueField: 'value',
      options: []
    }, {
      field: 'isClose',
      type: 'select',
      label: '关闭状态',
      labelField: 'label',
      valueField: 'value',
      options: []
    }, {
      field: 'customer',
      type: 'text',
      label: '客户'
    }, {
      field: 'pmsPurchaseOrderNo',
      type: 'text',
      label: '采购单号'
    }, {
      field: 'tradeSaleOrderNo',
      type: 'text',
      label: '销售单号',
      labelField: 'label',
      valueField: 'value'
    }, {
      field: 'salesType',
      type: 'select',
      label: '销售方式',
      labelField: 'label',
      valueField: 'value',
      options: []
    }, {
      field: 'tradeSaleOrderType',
      type: 'select',
      label: '订单类型',
      labelField: 'label',
      valueField: 'value',
      options: []
    }, {
      field: 'deliveryType',
      type: 'select',
      label: '交货方式',
      labelField: 'label',
      valueField: 'value',
      options: []
    },
    // // {
    // //   field: 'payTypeName',
    // //   type: 'select',
    // //   label: '结算方式',
    // //   labelField: 'label',
    // //   valueField: 'value',
    // //   options: []
    // // },
    {
      field: 'erpProductNo',
      type: 'text',
      label: '商品编码'
    }, {
      field: 'erpSkuNo',
      type: 'text',
      label: 'SKU编码'
    }, {
      field: 'sendStatus',
      type: 'select',
      label: '整单送货',
      labelField: 'label',
      valueField: 'value',
      options: []
    }, {
      field: 'ZJE',
      type: 'numbergroup',
      label: '总金额'
    }, {
      field: 'ZSL',
      type: 'numbergroup',
      label: '总数量'
    }];
  };

  this.getGrid = function () {
    return {
      getColumns: _this2.getColumns, // 获取columns配置的接口，传进去在FilterSetModel构造器中调用，调用时会把FilterSetModel的实例传进来当参数
      _class: '', // 设置Grid最外层div的class
      interceptorOfRows: _this2.getInterceptor(),
      getDisplayRows: function getDisplayRows(rows) {
        // 对rows的加工接口，返回的是最终展示出来的数据，另外如果要加可编辑单元格要在此给每个row装配对应单元格的model
        return rows;
      },
      columnsConfig: null, // 顺序，显示，宽度，最好的数据结构是[{key:xx,width:xx},{}],需要在grid的render方法中装配
      primaryKeyField: 'id', // checkBox列用到，数据的id
      sumColumns: [], // 表格底部统计行
      cashOn: true, // 主表要加cashRows以控制按钮显隐，还有把cashRows作为数据传给对应后端接口，即只要有按钮执行批量操作，且是分页的，就必须cashOn：true
      sortAll: true, // 一般都是true，即通过后端接口进行排序
      showCheckBox: true // 一般都是true，除非是report的那种纯展示表格
    };
  };

  this.getInterceptor = function () {
    return {
      config: [{
        field: 'deliveryType',
        getOptions: '_dict.deliveryType',
        isDisabled: function isDisabled(cell) {
          var _cell$rawRow = cell.rawRow,
              isMultiApprove = _cell$rawRow.isMultiApprove,
              confirmedStatus = _cell$rawRow.confirmedStatus,
              isChecked = _cell$rawRow.isChecked,
              isClose = _cell$rawRow.isClose;

          var flag = isChecked || isClose == 1 || isClose == 2 || isClose == 3 || isClose == 5; // 已审核或已关闭
          return flag || isMultiApprove && (confirmedStatus == 1 || confirmedStatus == 2); // 如果未审核且未关闭，那么只有当多级审批时，还有可能disabled，即已确认。
        },
        getClass: function getClass() {
          return 'ejl-grid-cell--align-center-when-disabled';
        }
      }],
      context: _this2
    };
  };

  this.getColumns = function (filterset) {
    // const that = filterset
    // const SelectFormatter = getSelectFormatter(that)
    return [{
      key: 'operation',
      width: 77,
      name: '操作',
      locked: true,
      formatter: function formatter(_ref) {
        var value = _ref.value,
            dependentValues = _ref.dependentValues;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'left' } },
          _react2.default.createElement(
            _elementReact.Button,
            { style: { display: dependentValues.isChecked == 1 || dependentValues.isClose == 1 ? 'none' : '' }, type: 'text', size: 'small',
              onClick: function onClick() {
                console.log('点击了行内编辑按钮');
                _this2.editDialog.showWhenEdit(dependentValues);
              } },
            '\u7F16\u8F91'
          ),
          _react2.default.createElement(
            _elementReact.Button,
            { style: { display: dependentValues.isChecked == 1 || dependentValues.isClose == 1 ? 'none' : '' }, type: 'text', size: 'small',
              onClick: function onClick() {
                _elementReact.MessageBox.confirm('彻底删除后数据将无法恢复，您确定要删除吗？', '提示', { type: 'info' }).then(function () {
                  var id = dependentValues.id;
                  (0, _requests.deleteSaleOrder)(id).then(function (v) {
                    if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
                    _elementReact.Message.success('删除完成');
                    var _cursorFilterSetModel = _this2.cursorFilterSetModel,
                        onRefresh = _cursorFilterSetModel.onRefresh,
                        resetWhenDeleteCursorRowOfMainGrid = _cursorFilterSetModel.subTablesModel.resetWhenDeleteCursorRowOfMainGrid;

                    onRefresh();
                    resetWhenDeleteCursorRowOfMainGrid(id);
                  });
                });
              } },
            '\u5220\u9664'
          )
        );
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'customer',
      name: '客户',
      width: 100,
      resizable: true,
      draggable: true
    }, {
      key: 'isChecked',
      name: '审核状态',
      width: 70,
      resizable: true,
      draggable: true,
      formatter: (0, _mobxReact.observer)(function (_ref2) {
        var value = _ref2.value;

        var options = _this2._dict['isChecked'];
        var item = options && options.find(function (el) {
          return el.value == value;
        });
        var displayValue = item ? item.label : value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', marginLeft: '-8px' } },
          displayValue
        );
      })
    }, {
      key: 'isClose',
      name: '关闭状态',
      width: 70,
      resizable: true,
      draggable: true,
      formatter: (0, _mobxReact.observer)(function (_ref3) {
        var value = _ref3.value;

        var options = _this2._dict['isClose'];
        var item = options && options.find(function (el) {
          return el.value == value;
        });
        var displayValue = item ? item.label : value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', marginLeft: '-8px', color: value == 2 ? 'red' : '#000' } },
          displayValue
        );
      })
    }, {
      key: 'pmsPurchaseOrderNo',
      name: '采购单据编号',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'tradeSaleOrderNo',
      name: '销售单据编号',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'tradeSaleOrderType',
      name: '销售订单类型',
      width: 90,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: (0, _mobxReact.observer)(function (_ref4) {
        var value = _ref4.value;

        var options = _this2._dict['tradeSaleOrderType'];
        var item = options && options.find(function (el) {
          return el.value == value;
        });
        var displayValue = item ? item.label : value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', marginLeft: '-8px' } },
          displayValue
        );
      })
    }, {
      key: 'salesType',
      name: '销售方式',
      width: 70,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: (0, _mobxReact.observer)(function (_ref5) {
        var value = _ref5.value;

        var options = _this2._dict['salesType'];
        var item = options && options.find(function (el) {
          return el.value == value;
        });
        var displayValue = item ? item.label : value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', marginLeft: '-8px' } },
          displayValue
        );
      })
    }, {
      key: 'deliveryType',
      name: '交货方式',
      width: 190,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: function formatter(_ref6) {
        var mapOfFieldToEditedCellModel = _ref6.dependentValues.mapOfFieldToEditedCellModel;
        return _react2.default.createElement(_EditedCellFormatter.SelectFormatter, { store: mapOfFieldToEditedCellModel['deliveryType'] });
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    },
    // {
    //   key: 'payTypeName',
    //   name: '结算方式',
    //   width: 70,
    //   resizable: true,
    //   draggable: true,
    //   sortable: true
    // },
    {
      key: 'provinceName',
      name: '省',
      width: 80,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'cityName',
      name: '市',
      width: 80,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'districtName',
      name: '区',
      width: 80,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'deliverAddress',
      name: '送货地址',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'remark',
      name: '备注',
      width: 150,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'checkerName',
      name: '审核人',
      width: 80,
      resizable: true,
      draggable: true,
      sortable: true
    }, {
      key: 'createdAt',
      name: '创建时间',
      width: 130,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: _TimeStampFormatter2.default
    }, {
      key: 'checkedTime',
      name: '审核时间',
      width: 130,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: _TimeStampFormatter2.default
    }, {
      key: 'closeTime',
      name: '关闭时间',
      width: 130,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: _TimeStampFormatter2.default
    }, {
      key: 'sendStatus',
      name: '整单送货完成',
      width: 90,
      resizable: true,
      draggable: true,
      sortable: true,
      formatter: (0, _mobxReact.observer)(function (_ref7) {
        var value = _ref7.value;

        var options = _this2._dict['sendStatus'];
        var item = options && options.find(function (el) {
          return el.value == value;
        });
        var displayValue = item ? item.label : value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', marginLeft: -8 } },
          displayValue
        );
      })
    }, {
      key: 'totalSaleAmount',
      name: '销售总金额',
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
      key: 'totalSaleNum',
      name: '销售总数量',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref9) {
        var value = _ref9.value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'right' } },
          value
        );
      }
    }];
  };

  this.getButtons = function (filterset) {
    return [{
      text: '新建',
      handleClick: function handleClick() {
        console.log('点击了新建按钮');
        _this2.editDialog.showWhenAdd();
      },
      icon: 'icon-add',
      display: function display(rows) {
        return rows.every(function (el) {
          return true;
        });
      }
    }, {
      permissionId: '21',
      text: '审核',
      icon: 'icon-audit',
      handleClick: function handleClick() {
        console.log('点击了审核按钮');
        var tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',');
        if (!tradeSaleOrderIds) return _elementReact.Message.error('请先选中一行或多行！');
        _elementReact.MessageBox.confirm('是否确认进行审核操作?', '提示', { type: 'info' }).then(function () {
          (0, _requests.checkSaleOrder)({ tradeSaleOrderIds: tradeSaleOrderIds }).then((0, _mobx.action)(function (v) {
            if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
            filterset.gridModel.cashSelectedRows.forEach(function (el) {
              el.isChecked = 1;
            });
            filterset.onRefresh();
            return _elementReact.Message.success(v.data);
          }));
        });
      },
      display: function display(rows) {
        return rows.every(function (el) {
          if (!el.isMultiApprove) {
            // 不是多级审批。。。未关闭，未审核
            return (!el.isClose || el.isClose == 4) && !el.isChecked;
          }
          // 是多级审批，并且采购商已经同意配货，。。。未关闭，未审核
          return el.confirmedStatus == 2 && (!el.isClose || el.isClose == 4) && !el.isChecked;
        });
      },
      group: [{
        idx: 0,
        permissionId: '29',
        text: '反审核',
        icon: 'icon-audit',
        handleClick: function handleClick() {
          console.log('点击了反审核按钮');
          var tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',');
          if (!tradeSaleOrderIds) return _elementReact.Message.error('请先选中一行或多行！');
          _elementReact.MessageBox.confirm('是否确认进行反审核操作?', '提示', { type: 'info' }).then(function () {
            (0, _requests.recheckSaleOrder)({ tradeSaleOrderIds: tradeSaleOrderIds }).then((0, _mobx.action)(function (v) {
              if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
              filterset.gridModel.cashSelectedRows.forEach(function (el) {
                el.isChecked = 0;
              });
              filterset.onRefresh();
              return _elementReact.Message.success(v.data);
            }));
          });
        },
        display: function display(rows) {
          return rows.every(function (el) {
            // 每一个都未关闭(或拒绝关闭)，已审核,且发送未完成
            return !el.isMultiApprove && (!el.isClose || el.isClose == 4) && el.isChecked == 1 && (el.sendStatus == 2 || !el.sendStatus);
          });
        }
      }]
    }, {
      permissionId: '256',
      text: '提交确认',
      handleClick: function handleClick() {
        console.log('点击了提交确认按钮');
        var tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',');
        if (!tradeSaleOrderIds) return _elementReact.Message.error('请先选中一行！');
        (0, _requests.doConfirmed)({ tradeSaleOrderIds: tradeSaleOrderIds }).then((0, _mobx.action)(function (v) {
          if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
          filterset.gridModel.cashSelectedRows.forEach(function (el) {
            el.confirmedStatus = 1;
          });
          filterset.onRefresh();
          _elementReact.Message.success(v.data);
        }));
      },
      icon: 'icon-audit',
      // 每一个都是多级审批，未确认，未关闭， ---未审核
      display: function display(rows) {
        return rows.every(function (el) {
          return el.isMultiApprove == 1 && el.canConfirmCheck == 0 && (el.confirmedStatus == 0 || el.confirmedStatus == 3) && (!el.isClose || el.isClose == 4) && el.isChecked != 1;
        });
      }
    }, {
      permissionId: '262',
      text: '确认并审核',
      handleClick: function handleClick() {
        console.log('点击了确认并审核按钮');
        var tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',');
        if (!tradeSaleOrderIds) return _elementReact.Message.error('请先选中一行！');
        (0, _requests.doConfirmAndCheck)({ tradeSaleOrderIds: tradeSaleOrderIds }).then((0, _mobx.action)(function (v) {
          if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
          filterset.gridModel.cashSelectedRows.forEach(function (el) {
            el.confirmedStatus = 1;el.isChecked = 1;
          });
          filterset.onRefresh();
          _elementReact.Message.success(v.data);
        }));
      },
      icon: 'icon-audit',
      // 每一个都是多级审批，可确认审批,未确认，未关闭， ---未审核
      display: function display(rows) {
        return rows.every(function (el) {
          return el.isMultiApprove == 1 && el.canConfirmCheck == 1 && (el.confirmedStatus == 0 || el.confirmedStatus == 3) && (!el.isClose || el.isClose == 4) && el.isChecked != 1;
        });
      }
    }, {
      permissionId: '84',
      text: '关闭',
      icon: 'icon-close',
      handleClick: function handleClick() {
        console.log('点击了关闭按钮');
        var tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',');
        if (!tradeSaleOrderIds) return _elementReact.Message.error('请先选中一行或多行！');
        _elementReact.MessageBox.confirm('是否确认进行关闭操作?', '提示', { type: 'info' }).then(function () {
          (0, _requests.closeSaleOrder)({ tradeSaleOrderIds: tradeSaleOrderIds, isClose: 1 }).then((0, _mobx.action)(function (v) {
            if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
            filterset.gridModel.cashSelectedRows.forEach(function (el) {
              el.isClose = 1;
            });
            filterset.onRefresh();
            return _elementReact.Message.success(v.data);
          }));
        });
      },
      display: function display(rows) {
        // 选中1行且该行未关闭，已审核
        if (rows.length > 1) return false;
        var item = rows[0];
        return (!item.isClose || item.isClose == 4) && item.isChecked == 1;
      }
    }, {
      permissionId: '242',
      text: '打印',
      isLabel: true, // 点击不发生任何事件，在与勾选框联动时有用到
      icon: 'icon-suspend',
      handleClick: function handleClick() {
        console.log('点击了打印按钮');
      },
      group: [{
        idx: 0,
        permissionId: '243',
        text: '打印2',
        icon: 'icon-barcode',
        display: function display(rows) {
          return rows.every(function (el) {
            return false;
          });
        },
        handleClick: function handleClick() {
          console.log('点击了打印2按钮');
        }
      }, {
        idx: 1,
        permissionId: '243',
        text: '打印设置',
        icon: 'icon-suspend_relieve',
        display: function display(rows) {
          return rows.every(function (el) {
            return false;
          });
        },
        handleClick: function handleClick() {
          console.log('点击了打印设置按钮');
        }
      }],
      display: function display(rows) {
        return rows.every(function (el) {
          return true;
        });
      }
    }, {
      permissionId: '256',
      text: '生成采购单',
      icon: 'icon-audit',
      handleClick: function handleClick() {
        console.log('点击了生成采购单按钮');
        var tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',');
        if (!tradeSaleOrderIds) return _elementReact.Message.error('请先选中一行或多行！');
        _elementReact.MessageBox.confirm('是否确认进行生成采购单操作?', '提示', { type: 'info' }).then(function () {
          (0, _requests.generatePurchaseOrder)(tradeSaleOrderIds).then((0, _mobx.action)(function (v) {
            if (v.status !== 'Successful') return _elementReact.Message.error(v.data); // TODO:后续加是否已生成采购单的标记位
            filterset.onRefresh();
            return _elementReact.Message.success(v.data);
          }));
        });
      },
      display: function display(rows) {
        return rows.every(function (el) {
          // 已审核，未关闭
          var isChecked = el.isChecked,
              isClose = el.isClose;

          return (isClose == null || isClose == 0 || isClose == 4) && isChecked == 1;
        });
      }
    }, {
      permissionId: '257',
      text: '生成送货单',
      icon: 'icon-audit',
      handleClick: function handleClick() {
        console.log('点击了生成送货单按钮');
      },
      display: function display(rows) {
        return rows.every(function (el) {
          var isMultiApprove = el.isMultiApprove,
              confirmedStatus = el.confirmedStatus,
              isChecked = el.isChecked,
              isClose = el.isClose,
              sendStatus = el.sendStatus;

          return sendStatus != 1 && (isClose == null || isClose == 0 || isClose == 4) && isChecked == 1 && (!isMultiApprove || confirmedStatus == 2);
        });
      }
    }, {
      permissionId: '21',
      text: '同意关闭',
      icon: 'icon-close',
      handleClick: function handleClick() {
        console.log('点击了同意关闭按钮');
        var tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',');
        if (!tradeSaleOrderIds) return _elementReact.Message.error('请先选中一行！');
        _elementReact.MessageBox.confirm('是否确认同意关闭?', '提示', { type: 'info' }).then(function () {
          (0, _requests.closeSaleOrder)({ tradeSaleOrderIds: tradeSaleOrderIds, isClose: 3 }).then((0, _mobx.action)(function (v) {
            if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
            filterset.gridModel.cashSelectedRows.forEach(function (el) {
              el.isClose = 3;
            });
            filterset.onRefresh();
            return _elementReact.Message.success(v.data);
          }));
        });
      },
      display: function display(rows) {
        return rows.every(function (el) {
          return false;
        });
      },
      group: [{
        permissionId: '29',
        text: '拒绝关闭',
        icon: 'icon-close',
        handleClick: function handleClick() {
          console.log('点击了拒绝关闭按钮');
          var tradeSaleOrderIds = filterset.gridModel.selectedKeyValues.join(',');
          if (!tradeSaleOrderIds) return _elementReact.Message.error('请先选中一行！');
          _elementReact.MessageBox.confirm('是否确认拒绝关闭?', '提示', { type: 'info' }).then(function () {
            (0, _requests.closeSaleOrder)({ tradeSaleOrderIds: tradeSaleOrderIds, isClose: 4 }).then((0, _mobx.action)(function (v) {
              if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
              filterset.gridModel.cashSelectedRows.forEach(function (el) {
                el.isClose = 4;
              });
              filterset.onRefresh();
              return _elementReact.Message.success(v.data);
            }));
          });
        },
        display: function display(rows) {
          if (rows.length > 1) return false;
          var item = rows[0];
          return item.isClose == 2;
        }
      }]
    }, {
      permissionId: '257',
      text: '导入',
      icon: 'icon-import',
      handleClick: function handleClick() {
        console.log('点击了导入按钮');
      },
      // display: (rows) => rows.every(el => {
      //   return true
      // })
      display: function display(rows) {
        console.log(rows[0]);
        return true;
      }
    }, {
      permissionId: '257',
      text: '导出',
      icon: 'icon-export',
      handleClick: function handleClick() {
        console.log('点击了导出按钮');
      },
      display: function display(rows) {
        return rows.every(function (el) {
          return true;
        });
      }
    }];
  };

  this.getApi = function () {
    return {
      queryData: function queryData(data, filterset) {
        var cond = data.cond,
            _data$sidx = data.sidx,
            sidx = _data$sidx === undefined ? 'createdAt' : _data$sidx,
            _data$sord = data.sord,
            sord = _data$sord === undefined ? 'desc' : _data$sord,
            rest = (0, _objectWithoutProperties3.default)(data, ['cond', 'sidx', 'sord']);

        return (0, _requests.getSaleOrderList)((0, _extends3.default)({}, cond, { sidx: sidx, sord: sord }, rest));
      },
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
    };
  };

  this.getSubTables = function () {
    return {
      activeTab: 'detail',
      tabsFlag: {
        inited: { detail: true, log: false },
        searched: {}
      },
      list: [_this2.getSubDetail(), _this2.getSubLog()]
    };
  };

  this.getSubDetail = function () {
    return {
      tab: { name: '销售订单明细', value: 'detail' },
      filteritems: [{ label: '商品编码', field: 'erpProductNo', value: '' }, { label: 'SKU编码', field: 'erpSkuNo', value: '' }],
      allFilteritemsInOneGroup: true, // 默认是true，设为false则分成多个独立的过滤器
      clearAfterChangeFilteritem: false, // 默认是false,设为true则无法查复合条件
      grid: _this2.getSubDetailGrid(),
      api: {
        queryData: function queryData(data, pid, cursorRow, gridModel) {
          var cond = data.cond,
              rest = (0, _objectWithoutProperties3.default)(data, ['cond']);

          return (0, _requests.getSaleOrderDetailList)((0, _extends3.default)({}, cond, rest), pid);
        }
      }
    };
  };

  this.getSubDetailGrid = function () {
    return {
      getColumns: _this2.getSubDetailGridColumns, // 获取columns配置的接口，传进去在FilterSetModel构造器中调用，调用时会把FilterSetModel的实例传进来当参数
      _class: '', // 设置Grid最外层div的class
      getDisplayRows: function getDisplayRows(rows) {
        // 对rows的加工接口，返回的是最终展示出来的数据
        return rows;
      },
      columnsConfig: null, // 顺序，显示，宽度，最好的数据结构是[{key:xx,width:xx},{}],需要在grid的render方法中装配
      primaryKeyField: 'gridOrderNo', // checkBox列用到，数据的id
      sumColumns: [], // 表格底部统计行
      cashOn: false, // 主表要加cashRows以控制按钮显隐，还有把cashRows作为数据传给对应后端接口，即只要有按钮执行批量操作，且是分页的，就必须cashOn：true
      sortAll: false, // 一般都是true，即通过后端接口进行排序
      showCheckBox: false // 一般都是true，除非是report的那种纯展示表格
    };
  };

  this.getSubDetailGridColumns = function (filterset) {
    return [{
      key: 'erpPic',
      name: '图片',
      width: 100,
      resizable: true,
      draggable: true,
      formatter: _ImgFormatter2.default
    }, {
      key: 'Flags',
      name: '标记',
      width: 80,
      resizable: true,
      draggable: true
    }, {
      key: 'customer',
      name: '客户',
      width: 150,
      resizable: true,
      draggable: true
    }, {
      key: 'erpProductNo',
      name: '商品编码',
      width: 150,
      resizable: true,
      draggable: true
    }, {
      key: 'erpProductName',
      name: '商品名称',
      width: 150,
      resizable: true,
      draggable: true
    }, {
      key: 'erpSkuNo',
      name: 'SKU编码',
      width: 150,
      resizable: true,
      draggable: true
    }, {
      key: 'erpBarCode',
      name: '条形码',
      width: 100,
      resizable: true,
      draggable: true
    }, {
      key: 'erpColorType',
      name: '颜色',
      width: 100,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref10) {
        var value = _ref10.value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', marginLeft: -8 } },
          value
        );
      }
    }, {
      key: 'erpSizeType',
      name: '尺码',
      width: 130,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref11) {
        var value = _ref11.value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', marginLeft: -8 } },
          value
        );
      }
    }, {
      key: 'baseUnitId',
      name: '基本计量单位',
      width: 100,
      resizable: true,
      draggable: true,
      formatter: (0, _mobxReact.observer)(function (_ref12) {
        var value = _ref12.value;

        var options = _this2.editDialog._dict['base_unit'];
        var item = options && options.find(function (el) {
          return el.value == value;
        });
        var displayValue = item ? item.label : value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', marginLeft: -8 } },
          displayValue
        );
      })
    }, {
      key: 'saleNum',
      name: '销售数量',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref13) {
        var value = _ref13.value;
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
      key: 'realSendNum',
      name: '累计送货数量',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref14) {
        var value = _ref14.value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'right' } },
          value
        );
      }
    }, {
      key: 'salePriceNoTax',
      name: '售价',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref15) {
        var _ref15$dependentValue = _ref15.dependentValues,
            priceIncludeTax = _ref15$dependentValue.priceIncludeTax,
            taxRate = _ref15$dependentValue.taxRate;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'right' } },
          (Number(priceIncludeTax || 0) * 100 / (100 + Number(taxRate || 0))).toFixed(2)
        );
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'taxRate',
      name: '税率',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref16) {
        var value = _ref16.value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'right' } },
          value == null ? '' : value + '%'
        );
      }
    }, {
      key: 'tax',
      name: '税额',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref17) {
        var _ref17$dependentValue = _ref17.dependentValues,
            priceIncludeTax = _ref17$dependentValue.priceIncludeTax,
            taxRate = _ref17$dependentValue.taxRate;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'right' } },
          (Number(priceIncludeTax || 0) - Number(priceIncludeTax || 0) * 100 / (100 + Number(taxRate || 0))).toFixed(2)
        );
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'priceIncludeTax',
      name: '含税售价',
      width: 85,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref18) {
        var value = _ref18.value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'right' } },
          value
        );
      }
    }, {
      key: 'XSJE',
      name: '销售金额', // 不含税的销售金额，计算出来
      width: 85,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref19) {
        var _ref19$dependentValue = _ref19.dependentValues,
            priceIncludeTax = _ref19$dependentValue.priceIncludeTax,
            taxRate = _ref19$dependentValue.taxRate,
            saleNum = _ref19$dependentValue.saleNum;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'right' } },
          ((Number(priceIncludeTax || 0) - Number(priceIncludeTax || 0) * 100 / (100 + Number(taxRate || 0))) * Number(saleNum || 0)).toFixed(2)
        );
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'XSJEHS',
      name: '销售金额(含税)',
      width: 95,
      resizable: true,
      draggable: true,
      formatter: function formatter(_ref20) {
        var _ref20$dependentValue = _ref20.dependentValues,
            priceIncludeTax = _ref20$dependentValue.priceIncludeTax,
            saleNum = _ref20$dependentValue.saleNum;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'right' } },
          (Number(priceIncludeTax || 0) * Number(saleNum || 0)).toFixed(2)
        );
      },
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'sendStatus',
      name: '送货完成',
      width: 100,
      resizable: true,
      draggable: true,
      formatter: (0, _mobxReact.observer)(function (_ref21) {
        var value = _ref21.value;

        var options = _this2._dict['sendStatus'];
        var item = options && options.find(function (el) {
          return el.value == value;
        });
        var displayValue = item ? item.label : value;
        return _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', marginLeft: -8 } },
          displayValue
        );
      })
    }, {
      key: 'planSendDate',
      name: '预计交货日期',
      width: 160,
      resizable: true,
      draggable: true,
      formatter: _TimeStampFormatter2.default,
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }, {
      key: 'realSendDate',
      name: '实际交货日期',
      width: 160,
      resizable: true,
      draggable: true,
      formatter: _TimeStampFormatter2.default,
      getRowMetaData: function getRowMetaData(row) {
        return row;
      }
    }];
  };

  this.getSubLog = function () {
    return {
      tab: { name: '日志', value: 'log' },
      grid: _this2.getSubLogGrid(),
      api: {
        queryData: function queryData(data, pid, cursorRow, gridModel) {
          var cond = data.cond,
              rest = (0, _objectWithoutProperties3.default)(data, ['cond']);

          return (0, _requests.getSaleOrderLogList)(rest, pid);
        }
      }
    };
  };

  this.getSubLogGrid = function () {
    return {
      getColumns: _this2.getSubLogGridColumns, // 获取columns配置的接口，传进去在FilterSetModel构造器中调用，调用时会把FilterSetModel的实例传进来当参数
      _class: '', // 设置Grid最外层div的class
      getDisplayRows: function getDisplayRows(rows) {
        // 对rows的加工接口，返回的是最终展示出来的数据
        return rows;
      },
      columnsConfig: null, // 顺序，显示，宽度，最好的数据结构是[{key:xx,width:xx},{}],需要在grid的render方法中装配
      primaryKeyField: 'gridOrderNo', // checkBox列用到，数据的id
      sumColumns: [], // 表格底部统计行
      cashOn: false, // 主表要加cashRows以控制按钮显隐，还有把cashRows作为数据传给对应后端接口，即只要有按钮执行批量操作，且是分页的，就必须cashOn：true
      sortAll: false, // 一般都是true，即通过后端接口进行排序
      showCheckBox: false // 一般都是true，除非是report的那种纯展示表格
    };
  };

  this.getSubLogGridColumns = function (filterset) {
    return [{
      key: 'moduleType',
      name: '操作模块',
      width: 100,
      resizable: true,
      draggable: true
    }, {
      key: 'operationType',
      name: '操作类型',
      width: 150,
      resizable: true,
      draggable: true
    }, {
      key: 'operationResult',
      name: '操作结果',
      resizable: true,
      draggable: true
    }, {
      key: 'operatorShowName',
      name: '操作人名称',
      width: 200,
      resizable: true,
      draggable: true
    }, {
      key: 'createdAt',
      name: '操作时间',
      width: 150,
      resizable: true,
      draggable: true,
      formatter: _TimeStampFormatter2.default
    }];
  };

  this.handleCellValueChange = (0, _mobx.action)(function (key, value, row) {
    // 主表子表的cellChange都在这两个方法中处理
    console.log('\u6267\u884C\u6700\u5916\u90E8\u7684handleCellValueChange,key:' + key + ',value:' + value + ',row:', row);
    row[key] = value;
    if (key === 'plan_arrival_date' && !value) {
      _elementReact.Message.warning('请填写预计到货日期');
      return true; // 返回ture则停止调用blur
    }
  });
  this.handleCellBlur = (0, _mobx.action)(function (key, value, row) {
    console.log('\u6267\u884C\u6700\u5916\u90E8\u7684handleCellBlur,key:' + key + ',value:' + value + ',row:', row);
    if (key === 'deliveryType') {
      (0, _requests.updateSaleOrder)((0, _defineProperty3.default)({}, key, value), row['id']).then((0, _mobx.action)(function (v) {
        if (v.status !== 'Successful') return _elementReact.Message.error(v.data);
        _elementReact.Message.success('更新成功！');
      }));
    }
  });
};

exports.default = WrapperOfFilterSetListModel;