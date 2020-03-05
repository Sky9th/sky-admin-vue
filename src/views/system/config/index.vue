<template>
    <div>
        <sky-list store="skyadmin/config" :api="service"></sky-list>
    </div>
</template>
<script>
import skyList from '@/components/sky-list'
import service from '@/api/sys/config'
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
