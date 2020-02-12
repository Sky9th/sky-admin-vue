<template>
    <d2-container>
        <el-form ref="form" :model="form" label-width="100px">
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
