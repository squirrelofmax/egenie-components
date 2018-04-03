import React from 'react'

let egFetch = {
    title: 'egFetch',
    docWhiter: 'rose233',
    temp: <div className="egDocDefault">
        <h2>egFetch</h2>
        <p className="short">
            拦截返回结果做出判断，登录检测 <br/>
            参数说明： <br/>
            connect，发起的fetch请求 <br/>
        </p>
        <div className="def">
            <h4>egFetch</h4>
            <p className="how">
              用法： <br/>
              接受多个参数：fetch请求<br/>
              返回服务器传回的值 <br/>
              网络错误则提示‘网络错误，请检查！’<br/>
              未登录则提示‘未登录，请重新登录！’ <br/>
              登录正常则继续下一步
            </p>
            <p className="example">
              示例：<br/>
              egFetch.egFetch(conn0, conn1...)<br/>
            </p>
        </div>
      </div>,
    code: `
    import { Message } from 'element-react'
    export default async function egFetch (...args) {
      console.log(...args, '进入egFetch')
      const response = await fetch(...args)
      if (!response.ok) {
        Message.error({message: '网络错误，请检查！', showClose: true})
        return
      }
      try {
        const result = await response.json()
        if (result.status === 'Unauthenticated') {
          Message.error({message: '未登录，请重新登录！'})
          // 返回结果，可处理跳转
          return result
        }
        return result
      } catch (e) {}
    }
    


    `
}
export default egFetch