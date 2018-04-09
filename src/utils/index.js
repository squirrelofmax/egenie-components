
import egFetch from './egFetch'
import egFunc from './egFunc'
import EgReportWithCopy from './EgReportWithCopy/ReportWithCopy'

export {
	egFetch,
	egFunc,
  EgReportWithCopy
}

let testDealClass = () => {
	let dom0 = document.querySelector('.left')
	let dom1 = document.querySelector('.right')

	function testHasClass() {
		let re0 = egFunc.hasClass(dom0, 'left')
		let re1 = egFunc.hasClass(dom0, 'right')
		console.log('是否有组left', re0);
		console.log('是否有组right', re1);
	}
	testHasClass()

	function testAdd() {
		let re0 = egFunc.addClass(dom0, 'c0')
		console.log('添加1个', re0);
		let re1 = egFunc.addClasses(dom0, 'c1', 'c2', 'c3', 'c4')
		console.log('添加多个组', re1);
		let re2 = egFunc.addsClass(dom0, dom1, 'cc')
		console.log('多个节点添加组', re2);
	}
	testAdd()

	function testRemove() {
		let re0 = egFunc.removeClass(dom0, 'c0')
		console.log('删除1个', re0);
		let re1 = egFunc.removeClasses(dom0, 'c1', 'c2', 'c3', 'c4')
		console.log('删除多个组', re1);
		let re2 = egFunc.removesClass(dom0, dom1, 'cc')
		console.log('多个节点删除组', re2);
	}
	testRemove()

	function testToggleClass() {
		let re0 = egFunc.toggleClass(dom0, 'c0')
		console.log('切换1个', re0);
		let re1 = egFunc.toggleClasses(dom0, 'c1', 'c2', 'c3', 'c4')
		console.log('切换多个组', re1);
		let re2 = egFunc.togglesClass(dom0, dom1, 'cc')
		console.log('多个节点切换组', re2);
	}
	testToggleClass()
}
// setTimeout(() => {testDealClass()}, 2000);

let testTime = () => {
	function testDay() {
		let re0 = egFunc.getDay(2)
		let re1 = egFunc.getDay(2, '-')
		let re2 = egFunc.getDay(2, 'chd')
		console.log('getDay');
		console.log(re0);
		console.log(re1);
		console.log(re2);
	}
	testDay()
	function testTime() {
		let re0 = egFunc.getTime(2)
		let re1 = egFunc.getTime(2, '/')
		let re2 = egFunc.getTime(2, 'cht')
		console.log('getTime');
		console.log(re0);
		console.log(re1);
		console.log(re2);
	}
	testTime()
}
// testTime()

let testGetLocation = () => {
	function testElementLeft() {
		let dom = document.querySelector('.def')
		let re = egFunc.getElementLeft(dom)
		console.log('left:', re);
	}
	testElementLeft()

	function testElementTop() {
		let dom = document.querySelector('.def')
		let re = egFunc.getElementTop(dom)
		console.log('top:', re);
	}
	testElementTop()
}
// setTimeout(() => {testGetLocation()}, 2000)

let testPicture = () => {
	let src = 'http://p57lq8o49.bkt.clouddn.com/copyqidianbigbg.png'
	let showDom = document.querySelector('.right')
	showDom.onclick = (e) => {
		console.log('显示图片');
		let d = egFunc.showPic(e, src)
		console.log(d);
	}
	let hidDom = document.querySelector('.left')
	hidDom.onclick = () => {
		console.log('隐藏图片');
		egFunc.hidePic()
	}
}
// setTimeout(() => {testPicture()}, 2000)

let testCookie = () => {
	function set() {
		egFunc.setCookie('cnm', 'cvl', 1)
	}
	set()

	function get() {
		let a = egFunc.getCookie('cnm')
		console.log(a);
	}
	get()

	function remove() {
		egFunc.clearCookie('cnm')
	}
	remove()
}
// testCookie()

let testDebounce = () => {
	let t = () => {
		console.log('直接执行');
	}
	let t0 = () => {
		console.log('普通防抖');
		return 233
	}
	let t1 = () => {
		console.log('立即执行');
	}
	let t2 = () => {
		console.log('等待执行');
	}
	let d = {
		a: t,
		b: egFunc.debounce(t0, 1000),
		c: egFunc._debounce(t1, 1000, true),
		d: egFunc._debounce(t2, 1000, false),
	}
	d.a(); d.a(); d.a(); d.a(); 
	d.b(); d.b(); d.b(); d.b(); 
	d.c(); d.c(); d.c(); d.c(); 
	d.d(); d.d(); d.d(); d.d(); 
}
// testDebounce()