<template>
    <d2-container>
        <template slot="header">
            <slot name="header">
                <el-form :inline="true" :model="searchForm" ref="searchForm" size="mini" style="margin-bottom: -18px;">
                    <el-form-item :label="structure.field[index]" :prop="index" v-for="(item, index) in structure.search" :key="index">
                        <el-input v-if="item === 'input'" v-model="searchForm[index]" style="width: 100px;"/>
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
            </slot>
        </template>

        <slot name="btn">
            <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="add">新增</el-button>
            <el-button v-if="multipleSelection.length>0" type="danger" size="mini" icon="el-icon-delete" @click="batchDel">
                删除
            </el-button>
        </slot>

        <slot name="table">
            <el-table :data="tableData" v-loading="loading" size="small" stripe highlight-current-row style="width: 100%;"
                      @selection-change="handleSelectionChange" @sort-change="handleSortChange">
                <el-table-column type="selection" width="55" />
                <el-table-column :label="structure.field[index]" :prop="index" sortable="custom" v-for="(item, index) in structure.thead" :key="index">
                    <template slot-scope="scope">
                        <span v-if="item.type === 'text'">{{scope.row[index]}}</span>
                        <el-image v-if="item.type === 'image'" :src="scope.row[index].src" :title="scope.row[index].title"></el-image>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" title="编辑" size="mini" icon="el-icon-edit" circle
                                   @click="openForm(scope.row)"/>
                        <el-button type="danger" title="删除" size="mini" icon="el-icon-delete" circle
                                   @click="del(scope.row.id)"/>
                    </template>
                </el-table-column>
            </el-table>
        </slot>

        <slot name="foot">
            <template slot="footer">
                <el-pagination :current-page="page.current" :page-size="page.size" :total="page.total"
                               :page-sizes="pageSize" layout="total, sizes, prev, pager, next, jumper"
                               style="margin: -10px;" @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"/>
            </template>
        </slot>

        <editForm :info="info" :form="structure.form" :field="structure.field" v-model="editFormVisible" @submit="getTableData" :api="api"/>

        <slot name="extend" />
    </d2-container>
</template>
<script>
import { mapState } from 'vuex'
import editForm from './editForm'
import resourceModule from './resource'

export default {
    props: {
        store: String,
        api: Object
    },
    components: { editForm },
    data () {
        return {
            info: {},
            searchForm: {},
            // eslint-disable-next-line no-eval
            pageSize: eval(process.env.VUE_APP_PAGE_SIZE),
            loading: false,
            tableData: [],
            multipleSelection: [],
            page: {
                current: 1,
                size: 15,
                total: 0
            },
            sort: {
                prop: '',
                order: ''
            },
            editFormVisible: false
        }
    },
    computed: mapState({
        structure (state) {
            let module = this.store.split('/')
            return {
                field: state[module[0]][module[1]].field,
                form: state[module[0]][module[1]].form,
                search: state[module[0]][module[1]].search,
                thead: state[module[0]][module[1]].thead
            }
        }
    }),
    async created () {
        let module = this.store.split('/')
        if (!(module[0] in this.$store.state && module[1] in this.$store.state[module[0]])) {
            await this.$store.registerModule(module, resourceModule)
        }
        await this.$store.dispatch(this.store + '/getStructure', this.api).then(data => {
            this.getTableData()
        })
    },
    methods: {
        getTableData () {
            let query = {
                page: this.page.current,
                per_page: this.page.per_page,
                order: this.sort.prop,
                descending: this.sort.order === 'descending',
                filter: this.searchForm
            }
            this.api.index(query).then(data => {
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
        handleSelectionChange (val) {
            this.multipleSelection = val
        },
        handleSortChange (val) {
            this.sort.prop = val.prop
            this.sort.order = val.order
            this.getTableData()
        },
        handleSizeChange (val) {
            this.page.per_page = val
            this.getTableData()
        },
        handleCurrentChange (val) {
            this.page.current = val
            this.getTableData()
        },
        openForm (info) {
            this.info = info
            this.editFormVisible = true
        },
        add () {
            this.user = {}
            this.editFormVisible = true
        },
        batchDel () {
            this.$confirm('确认删除？', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '删除',
                cancelButtonText: '取消'
            }).then(() => {
                this.api
                    .del(this.multipleSelection.map(s => s.id))
                    .then(() => {
                        this.getTableData()
                    })
            })
        },
        del (id) {
            this.$confirm('确认删除？', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '删除',
                cancelButtonText: '取消'
            }).then(() => {
                this.api.del(id).then(() => {
                    this.getTableData()
                })
            })
        }
    }
}
</script>
