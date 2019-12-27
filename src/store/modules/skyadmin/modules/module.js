import api from '@api/sys.module'

export default {
    namespaced: true,
    actions: {
        add ({ dispatch }, data = {}) {
            api.add()
        }
    }
}
