<template>
    <d2-container>
        <d2-crud
                :columns="columns"
                :data="data"
                :loading="loading"
                :pagination="pagination"
                @pagination-current-change="paginationCurrentChange"/>
    </d2-container>
</template>

<script>

export default {
    data () {
        return {
            columns: [
                {
                    title: '卡密',
                    key: 'key',
                    width: 320
                },
                {
                    title: '面值',
                    key: 'value'
                },
                {
                    title: '管理员',
                    key: 'admin'
                },
                {
                    title: '创建时间',
                    key: 'dateTimeCreat'
                },
                {
                    title: '使用时间',
                    key: 'dateTimeUse'
                }
            ],
            data: [],
            loading: false,
            pagination: {
                currentPage: 1,
                pageSize: 5,
                total: 0
            }
        }
    },
    mounted () {
    },
    methods: {
    }
}
</script>
