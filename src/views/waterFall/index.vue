<template>
  <el-scrollbar height="calc(100vh - 90px)">
    <WaterFall
      :min-gap="10"
      :width="220"
      fill
    >
      <!-- 图片瀑布流测试 -->
      <!-- <el-image
        v-for="url in imgList"
        :src="url"
        fit="contain"
      /> -->
      <!-- 组件瀑布流测试 -->
      <Comment
        v-for="item in commentList"
        :key="item.title"
        :title="item.title"
        :desc="item.desc"
      />
    </WaterFall>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getCompData, getImgData } from './service'
import WaterFall from '@/components/WaterFall/index.vue'
import Comment from './components/Comment.vue'
import { CommentListVO } from './data.d'

const imgList = ref<string[]>([])
const commentList = ref<CommentListVO[]>([])
const getData = async () => {
  const res = await getImgData()
  imgList.value = res

  const res2 = await getCompData()
  commentList.value = res2
}
getData()
</script>

<style lang="scss" scoped></style>
