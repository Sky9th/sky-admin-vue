<template>
    <div>
        <sky-list store="skyadmin/category" :api="service"></sky-list>
    </div>
</template>
<script>
import skyList from '@/components/sky-list'
import service from '@/api/eft/category'
export default {
    components: { skyList },
    data () {
        return {
            service
        }
    },
    mounted () {
    },
    methods: {
    }
}
</script>
