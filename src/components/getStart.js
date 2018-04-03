import React from 'react'

let getStart = {
    title: '开始',
    docWhiter: 'rose233',
    temp: <div className="egDocDefault">
        <h2>易精灵前端通用组件库</h2>
        <p className="short">
            如何使用及编写此文档的简要说明
        </p>
        <div className="def">
            <h3>约定：</h3>
            本文档中@为绝对路径src <br/>
            由于某些原因，文档中含有｛｝符号的代码可能需要手动替换成英文符号 <br/>
            鼠标移动到页面顶部或右下角按钮处即可返回页面顶部
        </div>
        <div className="def">
            <h3>项目结构：</h3>
            @/lib/index.js  发布入口文件 <br/>
            @/utils/index.js  开发维护入口文件  <br/>
            @/css/  共用 css 文件  <br/>
            @/index.js  开发测试入口文件 <br/>
        </div>
        <div className="def">
            <h3>组件库开发维护流程规范：</h3>
            1、将通用组件封装于 @/utils/ 文件夹下 <br/>
            2、npm run build 使用 babel 转译为 es5 组件，生成待发布文件（置于 @/lib/ 文件夹中），对于当前不支持的高级语法，请自行查找配置安装 babel 插件 <br/>
            3、在测试入口文件引入待发布文件做基础测试，并编写调用实例（类似于API 文档），确保组件的正常表现 <br/>
            4、组件升级尽量向前兼容，若不能向前兼容，请在 CHANGELOG.md 中声明，以供各项目负责人参考 <br/>
            5、尽可能剥离业务，组件库不涉及业务封装 <br/>
            6、UI 组件 大写开头 Eg+'Name'， 功能组件 小写开头 eg+'Name' <br/>
            7、测试完成提交到开发分支
        </div>
        <div className="def">
            <h3>组件库发布流程：</h3>
            1、拉取发布分支代码，修改版本号 <br/>
            2、使用公用账号 npm publish <br/>
            3、安装并对当前升级版本做简单测试，确保正常使用 <br/>
            4、通知各项目负责人版本升级情况
        </div>
        <div className="def">
        <h3>使用</h3>
            <p className="how">
                引入： <br/>
                npm install egenie-components <br/>
                import ｛egFunc｝ from 'egenie-components'
            </p>
            <p className="example">
                示例：<br/>
                let dom = document.getElementById('test') <br/>
                let re = egFunc.hasClass(dom, 'aClass') <br/>
            </p>
        </div>
    </div>,
    code: `
    打开@/components/EgFuncAPI/defDoc, 任意打开一个文件，比如dealCookie，可以观察文档的基本结构：引入react，声明一个对象，把它导出。
    一个对象举例：
        let o = {
            title: '标题',
            docWhiter: '编写人',
            temp: <div className="egDocDefault">
                    <h2>开始</h2>
                    <p className="short">
                        如何编写此文档的简要说明
                    </p>
                </div>,
            code: '源码',
        }
    title会显示在左侧菜单，与引入函数集合同名，
    docWhiter不会显示，只是记录此文件的编写人，
    temp是jsx模版，默认模版只要添加class组名，就得到相应的样式，稍后再说这套默认模版。你也可以自己设置，只要把模版顶层div的egDocDefault换成别的。
    code是这个集合的源码。

    egDocDefault模版：
        在egDocDefault子代有这几个：
            h2: 如果妮不知道写什么，就把title抄过来吧,
            .short: 简单说明，介绍一下这类函数的作用，要传入的值,
            .def: 每个函数的说明放到这里,
        def子代有：
            h4: 函数名称,
            .how: 如何使用，传入值，返回值，作用,
            .example: 示例,
            .more: 补充说明,
            .ipt: 重点

    编写完成在@/components/index.js引入，只要在对应类别数组添加（比如let startDocs = [getStart]），不需要再做额外的工作就可以正常显示了。
    `
}
export default getStart