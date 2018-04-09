'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('@/css/EgGrid/ImgFormatter/ImgFormatter.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImgFormatter = function (_Component) {
  (0, _inherits3.default)(ImgFormatter, _Component);

  function ImgFormatter() {
    (0, _classCallCheck3.default)(this, ImgFormatter);
    return (0, _possibleConstructorReturn3.default)(this, (ImgFormatter.__proto__ || (0, _getPrototypeOf2.default)(ImgFormatter)).apply(this, arguments));
  }

  (0, _createClass3.default)(ImgFormatter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'img-formatter', style: { textAlign: 'center', marginLeft: '-8px' } },
        _react2.default.createElement('img', { alt: '', src: this.props.value, style: { height: '30px', marginTop: 3 },
          onMouseMove: function onMouseMove(e) {
            return showPic((0, _extends3.default)({}, e), _this2.props.value);
          }, onMouseOut: hidePic
        })
      );
    }
  }]);
  return ImgFormatter;
}(_react.Component);

exports.default = ImgFormatter;


function showPic(event, pic) {
  // console.log(event)

  if (!document.getElementById('picImg')) {
    var picDiv = document.createElement('div');
    picDiv.id = 'picUrl';
    picDiv.style.display = 'none';
    // <div id="picUrl" style="display: none;"></div>
    var picImg = document.createElement('img');
    picImg.style.width = '280px';
    picImg.style.height = '280px';
    picImg.id = 'picImg';
    // <img src="" style="width: 280px;height: 280px;;" alt="" id="picImg">
    picDiv.appendChild(picImg);
    document.body.appendChild(picDiv);
  }

  var x = event.clientX,
      y = event.clientY,
      lImgWidth = 280,
      sImgWidth = 20,
      windowHeight = window.innerHeight,
      windowWidth = window.innerWidth;
  if (windowHeight - y < lImgWidth) {
    y -= lImgWidth + sImgWidth;
  } else {
    y += sImgWidth;
  }
  if (windowWidth - x < lImgWidth) {
    x -= lImgWidth + sImgWidth;
  } else {
    x += sImgWidth;
  }

  document.getElementById('picImg').src = pic;

  var picStyle = document.getElementById('picUrl').style;
  // console.log(picStyle)
  // console.log(x)
  // console.log(y)
  picStyle.display = 'block';
  picStyle.border = 0;
  picStyle.position = 'absolute';
  picStyle.left = x + 'px';
  picStyle.top = y + 'px';
  picStyle.zIndex = 99999;
}

function hidePic(event, pic) {
  document.getElementById('picUrl').style.display = 'none';
}