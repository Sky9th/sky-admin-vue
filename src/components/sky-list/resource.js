const ResourceModule = {
    namespaced: true,
    state () {
        return {
            field: {},
            search: {},
            thead: {},
            form: {}
        }
    },
    actions: {
        async getStructure ({ state, commit }, service) {
            let keys = Object.keys(state.field)
            if (keys.length === 0) {
                await service.structure().then(function (data) {
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

export default ResourceModule
