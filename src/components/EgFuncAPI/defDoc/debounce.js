import React from 'react'

let debounce = {
    title: 'debounce',
    docWhiter: 'rose233',
    temp: <div className="egDocDefault">
            <h2>debounce</h2>
            <p className="short">
                防抖动<br/>
                用户短时间内，操作次数非常多(例如：1秒内点击10次)，可以设置延时时间1，只执行最后一次。<br/>
                可以设置延时时间1000（时间是毫秒）<br/>
                参数说明： <br/>
                def(function): 要执行的函数<br/>
                time(number): 等待时间（毫秒）<br/>
                immediate(boolean): 立即执行，true则先执行再等待，false则先等待后执行
            </p>
            <div className="def">
                <h4>debounce</h4>
                <p className="how">
                    用法： <br/>
                    接受2个参数：def, time<br/>
                    返回一个函数 <br/>
                </p>
                <p className="example">
                    示例： <br/>
                    function test() {'{'}console.log('test')} <br/>
                    let newTest = egFunc.debounce(test, 1000) <br/>
                    newTest() <br/>
                    newTest() <br/>
                    {'//'} 只会打印一个test
                </p>
            </div>
            <div className="def">
                <h4>_debounce</h4>
                <p className="how">
                    用法： <br/>
                    接受3个参数：def, time, immediate<br/>
                    返回一个函数 <br/>
                </p>
                <p className="example">
                    示例： <br/>
                    function test0() {'{'}console.log('test0')} <br/>
                    function test1() {'{'}console.log('test1')} <br/>
                    let newTest0 = egFunc._debounce(test0, 1000, true) <br/>
                    let newTest1 = egFunc._debounce(test1, 1000, false) <br/>
                    newTest0() <br/>
                    newTest0() <br/>
                    newTest1() <br/>
                    newTest1() <br/>
                    {'//'} 立即打印1个test0，1秒后打印1个test1
                </p>
            </div>
        </div>,
    code: `
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
    `,
}
export default debounce