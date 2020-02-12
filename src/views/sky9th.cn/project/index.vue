<template>
    <div>
        <sky-list store="skyadmin/project" :api="projectService">
        </sky-list>
    </div>
</template>
<script>
import skyList from '@/components/sky-list'
import projectService from '@/api/sky9th/project'
export default {
    components: { skyList },
    data () {
        return {
            projectService
        }
    },
    mounted () {
    },
    methods: {
    }
}
</script>
