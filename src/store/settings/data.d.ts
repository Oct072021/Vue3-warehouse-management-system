import { ScssVariables } from "@/styles/element-variables.module.scss"

export interface SettingsState {
  [index: string]: any
  theme: string
  showSettings: boolean
  tagsView: boolean
  fixedHeader: boolean
  sidebarLogo: boolean
}

export interface Setting {
  key: string
  value: boolean
}
