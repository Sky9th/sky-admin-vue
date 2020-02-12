<template>
    <div>
        <sky-list store="skyadmin/tech" :api="techService">
        </sky-list>
    </div>
</template>
<script>
import skyList from '@/components/sky-list'
import techService from '@/api/sky9th/tech'
export default {
    components: { skyList },
    data () {
        return {
            techService
        }
    },
    mounted () {
    },
    methods: {
    }
}
</script>
