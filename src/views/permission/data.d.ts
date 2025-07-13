import { RouteRecordRaw } from 'vue-router'

export interface RolesData {
  key: string
  name: string
  description: string
  routes: RouteRecordRaw[]
}
