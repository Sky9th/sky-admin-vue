import request from '@/plugin/axios'

const api = {
    index () {
        return request.get('routes')
    }
}

export default api
