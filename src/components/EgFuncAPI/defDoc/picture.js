import React from 'react'

let picture = {
    title: 'picture',
    docWhiter: 'rose233',
    temp: <div className="egDocDefault">
        <h2>picture</h2>
        <p className="short">
        图片放大展示（常用于表格中）, 下有2个函数: showPic, hidePic <br/><br/>
            参数说明： <br/>
            event(鼠标事件) <br/>
            pic(string),图片地址
        </p>
        <div className="def">
            <h4>showPic</h4>
            <p className="how">
              用法： <br/>
              接受2个参数：event事件对象，图片地址链接<br/>
              返回存放图片的nodeList节点。
            </p>
            <p className="example">
              示例：<br/>
              let src = 'http://p57lq8o49.bkt.clouddn.com/copyqidianbigbg.png' <br/>
              let dom = document.querySelector('.test') <br/>
              dom.onclick = (e) => {'{'} <br/>
              &nbsp;&nbsp;  egFunc.showPic(e, src) <br/>
              } <br/>
            </p>
            <p className="more">
              使用innerHTML可能会引起事件失效问题
            </p>
        </div>
        <div className="def">
            <h4>hidePic</h4>
            <p className="how">
              用法： <br/>
              不接受参数<br/>
              返回true。
            </p>
            <p className="example">
              示例：<br/>
              egFunc.hidePic() <br/>
            </p>
        </div>
      </div>,
    code: `
    const picture = {
      showPic: function (event, pic) {
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
        imgDom.style.cssText = \`height: 200px;\`
        imgDom.src = pic
        imgDom.onload = () => {
          let [imgW, imgH] = [imgDom.offsetWidth, imgDom.offsetHeight]
          if (x + imgW > winW) {x -= imgW}
          if (y + imgH > winH) {y -= imgH}
          boxDom.style.cssText = \`
            position: absolute;
            z-index: 233;
            top: \${y}px;
            left: \${x}px;
            opacity: 1;
          \`
        }
        return boxDom
      },
      hidePic: function () {
        let toRemove = document.querySelector('#bigerBigerShowImgBox')
        if (toRemove === null) {return}
        document.body.removeChild(toRemove)
        return true
      }
    }
    `
}
export default picture