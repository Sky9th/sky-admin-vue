<template>
    <el-dialog title="用户信息" width="68%" :visible.sync="dialogVisible" @opened="dialogOpen" @close="close" :close-on-click-modal="false" :destroy-on-close="true">
        <el-form ref="form" :model="data" label-width="80px" size="small">
            <el-form-item :prop="index" :label="field[index]" v-for="(item, index) in form" :key="index">
                <el-input v-if="item === 'input'" v-model="data[index]" />
                <el-input type="textarea" v-if="item === 'textarea'" :rows="5" v-model="data[index]" />
                <editor v-if="item === 'editor'" v-model="data[index]" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" @click="saveUser">保存</el-button>
                <el-button @click="close">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import editor from '@/components/sky-editor'
export default {
    components: { editor },
    props: {
        info: Object,
        form: Object,
        value: Boolean,
        api: Object,
        field: Object
    },
    data () {
        return {
            data: {},
            loading: false,
            dialogVisible: false
        }
    },
    watch: {
        value (val) {
            this.dialogVisible = val
        },
        dialogVisible (val) {
            this.$emit('input', val)
        }
    },
    methods: {
        dialogOpen () {
            this.$refs.form.resetFields()
            if (this.info.id) {
                this.api.read(this.info.id).then(data => {
                    this.data = data
                })
            } else {
                this.data = {}
            }
        },
        saveUser () {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.loading = true
                    this.api
                        .save({ ...this.data, id: this.info.id })
                        .then(data => {
                            this.loading = false
                            this.dialogVisible = false
                            this.$emit('submit')
                        }).catch(err => {
                            this.loading = false
                        })
                } else {
                    return false
                }
            })
        },
        close () {
            this.$refs['form'].resetFields()
            this.dialogVisible = false
        }
    }
}
</script>
