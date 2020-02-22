// 组件
import image from './image' // 单图上传
import images from './images' // 单图上传
import file from './file' // 单图上传

import util from '@/libs/util'

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
            required: false,
            default: null
        }
    },
    model: {
        prop: 'value',
        event: 'set'
    },
    computed: {
        // 始终返回渲染组件
        component () {
            if (this.type === 'file') return file
            if (this.type === 'files') return file
            if (this.type === 'image') return image
            if (this.type === 'images') return images
        },
        headers () {
            let signature = util.encrypt.getSignatureParam()
            signature['X-Requested-With'] = 'XMLHttpRequest'
            return signature
        }
    },
    render: function (createElement) {
        return createElement(
            this.component,
            {
                ref: this.type,
                props: {
                    value: this.value,
                    action: process.env.VUE_APP_API + '/upload',
                    headers: this.headers,
                    multiple: this.type === 'files'
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
