import layoutHeaderAside from '@/layout/header-aside'
export default {
    'layoutHeaderAside': layoutHeaderAside,
    'role': () => import(/* webpackChunkName: "system" */'@/views/system/role'),
    'api': () => import(/* webpackChunkName: "system" */'@/views/system/api'),
    'menu': () => import(/* webpackChunkName: "system" */'@/views/system/menu'),
    'route': () => import(/* webpackChunkName: "system" */'@/views/system/route'),
    'user': () => import(/* webpackChunkName: "system" */'@/views/system/user')
}
