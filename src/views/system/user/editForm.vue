<template>
    <el-dialog title="用户信息" :visible.sync="dialogVisible" @opened="dialogOpen" @close="close" :close-on-click-modal="false" :destroy-on-close="true">
        <el-form ref="form" :model="form" label-width="80px" size="small">
            <el-form-item prop="username" label="账号" :rules="[{ required: true, message: '不能为空'}]">
                <el-input v-model="form.username" :disabled="user.id > 0" />
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input v-model="form.repassword" type="password" />
            </el-form-item>
            <el-form-item prop="realname" label="姓名">
                <el-input v-model="form.realname" />
            </el-form-item>
            <el-form-item prop="nickname" label="昵称">
                <el-input v-model="form.nickname" />
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item prop="phone" label="手机">
                <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" @click="saveUser">保存</el-button>
                <el-button @click="close">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import userService from '@/api/sys/user'

export default {
    name: 'userEditForm',
    props: {
        user: Object,
        value: Boolean
    },
    data () {
        return {
            loading: false,
            dialogVisible: false,
            form: {}
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
            if (this.user.id) {
                userService.read(this.user.id).then(data => {
                    this.form = data
                    console.log(data)
                })
            } else {
                this.form = {}
            }
        },
        saveUser () {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.loading = true
                    let data = JSON.parse(JSON.stringify(this.form));
                    if (this.user.id) {
                        delete data.username
                        data.id = this.user.id
                    }
                    data.type = 1
                    userService
                        .save(data)
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
