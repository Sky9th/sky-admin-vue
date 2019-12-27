import request from '@/plugin/axios'

export function add (data) {
    return request.post('/module', data)
}
