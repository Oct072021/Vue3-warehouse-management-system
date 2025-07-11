<template>
  <p>
    <span style="color: red">{{ item.id }}</span>
    {{ item.value }}
  </p>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Item } from './data.d';

const props=withDefaults(defineProps<{
  item?:Item
}>(),{
  item:()=>({})
})
</script>

<style scoped></style>
