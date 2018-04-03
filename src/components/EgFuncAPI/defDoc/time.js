import React from 'react'

let time = {
    title: 'time',
    docWhiter: 'rose233',
    temp: <div className="egDocDefault">
        <h2>time</h2>
        <p className="short">
        时间日期处理, 下有2个函数: getDay, getTime <br/><br/>
            参数说明： <br/>
            n(number/date对象)，n为数字时，可以是合理范围内的负整数，正整数或0 <br/>
            brage(string, 可选参数)，拼接日期的中间字符串，取chd及cht时有特殊汉字连接返回值，取no时此参数无效<br/>
            注意当不设置brage时会返回含有3个字符串的数组，设置后返回则会返回1个字符串
        </p>
        <div className="def">
            <h4>getDay</h4>
            <p className="how">
                用法： <br/>
                接受至少1个参数：n, n是数字（天）或date对象<br/>
                无brage返回1个数组，数组内3个字符串，获取n天之后的年月日，格式为xxxx, xx, xx。 <br/>
                有brage返回字符串，brage有特殊值'chd'
            </p>
            <p className="example">
                示例：<br/>
                let re0 = egFunc.getDay(2)<br/>
                {'//'} [2018, 03, 29] <br/>
                let re1 = egFunc.getDay(2, '-')<br/>
                {'//'} 2018-03-29 <br/>
                let re2 = egFunc.getDay(2, 'chd')<br/>
                {'//'} 2018年03月29日 <br/>
            </p>
        </div>
        <div className="def">
            <h4>getTime</h4>
            <p className="how">
                用法： <br/>
                接受至少1个参数：n, n是数字（毫秒）或date对象<br/>
                无brage返回1个数组，数组内3个字符串，分别是时分秒，格式为xx, xx, xx。 <br/>
                有brage返回字符串，brage有特殊值'cht'
            </p>
            <p className="example">
                示例：<br/>
                let re0 = egFunc.getTime(200)<br/>
          {'//'} [13, 03, 29] <br/>
                let re1 = egFunc.getTime(200, '-')<br/>
                {'//'}  13-03-29 <br/>
                let re2 = egFunc.getTime(200, 'cht')<br/>
                {'//'}  13时03分29秒 <br/>
            </p>
        </div>
    </div>,
    code: `
    const time = {
      // 时间日期处理
      help_add0: function(s) {
        // 辅助函数，使个位数变成2位字符串
        return ('00' + s).substr(-2)
      },
      help_toString: (arr, brage) => {
        let re = ''
        switch (brage) {
          case 'chd':
            re = \`\${arr[0]}年\${arr[1]}月\${arr[2]}日\`
            break;
          case 'cht':
            re = \`\${arr[0]}时\${arr[1]}分\${arr[2]}秒\`
            break;
          default:
            re = arr.join(brage)
            break;
        }
        return re
      },
      getDay: function (n, brage = 'no') {
        // 获取距现在天数为n(整数，负或正分别代表前或后)的年月日 或传日期对象
        let [currentDate, toTime, day] = [new Date(), 0, null]
        switch (typeof(n)) {
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
        let [currentDate, toTime, day] = [new Date(), 0, null]
        switch (typeof(n)) {
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
    `
}
export default time