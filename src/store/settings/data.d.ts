import { ScssVariables } from '@/styles/element-variables.module.scss'

export interface SettingsState {
	theme: string
	showSettings: boolean
	tagsView: boolean
	fixedHeader: boolean
	sidebarLogo: boolean
}

export interface Setting {
	key: string
	value: boolean | string
}
