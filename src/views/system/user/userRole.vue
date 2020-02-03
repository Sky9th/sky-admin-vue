<template>
    <el-dialog :visible.sync="dialogVisible" @open="dialogOpen" @close="close" :destroy-on-close="true">
        <el-form :inline="true" :model="searchForm" ref="searchForm" size="mini" style="margin-bottom: -18px;">
            <el-form-item label="名称" prop="title">
                <el-input v-model="searchForm.name" placeholder="名称" style="width: 100px;"/>
            </el-form-item>
            <el-form-item label="标识" prop="permission">
                <el-input v-model="searchForm.permission" placeholder="标识" style="width: 120px;"/>
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
            <el-table-column label="名称" prop="title" sortable="custom">
                <template slot-scope="scope">{{scope.row.title}}</template>
            </el-table-column>
            <el-table-column label="标识" prop="permission" sortable="custom" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{scope.row.permission}}</template>
            </el-table-column>
            <el-table-column label="描述" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{scope.row.description}}</template>
            </el-table-column>
            <el-table-column label="状态" prop="isAdd">
                <template slot-scope="scope">
                    <el-tag v-if="!scope.row.user_id" size="mini" type="info">未添加</el-tag>
                    <el-tag v-else size="mini" type="success">已添加</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button v-if="!scope.row.user_id" type="primary" title="添加" size="mini" icon="el-icon-plus"
                               circle @click="modifyRoleUser(scope.row.id,1)" />
                    <el-button v-else type="danger" title="移除" size="mini" icon="el-icon-minus"
                               circle @click="modifyRoleUser(scope.row.id,0)" />
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer">
            <el-pagination :current-page="page.current" :page-size="page.size" :total="page.total"
                           :page-sizes="pageSize" layout="total, sizes, prev, pager, next, jumper"
                           style="margin: -10px;" @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" />
        </div>
    </el-dialog>
</template>
<script>
import roleService from '@/api/sys/role'

export default {
    name: 'userRole',
    props: {
        user: Object,
        value: Boolean
    },
    data () {
        return {
            dialogVisible: false,
            // eslint-disable-next-line no-eval
            pageSize: eval(process.env.VUE_APP_PAGE_SIZE),
            searchForm: {
                name: '',
                code: ''
            },
            loading: false,
            tableData: [],
            page: {
                current: 1,
                size: 100,
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
        dialogOpen () {
            this.getTableData()
        },
        getTableData () {
            let query = {
                p: this.page.current_page,
                per_page: this.page.per_page,
                order: this.sort.prop,
                descending: this.sort.order === 'descending',
                filter: { ...this.searchForm }
            }
            roleService.indexByUserId(this.user.id, query).then(data => {
                this.tableData = data.data
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
        modifyRoleUser (roleId, action) {
            roleService.modifyUser({
                role_id: roleId,
                user_id: this.user.id,
                action: action
            }).then(() => {
                let msg = action === 1 ? '已添加' : '已移除'
                this.$notify({
                    title: '操作成功',
                    message: msg,
                    type: 'success'
                })
                this.getTableData()
            })
        },
        close () {
            this.tableData = []
        }
    }
}
</script>
