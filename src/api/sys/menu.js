import request from '@/plugin/axios'
import { resource } from '@/api/resource'

const api = resource('menus')

api.indexByRoleId = function (roleId) {
    return request.get('menu/indexByRoleId/' + roleId)
}

api.indexWithApi = function () {
    return request.get('menu/indexWithApi')
}

export default api
