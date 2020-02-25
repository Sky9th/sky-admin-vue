<template>
    <div>
        <el-upload
                :action="action"
                :headers="headers"
                :auto-upload="true"
                :file-list="fileList"
                :multiple="true"
                list-type="picture-card"
                :on-success="handleSuccess"
                :on-progress="handleProgress"
                :on-error="handleError"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :modal="false">
            <el-image style="height:145px" fit="contain" :src="dialogImageUrl"></el-image>
        </el-dialog>
    </div>
</template>

<script>
import fileService from '@/api/sys/file'
export default {
    props: ['action', 'headers', 'value'],
    data () {
        return {
            ids: [],
            fileList: [],
            dialogVisible: false,
            dialogImageUrl: false
        }
    },
    watch: {
        value () {
            if (typeof this.value === 'string') {
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
            }
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
                return false
            }
            if (!isLt2M) {
                this.$message.error('只能上传图片大小小于2M')
                return false
            }
        },
        handleSuccess (res, file, fileList) {
            if (res.code === 0) {
                this.ids.push(res.data.id)
                this.$emit('set', this.ids)
            }
        },
        handleProgress (event, file, fileList) {
        },
        handleError (res, file, fileList) {
        },
        handleRemove (file, fileList) {
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        }
    },
    mounted () {
    }
}
</script>

<style scoped>
</style>
