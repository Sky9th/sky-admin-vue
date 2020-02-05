import layoutHeaderAside from '@/layout/header-aside'
export default {
    'layoutHeaderAside': layoutHeaderAside,
    'role': () => import(/* webpackChunkName: "system" */'@/views/system/role'),
    'api': () => import(/* webpackChunkName: "system" */'@/views/system/api'),
    'menu': () => import(/* webpackChunkName: "system" */'@/views/system/menu'),
    'route': () => import(/* webpackChunkName: "system" */'@/views/system/route'),
    'user': () => import(/* webpackChunkName: "system" */'@/views/system/user'),
    // Sky9th.cn Component
    'sky9th_tech': () => import(/* webpackChunkName: "system" */'@/views/sky9th.cn/tech'),
    'sky9th_project': () => import(/* webpackChunkName: "system" */'@/views/sky9th.cn/project'),
    'sky9th_config': () => import(/* webpackChunkName: "system" */'@/views/sky9th.cn/config')
}
