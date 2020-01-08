import module from '@api/sys.module'
import { Message, MessageBox } from 'element-ui'

export default {
    namespaced: true,
    actions: {
        index ({ dispatch }) {
            return module.index()
        },
        read ({ dispatch }, id) {
            return module.read(id)
        },
        active ({ dispatch }, data = {}) {
            if (data.id) {
                return module.update(data)
            } else {
                return module.add(data)
            }
        },
        del ({ dispatch }, selection) {
            return new Promise((resolve, reject) => {
                let ids = []
                new Promise((resolve) => {
                    for (let i in selection) {
                        ids.push(selection[i].id)
                    }
                    if (ids.length === 0) {
                        throw new Error('尚未选择数据')
                    }
                    resolve()
                }).then(() => {
                    MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        module.del(ids).then(resolve).catch(reject)
                    })
                }).catch((err) => {
                    Message.error(err.message)
                    reject(err)
                })
            })
        }
    }
}
