<template>
    <div>
        <el-upload drag action="" :http-request="upload" :show-file-list="false">
            <template v-if="!src">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip"><el-tag type="danger">只能上传jpg/png文件，且不超过500kb</el-tag></div>
            </template>
            <div v-else>
                <el-image :src="src" fit="contain" style="height:180px"></el-image>
            </div>
        </el-upload>
    </div>
</template>

<script>
import uploadService from '@/api/sys/upload'
import fileService from '@/api/sys/file'
export default {
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            src: '',
            title: ''
        }
    },
    watch: {
        value () {
            if (this.value) {
                fileService.read(this.value).then(data => {
                    this.src = data.src
                    this.title = data.title
                })
            }
            console.log(this.value)
        }
    },
    methods: {
        upload (params) {
            // TODO 从后端获取相关大小，格式的校验规则
            const file = params.file
            const fileType = file.type
            const isImage = fileType.indexOf('image') !== -1
            const isLt2M = file.size / 1024 / 1024 < 2
            // 这里常规检验，看项目需求而定
            if (!isImage) {
                this.$message.error('只能上传图片格式png、jpg、gif!')
                return
            }
            if (!isLt2M) {
                this.$message.error('只能上传图片大小小于2M')
                return
            }
            // 根据后台需求数据格式
            const form = new FormData()
            // 文件对象
            form.append('file', file)
            // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
            // 项目封装的请求方法，下面做简单介绍
            uploadService.image(form).then(data => {
                this.src = data.src
                this.title = data.title
                this.$emit('set', data.id)
                this.$nextTick(function () {
                    this.$forceUpdate()
                })
            })
        }
    },
    mounted () {
        console.log('mounted')
    }
}
</script>

<style scoped>
img { max-width:100%!important;max-height: 100%!important; }
</style>
