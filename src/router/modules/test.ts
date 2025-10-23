/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'
// 效果测试 路由
const testRouter: RouteRecordRaw = {
  path: '/test',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Test',
  meta: {
    title: 'Test',
    icon: 'skill',
    roles: ['admin'],
  },
  children: [
    {
      path: '/test/waterfall',
      component: () => import('@/views/waterFall/index.vue'),
      name: 'Waterfall',
      meta: {
        title: 'WaterFall',
        roles: ['admin'],
      },
    },
    {
      path: '/test/virtualList',
      component: () => import('@/views/virtualList/index.vue'),
      name: 'VirtualList',
      meta: {
        title: 'VirtualList',
        roles: ['admin'],
      },
    },
  ],
}

export default testRouter
