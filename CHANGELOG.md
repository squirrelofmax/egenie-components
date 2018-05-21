## V1.0.0  

startup

加入 egFetch 组件, egFunc 常用函数库
加入EgReportWithCopy批量处理报告(有复制功能)

## V1.0.5

列拖拽保存功能

- 为了兼容列的动态显隐，增加columns中的ejlHidden属性，不写的话默认为false，要隐藏的动态列设置为true
    - 之前控制动态显隐的方式给gridModel的columns属性赋不同的值，现在不允许这样，只能通过ejlHidden属性控制
    - Report页面不同Report显示的列不同，原本的实现机制要改，每个Report columns应该是所有Report显示的columns的合集，通过ejlHidden属性控制显示
- 对于无法预测的动态列（比如，根据外部的日期范围，每一天生成一个对应的列，再比如，共享库存中子表根据后端返回的结果生成对应的列）
    - 无法兼容列拖拽保存功能，须cacheColumnConfig设为false
    - 可以通过getDisplayColumns属性动态生成列
    - 也可以直接操作gridModel，赋值新的columns
    - 这种情况下，所有列都不支持排序，即sortable:true会造成bug
- 需要给每个表格的配置项中加入gridIdForColumnConfig属性
- 不缓存的表格加cacheColumnConfig，并赋值为false
- buttons中的下拉选项现在在全禁用的情况下仍然能够看下拉选项。不过控制台会报button中套button的error，忽略即可。
- 根据Larry的需求，需要勾选才能操作的按钮在未勾选的情况下要置灰，即在设置buttons的display规则的时候要加上if(!rows.length) return false的校验
- FilterSetList切换FilterSet的时候不触发查询的bug已修复
- interceptor支持用方法包装起来，可以获取到对应的gridModel作为参数
- 引入了common.css