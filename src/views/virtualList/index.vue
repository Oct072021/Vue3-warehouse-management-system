<template>
  <VirtualList
    :listData="data"
    :estimatedItemSize="100"
    v-slot="slotProps"
  >
    <Item :item="slotProps.item" />
  </VirtualList>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VirtualList from '@/components/VirtualList/index.vue'
import Item from '@/components/VirtualList/Item.vue'
import { getListData } from './service'
import { ListVO } from './data.d'

const data = ref<ListVO[]>([])
const getData = async () => {
  const res = await getListData()
  data.value = res
}
getData()
</script>
<style lang="scss" scoped></style>
<style>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
#app {
  height: 100%;
}
</style>
