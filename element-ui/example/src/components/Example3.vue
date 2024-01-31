<template>
  <div>
    <h4>多列布局col、span、gutter</h4>
    <sc-form :schema="schema" />
    <p>model: {{ JSON.stringify(model) }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    }
  },
  computed: {
    schema() {
      return {
        model: this.model, // 这里绑定表单model
        labelPosition: 'left',
        labelWidth: '50px',
        colSpan: 8, // col布局，同element官方，默认24
        gutter: 20, // 栅格col间隔，同element官方，单位px，默认0
        formItems: [
          {
            type: 'title', // 使用表单title
            content: '示例表单'
          },
          {
            type: 'input.trim',
            label: '名字',
            field: 'name',
            placeholder: '请输入名字',
          },
          {
            type: 'input.number',
            label: '年龄',
            field: 'age',
            placeholder: '请输入年龄',
          },
          {
            type: 'select',
            label: '性别',
            field: 'sex',
            options: [{
              label: '男',
              value: '1',
            }, {
              label: '女',
              value: '2',
            }]
          },
          {
            type: 'input.number',
            label: '电话',
            field: 'phone',
            placeholder: '请输入电话',
          },
          {
            type: 'input',
            label: '地址',
            field: 'addr',
            placeholder: '请输入地址',
          },
          {
            type: 'checkbox',
            label: '爱好',
            field: 'likes',
            options: [{
              label: '草莓',
              value: '1',
            }, {
              label: '车厘子',
              value: '2',
            }, {
              label: '香蕉',
              value: '3',
            }]
          },
        ]
      }
    }
  }
}
</script>