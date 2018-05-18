'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _elementReact = require('element-react');

require('../../../../css/FilterSetList/FilterSet/FilterItem.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterItem = (0, _mobxReact.observer)(function (_ref) {
  var _ref$store = _ref.store,
      id = _ref$store.id,
      type = _ref$store.type,
      label = _ref$store.label,
      hiddenColon = _ref$store.hiddenColon,
      labelStyle = _ref$store.labelStyle,
      value = _ref$store.value,
      index = _ref$store.index,
      options = _ref$store.options,
      labelField = _ref$store.labelField,
      valueField = _ref$store.valueField,
      _ref$store$display = _ref$store.display,
      display = _ref$store$display === undefined ? true : _ref$store$display,
      treeProps = _ref$store.treeProps,
      handleNumberGroupChange = _ref$store.handleNumberGroupChange,
      handleTextChange = _ref$store.handleTextChange,
      handleDateChange = _ref$store.handleDateChange,
      handleSelectChange = _ref$store.handleSelectChange,
      onKeyUp = _ref$store.onKeyUp,
      clearable = _ref$store.clearable,
      disabledDate = _ref$store.disabledDate,
      handleYearChange = _ref$store.handleYearChange,
      handleTreeChange = _ref$store.handleTreeChange;

  var defaultLabel = _react2.default.createElement(
    'label',
    { className: 'filteritem-label', style: labelStyle || {} },
    label + (hiddenColon ? '' : ':')
  );

  var defaultWrapperClassName = 'filteritem-wrapper';
  var hasValueFlag = value ? 'has-value' : ''; // 非numbergroup的有值判断
  var style = display ? {} : { display: 'none'
    // debugger
  };if (type === 'text') {
    return _react2.default.createElement(
      'div',
      { className: defaultWrapperClassName, style: style, key: id },
      defaultLabel,
      _react2.default.createElement(_elementReact.Input, { className: hasValueFlag, value: value, onChange: handleTextChange, onKeyUp: onKeyUp })
    );
  }

  if (type === 'date') {
    return _react2.default.createElement(
      'div',
      { className: defaultWrapperClassName + (value ? ' has-value' : ''), style: style, key: id },
      defaultLabel,
      _react2.default.createElement(_elementReact.DatePicker, { format: 'yyyy-MM-dd HH:mm:ss', isShowTime: true, disabledDate: disabledDate, className: hasValueFlag, value: value || null, onChange: handleDateChange })
    );
  }

  if (type === 'select') {
    return _react2.default.createElement(
      'div',
      { className: defaultWrapperClassName, style: style, key: id },
      defaultLabel,
      _react2.default.createElement(
        _elementReact.Select,
        { className: hasValueFlag, value: value, onChange: handleSelectChange, clearable: clearable,
          filterable: options && options.length > 9 },
        options && options.length ? options.map(function (el) {
          // debugger
          return _react2.default.createElement(_elementReact.Select.Option, { label: el[labelField], value: el[valueField], key: el[valueField] });
        }) : ''
      )
    );
  }

  if (type === 'numbergroup') {
    return _react2.default.createElement(
      'div',
      { className: defaultWrapperClassName, style: style, key: id },
      defaultLabel,
      _react2.default.createElement(_elementReact.InputNumber, { className: value.min || value.min === 0 ? 'has-value' : '', defaultValue: value.min == null || value.min === '' ? undefined : +value.min,
        value: value.min == null || value.min === '' ? undefined : +value.min, min: 0,
        max: value.max === '' ? Infinity : value.max - 1,
        onChange: handleNumberGroupChange.bind(undefined, 'min'), onKeyUp: onKeyUp }),
      _react2.default.createElement(
        'label',
        null,
        '\u81F3'
      ),
      _react2.default.createElement(_elementReact.InputNumber, { className: value.max ? 'has-value' : '', defaultValue: value.max == null || value.max === '' ? undefined : +value.max,
        value: value.max == null || value.max === '' ? undefined : +value.max, min: value.min ? value.min + 1 : 1, max: Infinity,
        onChange: handleNumberGroupChange.bind(undefined, 'max'), onKeyUp: onKeyUp
      })
    );
  }

  if (type === 'year') {
    return _react2.default.createElement(
      'div',
      { className: defaultWrapperClassName + (value ? ' has-value' : ''), style: style },
      defaultLabel,
      _react2.default.createElement(_elementReact.DatePicker, { className: hasValueFlag,
        value: value ? typeof value === 'string' ? new Date(value) : value : null,
        onChange: handleYearChange,
        selectionMode: 'year',
        align: 'right'
      })
    );
  }

  if (type === 'multiselect') {
    return _react2.default.createElement(
      'div',
      { className: defaultWrapperClassName + (value ? ' has-value' : ''), style: style },
      defaultLabel,
      _react2.default.createElement(
        _elementReact.Select,
        { className: hasValueFlag, value: value, onChange: handleSelectChange, clearable: clearable,
          filterable: options && options.length > 9, multiple: true },
        options && options.length ? options.map(function (el) {
          // debugger
          return _react2.default.createElement(_elementReact.Select.Option, { label: el[labelField], value: el[valueField], key: el[valueField] });
        }) : ''
      )
    );
  }

  if (type === 'tree') {
    return _react2.default.createElement(
      'div',
      { className: defaultWrapperClassName, style: style },
      defaultLabel,
      _react2.default.createElement(_elementReact.Cascader, { className: value && value.length ? 'has-value' : '', value: (value || []).slice(0), onChange: handleTreeChange, options: (0, _mobx.toJS)(options), props: treeProps, filterable: true, clearable: true, changeOnSelect: true, showAllLevels: false,
        beforeFilter: function beforeFilter() {
          return _promise2.default.resolve(true);
        } })
    );
  }
});

exports.default = FilterItem;