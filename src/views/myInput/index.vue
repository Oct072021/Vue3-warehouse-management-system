<template>
  <MyInput v-model="value" ref="input">
    <template #append>append</template>
  </MyInput>
</template>

<script setup lang="ts">
import MyInput from '@/components/MyInput/index.vue'
import { ref } from 'vue'

defineOptions({ name: 'MyInput' })

const value = ref<string>('测试内容')
const input=ref()
setTimeout(() => {
  input.value.clear()
}, 2000);
</script>

<style lang="scss" scoped></style>
