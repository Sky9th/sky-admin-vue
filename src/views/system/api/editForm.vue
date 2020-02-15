<template>
    <el-dialog title="接口信息" :visible.sync="dialogVisible" @opened="dialogOpen" @close="close" :close-on-click-modal="false" :destroy-on-close="true">
        <el-form ref="form" :model="form" label-width="80px" size="small">
            <el-form-item prop="title" label="名称" :rules="[{ required: true, message: '不能为空'}]">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item v-if="!form.id" prop="type" label="资源接口" :rules="[{ required: true, message: '不能为空'}]">
                <el-radio-group v-model="form.type">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="permission" label="权限标识" :rules="[{ required: true, message: '不能为空'}]">
                <el-input v-model="form.permission">
                    <template slot="prepend">i_</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="path" label="路径" :rules="[{ required: true, message: '不能为空'}]">
                <el-input v-model="form.path"/>
            </el-form-item>
            <el-form-item prop="method" label="方法" :rules="[{ required: true, message: '不能为空'}]" v-if="!form.type">
                <el-select v-model="form.method" placeholder="请选择">
                    <el-option
                            v-for="item in methods"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="description" label="描述">
                <el-input type="textarea" v-model="form.description"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" @click="saveInterface">保存</el-button>
                <el-button @click="close">取消</el-button>
            </el-form-item>
        </el-form>

    </el-dialog>

</template>
<script>
import interfaceService from '@/api/sys/api'

export default {
    name: 'interfaceEditForm',
    props: {
        entity: Object,
        value: Boolean
    },
    data () {
        return {
            methods: [
                'GET',
                'POST',
                'PUT',
                'DELETE'
            ],
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
            if (this.entity.id) {
                interfaceService.read(this.entity.id).then(data => {
                    data.permission = data.permission.slice(2)
                    this.form = data
                })
            } else {
                this.form = {
                    type: 0
                }
            }
        },
        saveInterface () {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.loading = true
                    interfaceService
                        .save({ ...this.form, id: this.entity.id })
                        .then(data => {
                            this.loading = false
                            this.dialogVisible = false
                            this.$emit('submit')
                        })
                        .catch(() => {
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
