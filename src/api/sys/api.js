import request from '@/plugin/axios'

const api = {
    index () {
        return request.get('apis')
    }
}

export default api
