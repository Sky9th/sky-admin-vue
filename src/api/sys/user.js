import request from '@/plugin/axios'

const api = {
    index (query) {
        return request.get('users', { params: query })
    },
    indexByRoleId (query) {
        return request.get('user/indexByRoleId', { params: query })
    },
    getPermissionInfo () {
        return request.get('user/getPermissionInfo')
    }
}

export default api
