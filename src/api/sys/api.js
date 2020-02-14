import request from '@/plugin/axios'
import { resource } from '@/api/resource'

const api = resource('apis')

api.indexByMenuId = function (menuId, query) {
    return request.get('api/indexByMenuId/' + menuId, { params: query })
}

api.indexByRoleId = function (roleId) {
    return request.get('api/indexByRoleId/' + roleId)
}

api.modifyMenu = function (data) {
    return request.post('api/modifyMenu', data)
}

export default api
