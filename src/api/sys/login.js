import request from '@/plugin/axios'
import store from '@/store'

export function AccountLogin (data) {
    return request.post('/login', data)
}

export async function LoginVerify () {
    await store.dispatch('d2admin/user/fingerprint')
    return request.post('/verifyImg', { fingerprint: store.state.d2admin.user.fingerprint })
}
