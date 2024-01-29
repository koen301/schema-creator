<template>
    <el-table 
        ref="table"
        v-bind="useProp(schema, 'table')"
        v-on="useEvent(schema)"
        @selection-change="onSelectionChange"
        @header-dragend="onHeaderDragend"     
    >
        <el-table-column 
            v-for="item,i of schema.columns"
            v-bind="useProp(item, 'column')"
            :key="i"
        >
        <template v-if="typeof item.template==='function'" v-slot="scope">
            <sc-template :content="item.template.call(schema.bind, scope)" :data="{scope, bind: schema.bind}"/>
        </template>
        <template v-else-if="typeof item.template==='string'" v-slot="scope">
            <slot :name="item.template" v-bind="scope"></slot>
        </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'ScTable',
    props: {
        schema: {
            type: Object,
            required: true
        },
        setting: {
            type: Object,
            default: () => ({
                table: {
                    border: true,
                    defaultExpandAll: true,
                    tooltipEffect: "light",
                    height: "100%",
                    rowKey: row => row.id,
                },
                column: {
                    align: 'center',
                }
            })
        }
    },
    data() {
        return {
            selection: [],
        }
    },
    computed: {
        elTable: {
            get() {
                return this.$refs.table;
            },
        }
    },
    mounted() {
        // console.log('schema', this.schema)
    },
    methods: {
        useProp(prop, type) {
            const $prop = { ...prop };
            // 设置具体各项值/默认值
            switch(type) {
                case 'table': 
                    // 删除多余prop
                    delete $prop.bind;
                    delete $prop.on;
                    delete $prop.columns;
                    return {
                        ...this.setting.table,
                        ...$prop
                    };
                case 'column':
                    delete $prop.template;
                    return {
                        ...this.setting.column,
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
        onSelectionChange(selection) {
            this.selection = selection || [];
        },
        onHeaderDragend() {
            this.elTable.doLayout();
        },
        getTable() {
            return this.elTable;
        },
        getSelection() {
            return this.selection;
        },
    }
}
</script>
