import React from 'react'

let getLocation = {
    title: 'getLocation',
    docWhiter: 'rose233',
    temp: <div className="egDocDefault">
        <h2>getLocation</h2>
        <p className="short">
            设置cookie, 下有3个函数: getElementLeft, getElementTop, toScreenTop. <br/><br/>
            参数说明： <br/>
            element(object):  获取到的nodeList节点<br/>
        </p>
        <div className="def">
            <h4>getElementLeft</h4>
            <p className="how">
                用法： <br/>
                接受1个参数：element<br/>
                返回一个数字 <br/>
                得到此节点到浏览窗口左边界的像素距离
            </p>
            <p className="example">
                示例： <br/>
                let dom = document.querySelector('.test') <br/>
	            let l = egFunc.getElementLeft(dom)
            </p>
        </div>
        <div className="def">
            <h4>getElementTop</h4>
            <p className="how">
            用法： <br/>
                接受1个参数：element<br/>
                返回一个数字 <br/>
                得到此节点到浏览窗口上边界的像素距离
            </p>
            <p className="example">
                示例： <br/>
                let dom = document.querySelector('.test') <br/>
	            let t = egFunc.getElementTop(dom)
            </p>
        </div>
        <div className="def">
            <h4>toScreenTop</h4>
            <p className="how">
            用法： <br/>
                不接受参数<br/>
                返回true <br/>
                回到浏览窗口顶部
            </p>
            <p className="example">
                示例： <br/>
                egFunc.toScreenTop()
            </p>
        </div>
    </div>,
    code: `
const getLocation = {
    getElementLeft: function (element) {
            let actualLeft = element.offsetLeft
            let current = element.offsetParent
            while (current !== null) {
            actualLeft += current.offsetLeft
            current = current.offsetParent
        }
        return actualLeft
    },
    getElementTop: function (element) {
        let actualTop = element.offsetTop
        let current = element.offsetParent
        while (current !== null) {
            actualTop += current.offsetTop
            current = current.offsetParent
        }
        return actualTop
    },
    toScreenTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        return true
    }
}
    `
}
export default getLocation