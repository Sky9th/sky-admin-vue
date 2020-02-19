import request from '@/plugin/axios'

const upload = {}

upload.image = (data) => {
    return request.post('upload', data, {
        headers: { 'content-type': 'multipart/form-data' }
    })
}

export default upload
