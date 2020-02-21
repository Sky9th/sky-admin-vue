import request from '@/plugin/axios'

const api = {}

api.read = function (id) {
    if (typeof id === 'number') {
        return request.get('getFile/' + id)
    } else {
        return request.post('getFile', { ids: id })
    }
}

export default api
