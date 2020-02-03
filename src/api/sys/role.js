import request from '@/plugin/axios'

const api = {
    index (query) {
        return request.get('roles', { params: query })
    },
    read (id) {
        return request.get('roles/' + id)
    },
    save (query) {
        if (query.id) {
            return request.put('roles/' + query.id, query)
        } else {
            return request.post('roles', query)
        }
    },
    del (id) {
        return request.delete('roles/' + id)
    },
    savePermission (data) {
        return request.post('role/savePermission', data)
    },
    modifyUser (data) {
        return request.post('role/modifyUser', data)
    }
}

export default api
