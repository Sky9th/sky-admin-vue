import request from '@/plugin/axios'

const api = {
    index (query) {
        return request.get('users', { params: query })
    },
    indexByRoleId (roleId, query) {
        return request.get('user/indexByRoleId/' + roleId, { params: query })
    },
    read (id) {
        return request.get('users/' + id)
    },
    save (query) {
        if (query.id) {
            return request.put('users/' + query.id, query)
        } else {
            return request.post('users', query)
        }
    },
    del (ids) {
        return request.delete('users', { data: { ids } })
    },
    getPermissionInfo () {
        return request.get('user/getPermissionInfo')
    }
}

export default api
