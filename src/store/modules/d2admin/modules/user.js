import fingerprint2 from 'fingerprintjs2'
export default {
    namespaced: true,
    state: {
    // 用户信息
        info: {},
        fingerprint: ''
    },
    actions: {
        /**
         * @description 设置用户数据
         * @param {Object} context
         * @param {*} info info
         */
        set ({ state, dispatch }, info) {
            return new Promise(async resolve => {
                // store 赋值
                state.info = info
                // 持久化
                await dispatch('d2admin/db/set', {
                    dbName: 'sys',
                    path: 'user.info',
                    value: info,
                    user: true
                }, { root: true })
                // end
                resolve()
            })
        },
        /**
         * @description 从数据库取用户数据
         * @param {Object} context
         */
        load ({ state, dispatch }) {
            return new Promise(async resolve => {
                // store 赋值
                state.info = await dispatch('d2admin/db/get', {
                    dbName: 'sys',
                    path: 'user.info',
                    defaultValue: {},
                    user: true
                }, { root: true })
                // end
                resolve()
            })
        },
        fingerprint ({ state }) {
            return new Promise(function (resolve, reject) {
                fingerprint2.getV18({}, function (result) {
                    state.fingerprint = result
                    resolve(result)
                })
            })
        }
    }
}
