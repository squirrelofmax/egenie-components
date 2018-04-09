'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EgReportWithCopy = exports.egFunc = exports.egFetch = undefined;

var _egFetch = require('./egFetch');

var _egFetch2 = _interopRequireDefault(_egFetch);

var _egFunc = require('./egFunc');

var _egFunc2 = _interopRequireDefault(_egFunc);

var _ReportWithCopy = require('./EgReportWithCopy/ReportWithCopy');

var _ReportWithCopy2 = _interopRequireDefault(_ReportWithCopy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.egFetch = _egFetch2.default;
exports.egFunc = _egFunc2.default;
exports.EgReportWithCopy = _ReportWithCopy2.default;


var testDealClass = function testDealClass() {
	var dom0 = document.querySelector('.left');
	var dom1 = document.querySelector('.right');

	function testHasClass() {
		var re0 = _egFunc2.default.hasClass(dom0, 'left');
		var re1 = _egFunc2.default.hasClass(dom0, 'right');
		console.log('是否有组left', re0);
		console.log('是否有组right', re1);
	}
	testHasClass();

	function testAdd() {
		var re0 = _egFunc2.default.addClass(dom0, 'c0');
		console.log('添加1个', re0);
		var re1 = _egFunc2.default.addClasses(dom0, 'c1', 'c2', 'c3', 'c4');
		console.log('添加多个组', re1);
		var re2 = _egFunc2.default.addsClass(dom0, dom1, 'cc');
		console.log('多个节点添加组', re2);
	}
	testAdd();

	function testRemove() {
		var re0 = _egFunc2.default.removeClass(dom0, 'c0');
		console.log('删除1个', re0);
		var re1 = _egFunc2.default.removeClasses(dom0, 'c1', 'c2', 'c3', 'c4');
		console.log('删除多个组', re1);
		var re2 = _egFunc2.default.removesClass(dom0, dom1, 'cc');
		console.log('多个节点删除组', re2);
	}
	testRemove();

	function testToggleClass() {
		var re0 = _egFunc2.default.toggleClass(dom0, 'c0');
		console.log('切换1个', re0);
		var re1 = _egFunc2.default.toggleClasses(dom0, 'c1', 'c2', 'c3', 'c4');
		console.log('切换多个组', re1);
		var re2 = _egFunc2.default.togglesClass(dom0, dom1, 'cc');
		console.log('多个节点切换组', re2);
	}
	testToggleClass();
};
// setTimeout(() => {testDealClass()}, 2000);

var testTime = function testTime() {
	function testDay() {
		var re0 = _egFunc2.default.getDay(2);
		var re1 = _egFunc2.default.getDay(2, '-');
		var re2 = _egFunc2.default.getDay(2, 'chd');
		console.log('getDay');
		console.log(re0);
		console.log(re1);
		console.log(re2);
	}
	testDay();
	function testTime() {
		var re0 = _egFunc2.default.getTime(2);
		var re1 = _egFunc2.default.getTime(2, '/');
		var re2 = _egFunc2.default.getTime(2, 'cht');
		console.log('getTime');
		console.log(re0);
		console.log(re1);
		console.log(re2);
	}
	testTime();
};
// testTime()

var testGetLocation = function testGetLocation() {
	function testElementLeft() {
		var dom = document.querySelector('.def');
		var re = _egFunc2.default.getElementLeft(dom);
		console.log('left:', re);
	}
	testElementLeft();

	function testElementTop() {
		var dom = document.querySelector('.def');
		var re = _egFunc2.default.getElementTop(dom);
		console.log('top:', re);
	}
	testElementTop();
};
// setTimeout(() => {testGetLocation()}, 2000)

var testPicture = function testPicture() {
	var src = 'http://p57lq8o49.bkt.clouddn.com/copyqidianbigbg.png';
	var showDom = document.querySelector('.right');
	showDom.onclick = function (e) {
		console.log('显示图片');
		var d = _egFunc2.default.showPic(e, src);
		console.log(d);
	};
	var hidDom = document.querySelector('.left');
	hidDom.onclick = function () {
		console.log('隐藏图片');
		_egFunc2.default.hidePic();
	};
};
// setTimeout(() => {testPicture()}, 2000)

var testCookie = function testCookie() {
	function set() {
		_egFunc2.default.setCookie('cnm', 'cvl', 1);
	}
	set();

	function get() {
		var a = _egFunc2.default.getCookie('cnm');
		console.log(a);
	}
	get();

	function remove() {
		_egFunc2.default.clearCookie('cnm');
	}
	remove();
};
// testCookie()

var testDebounce = function testDebounce() {
	var t = function t() {
		console.log('直接执行');
	};
	var t0 = function t0() {
		console.log('普通防抖');
		return 233;
	};
	var t1 = function t1() {
		console.log('立即执行');
	};
	var t2 = function t2() {
		console.log('等待执行');
	};
	var d = {
		a: t,
		b: _egFunc2.default.debounce(t0, 1000),
		c: _egFunc2.default._debounce(t1, 1000, true),
		d: _egFunc2.default._debounce(t2, 1000, false)
	};
	d.a();d.a();d.a();d.a();
	d.b();d.b();d.b();d.b();
	d.c();d.c();d.c();d.c();
	d.d();d.d();d.d();d.d();
};
// testDebounce()