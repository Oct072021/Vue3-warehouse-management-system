<template>
	<div
		v-if="_isExternal"
		:style="styleExternalIcon"
		class="svg-external-icon svg-icon"
		v-on="$attrs"
	/>
	<i v-else>
		<svg
			:class="svgClass"
			aria-hidden="true"
			v-on="$attrs"
		>
			<use :xlink:href="iconName" />
		</svg>
	</i>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate'
import { computed } from 'vue'

const props = withDefaults(
	defineProps<{
		iconClass: string
		className?: string
	}>(),
	{
		className: ''
	}
)

const _isExternal = computed(() => {
	return isExternal(props.iconClass)
})
const iconName = computed(() => {
	return `#icon-${props.iconClass}`
})
const svgClass = computed(() => {
	if (props.className) {
		return 'svg-icon ' + props.className
	} else {
		return 'svg-icon'
	}
})
const styleExternalIcon = computed(() => {
	return {
		mask: `url(${props.iconClass}) no-repeat 50% 50%`,
		'-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
	}
})
</script>

<style lang="scss" scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}

.svg-external-icon {
	background-color: currentColor;
	mask-size: cover !important;
	display: inline-block;
}

.card-panel-icon {
	font-size: 48px;
}
</style>
