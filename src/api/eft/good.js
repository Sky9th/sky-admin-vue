import { resource } from '@/api/resource'
import request from '@/plugin/axios'

const api = resource('goods')

api.import = (ids) => {
    return request.post('good/import', { ids }, {timeout: 5000000})
}

export default api
