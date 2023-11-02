interface SideBar {
  opened: boolean
  withoutAnimation: boolean
}

export interface AppState {
  sidebar: SideBar
  device: string
  language: string
  size: string
}
