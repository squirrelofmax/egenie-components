'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

require('@/css/ReportWithCopy.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReportWithCopy = function (_Component) {
  (0, _inherits3.default)(ReportWithCopy, _Component);

  function ReportWithCopy(props) {
    (0, _classCallCheck3.default)(this, ReportWithCopy);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReportWithCopy.__proto__ || (0, _getPrototypeOf2.default)(ReportWithCopy)).call(this, props));

    _this.state = {
      title: '批量处理报告',
      show: false,
      total: '',
      failure: '',
      columns: props.columns,
      rows: []
    };
    _this.hideDialog = _this.hideDialog.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ReportWithCopy, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      // 控制显示、隐藏
      if (nextProps.show !== this.state.show) {
        this.setState(function (prevState) {
          prevState.show = nextProps.show;
        });
      }

      // 总数
      if (nextProps.total !== this.state.total) {
        this.setState(function (prevState) {
          prevState.total = nextProps.total;
        });
      }

      // 失败的数量
      if (nextProps.failure !== this.state.failure) {
        this.setState(function (prevState) {
          prevState.failure = nextProps.failure;
        });
      }

      // 如果有rows并且不相同
      if (nextProps.rows.length && nextProps.rows !== this.state.rows) {
        this.setState(function (prevState) {
          prevState.rows = _this2.getKey(nextProps.rows);
        });
      }
    }

    // 序号

  }, {
    key: 'getKey',
    value: function getKey(list) {
      list = list || [];
      list.forEach(function (el, i) {
        return el.key = i + 1;
      });
      return list;
    }

    // 复制功能

  }, {
    key: 'onCopy',
    value: function onCopy() {
      var table = document.getElementsByClassName('react-batch-feed-back-table')[0],
          range = void 0,
          selection = void 0;
      if (window.getSelection) {
        // Others
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(table);
        selection.removeAllRanges();
        selection.addRange(range);
      } else if (document.body.createTextRange) {
        // IE
        range = document.body.createTextRange();
        range.moveToElementText(table);
        range.select();
      }
      document.execCommand('copy');
      _elementReact.Message.success('复制成功！');
      this.hideDialog();
    }

    // 隐藏

  }, {
    key: 'hideDialog',
    value: function hideDialog() {
      this.props.handleCancel && this.props.handleCancel();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'report-with-copy' },
        _react2.default.createElement(
          _elementReact.Dialog,
          { title: this.state.title, size: 'small', visible: this.state.show, closeOnClickModal: false,
            onCancel: this.hideDialog },
          _react2.default.createElement(
            _elementReact.Dialog.Body,
            null,
            _react2.default.createElement(
              'div',
              { className: 'header' },
              _react2.default.createElement(
                'div',
                { className: 'eg-dialog-alert dialog-alert-icon' },
                _react2.default.createElement('i', { className: 'fa fa-exclamation' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'information' },
                '\u5171\u5904\u7406',
                _react2.default.createElement(
                  'span',
                  { className: 'total' },
                  this.state.total
                ),
                '\u6761\uFF0C\u6210\u529F',
                _react2.default.createElement(
                  'span',
                  { className: 'success' },
                  this.state.total - this.state.failure
                ),
                '\u6761\uFF0C\u5931\u8D25',
                _react2.default.createElement(
                  'span',
                  { className: 'failure' },
                  this.state.failure
                ),
                '\u6761\uFF01'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: this.state.show ? 'eg-grid react-batch-feed-back-table' : 'eg-grid' },
              _react2.default.createElement(_elementReact.Table, {
                style: { width: '100%' },
                columns: this.state.columns,
                maxHeight: 300,
                data: this.state.rows,
                border: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'button-wrapper' },
              _react2.default.createElement(
                _elementReact.Button,
                { size: 'small', type: 'warning', onClick: this.onCopy.bind(this) },
                '\u590D\u5236'
              ),
              _react2.default.createElement(
                _elementReact.Button,
                { size: 'small', type: 'primary', onClick: this.hideDialog },
                '\u786E\u5B9A'
              )
            )
          )
        )
      );
    }
  }]);
  return ReportWithCopy;
}(_react.Component); // 框架


exports.default = ReportWithCopy;