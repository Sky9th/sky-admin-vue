import request from '@/plugin/axios'

const upload = {}

upload.image = (data, onProgress) => {
    return request.post('upload', data, {
        headers: { 'content-type': 'multipart/form-data' },
        // `onUploadProgress` 允许为上传处理进度事件
        onUploadProgress: function (event) {
            console.log(111)
        }
    })
}

export default upload
