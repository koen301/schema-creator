<template>
  <div>
    <h4>同一份schema根据不同model生成独立表单</h4>
    <sc-form :schema="schema1" />
    <sc-form :schema="schema2" />
    <p>model1: {{ JSON.stringify(model1) }}</p>
    <p>model2: {{ JSON.stringify(model2) }}</p>

    <h4>绑定多个事件并使用title、slot等扩展功能</h4>
    <sc-form ref="form" :schema="schema3">
      <template #age-slot>
        <el-input v-model.number="model3.age" />
      </template>
    </sc-form>
    <p>model: {{ JSON.stringify(model3) }}</p>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es';

// 表单schema，可以独立储存在其它地方作为公用
const schema = {
  formItems: [
    {
      type: 'input',
      label: '名字',
      field: 'name',
      placeholder: '请输入名字'
    },
    {
      type: 'input.number',
      label: "年龄",
      field: "age",
      rules: [
        { required: true, message: '年龄不能为空' },
        { type: 'number', message: '年龄必须为数字值' }
      ]
    }
  ]
};

export default {
  data() {
    return {
      model1: {},
      model2: {},
      model3: {},
    }
  },
  computed: {
    schema1() {
      return {
        inline: true,
        model: this.model1, // 这里绑定表单model1
        ...cloneDeep(schema)
      }
    },
    schema2() {
      return {
        inline: true,
        model: this.model2, // 这里绑定表单model2
        ...cloneDeep(schema)
      }
    },
    schema3() {
      return {
        bind: this, // 绑定当前组件this以使事件中能访问组件的数据及方法
        inline: true,
        model: this.model3, // 这里绑定表单model
        formItems: [
          {
            type: 'title', // 使用表单title
            content: '示例表单'
          },
          {
            type: 'input.trim', // trim去掉空格，同vue官方v-model.trim
            label: '名字',
            field: 'name',
            placeholder: '请输入名字',
            on: {
              'keyup.enter.native'() { // enter回车触发，同vue官方@keyup.enter.native
                console.log('keyup enter!');
              },
              change() { // change事件 同elment官方
                console.log('change!');
              }
            }
          },
          {
            type: 'slot', // 使用表单slot
            name: 'age-slot', // slot名字
            label: "年龄",
            field: 'age',
            rules: [
              { required: true, message: '年龄不能为空' },
              { type: 'number', message: '年龄必须为数字值' }
            ],
          },
          {
            type: 'button',
            content: '重置',
            on: {
              click() {
                this.$refs.form.elForm.resetFields(); // elForm属性获得el-form组件实例，并使用它的方法resetFields
              }
            }
          },
        ]
      }
    }
  }
}
</script>