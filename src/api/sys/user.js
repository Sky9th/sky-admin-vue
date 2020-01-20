import request from '@/plugin/axios'

const api = {
    getPermissionInfo () {
        return request.get('user/getPermissionInfo')
    }
}

export default api
