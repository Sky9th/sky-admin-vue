<template>
    <d2-container better-scroll>

        <template slot="header">
            <el-button type="primary" icon="el-icon-refresh" @click="show"></el-button>
            <el-button type="success" icon="el-icon-plus" @click="add">添加</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="del">删除</el-button>
        </template>

        <el-table
                ref="multipleTable"
                :data="data.data"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="标识">
            </el-table-column>
            <el-table-column
                    prop="update_time"
                    label="修改日期">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="read(scope.row.id)" type="text" size="small">查看</el-button>
                    <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <template slot="footer">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="data.current_page"
                    :page-sizes="[15, 30, 50, 100]"
                    :page-size="15"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="data.total">
            </el-pagination>
        </template>

        <el-dialog :visible.sync="visibleForm">
            <el-form :model="form"  label-width="100px">
                <el-form-item label="名称">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="模块标识">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级">
                    <el-cascader v-model="form.pid" :options="options"></el-cascader>
                </el-form-item>
                <el-form-item label="参数">
                    <el-input type="textarea" rows="5" v-model="form.param" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                    <d2-icon-select v-model="form.icon"/>
                </el-form-item>
                <el-form-item label="是否可见">
                    <el-radio-group v-model="form.visible">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

    </d2-container>
</template>

<script>
let that
export default {
    components: {
    },
    data () {
        return {
            form: {},
            data: {},
            visibleForm: false,
            options: [],
            multipleSelection: []
        }
    },
    methods: {
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange (val) {
            console.log(`当前页: ${val}`)
        },
        handleSelectionChange (val) {
            this.multipleSelection = val
        },
        show () {
            this.$store.dispatch('skyadmin/module/index').then(function (res) {
                that.data = res
            })
        },
        add () {
            that.form = {}
            that.visibleForm = true
        },
        edit (id) {
            this.$store.dispatch('skyadmin/module/read', id).then(function (res) {
                that.form = res
                that.visibleForm = true
            })
        },
        del () {
            this.$store.dispatch('skyadmin/module/del', that.multipleSelection).then(function (res) {
                that.show()
            })
        },
        submit () {
            this.$store.dispatch('skyadmin/module/active', this.form).then(function () {
                that.visibleForm = false
                that.show()
            })
        }
    },
    mounted () {
        that = this
        this.show()
    }
}
</script>
