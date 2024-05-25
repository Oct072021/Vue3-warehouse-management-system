import SvgIcon from '@/components/SvgIcon/index.vue'

declare module 'vue' {
	export interface GlobalComponents {
		SvgIcon: typeof SvgIcon
	}
}

export {}
