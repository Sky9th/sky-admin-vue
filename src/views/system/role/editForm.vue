<template>
    <el-dialog title="角色信息" :visible.sync="dialogVisible" @opened="dialogOpen" @closed="dialogClose" :close-on-click-modal="false">
        <el-form ref="form" :model="form" label-width="80px" size="small">
            <el-form-item prop="title" label="角色名称" :rules="[{ required: true, message: '不能为空'}]">
                <el-input v-model="form.title"/>
            </el-form-item>
            <el-form-item prop="permission" label="角色标识" :rules="[{ required: true, message: '不能为空'}]">
                <el-input v-model="form.permission">
                    <template slot="prepend">r_</template>
                </el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.description"/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" :loading="loading" @click="saveRole">保存</el-button>
                <el-button @click="dialogClose">取消</el-button>
            </el-form-item>
        </el-form>

    </el-dialog>

</template>
<script>
import roleService from '@/api/sys/role'

export default {
    name: 'roleEditForm',
    props: {
        role: Object,
        value: Boolean
    },
    data () {
        return {
            loading: false,
            dialogVisible: false,
            form: {
                name: '',
                code: '',
                description: ''
            }
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
            this.form = {}
            if (this.role.id) {
                roleService.read(this.role.id).then(data => {
                    let form = {}
                    form.title = data.title
                    form.permission = data.permission.slice(2)
                    form.description = data.description
                    this.form = form
                })
            }
        },
        saveRole () {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.loading = true
                    roleService
                        .save({ ...this.form, id: this.role.id })
                        .then(data => {
                            this.loading = false
                            this.dialogVisible = false
                            this.$emit('submit')
                        }).catch(err => {
                            console.log(err)
                            this.loading = false
                        })
                } else {
                    return false
                }
            })
        },
        dialogClose () {
            this.$refs['form'].resetFields()
            this.dialogVisible = false
        }
    }
}
</script>
