// 组件
import image from './image'

export default {
    name: 'd2-container',
    props: {
        // 容器样式
        type: {
            type: String,
            required: true,
            default: 'image'
        },
        value: {
            type: Number,
            required: false,
            default: 0
        }
    },
    model: {
        prop: 'value',
        event: 'set'
    },
    computed: {
        // 始终返回渲染组件
        component () {
            if (this.type === 'image') return image
        }
    },
    render: function (createElement) {
        return createElement(
            this.component,
            {
                props: {
                    value: this.value
                },
                on: {
                    set: this.set
                }
            },
            this.$slots.default
        )
    },
    methods: {
        set (id) {
            this.$emit('set', id)
        }
    }
}
