<template>
  <el-scrollbar height="calc(100vh - 90px)">
    <div
      class="container"
      v-waterfall="imgList"
      v-bind="{
        minGap: 10,
        width: 220,
      }"
    ></div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { waterfall } from '@/directive/waterfall' // waterfall directive
import { Directive, ref } from 'vue'
import { getImgData } from './service'

const vWaterfall: Directive = waterfall

const imgList = ref<string[]>([])
const getData = async () => {
  const res = await getImgData()
  imgList.value = res
}
getData()
</script>

<style lang="scss" scoped></style>
