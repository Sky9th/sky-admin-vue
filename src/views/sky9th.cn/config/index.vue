<template>
    <d2-container>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="网站标题">
                    <el-input v-model="form.title" />
                </el-form-item>
                <el-form-item label="Slogan">
                    <el-input v-model="form.title" />
                </el-form-item>
                <el-form-item label="网站简介">
                    <el-input type="textarea" v-model="form.title" :rows="5"/>
                </el-form-item>
                <el-form-item label="网站版权">
                    <el-input v-model="form.copyright" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="submit">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </d2-container>
</template>

<script>
export default {
    data () {
        return {
            form: {},
            loading: false
        }
    },
    methods: {
        submit () {
            console.log(1)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
