<template>
    <el-dialog :visible.sync="dialogVisible" @open="dialogOpen" @close="close" :destroy-on-close="true">
        <div slot="title">维护
            <el-tag>{{role.title}}</el-tag>
            权限
        </div>
        <el-input size="mini" placeholder="输入关键字进行过滤" v-model="filterText" style="padding-bottom: 5px;"/>
        <el-tree ref="tree" show-checkbox default-expand-all :props="{label: 'title'}" check-strictly
                 highlight-current node-key="id" :data="permissionList" :filter-node-method="filterNode"
                 :expand-on-click-node="false">
              <span slot-scope="{ node, data }">
                  <span><i v-if="data.type === 1" class="fa fa-cog"/><i v-if="data.type === 2" class="fa fa-chevron-up"/>&nbsp;{{ node.label }}</span>&nbsp;&nbsp;
              </span>
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" :loading="loading" @click="saveRolePermission">保存</el-button>
            <el-button @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import roleService from '@/api/sys/role'
import menuService from '@/api/sys/menu'
import apiService from '@/api/sys/api'
export default {
    name: 'rolePermission',
    props: {
        role: Object,
        value: Boolean
    },
    data () {
        return {
            loading: false,
            dialogVisible: false,
            filterText: '',
            permissionList: [],
            api: {}
        }
    },
    watch: {
        value (val) {
            this.dialogVisible = val
        },
        dialogVisible (val) {
            this.$emit('input', val)
        },
        filterText (val) {
            this.$refs.tree.filter(val)
        }
    },
    methods: {
        async dialogOpen () {
            this.permissionList = await menuService.indexWithApi()
            let menuPermissions = await menuService.indexByRoleId(this.role.id)
            let apiPermissions = await apiService.indexByRoleId(this.role.id)
            let rolePermissionList = menuPermissions.map(s => s.id).concat(apiPermissions.map(s => 'api_' + s.id))
            this.$refs.tree.setCheckedKeys(rolePermissionList)
        },
        filterNode (value, data) {
            if (!value) return true
            return data.title.indexOf(value) !== -1
        },
        saveRolePermission () {
            let checkedNodes = this.$refs.tree.getCheckedNodes(false, true)
            let checkedPermissions = []
            for (let checked of checkedNodes) {
                checkedPermissions.push(checked.id)
            }
            let data = {
                role_id: this.role.id,
                permissions: checkedPermissions
            }
            this.loading = true
            roleService.savePermission(data).then(data => {
                this.loading = false
                this.dialogVisible = false
                // eslint-disable-next-line handle-callback-err
            }).catch(err => {
                this.loading = false
            })
        },
        close () {
            this.tableData = []
            this.dialogVisible = false
        }
    }
}
</script>
