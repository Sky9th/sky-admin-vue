import request from '@/plugin/axios'
import { resource } from '@/api/resource'

const api = resource('configs')

api.set = (code, param) => {
    return request.post('config/set/' + code, { param })
}

export default api
