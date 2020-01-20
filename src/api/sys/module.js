import request from '@/plugin/axios'

const api = {
    index () {
        return request.get('/module')
    },
    read (id) {
        return request.get('/module/' + id)
    },
    add (data) {
        return request.post('/module', data)
    },
    update (data) {
        return request.put('/module/' + data.id, data)
    },
    del (ids) {
        return request.delete('/module', { data: { ids } })
    }
}

export default api
