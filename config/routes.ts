export default [
    {
        path: '/home',
        name: '首页',
        icon: 'HomeFilled',
        component: './Home',
    },
    {
        path: '/login',
        layout: false,
        name: '登录',
        component: './Login',
    },
    {
        path: '/userAuthManage',
        icon: 'AppstoreFilled',
        name: '用户及权限管理',
        access: 'canAdmin',
        routes: [
            {
                name: '用户管理',
                path: '/userAuthManage/userManage',
                component: './UserAuthManage/UserManage',
            },
            {
                name: '角色管理',
                path: '/userAuthManage/roleManage',
                component: './UserAuthManage/RoleManage',
            },
            {
                name: '权限管理',
                path: '/userAuthManage/authManage',
                component: './UserAuthManage/AuthManage',
            },
            {
                name: '菜单管理',
                path: '/userAuthManage/menuMange',
                component: './UserAuthManage/MenuMange',
            },
        ],
    },
    {
        path: '/userNetDisk',
        name: '个人网盘',
        icon: 'CloudFilled',
        component: './UserNetDisk',
    },
    {
        path: '/projectDocument',
        name: '项目文档',
        icon: 'FileTextFilled',
        component: './ProjectDocument',
    },
    {
        path: '/projectDraft',
        name: '项目底稿',
        icon: 'FolderFilled',
        component: './ProjectDraft',
    },
    {
        path: '/knowledgeBase',
        name: '知识库',
        icon: 'BookFilled',
        component: './KnowledgeBase',
    },
    {
        path: '/transmissionList',
        component: './TransmissionList',
        hideInMenu: true,
        hideInBreadcrumb: true,
    },
    {
        path: '/setting',
        component: './Setting',
        hideInMenu: true,
        hideInBreadcrumb: true,
    },
    // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
    { path: '/', redirect: '/home' },
    { path: '*', component: './404' },
];
