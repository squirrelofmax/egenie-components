易精灵前端通用组件库

基于 element-react

项目结构： 

	src/lib/index.js  发布入口文件

	src/utils/index.js  开发维护入口文件 

	src/css/  共用 css 文件 

	src/index.js  开发测试入口文件

引入方式：
	
	npm install egenie-components

	import { egFunc, egFtech } from 'egenie-components'

组件库开发维护流程规范：
	
	1、将通用组件封装于 src/utils/ 文件夹下

	2、npm run build 使用 babel 转译为 es5 组件，生成待发布文件（置于 src/lib/ 文件夹中），对于当前不支持的高级语法，请自行查找配置安装 babel 插件

	3、在测试入口文件引入待发布文件做基础测试，并编写调用实例（类似于API 文档），确保组件的正常表现

	4、组件升级尽量向前兼容，若不能向前兼容，请在 CHANGELOG.md 中声明，以供各项目负责人参考

	5、尽可能剥离业务，组件库不涉及业务封装

	6、UI 组件 大写开头 Eg+'Name'， 功能组件 小写开头 eg+'Name'

	7、测试完成提交到开发分支

组件库发布流程：
	
	1、拉取发布分支代码，修改版本号

	2、使用公用账号 npm publish

	3、安装并对当前升级版本做简单测试，确保正常使用

	4、通知各项目负责人版本升级情况
