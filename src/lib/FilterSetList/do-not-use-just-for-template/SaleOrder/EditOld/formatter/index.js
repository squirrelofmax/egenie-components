'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeFormatterForDept = exports.InputFormatterForTaxRate = exports.getSelectFormatterForPayType = exports.getSelectFormatterForPurchaseUnit = exports.getSelectFormatterForVendor = exports.OperationFormatter = exports.TimeStampFormatter = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elementReact = require('element-react');

require('./SelectFormatter.css');

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeStampFormatter = exports.TimeStampFormatter = function (_Component) {
  (0, _inherits3.default)(TimeStampFormatter, _Component);

  function TimeStampFormatter() {
    (0, _classCallCheck3.default)(this, TimeStampFormatter);
    return (0, _possibleConstructorReturn3.default)(this, (TimeStampFormatter.__proto__ || (0, _getPrototypeOf2.default)(TimeStampFormatter)).apply(this, arguments));
  }

  (0, _createClass3.default)(TimeStampFormatter, [{
    key: 'render',
    value: function render() {
      var dateStr = this.timeStampFormatToStr(this.props.value);
      return _react2.default.createElement(
        'div',
        { style: { textAlign: "left" }, title: dateStr },
        dateStr
      );
    }
  }, {
    key: 'timeStampFormatToStr',
    value: function timeStampFormatToStr(ts) {
      if (!ts && ts !== 0) return '';
      var d = new Date(ts);
      return d.toLocaleDateString().replace(/\//g, '-') + ' ' + d.toTimeString().split(' ')[0];
    }
  }]);
  return TimeStampFormatter;
}(_react.Component);

var OperationFormatter = exports.OperationFormatter = function (_Component2) {
  (0, _inherits3.default)(OperationFormatter, _Component2);

  function OperationFormatter() {
    var _ref;

    var _temp, _this2, _ret;

    (0, _classCallCheck3.default)(this, OperationFormatter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = OperationFormatter.__proto__ || (0, _getPrototypeOf2.default)(OperationFormatter)).call.apply(_ref, [this].concat(args))), _this2), _this2.editShow = function () {
      _this2.props.foo.editShow(_this2.props.dependentValues);
    }, _this2.resourceShow = function () {
      _this2.props.foo.resourceShow(_this2.props.dependentValues);
    }, _this2.delete = function () {
      _this2.props.foo.delete(_this2.props.dependentValues.resourceId);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this2, _ret);
  }

  (0, _createClass3.default)(OperationFormatter, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          dependentValues = _props.dependentValues,
          foo = _props.foo;

      return _react2.default.createElement(
        'div',
        { style: { textAlign: "left" } },
        _react2.default.createElement(
          _elementReact.Button,
          { type: 'text', size: 'small', onClick: this.editShow },
          '\u4FEE\u6539'
        ),
        _react2.default.createElement(
          _elementReact.Button,
          { type: 'text', size: 'small', onClick: this.resourceShow },
          '\u89D2\u8272'
        ),
        _react2.default.createElement(
          _elementReact.Button,
          { type: 'text', size: 'small', onClick: this.delete },
          '\u5220\u9664'
        )
      );
    }
  }]);
  return OperationFormatter;
}(_react.Component);

