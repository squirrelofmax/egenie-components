import React from 'react'

let dealCookie = {
    title: 'dealCookie',
    docWhiter: 'rose233',
    temp: <div className="egDocDefault">
        <h2>dealCookie</h2>
        <p className="short">
            设置cookie, 下有3个函数: setCookie, getCookie, clearCookie. <br/><br/>
            参数说明： <br/>
            cname(string):  cookie name, 名<br/>
            cvalue(string): cookie value,  值<br/>
            exdays(number): expire time, 过期时间(天)
        </p>
        <div className="def">
            <h4>setCookie</h4>
            <p className="how">
                用法： <br/>
                接受3个参数：cname, cvalue, exdays<br/>
                无返回值 <br/>
                设置一条cookie，格式为cname = cvalue ;  expires ; path="/"'
            </p>
            <p className="example">
                示例： <br/>
                egFunc.setCookie('name', 'value', 1)
            </p>
        </div>
        <div className="def">
            <h4>getCookie</h4>
            <p className="how">
                用法： <br/>
                接受1个参数：cname<br/>
                返回找到的cookie或者空字符串
            </p>
            <p className="example">
                示例： <br/>
                let re = egFunc.getCookie('name')
            </p>
        </div>
        <div className="def">
            <h4>clearCookie</h4>
            <p className="how">
                用法： <br/>
                接受1个参数：cname<br/>
                无返回值
                清空此名的cookie
            </p>
            <p className="example">
                示例： <br/>
                let re = egFunc.clearCookie('name')
            </p>
        </div>
    </div>,
    code: `
const dealCookie = {
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + '; ' + expires + '; path="/"'
        return true
    },
    getCookie: function (cname) {
        var name = cname + '='
        var ca = document.cookie.split(';')
        for (var i = 0, len = ca.length; i < len; i++) {
            var c = ca[i]
            while (c.charAt(0) === ' ') c = c.substring(1)
            if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
        }
        return ''
    },
    clearCookie: function (name) {
        dealCookie.setCookie(name, '', -1)
        return true
    }
}
    `
}
export default dealCookie