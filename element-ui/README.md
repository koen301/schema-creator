# @schema-creator/element-ui

## 介绍
我们都知道Vue admin后台页面大部分都包含表单form以及表格/列表table，每次编写这些表单/表格及构建不同逻辑的表单/表格需要浪费大量的模板代码去完成，到后面维护或修改往往是灾难。@schema-creator正是为了解决这个问题，它用schema JSON的方式来构建整个表单或表格（包括事件及双向绑定），从而使后台开发代码变得更简单和可维护。

@schema-creator/element-ui 是基于 element-ui 组件库来驱动，主要包含的组件有 sc-form、sc-table 及 sc-template。相关API查看对应文档：
- sc-form [sc-form](./doc/sc-form.md)
- sc-table [sc-table](./doc/sc-table.md)

## Install
```shell
npm install @schema-creator/element-ui -S
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

