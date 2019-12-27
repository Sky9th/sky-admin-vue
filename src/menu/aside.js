// 菜单 侧边栏
export default [
    { path: '/index', title: '首页', icon: 'home' },
    {
        title: '系统管理',
        icon: 'folder-o',
        children: [
            { path: '/log', title: '系统日志' },
            { path: '/module', title: '系统功能' },
            { path: '/admin', title: '管理人员' },
            { path: '/role', title: '权限分组' }
        ]
    }
]
