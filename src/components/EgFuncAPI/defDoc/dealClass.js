import React from 'react'

let dealClass = {
    title: 'dealClass',
    docWhiter: 'rose233',
    temp: <div className="egDocDefault">
        <h2>dealClass</h2>
        <p className="short">
            DOM 节点对类名操作, <br/>
            有4个基本函数: hasClass, addClass, removeClass, toggleClass <br/>
            6个扩展函数: addClasses, addsClass, removeClasses, removesClass, toggleClasses, togglesClass, <br/><br/>
            参数说明： <br/>
            element(object): 获取到的nodeList节点 <br/>
            cName(string): 类名 <br/>
        </p>
        <div className="def">
            <h4>hasClass</h4>
            <p className="how">
                用法： <br/>
                接受2个参数：element, cName<br/>
                返回一个布尔值，如果节点具有类名返回true，否则返回false。
            </p>
            <p className="example">
                示例：<br/>
                let dom = document.getElementById('test') <br/>
                let re = egFunc.hasClass(dom, 'aClass') <br/>
            </p>
        </div>
        <div className="def">
            <h4>addClass</h4>
            <p className="how">
                用法： <br/>
                接受2个参数：element, cName<br/>
                返回这个节点。 <br/>
                对节点增加类名
            </p>
            <p className="example">
                示例：<br/>
                let dom = document.getElementById('test') <br/>
                egFunc.hasClass(dom, 'aClass') <br/>
            </p>
        </div>
        <div className="def">
            <h4>removeClass</h4>
            <p className="how">
                用法： <br/>
                接受2个参数：element, cName<br/>
                返回这个节点。 <br/>
                对节点删除类名
            </p>
            <p className="example">
                示例：<br/>
                let dom = document.getElementById('test') <br/>
                egFunc.removeClass(dom, 'aClass') <br/>
            </p>
        </div>
        <div className="def">
            <h4>toggleClass</h4>
            <p className="how">
                用法： <br/>
                接受2个参数：element, cName<br/>
                返回这个节点。 <br/>
                切换节点的类名，如果原来有就删除，如果原来没有就添加
            </p>
            <p className="example">
                示例：<br/>
                let dom = document.getElementById('test') <br/>
                egFunc.toggleClass(dom, 'aClass') <br/>
            </p>
        </div>
        <div className="def">
            <h4>addClasses</h4>
            <p className="how">
                用法： <br/>
                接受至少2个参数：element, cName0, cName1, cName2...<br/>
                返回这个节点。 <br/>
                给节点增加多个类名
            </p>
            <p className="example">
                示例：<br/>
                let dom = document.getElementById('test') <br/>
                egFunc.addClasses(dom, 'class0', 'class1') <br/>
            </p>
        </div>
        <div className="def">
            <h4>addsClass</h4>
            <p className="how">
                用法： <br/>
                接受至少2个参数：element0, element1..., cName<br/>
                返回一个节点数组。 <br/>
                给多个节点增加类名
            </p>
            <p className="example">
                示例：<br/>
                let dom0 = document.getElementById('test0') <br/>
                let dom1 = document.getElementById('test1') <br/>
                egFunc.addsClass(dom0, dom1, 'aClass') <br/>
            </p>
            <p className="more">
                removeClasses, removesClass, toggleClasses, togglesClass与这两个扩展函数使用方法相似，不再赘述。
            </p>
        </div>
    </div>,
    code: `
const dealClass = {
    checkElement: (element, cName) => {
        let c0 = element.innerHTML !== undefined,
            c1 = typeof(element.nodeName) === 'string',
            c2 = typeof(cName) === 'string' 
            console.log(c0, c1, c2);
        return c0 && c1 && c2
    },
    hasClass: (element, cName) => {
        if (!dealClass.checkElement(element, cName)) {return false}
        return element.classList.contains(cName)
    },
    addClass: (element, cName) => {
        if (!dealClass.checkElement(element, cName)) {return}
        element.classList.add(cName)
        return element
    },
    addClasses: (element, ...cNames) => {
        cNames.forEach(v => {
            dealClass.addClass(element, v)
        })
        return element
    },
    addsClass: (...elements) => {
        let cName = elements.pop()
        elements.forEach(v => {
            dealClass.addClass(v, cName)
        })
        return elements
    },
    removeClass: (element, cName) => {
        if (!dealClass.checkElement(element, cName)) {return}
        element.classList.remove(cName)
        return element
    },
    removeClasses: (element, ...cNames) => {
        cNames.forEach(v => {
            dealClass.removeClass(element, v)
        })
        return element
    },
    removesClass: (...elements) => {
        let cName = elements.pop()
        elements.forEach(v => {
            dealClass.removeClass(v, cName)
        })
        return elements
    },
    toggleClass: (element, cName) => {
        if (!dealClass.checkElement(element, cName)) {return}
        element.classList.toggle(cName)
        return element
    },
    toggleClasses: (element, ...cNames) => {
        cNames.forEach(v => {
            dealClass.toggleClass(element, v)
        })
        return element
    },
    togglesClass: (...elements) => {
        let cName = elements.pop()
        elements.forEach(v => {
            dealClass.toggleClass(v, cName)
        })
        return elements
    },
}
    `
}
export default dealClass