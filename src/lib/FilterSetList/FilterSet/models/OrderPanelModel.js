'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderPanelModel = function () {
  function OrderPanelModel(options) {
    var _this = this;

    (0, _classCallCheck3.default)(this, OrderPanelModel);
    this.toggleShow = (0, _mobx.action)(function (e) {
      e = (0, _extends3.default)({}, e);
      if (!_this.show) {
        var _e = e,
            clientY = _e.clientY,
            offsetY = _e.nativeEvent.offsetY,
            offsetHeight = _e.target.offsetHeight;

        var middleLine = clientY - offsetY + parseInt(offsetHeight / 2);
        var diaY = middleLine + 14 + 6; // 14是Button的高的一半，6是箭头高度
        _this.diaY = diaY;
      }
      _this.show = !_this.show;
    });
    this.onSave = (0, _mobx.action)(function () {
      _this.toggleShow();
      // 赋值initIndex与initDisplay
      _this.top.filteritems.forEach(function (item, index) {
        item.initIndex = index;
        item.initDisplay = item.display;
      });
      // 把数据传给后端
      // ...
    });
    this.onCancel = (0, _mobx.action)(function () {
      _this.reset();
      _this.toggleShow();
    });
    this.reset = (0, _mobx.action)(function () {
      // 重置显示与否
      _this.top.filteritems.forEach(function (item) {
        item.display = item.initDisplay;
      });
      // 重置顺序，attention：这里sort并不能改变filteritems必须再次赋值，原因是
      // mobx 数组的sort/reverse方法是先slice再sort。
      _this.top.filteritems = _this.top.filteritems.sort(function (a, b) {
        return Number(a.initIndex) - Number(b.initIndex);
      });
    });
    this.resetToOriginalOrder = (0, _mobx.action)(function () {
      var firstIndexOfHiddenItem = _this.firstIndexOfHiddenItem;

      var idx = ~firstIndexOfHiddenItem ? firstIndexOfHiddenItem : _this.top.filteritems.length;
      _this.top.filteritems = _this.top.filteritems.slice(0, idx).sort(function (a, b) {
        return Number(a.originalIndex) - Number(b.originalIndex);
      }).concat(_this.top.filteritems.slice(idx));
    });
    this.onSortEnd = (0, _mobx.action)(function (_ref) {
      var oldIndex = _ref.oldIndex,
          newIndex = _ref.newIndex;

      oldIndex += _this.top.sliceFromIndex;
      newIndex += _this.top.sliceFromIndex;
      var firstIndexOfHiddenItem = _this.firstIndexOfHiddenItem;
      var display = _this.top.filteritems[oldIndex].display;

      newIndex = display // 控制使得display=true的都在前边，=false的都在后边
      ? ~firstIndexOfHiddenItem ? newIndex < firstIndexOfHiddenItem ? newIndex : firstIndexOfHiddenItem - 1 : newIndex : newIndex < firstIndexOfHiddenItem ? firstIndexOfHiddenItem : newIndex;

      _this.arrayMove(_this.top.filteritems, oldIndex, newIndex);
    });
    this.onSwitch = (0, _mobx.action)(function (index, v) {
      index += _this.top.sliceFromIndex;
      var firstIndexOfHiddenItem = _this.firstIndexOfHiddenItem; // 必须在赋值v之前获取

      _this.top.filteritems[index].display = v;
      if (!v) return _this.arrayMove(_this.top.filteritems, index, _this.top.filteritems.length - 1);
      _this.arrayMove(_this.top.filteritems, index, firstIndexOfHiddenItem);
    });

    (0, _mobx.extendObservable)(this, (0, _extends3.default)({
      id: _shortid2.default.generate(),
      show: false,
      diaY: 20,
      top: {},
      get firstIndexOfHiddenItem() {
        return this.top.filteritems.findIndex(function (item) {
          return !item.display;
        });
      }
    }, options || {}));
  }

  // actions


  (0, _createClass3.default)(OrderPanelModel, [{
    key: 'arrayMove',


    // utils
    value: function arrayMove(array, previousIndex, newIndex) {
      if (newIndex >= array.length) {
        var k = newIndex - array.length;
        while (k-- + 1) {
          array.push(undefined);
        }
      }
      array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
    }
  }]);
  return OrderPanelModel;
}();

exports.default = OrderPanelModel;