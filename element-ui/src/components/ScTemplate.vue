<script>
export default {
    name: 'ScTemplate',
    props: {
        content: [String, Object],
        data: { 
            type: Object,
            default: {},
        },
    },
    render(h) {
        const { tag, content, template, data, ...others} = this.content;

        if (typeof this.content === 'string') {
            return h({ template: this.content, data: () => this.data });
        } else if(tag) {
            return h(tag, others, content);
        } else {
            return h({ template, data: () => data, ...others });
        }
    }
}
</script>
