import request from '@/plugin/axios'
import { resource } from '@/api/resource'

const api = resource('users')

api.indexByRoleId = function (roleId, query) {
    return request.get('user/indexByRoleId/' + roleId, { params: query })
}
api.getPermissionInfo = function () {
    return request.get('user/getPermissionInfo')
}

export default api
