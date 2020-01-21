import request from '@/plugin/axios'

const api = {
    index () {
        return request.get('menus')
    }
}

export default api
