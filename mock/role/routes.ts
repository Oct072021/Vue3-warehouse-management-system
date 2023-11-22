// // Just a mock data

// const constantRoutes = [
//   {
//     path: '/redirect',
//     component: 'layout/Layout',
//     hidden: true,
//     children: [
//       {
//         path: '/redirect/:path*',
//         component: 'views/redirect/index'
//       }
//     ]
//   },
//   {
//     path: '/login',
//     component: 'views/login/index',
//     hidden: true
//   },
//   {
//     path: '/auth-redirect',
//     component: 'views/login/auth-redirect',
//     hidden: true
//   },
//   {
//     path: '/404',
//     component: 'views/error-page/404',
//     hidden: true
//   },
//   {
//     path: '/401',
//     component: 'views/error-page/401',
//     hidden: true
//   },
//   {
//     path: '',
//     component: 'layout/Layout',
//     redirect: 'dashboard',
//     children: [
//       {
//         path: 'dashboard',
//         component: 'views/dashboard/index',
//         name: 'Dashboard',
//         meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
//       }
//     ]
//   },
// ]

// const asyncRoutes = [
//   {
//     path: '/error-log',
//     component: 'layout/Layout',
//     children: [
//       {
//         path: 'log',
//         component: 'views/error-log/index',
//         name: 'ErrorLog',
//         meta: { title: 'Error Log', icon: 'bug', roles: ['admin'] }
//       }
//     ]
//   },

//   {
//     path: '/permission',
//     component: 'layout/Layout',
//     redirect: '/permission/index',
//     alwaysShow: true,
//     meta: {
//       title: 'Permission',
//       icon: 'lock',
//       roles: ['admin']
//     },
//     children: [
//       {
//         path: 'directive',
//         component: 'views/permission/directive',
//         name: 'DirectivePermission',
//         meta: {
//           title: 'Directive Permission'
//         }
//       },
//       {
//         path: 'role',
//         component: 'views/permission/role',
//         name: 'RolePermission',
//         meta: {
//           title: 'Role Permission',
//         }
//       }
//     ]
//   },

//   {
//     path: '/charts',
//     component: 'layout/Layout',
//     redirect: 'noRedirect',
//     name: 'Charts',
//     meta: {
//       title: 'Charts',
//       icon: 'chart',
//       roles: ['admin']
//     },
//     children: [
//       {
//         path: 'inbound-chart',
//         component: 'views/charts/inbound-chart',
//         name: 'inboundChart',
//         meta: { title: 'inbound Chart', noCache: true }
//       },
//       {
//         path: 'outbound-chart',
//         component: 'views/charts/outbound-chart',
//         name: 'outboundChart',
//         meta: { title: 'outbound Chart', noCache: true }
//       }
//     ]
//   },

//   {
//     path: '/stock',
//     component: 'layout/Layout',
//     name: 'Stock',
//     meta: {
//       title: 'Stock',
//       icon: 'table',
//       roles: ['admin', 'dataOperator']
//     },
//     children: [
//       {
//         path: '',
//         component: 'views/stock',
//         name: 'stock',
//         meta: { title: 'stock' }
//       }
//     ]
//   },

//   {
//     path: '/record',
//     component: 'layout/Layout',
//     meta: {
//       title: 'Record',
//       icon: 'tab',
//       roles: ['admin', 'dataOperator']
//     },
//     children: [
//       {
//         path: 'inbound',
//         component: 'views/record/inbound/index',
//         name: 'inbound',
//         meta: { title: 'inbound' }
//       },
//       {
//         path: 'outbound',
//         component: 'views/record/outbound/index',
//         name: 'outbound',
//         meta: { title: 'outbound' }
//       }
//     ]
//   },

//   {
//     path: '/Financial',
//     component: 'layout/Layout',
//     meta: {
//       title: 'Financial',
//       icon: 'money',
//       roles: ['accountant']
//     },
//     children: [
//       {
//         path: 'income',
//         component: 'views/financial/income/index',
//         name: 'income',
//         meta: { title: 'income' }

//       },
//       {
//         path: 'expend',
//         component: 'views/financial/expend/index',
//         name: 'expend',
//         meta: { title: 'expend' }
//       }
//     ]
//   },

//   {
//     path: 'external-link',
//     component: 'layout/Layout',
//     children: [
//       {
//         path: 'https://github.com/Oct072021/warehouse-management-system',
//         meta: { title: 'External Link', icon: 'link' }
//       }
//     ]
//   },

//   { path: '*', redirect: '/404', hidden: true }
// ]

// module.exports = {
//   constantRoutes,
//   asyncRoutes
// }
