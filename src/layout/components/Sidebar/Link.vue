<template>
  <component
    :is="type"
    v-bind="linkProps(to)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate'
import { computed } from 'vue'

const props = defineProps<{
  to: string
}>()

const _isExternal = computed(() => {
  return isExternal(props.to)
})
const type = computed(() => {
  if (_isExternal.value) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = (to: string) => {
  if (_isExternal.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener',
    }
  }
  return {
    to: to,
  }
}
</script>
