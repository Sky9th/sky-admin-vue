import projectService from '@/api/sky9th/project'

export default {
    namespaced: true,
    state: {
        field: [],
        search: {},
        thead: {},
        form: {}
    },
    actions: {
        async getStructure ({ state, commit }) {
            if (state.field.length === 0) {
                await projectService.structure().then(function (data) {
                    commit('set', data)
                })
            }
        }
    },
    mutations: {
        set (state, data) {
            state.field = data.field
            state.search = data.search
            state.thead = data.thead
            state.form = data.form
        }
    }
}
