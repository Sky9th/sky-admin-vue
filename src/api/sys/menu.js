import request from '@/plugin/axios'

const api = {
    index () {
        return request.get('menus')
    },
    indexByRoleId (id) {
        return request.get('menu/indexByRoleId/' + id)
    }
}

export default api
