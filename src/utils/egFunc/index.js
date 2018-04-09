// 所有方法名必须唯一
// 函数以小驼峰方式命名，但辅助函数加上'help_'前缀以提醒此函数不建议使用
// 当有复数时直接末尾加s，如本身末尾为s则加es；将来时末尾加ll，过去式末尾加ed，进行时末尾加ing。无视本身英文规则
// 函数总是有返回值，如果无合适返回值，则返回true

const dealClass = {
  // DOM 元素对类名操作

  // element: 例： document.getElementById('test')
  // cName: 类名
  checkElement: (element, cName) => {
    // 检查节点
    let c0 = element.innerHTML !== undefined,
      c1 = typeof (element.nodeName) === 'string',
      c2 = typeof (cName) === 'string'
    console.log(c0, c1, c2)
    return c0 && c1 && c2
  },
  hasClass: (element, cName) => {
    // 节点是否拥有组名
    if (!dealClass.checkElement(element, cName)) { return false }
    return element.classList.contains(cName)
  },
  addClass: (element, cName) => {
    // 节点添加组名
    if (!dealClass.checkElement(element, cName)) { return }
    element.classList.add(cName)
    return element
  },
  addClasses: (element, ...cNames) => {
    // 节点增加多个类名
    cNames.forEach(v => {
      dealClass.addClass(element, v)
    })
    return element
  },
  addsClass: (...elements) => {
    // 多个节点增加一个类名
    let cName = elements.pop()
    elements.forEach(v => {
      dealClass.addClass(v, cName)
    })
    return elements
  },
  removeClass: (element, cName) => {
    // 节点删除组名
    if (!dealClass.checkElement(element, cName)) { return }
    element.classList.remove(cName)
    return element
  },
  removeClasses: (element, ...cNames) => {
    // 节点删除多个类名
    cNames.forEach(v => {
      dealClass.removeClass(element, v)
    })
    return element
  },
  removesClass: (...elements) => {
    // 多个节点删除一个类名
    let cName = elements.pop()
    elements.forEach(v => {
      dealClass.removeClass(v, cName)
    })
    return elements
  },
  toggleClass: (element, cName) => {
    // 切换组名，如果有就删掉，如果没有就添加
    if (!dealClass.checkElement(element, cName)) { return }
    element.classList.toggle(cName)
    return element
  },
  toggleClasses: (element, ...cNames) => {
    // 节点切换多个类名
    cNames.forEach(v => {
      dealClass.toggleClass(element, v)
    })
    return element
  },
  togglesClass: (...elements) => {
    // 多个节点切换类名
    let cName = elements.pop()
    elements.forEach(v => {
      dealClass.toggleClass(v, cName)
    })
    return elements
  }
}

const dealCookie = {
  // 设置cookie

  // cname :  cookie name
  // cvalue : cookie value
  // exdays: expire time
  setCookie: function (cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; ' + expires + '; path="/"'
    return true
  },
  // 获取cookie
  getCookie: function (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    // for (var i = 0; i < ca.length; i++) {
    for (var i = 0, len = ca.length; i < len; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
  },
  // 清除cookie
  clearCookie: function (name) {
    dealCookie.setCookie(name, '', -1)
    return true
  }
}

const debounce = {
  // 防抖动
  // 用户短时间内，操作次数非常多(例如：1秒内点击10次)，可以设置延时时间1，只执行最后一次。
  // 可以设置延时时间1000（时间是毫秒）
  debounce: function (fn, delay) {
    var timer = null // 声明计时器
    return function () {
      var context = this
      var args = arguments
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  },
  _debounce: function (func, wait, immediate) {
    var timeout,
      args,
      context,
      timestamp,
      result

    var later = function () {
      var last = Date.now() - timestamp

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) {
            context = args = null
          }
        }
      }
    }

    return function () {
      context = this
      args = arguments
      timestamp = Date.now()
      var callNow = immediate && !timeout
      if (!timeout) {
        timeout = setTimeout(later, wait)
      }
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }

      return result
    }
  }
}

