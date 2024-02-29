# @schema-creator/element-ui

## 介绍
我们都知道Vue admin后台页面大部分都包含表单form以及表格/列表table，每次编写这些表单/表格及构建不同逻辑的表单/表格需要浪费大量的模板逻辑代码去完成，到后面维护或修改往往是灾难。@schema-creator正是为了解决这个问题，它用schema JSON的方式来构建整个表单或表格（包括事件及双向绑定），从而使后台开发代码变得更简单和可维护。

@schema-creator/element-ui 是基于 element-ui 组件库来驱动（必须先安装 element-ui），主要包含的组件有 sc-form、sc-table 及 sc-template。相关API查看对应文档：
- [sc-form](https://github.com/koen301/schema-creator/blob/master/element-ui/doc/sc-form.md)（schema JSON配置生成所有element-ui表单组件，包括事件及双向绑定）
- [sc-table](https://github.com/koen301/schema-creator/blob/master/element-ui/doc/sc-table.md)（schema JSON配置生成el-table表格，支持官方所有特性及JS编写模版逻辑能力）

项目git地址：[@schema-creator/element-ui](https://github.com/koen301/schema-creator/tree/master/element-ui)

## Install
```shell
npm i @schema-creator/element-ui -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import SchemaElement from '@schema-creator/element-ui'

Vue.use(SchemaElement)

// or
import {
  Form,
  Table
  // ...
} from '@schema-creator/element-ui'

Vue.component(Form.name, Form)
Vue.component(Table.name, Table)
```

## LICENSE
[MIT](LICENSE)


## 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

