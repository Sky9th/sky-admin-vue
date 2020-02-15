import request from '@/plugin/axios'
import { resource } from '@/api/resource'

const api = resource('roles')

api.indexByUserId = function (userId, query) {
    return request.get('role/indexByUserId/' + userId, { params: query })
}

api.savePermission = function (data) {
    return request.post('role/savePermission', data)
}

api.modifyUser = function (data) {
    return request.post('role/modifyUser', data)
}

export default api
