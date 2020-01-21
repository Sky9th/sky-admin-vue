import request from '@/plugin/axios'

const api = {
    index () {
        return request.get('roles')
    }
}

export default api
