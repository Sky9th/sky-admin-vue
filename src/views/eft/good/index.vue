<template>
    <div>
        <sky-list store="skyadmin/good" :api="service"></sky-list>
    </div>
</template>
<script>
import skyList from '@/components/sky-list'
import service from '@/api/eft/good'
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