var getSelectFormatterForVendor = exports.getSelectFormatterForVendor = function getSelectFormatterForVendor(that, url) {
  var _class, _temp2, _initialiseProps;

  return _temp2 = _class = function (_Component3) {
    (0, _inherits3.default)(SelectFormatter, _Component3);

    function SelectFormatter(props) {
      (0, _classCallCheck3.default)(this, SelectFormatter);

      var _this3 = (0, _possibleConstructorReturn3.default)(this, (SelectFormatter.__proto__ || (0, _getPrototypeOf2.default)(SelectFormatter)).call(this, props));

      _initialiseProps.call(_this3);

      var _this3$props = _this3.props,
          value = _this3$props.value,
          dependentValues = _this3$props.dependentValues,
          foo = _this3$props.foo,
          getDict = _this3$props.foo.getDict;

      var dict = getDict(dependentValues.sku_id);
      _this3.state = { dict: dict.then ? [] : dict, loaded: false };
      _promise2.default.resolve(dict).then(function (v) {
        return _this3.setState({ dict: v, loaded: true });
      });
      return _this3;
    }

    (0, _createClass3.default)(SelectFormatter, [{
      key: 'getDict',
      value: function getDict() {
        var _this4 = this;

        var _props2 = this.props,
            value = _props2.value,
            dependentValues = _props2.dependentValues,
            foo = _props2.foo,
            getDict = _props2.foo.getDict;

        _promise2.default.resolve(getDict(dependentValues.sku_id)).then(function (v) {
          return _this4.setState({ dict: v, loaded: true });
        });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var that = this;
        var disabledFlag = this.props.foo.isDisabled && !!this.props.foo.isDisabled();
        if (!disabledFlag) {
          var wrapper = this.wrapper;
          window.$(wrapper).find('.el-input__inner').focus(function (e) {
            e.stopPropagation();
          }).click(function (e) {
            var _this5 = this;

            window.$(this).closest('.react-grid-Cell').addClass('editing');
            setTimeout(function () {
              return window.$(_this5).focus();
            }, 0);
          }).dblclick(function (e) {
            e.stopPropagation();
          });
          window.$(this.wrapper).closest('.react-grid-Cell').addClass('editing');
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this6 = this;

        var _props3 = this.props,
            value = _props3.value,
            dependentValues = _props3.dependentValues;

        var dict = this.state.dict;
        var disabledFlag = this.props.foo.isDisabled && !!this.props.foo.isDisabled();
        var targetItem = null;
        var showContent = null;
        if (disabledFlag) {
          targetItem = (dict || []).find(function (option) {
            return option.value == value;
          });
          showContent = targetItem ? targetItem.label : '';
        }
        return _react2.default.createElement(
          'div',
          { ref: function ref(wrapper) {
              _this6.wrapper = wrapper;
            }, className: 'select-formatter', style: {
              textAlign: 'left', padding: disabledFlag ? '0' : '3px 8px 3px 0px'
            } },
          disabledFlag ? showContent : _react2.default.createElement(
            _elementReact.Select,
            { value: this.props.value + '', clearable: true, filterable: (dict || []).length > 10,
              onBlur: this.handleBlur, onChange: this.handleValueChange },
            (dict || []).map(function (option) {
              return _react2.default.createElement(_elementReact.Select.Option, { label: option.label, value: option.value + '' });
            })
          )
        );
      }
    }]);
    return SelectFormatter;
  }(_react.Component), _initialiseProps = function _initialiseProps() {
    var _this7 = this;

    this.handleValueChange = function (value) {
      var _props$foo = _this7.props.foo,
          onChange = _props$foo.onChange,
          onBlur = _props$foo.onBlur;

      onChange && onChange(value, _this7.props.dependentValues);
      onBlur && onBlur(value, _this7.props.dependentValues);
    };
  }, _temp2;
};

var getSelectFormatterForPurchaseUnit = exports.getSelectFormatterForPurchaseUnit = function getSelectFormatterForPurchaseUnit(that, url) {
  return function (_Component4) {
    (0, _inherits3.default)(SelectFormatter, _Component4);

    function SelectFormatter() {
      var _ref2;

      var _temp3, _this8, _ret2;

      (0, _classCallCheck3.default)(this, SelectFormatter);

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _ret2 = (_temp3 = (_this8 = (0, _possibleConstructorReturn3.default)(this, (_ref2 = SelectFormatter.__proto__ || (0, _getPrototypeOf2.default)(SelectFormatter)).call.apply(_ref2, [this].concat(args))), _this8), _this8.handleValueChange = function (value) {
        var _this8$props$foo = _this8.props.foo,
            onChange = _this8$props$foo.onChange,
            onBlur = _this8$props$foo.onBlur;

        onChange && onChange(value, _this8.props.dependentValues);
        onBlur && onBlur(value, _this8.props.dependentValues);
      }, _temp3), (0, _possibleConstructorReturn3.default)(_this8, _ret2);
    }

    (0, _createClass3.default)(SelectFormatter, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var disabledFlag = this.props.foo.isDisabled && !!this.props.foo.isDisabled();
        if (!disabledFlag) {
          var wrapper = this.wrapper;
          window.$(wrapper).find('.el-input__inner').focus(function (e) {
            e.stopPropagation();
          }).click(function (e) {
            var _this9 = this;

            window.$(this).closest('.react-grid-Cell').addClass('editing');
            setTimeout(function () {
              return window.$(_this9).focus();
            }, 0);
          }).dblclick(function (e) {
            e.stopPropagation();
          });
          window.$(this.wrapper).closest('.react-grid-Cell').addClass('editing');
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this10 = this;

        var optionsName = this.props.foo.optionsName;
        var _props4 = this.props,
            value = _props4.value,
            dependentValues = _props4.dependentValues;

        var dict = optionsName() ? url.split('.').reduce(function (a, b) {
          return a[b];
        }, that)[optionsName()] : url.split('.').reduce(function (a, b) {
          return a[b];
        }, that).all;
        var disabledFlag = this.props.foo.isDisabled && !!this.props.foo.isDisabled();
        var targetItem = null;
        var showContent = null;
        if (disabledFlag) {
          targetItem = (dict || []).find(function (option) {
            return option.value == value;
          });
          showContent = targetItem ? targetItem.label : '';
        }
        return _react2.default.createElement(
          'div',
          { ref: function ref(wrapper) {
              _this10.wrapper = wrapper;
            }, className: 'select-formatter', style: {
              textAlign: 'left', padding: disabledFlag ? '0' : '3px 8px 3px 0px'
            } },
          disabledFlag ? showContent : _react2.default.createElement(
            _elementReact.Select,
            { value: this.props.value + '', filterable: (dict || []).length > 10,
              onBlur: this.handleBlur, onChange: this.handleValueChange },
            (dict || []).map(function (option) {
              return _react2.default.createElement(_elementReact.Select.Option, { label: option.label, value: option.value + '' });
            })
          )
        );
      }
    }]);
    return SelectFormatter;
  }(_react.Component);
};

