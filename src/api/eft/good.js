import { resource } from '@/api/resource'
import request from '@/plugin/axios'

const api = resource('goods')

api.import = (ids) => {
    return request.post('good/import', { ids }, {timeout: 5000000})
}

api.fail = () => {
    return request.get('good/fail')
}

api.retry = (id) => {
    return request.get('good/retry/' + id)
}

api.ignore = (id) => {
    return request.get('good/ignore/' + id)
}

export default api
