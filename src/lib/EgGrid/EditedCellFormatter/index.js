'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTreeOptions = exports.getMapOfFieldToEditedCellModel = exports.getEditableCellFormatter = exports.EditableCellFormatter = undefined;

require('../../../css/EgGrid/EditedCellFormatter/index.css');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _model = require('./model');

var _formatters = require('./formatters');

var _formatters2 = _interopRequireDefault(_formatters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)('#root').on('focus', '.ejl-grid-cell--editable', function (e) {
  e.stopPropagation();
}).on('dblclick', '.ejl-grid-cell--editable', function (e) {
  e.stopPropagation();
}).on('click', '.ejl-grid-cell--editable', function (e) {
  var $ele = (0, _jquery2.default)(e.target);
  setTimeout(function () {
    return $ele.focus();
  }, 0);
}).on('keyup', '.ejl-grid-cell--editable .el-input__inner', function (e) {
  e.stopPropagation();
  if (e.keyCode == 13) (0, _jquery2.default)(this).blur();
}).on('click', '.ejl-grid-cell__select .el-select,.ejl-grid-cell__select .el-cascader', function (e) {
  var _this = this;

  (0, _jquery2.default)(this).closest('.react-grid-Cell').addClass('editing');
  setTimeout(function () {
    return (0, _jquery2.default)(_this).focus();
  }, 0);
});

exports.EditableCellFormatter = _formatters2.default;
exports.getEditableCellFormatter = _formatters.getEditableCellFormatter;
exports.getMapOfFieldToEditedCellModel = _model.getMapOfFieldToEditedCellModel;
exports.getTreeOptions = _model.getTreeOptions;