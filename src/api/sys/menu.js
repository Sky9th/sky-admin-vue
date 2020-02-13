import request from '@/plugin/axios'
import { resource } from '@/api/resource'

const api = resource('menus')

api.indexByRoleId = function (roleId, query) {
    return request.get('menu/indexByRoleId/' + roleId, { params: query })
}

export default api
