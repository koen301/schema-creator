<template>
    <el-form 
        ref="form"
        v-bind="useProp(schema, 'form')"
        v-on="useEvent(schema)"
        @submit.native.prevent
    >
        <el-row :gutter="schema.gutter">
            <template v-for="item,i of schema.formItems">
                <div 
                    v-if="item.type==='title'" 
                    class="sc-form-title"
                    v-bind="useProp(item)"
                >{{item.content}}</div>
                <component
                    v-else-if="item.type==='component'"
                    v-bind="useProp(item)"
                    v-on="useEvent(item)"
                >{{item.content}}</component>
                <el-col 
                    v-else-if="item.show !== false"
                    :span="schema.colSpan" 
                    :class="{inline: schema.inline}"
                    :key="i"
                >
                    <el-form-item
                        v-bind="useProp(item, 'item')"
                    >
                        <template v-for="item in item.items">
                            <el-button 
                                v-if="isType(item, ['button'])"
                                v-bind="useProp(item)"
                                v-on="useEvent(item)"
                                :v-hasPermission="item.hasPermission"
                            >{{item.content}}</el-button>

                            <el-dropdown
                                v-else-if="isType(item, ['dropdown'])"
                                v-bind="useProp(item)"
                                v-on="useEvent(item)"
                                :v-hasPermission="item.hasPermission"
                            >
                                <el-button :type="item.subtype">
                                    {{item.content}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item 
                                        v-for="menu,im of item.menus" 
                                        v-show="menu.show !== false"
                                        :key="im" 
                                        @click.native="useFn(menu.click, $event)"
                                    >{{menu.name}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>

                            <el-input
                                v-else-if="isType(item, ['input'])"
                                v-bind="useProp(item)"
                                v-on="useEvent(item)"
                                @keyup.native="useFn(item.on['keyup.native'], $event)"
                                @keyup.enter.native="useFn(item.on['keyup.enter.native'], $event)"
                            >
                                <template v-if="item.append" slot="append">{{item.append}}</template>
                            </el-input>
                            
                            <template v-else-if="[
                                'select',
                                'cascader',
                                'radio',
                                'radio-group',
                                'checkbox',
                                'checkbox-group',
                                'input-number',
                                'switch',
                                'slider',
                                'rate',
                                'color-picker',
                                'time-picker',
                                'date-picker'
                                ].includes(item.type)"
                            >
                                <component
                                    :is="fixType(item.type)"
                                    v-bind="useProp(item)"
                                    v-on="useEvent(item)"
                                >
                                    <template v-if="isType(item, ['select'])">
                                        <el-option
                                            v-for="o in item.options"
                                            :key="o[item.props.value]"
                                            :label="o[item.props.label]"
                                            :value="o[item.props.value]"
                                            :disabled="o.disabled"
                                        ></el-option>
                                    </template>
                                    
                                    <template v-else-if="isType(item, ['radio', 'radio-group'])">
                                        <component
                                            :is="item.button?'el-radio-button':'el-radio'"
                                            v-for="o in item.options"
                                            v-bind="useProp(o, 'radio-options')"
                                            :key="o.value"
                                            :label="o.value"
                                        >{{o.label}}</component>
                                    </template>

                                    <template v-else-if="isType(item, ['checkbox', 'checkbox-group'])">
                                        <component
                                            :is="item.button?'el-checkbox-button':'el-checkbox'"
                                            v-for="o in item.options"
                                            v-bind="useProp(o, 'checkbox-options')"
                                            :key="o.value"
                                            :label="o.value"
                                        >{{o.label}}</component>
                                    </template>

                                </component>
                            </template>

                            <el-upload
                                v-else-if="isType(item, ['upload'])"
                                v-bind="useProp(item)"
                            >
                                <component
                                    v-if="Array.isArray(item.children)"
                                    v-for="o,i of item.children"
                                    v-show="o.show !== false"
                                    :is="o.tag"
                                    v-bind="useProp(o, 'children')"
                                    :key="o.i"
                                >{{o.content}}</component>
                                <slot v-if="typeof item.children==='string'" :name="item.children"></slot>
                                <sc-template v-if="typeof item.children==='function'" :content="item.children.call(schema.bind)" :data="{bind: schema.bind}"/>
                            </el-upload>

                            <el-transfer
                                v-else-if="isType(item, ['transfer'])"
                                v-bind="useProp(item)"
                                v-on="useEvent(item)"
                            >
                                <component
                                    v-if="Array.isArray(item.children)"
                                    v-for="o,i of item.children"
                                    v-show="o.show !== false"
                                    :is="o.tag"
                                    v-bind="useProp(o, 'children')"
                                    :key="o.i"
                                >{{o.content}}</component>
                                <slot v-if="typeof item.children==='string'" :name="item.children"></slot>
                                <sc-template v-if="typeof item.children==='function'" :content="item.children.call(schema.bind)" :data="{bind: schema.bind}"/>
                            </el-transfer>
                            
                            <div v-else-if="item.type==='html'" v-html="item.content"></div>
                            <span v-else-if="item.type==='text'">{{item.content}}</span>
                            <slot v-else-if="item.type==='slot'" :name="item.name"></slot>
                            <span v-else>无法匹配“{{item.type}}”控件</span>
                        </template>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
    </el-form>
</template>

<script>
export default {
    name: 'ScForm',
    props: {
        schema: {
            type: Object,
            required: true
        },
        value: {
            type: Object,
            default: null
        },
        setting: {
            type: Object,
            default: () => ({
                form: {
                    labelSuffix: ':',
                    size: 'small',
                    class: 'outer_form',
                },
                item: {},
                button: {},
                input: {
                    autocomplete: "off",
                },
                select: {},
                cascader: {},
                radio: {},
                checkbox: {},
                upload: {},
            })
        }
    },
    data() {
        return {
            defaultValue: Object.freeze({
                ...JSON.parse(JSON.stringify(this.value)),
            }),
        }
    },
    computed: {
        elForm: {
            get() {
                return this.$refs.form;
            },
        }
    },
    mounted() {
        // 注入$fields
        if (this.schema.bind) {
            if (!this.schema.bind.$fields) {
                this.schema.bind.$fields = {};
            }
            Object.assign(this.schema.bind.$fields, this.$refs);
        }
        // console.log('schema', this.schema)
    },
    methods: {
        useProp(prop, type) {
            const { type: ptype, ref, model, field, label, on = {}, items } =  prop;
            const sysType = ['form', 'item', 'radio-options', 'checkbox-options', 'children', 'title', 'component'];
            const invalidProp = ['type', 'tag', 'content', 'children', 'show', 'items'];
            const $prop = {};
            let typeArr, modifier;
            type = type || ptype;
            if (!sysType.includes(type)) {
                // 默认on
                prop.on = on;
                // 修饰符
                if (type.includes('.')) {
                    typeArr = type.split('.');
                    type = typeArr[0];
                    modifier = typeArr[1];
                }
                // 设置ref
                if (!ref) {
                    prop.ref = field;
                }
                // 独立处理双向绑定
                const hasOwnModel = prop.hasOwnProperty('model');
                if (field) {
                    const { input, hasInitInput } = on;
                    const _this = this; // 绑定当前指针
                    let event = modifier === 'lazy' ? 'change' : 'input';
                    $prop.value = hasOwnModel ? model : eval(`this.schema.model.${field}`);
                    if (!hasInitInput) {
                        Object.assign(prop.on, {
                            [event]($event) {
                                // 此域this指向bind绑定组件
                                input && input.call(this, $event); 
                                // 处理修饰符
                                if ($event) {
                                    if (modifier === 'trim') {
                                        $event = $event.trim();
                                    } else if (modifier === 'number') {
                                        $event = isNaN($event) ? $event : Number($event);
                                    }
                                }
                                if (hasOwnModel) {
                                    _this.$set(this, field, $event);
                                    
                                } else {
                                    // 处理field
                                    let fields = field.replace(/\[(\d+)\]$/g, '.$1').split('.');
                                    if (fields.length > 1) {
                                        _this.$set(eval(`_this.schema.model.${fields[0]}`), fields[1], $event);
                                    } else {
                                        _this.$set(_this.schema.model, field, $event);
                                    }
                                    if(_this.value) {
                                        // 解决v-model为空对象时 form控件不更新
                                        _this.$forceUpdate();
                                    }
                                }
                            },
                            hasInitInput: true,
                        });
                    }
                } else if(hasOwnModel) {
                    console.error(`'${label}' field has not been set!`);
                }
            }
            // 过滤prop
            for (let p in prop) {
                if (!invalidProp.includes(p)) {
                    if (p !== 'on') {
                        if (typeof prop[p] === 'function') {
                            // 统一绑定this到bind实例
                            $prop[p] = prop[p].bind(this.schema.bind);
                        } else {
                            $prop[p] = prop[p];
                        }
                    }
                }
                if (p === 'subtype') {
                    $prop.type = prop.subtype;
                }
            }

            // 设置具体各项值/默认值
            switch(type) {
                case 'form': 
                    // 设置form model默认值
                    if (!model) {
                        prop.model = $prop.model = this.value || {};
                    }
                    // 设置colspan/gutter
                    prop.colSpan = prop.colSpan || 24;
                    prop.gutter = prop.gutter || 0;
                    // 删除多余prop
                    delete $prop.bind;
                    delete $prop.formItems;
                    delete $prop.titie;
                    delete $prop.colSpan;
                    return {
                        ...this.setting.form,
                        ...$prop
                    };
                case 'children':
                    // 设置children类型
                    $prop.type = ptype;
                    return $prop;
                case 'item':
                    if (items) {
                        delete $prop.options;
                        if (!Array.isArray(items)) {
                            prop.items = [items];
                        }
                        return {
                            ...this.setting.item,
                            ...$prop
                        };
                    } else {
                        // label/class/style/rules默认不赋值给form-item内控件
                        const { 
                            label: labelName, 
                            class: className, 
                            style,
                            rules,
                            ...others 
                        } = prop;
                        // 设置inline items
                        prop.items = [others];
                        prop.prop = others.field;
                        // 特殊为button添加标记class
                        let cls = className || '';
                        if (ptype === 'button') {
                            cls += ' sc-button';
                        }
                        return {
                            ...this.setting.item,
                            label,
                            style,
                            rules,
                            class: cls,
                            prop: others.field,
                        };
                    }
                case 'button':
                    // 删除多余prop
                    delete $prop.hasPermission;
                    delete $prop.subtype;
                    return {
                        ...this.setting.button,
                        ...$prop
                    };
                case 'select':
                    // 默认option字段
                    prop.props = prop.props || {
                        label: 'label',
                        value: 'value',
                    };
                    // 删除多余prop
                    delete $prop.options;
                    delete $prop.props;
                    return {
                        ...this.setting.select,
                        ...$prop
                    };
                case 'input':
                case 'cascader':
                    return {
                        ...this.setting[type],
                        ...$prop
                    };
                case 'radio':
                case 'radio-group':  
                    delete $prop.options;
                    return {
                        ...this.setting[type],
                        ...$prop
                    };
                case 'checkbox':
                case 'checkbox-group':  
                    delete $prop.options;
                    if(typeof $prop.value === 'undefined') {
                        $prop.value = [];
                    } else if (!Array.isArray($prop.value)) {
                        console.error(`checkbox field value type must be Array!`);
                    }
                    return {
                        ...this.setting[type],
                        ...$prop
                    };
                case 'upload': 
                    prop.children = prop.children || [{
                        tag: 'el-button',
                        size: 'small',
                        type: 'primary',
                        content: '请选择',
                    }];
                    delete $prop.children;
                    return {
                        ...this.setting.upload,
                        ...$prop
                    };
                case 'title':
                case 'component': 
                    return {
                        style: {margin: `0 ${this.schema.gutter / 2}px`},
                        ...$prop
                    };
                case 'dropdown': 
                    delete $prop.menus;
                    return {
                        ...this.setting.dropdown,
                        ...$prop
                    };
            }
            return $prop;
        },
        toHorizontal(str) {
            return str.replace(/([A-Z])/g, (match, p1, offset, string) => {
                return '-' + p1.toLowerCase();
            });
        },
        useEvent({on = {}}) {
            const $listeners = {};
            for(let p in on) {
                if(typeof on[p] === 'function') {
                    $listeners[this.toHorizontal(p)] = this.schema.bind ? on[p].bind(this.schema.bind) : on[p];
                }
            }
            return $listeners;
        },
        useFn(fn, $event) {
            if (fn) {
                const { bind } = this.schema;
                bind ? fn.call(bind, $event) : fn($event);
            }
        },
        fixType(type) {
            const prefix = 'el-';
            switch(type) {
                case 'radio':
                    return prefix + 'radio-group';
                case 'checkbox':
                    return prefix + 'checkbox-group';
            }
            return prefix + type;
        },
        isType({ type }, types) {
            return types.includes(type.split('.')[0]);
        },
        getForm() {
            return this.elForm;
        },
        getField(fieldName) {
            return this.$refs[fieldName];
        },
        reset(field) {
            if (field) {
                this.$set(this.schema.model, field, this.defaultValue[field]);
            } else {
                for(let key in this.schema.model) {
                    if (this.defaultValue.hasOwnProperty(key)) {
                        this.$set(this.schema.model, key, this.defaultValue[key]);
                    } else {
                        this.$set(this.schema.model, key, undefined);
                    }
                }
            }
        }
    }
}
</script>


<style scoped>
.inline{
    display: inline-block;
    width: auto;
    float: none;
}
.sc-form-title{
    line-height: 55px;
    font-weight: bold;
    font-size: 14px;
    vertical-align: top;
    clear: both;
}
.el-range-editor.el-input__inner{
    width: auto;
}
.sc-button.el-form-item{
    margin-bottom: 0;
}
</style>