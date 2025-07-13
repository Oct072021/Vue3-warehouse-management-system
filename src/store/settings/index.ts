import { defineStore } from 'pinia'

import { SettingsState, Setting } from './data.d'

import variables from '@/styles/element-variables.module.scss'

import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

export const useSettingsStore = defineStore('setttings', {
  state: (): SettingsState => ({
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
  }),
  actions: {
    changeSetting(data: Setting) {
      const { key, value } = data
      switch (key) {
        case 'theme':
          this.theme = value as string
          break
        case 'showSettings':
          this.showSettings = value as boolean
          break
        case 'tagsView':
          this.tagsView = value as boolean
          break
        case 'fixedHeader':
          this.fixedHeader = value as boolean
          break
        case 'sidebarLogo':
          this.sidebarLogo = value as boolean
          break
        default:
          break
      }
    },
  },
})
