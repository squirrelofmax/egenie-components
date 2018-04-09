
# 优化
- 可编辑单元格
    - 把数据操作放到单元格的维度，原：最底层能操作的维度是rows
    - 原：单元格的渲染完全由Grid组件内部控制，现在：截获了控制权
    - 原：单元格的state无法从外部控制。 现在：可以从外部控制
    - 原：单元格的state状态不可持久，每次单元格重新构造都会重置。现在：可以持久化，单例
    - 原：会额外触发许多无意义的valueChange与blur事件（一般是向后端保存数据的接口），现在:不重复触发无意义的blur，valueChange。（得益于上一条）原理：在触发CellValueChange与CellBlur事件时都会记录下触发值，下一次触发会与上一次的触发值作比较，相同则不触发。
    - 将接口都集成到EgGrid中，只暴露出interpretorOfRows接口，只需要传{config:[],context:this}即可
        - 其中config中的每一项可以是列名('column1')或者配置项{field:'column1',style,_class,options,...}。
        - 通常只传列名就足够了
        - 生成的单元格model通过context来调用handleCellValueChange与handleCellBlur
        - 
    
    - Select
        - filterable，默认：下拉选项大于10条时可以过滤查找。可通过参数配置具体规则来扩展。
        - clearable，默认：true
        - options,默认：[]，
        - getOptions,默认：返回options的方法，也可以是类似于'top.dict.sales_type'的accessor字符串
        - 三种方式：只传options--静态下拉选项，只传getOptions方法--根据不同的row调后端接口返回下拉选项，只传getOptions字符串--监听外部字典项初始化然后进行同步

    - Number
        - min
        - max
        - step
        - unit ，设置单位
        