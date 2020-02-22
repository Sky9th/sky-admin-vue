<template>
    <div>
        <el-upload
                class="upload-demo"
                :action="action"
                :headers="headers"
                :auto-upload="true"
                :file-list="fileList"
                :limit="multiple ? 99: 1"
                :on-success="handleSuccess"
                :on-progress="handleProgress"
                :on-error="handleError"
                :on-remove="handleRemove">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
import fileService from '@/api/sys/file'
export default {
    props: ['action', 'headers', 'value', 'multiple'],
    data () {
        return {
            ids: [],
            fileList: []
        }
    },
    watch: {
        value () {
            if (this.value && (typeof this.value === 'string' || typeof this.value === 'number')) {
                if (this.multiple) {
                    console.log(this.value)
                    let ids = this.value.split(',')
                    if (ids.length > 0) {
                        this.ids = ids
                        this.$emit('set', this.ids)
                        fileService.read(ids).then(res => {
                            for (let i in res) {
                                this.fileList.push({ name: res[i].title, url: res[i].src })
                            }
                        })
                    }
                } else {
                    this.$emit('set', this.value)
                    fileService.read(this.value).then(res => {
                        this.fileList.push({ name: res.title, url: res.src })
                    })
                }
            }
        }
    },
    methods: {
        upload (params) {
            // TODO 从后端获取相关大小，格式的校验规则
        },
        handleSuccess (res, file, fileList) {
            if (res.code === 0) {
                if (this.multiple) {
                    this.ids.push(res.data.id)
                    this.$emit('set', this.ids)
                } else {
                    this.$emit('set', res.data.id)
                }
            }
        },
        handleProgress (event, file, fileList) {
        },
        handleError (res, file, fileList) {
        },
        handleRemove (file, fileList) {
        }
    },
    mounted () {
    }
}
</script>

<style scoped>
</style>
