<template>
  <MyInput v-model="value">
    <template #append>append</template>
  </MyInput>
</template>

<script setup lang="ts">
import MyInput from '@/components/MyInput/index.vue'
import { ref } from 'vue'

defineOptions({ name: 'MyInput' })

const value = ref<string>('测试内容')
</script>

<style lang="scss" scoped></style>
