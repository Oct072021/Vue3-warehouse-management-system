/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'

const recordRouter:RouteRecordRaw = {
  path: '/record',
  component: Layout,
  meta: {
    title: 'Record',
    icon: 'tab',
    roles: ['admin', 'dataOperator']
  },
  children: [
    {
      path: 'inbound',
      component: () => import('@/views/record/inbound/index.vue'),
      name: 'inbound',
      meta: { title: 'Inbound' }
    },
    {
      path: 'outbound',
      component: () => import('@/views/record/outbound/index.vue'),
      name: 'outbound',
      meta: { title: 'Outbound' }
    }
  ]
}

export default recordRouter
