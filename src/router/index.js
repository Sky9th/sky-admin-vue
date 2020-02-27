import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store/index'
import util from '@/libs/util.js'

// 路由数据
import routes, { frameInRoutes } from './routes'

import routerMapComponents from '@/router/routerMapComponents'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'

import userApi from '@/api/sys/user'

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
    return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
    routes
})

let permissionMenu = []
let permissionRouter = []
let permission = {
    functions: [],
    roles: [],
    isAdmin: false
}

const formatRoutes = function (routes) {
    routes.forEach(route => {
        route.component = routerMapComponents[route.component]
        if (route.children) {
            formatRoutes(route.children)
        }
    })
}

const fetchMenuAndRouter = async () => {
    let userPermissionInfo
    try {
        userPermissionInfo = await userApi.getPermissionInfo()
        permissionMenu = userPermissionInfo.accessMenus
        permissionRouter = userPermissionInfo.accessRoutes
        permission.functions = userPermissionInfo.userPermissions
        permission.roles = userPermissionInfo.userRoles
        permission.interfaces = util.formatInterfaces(userPermissionInfo.accessApi)
        permission.isAdmin = userPermissionInfo.isAdmin === 1
    } catch (ex) {
        console.log(ex)
    }

    formatRoutes(permissionRouter)
    let allMenuAside = [...menuAside, ...permissionMenu]
    let allMenuHeader = [...menuHeader, ...permissionMenu]
    // 动态添加路由
    router.addRoutes(permissionRouter)
    // 处理路由 得到每一级的路由设置
    store.commit('d2admin/page/init', [...frameInRoutes, ...permissionRouter])
    // 设置顶栏菜单
    store.commit('d2admin/menu/headerSet', allMenuHeader)
    // 设置侧边栏菜单
    store.commit('d2admin/menu/asideSet', allMenuAside)
    // 初始化菜单搜索功能
    store.commit('d2admin/search/init', allMenuHeader)
    // 设置权限信息
    store.commit('d2admin/permission/set', permission)
    // 加载上次退出时的多页列表
    store.dispatch('d2admin/page/openedLoad')
    return userPermissionInfo
}

// 免校验token白名单
let whiteList = ['/login']
// 标记是否已经拉取权限信息
let isFetchPermissionInfo = false

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
    // 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
    await store.dispatch('d2admin/page/isLoaded')
    // 确认已经加载组件尺寸设置 https://github.com/d2-projects/d2-admin/issues/198
    await store.dispatch('d2admin/size/isLoaded')
    // 进度条
    NProgress.start()
    // 关闭搜索面板
    store.commit('d2admin/search/set', false)
    const sessionKey = util.cookies.get('sessionKey')
    if (whiteList.indexOf(to.path) === -1) {
        // 这里暂时将cookie里是否存有token作为验证是否登录的条件
        // 请根据自身业务需要修改
        if (sessionKey) {
            // 拉取权限信息
            if (!isFetchPermissionInfo) {
                let res = await fetchMenuAndRouter()
                if (res.userName) { isFetchPermissionInfo = true }
                next(to.path, true)
            } else {
                next()
            }
        } else {
            // 将当前预计打开的页面完整地址临时存储 登录后继续跳转
            // 这个 cookie(redirect) 会在登录后自动删除
            util.cookies.set('redirect', to.fullPath)
            // 没有登录的时候跳转到登录界面
            next({
                name: 'login'
            })
        }
    } else {
        if (to.name === 'login') {
            // 如果已经登录，则直接进入系统
            if (sessionKey) {
                next(from.path, true)
                NProgress.done()
            } else {
                next()
            }
        } else {
            next()
        }
    }
})

router.afterEach(to => {
    // 进度条
    NProgress.done()
    // 多页控制 打开新的页面
    store.dispatch('d2admin/page/open', to)
    // 更改标题
    util.title(to.meta.title)
})

export default router