const fullScreen = {
  // echarts图表全屏实现

  // id: id
  // myChart:  EChart 图表实例
  // backgroundColor:  全屏背景色
  fullScreenForChart: function (id, myChart, backgroundColor) {
    let chartHeight = document.getElementById(id).offsetHeight
    console.log(chartHeight)
    console.log(id)
    console.log(myChart)
    return {
      myTool: {
        show: true,
        title: '全屏',
        icon: '<path d="M95.4092 48.0676c-3.9168 0.0225-7.8264 1.535-10.8052 4.5322s-4.4667 6.9161-4.4646 10.8339l0.1382 318.4957c0.001 2.006 1.1889 3.9086 3.157 4.7258 1.9681 0.8172 4.1544 0.3154 5.5757-1.0998l107.6572-107.1892 144.341 143.7297c2.7771 2.7658 6.6079 4.4759 10.837 4.4759 4.2301 0 8.0599-1.7091 10.838-4.4759l97.9886-97.5647c2.7935-2.7812 4.523-6.6314 4.523-10.8841s-1.7285-8.1029-4.523-10.8841L316.4119 159.1265 421.0514 54.9396c1.4295-1.4234 1.9374-3.6198 1.1141-5.5962-0.8223-1.9763-2.7392-3.1642-4.7565-3.1519L95.4092 48.0676z" p-id="2333"></path><path d="M95.531 941.9407c-3.9373 0.0082-7.8776-1.4879-10.8841-4.4902-3.0075-3.0013-4.5097-6.9386-4.5087-10.8769l0.1382-321.1756c0.001-2.006 1.1889-3.9086 3.157-4.7258 1.9681-0.8172 4.1544-0.3154 5.5757 1.1008l107.6562 107.2005 144.34-143.742c2.7771-2.7658 6.6079-4.4759 10.838-4.4759s8.0609 1.7101 10.838 4.4759l97.9896 97.5759c2.7935 2.7822 4.522 6.6314 4.522 10.8851 0 4.2527-1.7285 8.1029-4.522 10.8841L316.4119 828.2143l104.7398 104.2852c1.4234 1.4182 1.9343 3.6055 1.1223 5.5777-0.812 1.9722-2.7146 3.1662-4.7237 3.1713L95.531 941.9407z" p-id="2334"></path><path d="M960.7096 48.0676c3.9168 0.0225 7.8264 1.535 10.8052 4.5322 2.9798 2.9983 4.4667 6.9171 4.4646 10.8339l-0.1382 318.4957c-0.001 2.006-1.1878 3.9086-3.156 4.7258-1.9681 0.8172-4.1544 0.3154-5.5757-1.0998L859.4534 278.3662 715.0991 422.0969c-2.7781 2.7658-6.6079 4.4759-10.838 4.4759s-8.0599-1.7101-10.838-4.4759l-97.9763-97.5636c-2.7945-2.7812-4.522-6.6314-4.522-10.8841 0-4.2527 1.7285-8.1029 4.522-10.8841L739.7069 159.1265 635.0674 54.9396c-1.4295-1.4234-1.9374-3.6198-1.1141-5.5962 0.8233-1.9763 2.7402-3.1642 4.7575-3.1519L960.7096 48.0676z" p-id="2335"></path><path d="M960.5868 941.9407c3.9383 0.0082 7.8776-1.4879 10.8851-4.4902 3.0075-3.0013 4.5097-6.9386 4.5076-10.8769l-0.1382-321.1756c-0.001-2.007-1.1878-3.9086-3.156-4.7258-1.9681-0.8182-4.1544-0.3164-5.5757 1.0998L859.4534 708.9736 715.1002 565.2316c-2.7781-2.7658-6.6089-4.4759-10.839-4.4759s-8.0599 1.7101-10.838 4.4769l-97.9784 97.5749c-2.7935 2.7822-4.521 6.6314-4.521 10.8851 0 4.2527 1.7285 8.1019 4.523 10.8831L739.7069 828.2143 634.9681 932.4995c-1.4244 1.4182-1.9354 3.6055-1.1223 5.5777 0.812 1.9722 2.7136 3.1662 4.7227 3.1713L960.5868 941.9407z" p-id="2336"></path>',

        onclick: function () {
          window.event.preventDefault()
          console.log(id)
          console.log(myChart)
          console.log(chartHeight)

          var chartStyle = document.getElementById(id).style

          chartStyle.width = '100%'
          chartStyle.height = '100%'
          chartStyle.top = 0
          chartStyle.left = 0
          chartStyle['z-index'] = 99999999
          console.log(chartStyle)
          var option = {
            toolbox: {
              feature: {
                myTool: {
                  show: false
                },
                myTool1: {
                  show: true
                }
              }
            }
          }
          console.log(myChart.getOption())
          myChart.setOption(option)
          console.log(myChart)
          chartStyle.position = 'fixed'

          myChart.resize({

            width: 'auto',
            height: 'auto'

          })
          chartStyle.position = 'fixed'

          chartStyle.background = backgroundColor || '#fff'
        }

      },
      myTool1: {
        show: false,
        title: '退出',
        icon: '<path d="M580.18816 618.1376c-3.82976-29.312 9.2672-43.03872 39.28576-41.15968l235.68384 26.1888c18.52416 1.8688 30.34624 7.0144 35.456 15.44192 5.10976 8.4224 2.23232 17.93024-8.63232 28.53888-7.01952 6.23104-15.65184 14.81216-25.86112 25.728-10.21952 10.91072-18.85184 19.79904-25.87648 26.65984-7.02464 7.49056-9.2672 14.35136-6.7072 20.58752 2.56 6.23616 7.65952 13.40928 15.32928 21.51936 17.88928 16.83968 34.17088 32.11776 48.86528 45.84448 14.68416 13.71648 30.976 29.62432 48.85504 47.71328 3.83488 3.7376 7.66976 7.79776 11.49952 12.16 3.84 4.37248 6.71232 9.20064 8.63232 14.51008 1.90976 5.2992 2.23232 10.91584 0.95744 16.83456-1.28 5.92384-5.43232 12.31872-12.45696 19.18464-3.82976 3.7376-7.02464 7.00928-9.57952 9.82016-2.56 2.81088-5.12 5.30432-7.66976 7.49056-2.55488 2.18112-5.26848 4.67968-8.1408 7.48032-2.88256 2.80576-6.54848 6.71232-11.02336 11.6992-12.7744 12.47744-24.58624 17.78176-35.44576 15.8976-10.8544-1.85856-22.6816-9.04192-35.45088-21.51424s-25.86624-25.10336-39.28064-37.89312c-13.40928-12.78464-28.43136-27.28448-45.0304-43.50976-12.13952-11.22304-22.51776-19.0208-31.13984-23.38304-8.62208-4.37248-17.09056-2.49344-25.39008 5.61664-5.74976 5.61152-12.93312 12.30848-21.56032 20.11136-8.62208 7.79776-16.128 14.8224-22.50752 21.04832-10.85952 10.60352-20.59776 14.66368-29.22496 12.17024-8.6272-2.49856-13.89568-11.8528-15.80544-28.06784L580.18816 618.1376 580.18816 618.1376 580.18816 618.1376zM438.4256 400.96256c1.92 16.22016-0.16384 27.44832-6.22592 33.6896-6.07232 6.23616-16.768 8.7296-32.09728 7.48032l-235.68896-26.19904c-19.16928-1.8688-31.13984-7.01952-35.93216-15.4368-4.79232-8.41728-1.75616-17.93024 9.09312-28.53376 6.39488-6.23616 14.22336-14.34624 23.48032-24.33024 9.26208-9.984 17.40288-18.40128 24.42752-25.25696 7.66976-7.49056 10.22464-14.34624 7.66976-20.58752-2.55488-6.23616-7.9872-13.40928-16.29184-21.51936-8.30464-8.73472-16.12288-16.36864-23.47008-22.91712-7.3472-6.54848-14.53056-13.10208-21.5552-19.65056-7.02976-6.54848-14.37184-13.568-22.03136-21.04832l-23.9616-23.3984c-3.83488-3.7376-7.50592-8.10496-11.01312-13.09184-3.51744-4.99712-6.07744-10.29632-7.66464-15.90784-1.59744-5.61664-1.43872-11.53536 0.47616-17.77664 1.92-6.24128 6.0672-12.47232 12.45184-18.7136l10.53696-10.29632c2.56-2.49344 4.95616-4.98688 7.18848-7.48032 2.23744-2.49344 4.94592-4.98688 8.14592-7.48544l10.53696-11.22816c12.7744-12.47232 23.79264-17.15712 33.05472-14.03392 9.26208 3.1232 20.28032 10.91584 33.05984 23.39328 12.7744 12.47232 24.9088 24.17152 36.4032 35.08736 11.49952 10.91584 25.5488 24.48384 42.15808 40.69888 11.49952 11.23328 21.71904 19.02592 30.65856 23.39328 8.94464 4.36736 17.56672 2.49856 25.87136-5.61152 5.74464-6.23616 13.72672-13.88032 23.95136-22.92224 10.21952-9.04704 18.51904-16.6912 24.9088-22.92736 10.85952-10.60352 20.43904-14.65856 28.74368-12.16 8.30464 2.49344 13.40928 11.84768 15.32928 28.06272L438.4256 400.96256 438.4256 400.96256 438.4256 400.96256zM623.09888 442.36288c-16.60928 1.8688-28.09856-0.15872-34.48832-6.08256-6.38976-5.92896-8.93952-16.6912-7.65952-32.2816l26.81856-230.1696c1.91488-18.09408 7.18336-29.62944 15.81568-34.62144 8.61696-4.98688 18.36032-1.8688 29.21472 9.35936 6.38976 6.23616 14.68928 13.88032 24.9088 22.92224 10.21952 9.04704 18.85184 16.9984 25.87136 23.86432 7.66976 6.85568 14.6944 9.20064 21.07904 7.0144 6.38976-2.176 13.73184-7.33184 22.0416-15.43168 17.23904-16.8448 32.41472-32.128 45.51168-45.85472 13.09184-13.72672 28.57472-29.31712 46.45888-46.78144 3.82976-3.74272 8.30464-7.33184 13.41952-10.76224 5.10976-3.43552 10.54208-5.92384 16.28672-7.48544 5.74464-1.55648 11.81696-1.40288 18.20672 0.46592 6.38464 1.87392 12.76928 6.24128 19.15904 13.1072 3.82976 3.74272 7.17824 6.8608 10.06592 9.35424 2.87232 2.49344 5.58592 4.992 8.1408 7.48544 2.55488 2.48832 5.26848 4.98688 8.1408 7.48544 2.87744 2.49344 6.54336 6.23104 11.02336 11.22816 12.76928 12.47232 17.87904 23.38304 15.31904 32.7424-2.54976 9.35936-10.53184 20.27008-23.95136 32.74752l-36.40832 37.43232c-12.12928 12.48256-26.51136 26.81856-43.1104 43.0336-12.13952 11.23328-20.43904 21.21216-24.91904 29.94688-4.45952 8.73472-2.23232 16.83968 6.72256 24.32512 5.73952 5.61152 13.09184 13.2608 22.03136 22.92224 8.94464 9.67168 16.60416 17.62304 22.99392 23.8592 10.85952 10.61376 15.01184 19.96288 12.45696 28.06784-2.54976 8.11008-12.12928 13.09696-28.73856 14.96576L623.09888 442.36288 623.09888 442.36288 623.09888 442.36288zM398.70976 579.712c15.96928-1.24928 27.30496 1.09056 34.00704 7.01952 6.71744 5.91872 9.42592 16.36864 8.14592 31.33952l-26.82368 230.16448c-1.91488 18.7136-7.18848 30.4128-15.81056 35.09248-8.61696 4.66944-18.36032 1.70496-29.21984-8.89344-6.39488-6.23616-15.17056-14.34624-26.34752-24.32512-11.1872-9.97888-20.28032-18.41152-27.31008-25.26208-7.66976-7.48544-14.0544-10.76224-19.16416-9.82528-5.10976 0.92672-11.4944 5.4528-19.16416 13.55264-8.30976 8.11008-16.2816 16.07168-23.94624 23.86944s-15.3344 15.43168-22.99904 22.92224c-7.66464 7.48032-15.488 15.27808-23.47008 23.39328-7.9872 8.10496-16.44544 16.52224-25.39008 25.2672-3.83488 3.7376-7.9872 7.48032-12.46208 11.21792-4.46976 3.74272-9.41568 6.54848-14.84288 8.42752-5.4272 1.87392-11.17696 2.02752-17.24416 0.46592-6.07744-1.55648-12.6208-5.77024-19.64544-12.62592-3.83488-3.74272-7.18336-6.86592-10.0608-9.36448-2.87744-2.48832-5.59104-4.992-8.1408-7.48032l-7.66976-8.4224-11.49952-10.30144c-12.76928-12.47232-18.36032-23.84896-16.76288-34.1504 1.60256-10.2912 9.10848-21.98528 22.51776-35.09248 12.12928-11.84256 24.90368-24.47872 38.31808-37.888s28.42112-28.22656 45.0304-44.4416c11.50464-11.22816 18.68288-20.42368 21.5552-27.60192 2.87744-7.168 0.16384-14.81728-8.1408-22.93248-6.39488-5.60128-13.57312-12.6208-21.5552-21.04832-7.9872-8.4224-15.1808-15.73888-21.56032-21.98016-10.86464-10.60864-14.85824-19.968-11.9808-28.07296 2.87744-8.10496 12.61568-13.09696 29.22496-14.96576L398.70976 579.712 398.70976 579.712 398.70976 579.712z" p-id="1484"></path>',
        onclick: function () {
          window.event.preventDefault()

          console.log(13)
          var chartStyle = document.getElementById(id).style
          if (document.querySelector('#hideTable') !== undefined && document.querySelector('#hideTable').classList.contains('hideTable')) {
                      // console.log(14);
            chartStyle.width = '44.5%'
          } else {
                      // console.log(15);
            chartStyle.width = '100%'
          }
          chartStyle.height = chartHeight + 'px'
          chartStyle['z-index'] = 1

          var option = {
            toolbox: {
              feature: {
                myTool: {
                  show: true
                },
                myTool1: {
                  show: false
                }
              }
            }
          }
          myChart.setOption(option)
          myChart.resize({
            width: 'auto',
            height: 'auto'
          })
        }
      }
    }
  }
}

