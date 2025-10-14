<template>
  <el-card>
    <template #header>
      <span>{{ props.title }}</span>
    </template>
    <p>{{ props.desc }}</p>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  desc: string
}>()
</script>

<style lang="scss" scoped></style>
