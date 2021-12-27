import layoutHeaderAside from '@/layout/header-aside'
export default {
    'layoutHeaderAside': layoutHeaderAside,
    'role': () => import(/* webpackChunkName: "system" */'@/views/system/role'),
    'api': () => import(/* webpackChunkName: "system" */'@/views/system/api'),
    'menu': () => import(/* webpackChunkName: "system" */'@/views/system/menu'),
    'route': () => import(/* webpackChunkName: "system" */'@/views/system/route'),
    'user': () => import(/* webpackChunkName: "system" */'@/views/system/user'),
    'config': () => import(/* webpackChunkName: "system" */'@/views/system/config'),
    // Sky9th.cn Component
    'sky9th_tech': () => import(/* webpackChunkName: "system" */'@/views/sky9th.cn/tech'),
    'sky9th_project': () => import(/* webpackChunkName: "system" */'@/views/sky9th.cn/project'),
    'sky9th_config': () => import(/* webpackChunkName: "system" */'@/views/sky9th.cn/config'),
    // etf-helper Component
    'eft_good': () => import(/* webpackChunkName: "eft" */'@/views/eft/good'),
    'eft_combine': () => import(/* webpackChunkName: "eft" */'@/views/eft/combine'),
    'eft_category': () => import(/* webpackChunkName: "eft" */'@/views/eft/category'),
    'eft_catalogue': () => import(/* webpackChunkName: "eft" */'@/views/eft/catalogue'),
    'eft_import': () => import(/* webpackChunkName: "eft" */'@/views/eft/import'),
    'eft_config': () => import(/* webpackChunkName: "eft" */'@/views/eft/config')
}
