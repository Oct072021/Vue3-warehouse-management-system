import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

import orderRouter from './modules/order'
import stockRouter from './modules/stock'
import chartsRouter from './modules/charts'
import transferRouter from './modules/transfer'
import testRouter from './modules/test'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect.vue'),
    meta: { hidden: true },
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true },
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: { hidden: true },
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
      },
    ],
  },

  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/Oct072021/Vue3-warehouse-management-system',
        component: () => {},
        meta: { title: 'ExternalLink', icon: 'link' },
      },
    ],
  },
]

export const asyncRoutes: RouteRecordRaw[] = [
  testRouter,
  {
    path: '/permission',
    component: Layout,
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      alwaysShow: true, // will always show the root menu
    },
    children: [
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'DirectivePermission',
          roles: ['admin', 'dataOperator', 'accountant'],
        },
      },
    ],
  },

  /** when your routing map is too long, you can split it into small modules **/
  chartsRouter,
  stockRouter,
  orderRouter,
  transferRouter,

  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)', redirect: '/404', meta: { hidden: true } }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL || ''),
  routes: constantRoutes,
})

export default router
