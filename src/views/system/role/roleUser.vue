<template>
    <el-dialog :visible.sync="dialogVisible" @open="dialogOpen">
        <div slot="title">维护
            <el-tag>{{role.title}}</el-tag>
            用户
        </div>
        <el-form :inline="true" :model="searchForm" ref="searchForm" size="mini" style="margin-bottom: -18px;">
            <el-form-item label="名称" prop="username">
                <el-input v-model="searchForm.username" placeholder="名称" style="width: 100px;"/>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="searchForm.email" placeholder="邮箱" style="width: 120px;"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearchFormSubmit">
                    <d2-icon name="search"/>
                    查询
                </el-button>
            </el-form-item>

            <el-form-item>
                <el-button @click="handleSearchFormReset">
                    <d2-icon name="refresh"/>
                    重置
                </el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" v-loading="loading" size="small" stripe highlight-current-row style="width: 100%;"
                  @sort-change="handleSortChange">
            <el-table-column label="账号名称" prop="username">
                <template slot-scope="scope">
                    {{scope.row.username}}
                </template>
            </el-table-column>
            <el-table-column label="用户姓名" prop="realname">
                <template slot-scope="scope">
                    {{scope.row.realname}}
                </template>
            </el-table-column>
            <el-table-column label="上次登录" prop="last_login_time">
                <template slot-scope="scope">
                    {{scope.row.last_login_time|date}}
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="isAdd">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isAdd==2" size="mini" type="info">未添加</el-tag>
                    <el-tag v-if="scope.row.isAdd==1" size="mini" type="success">已添加</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.isAdd==2" type="primary" title="添加" size="mini" icon="el-icon-plus"
                               circle @click="modifyRoleUser(scope.row.id,1)"></el-button>
                    <el-button v-if="scope.row.isAdd==1" type="danger" title="移除" size="mini" icon="el-icon-minus"
                               circle @click="modifyRoleUser(scope.row.id,0)"></el-button>
                </template>
            </el-table-column>

        </el-table>
        <div slot="footer">
            <el-pagination :current-page="page.current_page" :page-size="page.per_page" :total="page.total"
                           :page-sizes="pageSize" layout="total, sizes, prev, pager, next, jumper"
                           style="margin: -10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </el-dialog>
</template>
<script>
import userService from '@/api/sys/user'

export default {
    name: 'roleUser',
    props: {
        role: Object,
        value: Boolean
    },
    data () {
        return {
            dialogVisible: false,
            searchForm: {
                name: '',
                email: ''
            },
            // eslint-disable-next-line no-eval
            pageSize: eval(process.env.VUE_APP_PAGE_SIZE),
            loading: false,
            tableData: [],
            page: {
                current_page: 1,
                per_page: 15,
                total: 0
            },
            sort: {
                prop: '',
                order: ''
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
        async dialogOpen () {
            this.getTableData()
        },
        getTableData () {
            let query = {
                p: this.page.current_page,
                per_page: this.page.per_page,
                order: this.sort.prop,
                descending: this.sort.order === 'descending',
                filter: { ...this.searchForm, role_id: this.role.id }
            }
            userService.indexByRoleId(query).then(data => {
                let list = data.data
                for (let i in list) {
                    list[i].isAdd = true
                }
                this.tableData = list
                this.page.total = data.total
            })
        },
        handleSearchFormSubmit () {
            this.getTableData()
        },
        handleSearchFormReset () {
            this.$refs.searchForm.resetFields()
        },
        handleSortChange (val) {
            this.sort.prop = val.prop
            this.sort.order = val.order
            this.getTableData()
        },
        handleSizeChange (val) {
            this.page.size = val
            this.getTableData()
        },
        handleCurrentChange (val) {
            this.page.current = val
            this.getTableData()
        },
        modifyRoleUser (userId, action) {
            userService
                .editRoleUser({
                    roleId: this.role.id,
                    userId: userId,
                    action: action
                })
                .then(() => {
                    let msg = action == 1 ? '已添加' : '已移除'
                    this.$notify({
                        title: '操作成功',
                        message: msg,
                        type: 'success'
                    })
                    this.getTableData()
                })
        }
    }
}
</script>
