import { RouteRecordRaw } from 'vue-router'

export interface PermissionState {
  [index: string]: any
  routes: RouteRecordRaw[]
  addRoutes: RouteRecordRaw[]
}
