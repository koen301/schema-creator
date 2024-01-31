<template>
  <div class="schema-demo">
    <h4>每个字段绑定不同model表单</h4>

    <sc-form :schema="schema1"></sc-form>
    <p>{{ name }} {{ age }}</p>


    <h4>绑定一个model，且初始化model值</h4>

    <sc-form :schema="schema2" v-model="model2"></sc-form>
    <p>{{ JSON.stringify(model2) }}</p>

    <h4>复制一份schema生成表单，绑定独立model，并支持重置默认值 (注意与el-form官方resetFields重置的区别)</h4>
    <sc-form :schema="schema3" v-model="model3" ref="model3"></sc-form>
    <p>{{ JSON.stringify(model3) }}</p>
    <el-button @click="$refs.model3.reset()">sc-form 重置</el-button>
    <el-button @click="$refs.model3.elForm.resetFields()">el-form 重置</el-button>
    <p class="tips">Tips：官方el-checkbox-group的v-model绑定值必须定义且为数组否则重置可能异常，大部分情况建议用官方resetFields方法来重置表单，这样可以跟官方API保持一致。</p>

    <h4>复制一份schema生成表单绑定独立model，且定制了schema某些部分</h4>

    <sc-form :schema="schema4" v-model="model4"></sc-form>
    <p>{{ JSON.stringify(model4) }}</p>

    <h4>组合不同schema生成表单，且复用上面model</h4>

    <sc-form :schema="schemaGroup" v-model="model4"></sc-form>
    <p>{{ JSON.stringify(model4) }}</p>

    <h4>表单验证，与Element官方API相同</h4>

    <sc-form :schema="schemaValidate" v-model="model5"></sc-form>
    <p>{{ JSON.stringify(model5) }}</p>

    <h4>动态增减表单项，并响应复杂结构的model</h4>

    <sc-form :schema="schemaDynamic" v-model="model6"></sc-form>
    <p>{{ JSON.stringify(model6) }}</p>
  </div>
</template>

<script>
import { cloneDeep, set } from 'lodash-es';

// 表单schema，可以独立储存在其它地方作为公用
const schema = {
  formItems: [
    {
      type: 'input',
      label: '名字',
      placeholder: '请输入名字',
      field: 'name'
    },
    {
      type: 'select',
      label: '年龄',
      field: 'age',
      options: [{
        label: '十八',
        value: 18
      }, {
        label: '二十',
        value: 20
      }]
    },
    {
      type: 'radio',
      label: '意见',
      field: 'agree',
      options: [{
        label: '同意',
        value: 1
      }, {
        label: '不同意',
        value: 2
      }]
    },
    {
      type: 'checkbox',
      label: '喜欢',
      field: 'like',
      options: [{
        label: '草莓',
        value: 1
      }, {
        label: '苹果',
        value: 2
      }, {
        label: '西瓜',
        value: 3
      }, {
        label: '芒果',
        value: 4
      }]
    }
  ]
}
// 按钮schema
const btnSchema = {
  inline: true,
  formItems: [
    {
      type: 'button',
      content: '搜索',
      size: 'small',
      subtype: 'primary',
      on: {
        click: $event => {
          console.log('onSearch', $event);
        }
      }
    }, {
      type: 'button',
      content: '重置',
      size: 'small',
      plain: true,
      on: {
        click: $event => {
          console.log('onReset', $event);
        }
      }
    }
  ]
};
export default {
  name: "Test",
  components: {
  },
  data() {
    return {
      name: 'kris',
      age: 18,
      model2: {
        name: 'kris',
        age: 18,
        agree: 1,
        like: [1, 2]
      },
      model3: { name: 'kkk1'},
      model4: {},
      model5: {},
      model6: {addresses: [{value: ''}]}, // 支持复杂model

      schema2: cloneDeep(schema), // 需要cloneDeep复制一份独立schame
      schema3: cloneDeep(schema),
    }
  },
  computed: {
    schema1() {
      return {
        bind: this,
        formItems: [{
          label: '名f字',
          items: [{
            type: 'input',
          field: 'name',
          model: this.name,
          placeholder: "请选择输入名字",
          on: {
            change() {
              console.log('change')
            },
            input() {
              console.log('input')
            }
          }
          }]
        }, {
          label: '年龄',
          type: 'input-number',
          field: 'age',
          model: this.age,
          placeholder: "请选择年龄",
          options: [{
            label: '十八',
            value: 18
          }, {
            label: '二十',
            value: 20
          }],
          props: {
            label: 'label',
            value: 'value'
          },
        }]
      }
    },
    schema4() {
      // 先复制
      const mySchema = cloneDeep(schema);
      // 编辑schema
      set(mySchema, 'formItems[0].placeholder', '请输入你的大名');
      set(mySchema, 'formItems[0].on', {
        focus() {
          console.log('focus!');
        }
      });
      // 也可以用Object.assign编辑
      Object.assign(mySchema.formItems[0].on, {
        input(value) {
          console.log(value);
        }
      });
      // 插入一个form item
      mySchema.formItems.splice(1, 0, {
        type: 'input',
        label: '小名',
        field: 'nickName',
        placeholder: '输入你的小名',
      })

      return mySchema;
    },
    schemaGroup() {
      const { formItems } = cloneDeep(schema);
      const { formItems: btnItems } = cloneDeep(btnSchema);

      // 组合schema/btnSchema生成新schema
      return {
        inline: true,
        formItems: [
          formItems[0],
          formItems[1],
          ...btnItems,
        ]
      };
    },
    schemaValidate() {
      const { formItems: btnItems } = cloneDeep(btnSchema);
      return {
        inline: true,
        formItems: [
          {
            label: "年龄",
            type: 'input.number',
            field: "age",
            rules: [
              { required: true, message: '年龄不能为空' },
              { type: 'number', message: '年龄必须为数字值' }
            ],
          },
          ...btnItems,
        ]
      };
    },
    schemaDynamic() {
      return {
        bind: this, // click事件中用到当前组件this需要绑定 
        formItems: [
          ...this.dynamicItems,
          {
            type: 'button',
            subtype: 'primary',
            content: '新增',
            on: {
              click() {
                this.model6.addresses.push({value: ''});
              }
            }
          }
        ]
      };
    },
    dynamicItems() {
      return this.model6.addresses.map((item, i) => {
        // field会自动响应model对应的值，不需要手动赋值value
        return {
          label: "地址" + i,
          prop: 'addresses[' + i +'].value',
          items: [
            {
              type: 'input',
              field: 'addresses[' + i +'].value',
            }, {
              type: 'button',
              content: '删除',
              style: 'marginLeft: 10px',
              on: {
                click() {
                  this.model6.addresses.splice(i, 1);
                }
              }
            }
          ],
        }
      })
    }
  },
}
</script>
<style>
.schema-demo .el-form-item__content>.el-input {
  width: 216px;
}
.tips {
  font-size: 12px;
  color: #999;
  margin: 20px 0;
}
</style>