const getLocation = {
  // 页面获取坐标信息

  // element : document.getElementById('test')

  // 获取元素绝对位置横坐标
  getElementLeft: function (element) {
    let actualLeft = element.offsetLeft
    let current = element.offsetParent
    while (current !== null) {
      actualLeft += current.offsetLeft
      current = current.offsetParent
    }
    return actualLeft
  },
  // 获取元素绝对位置纵坐标
  getElementTop: function (element) {
    let actualTop = element.offsetTop
    let current = element.offsetParent
    while (current !== null) {
      actualTop += current.offsetTop
      current = current.offsetParent
    }
    return actualTop
  },
  toScreenTop () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    return true
  }
}

const picture = {
  // 图片放大展示（常用于表格中）

  // event: event || e
  // pic: 图片地址
  // picH: 要显示大图的高度
  showPic: function (event, pic, picH = 200) {
    picture.hidePic()
    if (document.getElementById('bigerBigerShowImgBox') === null) {
      let box = document.createElement('div')
      let img = document.createElement('img')
      box.id = 'bigerBigerShowImgBox'
      img.id = 'bigerBigerShowImg'
      document.body.appendChild(box)
      box.appendChild(img)
    }
    let [x, y, winW, winH] = [event.clientX, event.clientY, window.innerWidth, window.innerHeight]
    let boxDom = document.querySelector('#bigerBigerShowImgBox')
    let imgDom = document.querySelector('#bigerBigerShowImg')
    boxDom.style.opacity = 0
    imgDom.style.cssText = `height: ${picH}px;`
    imgDom.src = pic
    imgDom.onload = () => {
      let [imgW, imgH] = [imgDom.offsetWidth, imgDom.offsetHeight]
      if (x + imgW > winW) { x -= imgW }
      if (y + imgH > winH) { y -= imgH }
      boxDom.style.cssText = `
        position: absolute;
        z-index: 233;
        top: ${y}px;
        left: ${x}px;
        opacity: 1;
      `
    }
    return boxDom
  },
  hidePic: function () {
    let toRemove = document.querySelector('#bigerBigerShowImgBox')
    if (toRemove === null) { return }
    document.body.removeChild(toRemove)
    return true
  }
}

