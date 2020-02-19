import request from '@/plugin/axios'

const api = {}

api.read = function (id) {
    return request.get('getFile/' + id)
}

export default api
