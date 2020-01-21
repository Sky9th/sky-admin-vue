import request from '@/plugin/axios'

const api = {
    index () {
        return request.get('users')
    },
    getPermissionInfo () {
        return request.get('user/getPermissionInfo')
    }
}

export default api