var getSelectFormatterForPayType = exports.getSelectFormatterForPayType = function getSelectFormatterForPayType(that, url) {
  var _class3, _temp4, _initialiseProps2;

  return _temp4 = _class3 = function (_Component5) {
    (0, _inherits3.default)(SelectFormatter, _Component5);

    function SelectFormatter(props) {
      (0, _classCallCheck3.default)(this, SelectFormatter);

      var _this11 = (0, _possibleConstructorReturn3.default)(this, (SelectFormatter.__proto__ || (0, _getPrototypeOf2.default)(SelectFormatter)).call(this, props));

      _initialiseProps2.call(_this11);

      var optionsName = _this11.props.foo.optionsName;
      var value = _this11.props.value;

      var dict = url.split('.').reduce(function (a, b) {
        return a[b];
      }, that)[optionsName];
      _this11.state = { dict: dict };
      return _this11;
    }

    (0, _createClass3.default)(SelectFormatter, [{
      key: 'getDict',
      value: function getDict() {
        var optionsName = this.props.foo.optionsName;
        var value = this.props.value;

        var dict = url.split('.').reduce(function (a, b) {
          return a[b];
        }, that)[optionsName];
        this.setState({ dict: dict });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var this2 = this;
        var disabledFlag = this.props.foo.isDisabled && !!this.props.foo.isDisabled();
        if (!disabledFlag) {
          var wrapper = this.wrapper;
          window.$(wrapper).find('.el-input__inner').focus(function (e) {
            e.stopPropagation();
          }).click(function (e) {
            var _this12 = this;

            window.$(this).closest('.react-grid-Cell').addClass('editing');
            this2.getDict();
            setTimeout(function () {
              return window.$(_this12).focus();
            }, 0);
          }).dblclick(function (e) {
            e.stopPropagation();
          });
          window.$(this.wrapper).closest('.react-grid-Cell').addClass('editing');
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this13 = this;

        var dict = this.state.dict;
        var value = this.props.value;

        var disabledFlag = this.props.foo.isDisabled && !!this.props.foo.isDisabled();
        var targetItem = null;
        var showContent = null;
        if (disabledFlag) {
          targetItem = (dict || []).find(function (option) {
            return option.value == value;
          });
          showContent = targetItem ? targetItem.label : '';
        }
        return _react2.default.createElement(
          'div',
          { ref: function ref(wrapper) {
              _this13.wrapper = wrapper;
            }, className: 'select-formatter', style: {
              textAlign: 'left', padding: disabledFlag ? '0' : '3px 8px 3px 0px'
            } },
          disabledFlag ? showContent : _react2.default.createElement(
            _elementReact.Select,
            { value: this.props.value + '', filterable: (dict || []).length > 10,
              onBlur: this.handleBlur, onChange: this.handleValueChange },
            (dict || []).map(function (option) {
              return _react2.default.createElement(_elementReact.Select.Option, { label: option.label, value: option.value + '' });
            })
          )
        );
      }
    }]);
    return SelectFormatter;
  }(_react.Component), _initialiseProps2 = function _initialiseProps2() {
    var _this14 = this;

    this.handleValueChange = function (value) {
      var _props$foo2 = _this14.props.foo,
          onChange = _props$foo2.onChange,
          onBlur = _props$foo2.onBlur;

      onChange && onChange(value, _this14.props.dependentValues);
      onBlur && onBlur(value, _this14.props.dependentValues);
    };
  }, _temp4;
};

var InputFormatterForTaxRate = exports.InputFormatterForTaxRate = function (_Component6) {
  (0, _inherits3.default)(InputFormatterForTaxRate, _Component6);

  function InputFormatterForTaxRate() {
    var _ref3;

    var _temp5, _this15, _ret3;

    (0, _classCallCheck3.default)(this, InputFormatterForTaxRate);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp5 = (_this15 = (0, _possibleConstructorReturn3.default)(this, (_ref3 = InputFormatterForTaxRate.__proto__ || (0, _getPrototypeOf2.default)(InputFormatterForTaxRate)).call.apply(_ref3, [this].concat(args))), _this15), _this15.handleBlur = function (e) {
      console.log('执行内部blur事件');
      e.stopPropagation();
      e.preventDefault();
      var value = _this15.input.refs.input.value + '%';
      _this15.edited && _this15.props.foo.onBlur(value, _this15.props.dependentValues, _this15.input.refs.input);
      _this15.edited = false;
    }, _this15.handleValueChange = function (value) {
      console.log('执行内部valueChang事件');
      _this15.edited = true;
      value += '%';
      _this15.props.foo.onChange && _this15.props.foo.onChange(value, _this15.props.dependentValues);
    }, _temp5), (0, _possibleConstructorReturn3.default)(_this15, _ret3);
  }

  (0, _createClass3.default)(InputFormatterForTaxRate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.edited = false;
      var disabledFlag = this.props.foo.isDisabled && !!this.props.foo.isDisabled();
      if (!disabledFlag) {
        var wrapper = this.wrapper;
        var input = this.input.refs.input;
        input.value = parseFloat(this.props.value);
        window.$(wrapper).focus(function (e) {
          e.stopPropagation();
        }).click(function (e) {
          setTimeout(function () {
            return window.$(input).focus();
          }, 0);
        }).dblclick(function (e) {
          e.stopPropagation();
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var input = this.input.refs.input;
      input.value = parseFloat(nextProps.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this16 = this;

      var disabledFlag = this.props.foo.isDisabled && !!this.props.foo.isDisabled();
      return _react2.default.createElement(
        'div',
        { ref: function ref(wrapper) {
            _this16.wrapper = wrapper;
          }, className: 'input-formatter' + (this.props.foo._class ? ' ' + this.props.foo._class : ''), style: {
            textAlign: 'left', padding: disabledFlag ? '0px' : "10px 13px 10px 0px"
          } },
        disabledFlag ? this.props.value : _react2.default.createElement(_elementReact.Input, { ref: function ref(input) {
            _this16.input = input;
          }, onKeyUp: function onKeyUp(e) {
            e.stopPropagation();
            e = (0, _extends3.default)({}, e);_this16.props.foo.onKeyUp && _this16.props.foo.onKeyUp(e, _this16.input.refs.input);
          }, onKeyDown: function onKeyDown(e) {
            e.stopPropagation();
          },
          onBlur: this.handleBlur, onChange: this.handleValueChange }),
        disabledFlag ? '' : '%'
      );
    }
  }]);
  return InputFormatterForTaxRate;
}(_react.Component);

var TreeFormatterForDept = exports.TreeFormatterForDept = (0, _mobxReact.observer)(function (_Component7) {
  (0, _inherits3.default)(TreeFormatterForDept, _Component7);

  function TreeFormatterForDept() {
    var _ref4;

    var _temp6, _this17, _ret4;

    (0, _classCallCheck3.default)(this, TreeFormatterForDept);

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return _ret4 = (_temp6 = (_this17 = (0, _possibleConstructorReturn3.default)(this, (_ref4 = TreeFormatterForDept.__proto__ || (0, _getPrototypeOf2.default)(TreeFormatterForDept)).call.apply(_ref4, [this].concat(args))), _this17), _this17.handleBlur = function (e) {
      console.log('执行内部blur事件');
      e.stopPropagation();
      e.preventDefault();
      var value = _this17.input.refs.input.value + '%';
      _this17.props.foo.onBlur(value, _this17.props.dependentValues, _this17.input.refs.input);
    }, _this17.handleValueChange = function (value) {
      console.log('执行内部valueChang事件');
      _this17.props.foo.onChange && _this17.props.foo.onChange(value, _this17.props.dependentValues);
    }, _temp6), (0, _possibleConstructorReturn3.default)(_this17, _ret4);
  }

  (0, _createClass3.default)(TreeFormatterForDept, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var disabledFlag = this.props.foo.isDisabled && !!this.props.foo.isDisabled();
      if (!disabledFlag) {
        var wrapper = this.wrapper;
        window.$(wrapper).find('.el-input__inner').focus(function (e) {
          e.stopPropagation();
        }).click(function (e) {
          var _this18 = this;

          window.$(this).closest('.react-grid-Cell').addClass('editing');
          setTimeout(function () {
            return window.$(_this18).focus();
          }, 0);
        }).dblclick(function (e) {
          e.stopPropagation();
        });
        window.$(this.wrapper).closest('.react-grid-Cell').addClass('editing');
      }
    }

    // componentWillReceiveProps(nextProps){
    //   const input =this.input.refs.input
    //   input.value=parseFloat(nextProps.value)
    // }

  }, {
    key: 'render',
    value: function render() {
      var _this19 = this;

      var disabledFlag = this.props.foo.isDisabled && !!this.props.foo.isDisabled();
      var _props$foo$top = this.props.foo.top,
          dept = _props$foo$top._dict.dept,
          deptProps = _props$foo$top.deptProps;

      return _react2.default.createElement(
        'div',
        { ref: function ref(wrapper) {
            _this19.wrapper = wrapper;
          }, className: 'input-formatter' + (this.props.foo._class ? ' ' + this.props.foo._class : ''), style: {
            textAlign: 'left', padding: disabledFlag ? '0px' : "3px 13px 3px 0px"
          } },
        disabledFlag ? this.props.value : _react2.default.createElement(_elementReact.Cascader, { value: (this.props.value || []).slice(0), options: dept, props: deptProps, filterable: true, clearable: true, changeOnSelect: true,
          showAllLevels: false,
          beforeFilter: function beforeFilter() {
            return _promise2.default.resolve(true);
          },
          ref: function ref(input) {
            _this19.input = input;
          },
          onKeyUp: function onKeyUp(e) {
            e.stopPropagation();e = (0, _extends3.default)({}, e);_this19.props.foo.onKeyUp && _this19.props.foo.onKeyUp(e, _this19.input.refs.input);
          },
          onKeyDown: function onKeyDown(e) {
            e.stopPropagation();
          },
          onBlur: this.handleBlur, onChange: this.handleValueChange })
      );
    }
  }]);
  return TreeFormatterForDept;
}(_react.Component));