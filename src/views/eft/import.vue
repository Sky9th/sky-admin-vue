<template>
    <d2-container>
        <sky-upload type="images" v-model="data" :fileList="fileList" />
        <el-form ref="form" size="small" style="margin-top: 5px" v-if="data.length > 0">
            <el-form-item>
                <el-button type="primary" @click="scan" :loading="loading" v-if="!scanVisible">扫描</el-button>
            </el-form-item>
        </el-form>
        <el-divider v-if="scanInfo.length > 0"></el-divider>
        <el-row :gutter="20">
            <el-col :span="8" v-for="(item, index) in scanInfo" :key="index" style="height:560px;margin-bottom: 15px">
                <el-card shadow="hover" v-loading="!scanInfo[index].status && submitLoading">
                    <div slot="header" class="clearfix">
                        <span>{{scanInfo[index].title}} <el-icon class="el-icon-circle-check" v-if="scanInfo[index].status === 1" style="color:#59ff00"></el-icon></span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="del(index)">取消</el-button>
                    </div>
                    <el-form ref="form" size="small" style="margin-top: 5px" v-model="scanInfo[index]">
                        <el-form-item label="采集">
                            <el-image :src="scanInfo[index].banner_url"></el-image>
                        </el-form-item>
                        <el-form-item label="封面">
                            <el-image :src="scanInfo[index].thumb_url"></el-image>
                        </el-form-item>
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="scanInfo[index].title"></el-input>
                        </el-form-item>
                        <el-form-item label="价格" prop="avg">
                            <el-input v-model="scanInfo[index].avg"></el-input>
                        </el-form-item>
                        <el-form-item label="分类" prop="category">
                            <el-input v-model="scanInfo[index].category"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="24" v-if="scanVisible">
                <el-button type="primary" @click="submit" style="margin-top: 15px">提交</el-button>
                <el-button @click="reset">重置</el-button>
            </el-col>
        </el-row>
        <el-divider v-if="failList.length > 0"></el-divider>
        <el-card v-if="failList.length > 0">
            <div slot="header">
                历史失败记录
            </div>
            <el-table :data="failList">
                <el-table-column prop="image_url" label="图片">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.image_url"></el-image>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" title="重试" size="mini" icon="el-icon-refresh" circle
                                   @click="retry(scope.row.id)"/>
                        <el-button type="danger" title="忽略" size="mini" icon="el-icon-delete" circle
                                   @click="ignore(scope.row.id)"/>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </d2-container>
</template>

<script>
import skyUpload from '@/components/sky-upload'
import goodService from '@/api/eft/good'
export default {
    components: { skyUpload },
    name: 'import',
    data () {
        return {
            failList: [],
            fileList: [],
            loading: false,
            data: {},
            scanInfo: [],
            scanVisible: false,
            submitLoading: false
        }
    },
    methods: {
        async scan () {
            this.loading = true
            let ids = []
            for (let i in this.data) {
                ids.push(this.data[i])
            }
            for (let i in ids) {
                for (let p in this.scanInfo) {
                    if (parseInt(ids[i]) === parseInt(this.scanInfo[p].cover_id)) {
                        ids.splice(i, 1)
                        break
                    }
                }
            }
            for (let i in ids) {
                await goodService.import([ids[i]]).then(data => {
                    this.scanInfo = this.scanInfo.concat(data)
                })
            }
            this.loading = false
            this.scanVisible = true
        },
        async submit () {
            this.submitLoading = true
            for (let i in this.scanInfo) {
                if (this.scanInfo[i].status === 1) continue
                await goodService.save(this.scanInfo[i]).then(res => {
                    this.scanInfo[i].status = 1
                }).catch(() => {
                    this.scanInfo[i].status = 2
                })
            }
            this.submitLoading = false
            this.$nextTick(() => {
                this.$forceUpdate()
            })
        },
        del (index) {
            delete this.scanInfo[index]
        },
        fail () {
            goodService.fail().then(data => {
                this.failList = data
            })
        },
        reset () {
            this.loading = false
            this.data = {}
            this.scanInfo = []
            this.submitLoading = false
        },
        retry (id) {
            goodService.retry(id).then(data => {
                this.fail()
            })
        },
        ignore (id) {
            goodService.ignore(id).then(data => {
                this.fail()
            })
        }
    },
    mounted () {
        this.fail()
    }
}
</script>

<style scoped>

</style>
