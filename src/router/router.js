import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/list',
        icon: 'ios-folder',
        name: 'list',
        title: '栏目管理',
        component: Main,
        children: [
            {
                path: 'index',
                icon: 'ios-paper-outline',
                name: 'list-idx',
                title: '栏目管理',
                component: resolve => { require(['@/views/group/page1/page1.vue'], resolve); }
            },
            {
                path: 'resource',
                icon: 'ios-list-outline',
                name: 'list-resource',
                title: '资源管理',
                component: resolve => { require(['@/views/group/page2/page2.vue'], resolve); }
            }
        ]
    },
    {
        path: '/content',
        icon: 'ios-paper',
        title: '文章管理',
        name: 'content-idx',
        component: Main,
        children: [
            { path: 'index', title: 'Page', name: 'page_index', component: resolve => { require(['@/views/page/page.vue'], resolve); } }
        ]
    },
    {
        path: '/sys',
        icon: 'ios-paper',
        title: '系统管理',
        name: 'sys-idx',
        component: Main,
        children: [
            {
                path: 'user',
                icon: 'ios-paper-outline',
                name: 'sys-user',
                title: '用户管理',
                component: resolve => { require(['@/views/sys/user/idx.vue'], resolve); }
            },
            {
                path: 'role',
                icon: 'ios-list-outline',
                name: 'sys-role',
                title: '角色管理',
                component: resolve => { require(['@/views/sys/role/idx.vue'], resolve); }
            },
            {
                path: 'resource',
                icon: 'ios-list-outline',
                name: 'sys-resource',
                title: '资源管理',
                component: resolve => { require(['@/views/sys/resource/idx.vue'], resolve); }
            }
        ]
    },
    {
        path: '/attachment',
        icon: 'ios-paper',
        title: '图片附件',
        name: 'sys-attachment',
        component: Main,
        children: [
            {
                path: 'image',
                icon: 'ios-paper-outline',
                name: 'sys-image',
                title: '图片管理',
                component: resolve => { require(['@/views/sys/attachment/image.vue'], resolve); }
            },
            {
                path: 'attach',
                icon: 'ios-list-outline',
                name: 'sys-attach',
                title: '附件管理',
                component: resolve => { require(['@/views/sys/attachment/attach.vue'], resolve); }
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
