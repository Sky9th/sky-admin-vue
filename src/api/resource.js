import request from '@/plugin/axios'

export function resource (router) {
    return {
        structure () {
            return request.get(router + '/structure')
        },
        index (query) {
            return request.get(router, { params: query })
        },
        read (id) {
            return request.get(router + '/' + id)
        },
        save (query) {
            if (query.id) {
                return request.put(router + '/' + query.id, query)
            } else {
                return request.post(router, query)
            }
        },
        del (ids) {
            return request.delete(router, { data: { ids } })
        }
    }
}
