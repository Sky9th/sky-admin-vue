import request from '@/plugin/axios'

export function AccountLogin (data) {
    return request.post('/login', data)
}