const time = {
  // 时间日期处理
  help_add0: function (s) {
    // 辅助函数，使个位数变成2位字符串
    return ('00' + s).substr(-2)
  },
  help_toString: (arr, brage) => {
    let re = ''
    switch (brage) {
      case 'chd':
        re = `${arr[0]}年${arr[1]}月${arr[2]}日`
        break
      case 'cht':
        re = `${arr[0]}时${arr[1]}分${arr[2]}秒`
        break
      default:
        re = arr.join(brage)
        break
    }
    return re
  },
  getDay: function (n, brage = 'no') {
    // 获取距现在天数为n(整数，负或正分别代表前或后)的年月日 或传日期对象
    // brage 根据brage 确定展示格式
    let [currentDate, toTime, day] = [new Date(), 0, null]
    switch (typeof (n)) {
      case 'object':
        day = n
        break
      case 'number':
        n = n | 0
        toTime = currentDate.getTime() + 24 * 60 * 60 * 1000 * n
        day = new Date(toTime)
        break
      default:
        return
    }
    let y = '' + day.getFullYear(),
      m = time.help_add0(day.getMonth() + 1),
      d = time.help_add0(day.getDate())
    let re = [y, m, d]
    if (brage === 'no') {
      return re
    } else {
      return time.help_toString(re, brage)
    }
  },
  getTime: function (n, brage = 'no') {
    // 获取距现在毫秒数为n(整数，负或正分别代表前或后)的时分秒或传 日期对象
    // brage 根据brage 确定展示格式
    let [currentDate, toTime, day] = [new Date(), 0, null]
    switch (typeof (n)) {
      case 'object':
        day = n
        break
      case 'number':
        n = n | 0
        toTime = currentDate.getTime() + n
        day = new Date(toTime)
        break
      default:
        return
    }
    let h = time.help_add0(day.getHours()),
      m = time.help_add0(day.getMinutes()),
      s = time.help_add0(day.getSeconds())
    let re = [h, m, s]
    if (brage === 'no') {
      return re
    } else {
      return time.help_toString(re, brage)
    }
  }
}

const setSequence = {
  // 给数组添加序号，常用于给表格数据添加序号，column字段名为key
  setOrder: function (list, page, pageSize) {
    const base = (Number(page) - 1) * Number(pageSize)
    list.forEach((el, i) => {
      el.key = i + 1 + base
    })
    return list
  }
}


export default {
  ...dealCookie,
  ...dealClass,
  ...debounce,
  ...fullScreen,
  ...getLocation,
  ...picture,
  ...time,
  ...setSequence
}
