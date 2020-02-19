import request from '@/plugin/axios'

export function AccountLogin (data) {
    return request.post('/login', data)
}

export function LoginVerify (name) {
    return request.get('/verifyImg/' + name)
}
