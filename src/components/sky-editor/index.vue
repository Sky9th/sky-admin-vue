<template>
    <quill-editor  v-model="value"
                   style="height:400px;padding-bottom: 110px"
                   ref="myQuillEditor"
                   :options="options"
                   @blur="onEditorBlur($event)"
                   @focus="onEditorFocus($event)"
                   @ready="onEditorReady($event)" >
    </quill-editor>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }], // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
    [{ 'direction': 'rtl' }], // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'] // remove formatting button
]

export default {
    components: {
        quillEditor
    },
    props: {
        value: String,
        options: {
            type: Object,
            value: {
                modules: {
                    toolbar: toolbarOptions
                }
            }
        }
    },
    data () {
        return {
        }
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
        onEditorBlur (quill) {
            console.log('editor blur!', quill)
        },
        onEditorFocus (quill) {
            console.log('editor focus!', quill)
        },
        onEditorReady (quill) {
            console.log('editor ready!', quill)
        },
        onEditorChange ({ quill, html, text }) {
            console.log('editor change!', quill, html, text)
            this.content = html
        }
    },
    computed: {
        editor () {
            return this.$refs.myQuillEditor.quill
        }
    },
    mounted () {
        console.log('this is current quill instance object', this.editor)
    }
}

</script>
