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
		sidebarLogo: sidebarLogo
	}),
	actions: {
		changeSetting(data: Setting) {
			const { key, value } = data
			if (Object.prototype.hasOwnProperty.call(this, key)) {
				this[key] = value
			}
		}
	}
})
