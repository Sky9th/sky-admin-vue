<template>
    <div>
        <el-upload drag :action="action" :headers="headers" :on-success="handleSuccess" :before-upload="validate" :show-file-list="false">
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
import fileService from '@/api/sys/file'
export default {
    props: ['action', 'headers', 'value'],
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
        }
    },
    methods: {
        validate (file) {
            // TODO 从后端获取相关大小，格式的校验规则
            const fileType = file.type
            const isImage = fileType.indexOf('image') !== -1
            const isLt2M = file.size / 1024 / 1024 < 2
            // 这里常规检验，看项目需求而定
            if (!isImage) {
                this.$message.error('只能上传图片格式png、jpg、gif!')
                return false
            }
            if (!isLt2M) {
                this.$message.error('只能上传图片大小小于2M')
                return false
            }
        },
        handleSuccess (res) {
            if (res.code === 0) {
                this.$emit('set', res.data.id)
            }
        }
    },
    mounted () {
    }
}
</script>

<style scoped>
img { max-width:100%!important;max-height: 100%!important; }
</style>
