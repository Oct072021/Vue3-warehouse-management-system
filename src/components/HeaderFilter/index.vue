<template>
  <div>
    <div class="filter-container">
      <div
        v-for="(item, index) in configData"
        :key="index"
      >
        <el-input
          v-if="item.type === 'input'"
          v-model="listQuery[item.name]"
          :placeholder="item.placeholder"
          :style="item.styles"
          class="filter-item"
          @keyup.enter="buttonClick(item.event)"
        />

        <el-select
          v-if="item.type === 'select'"
          v-model="listQuery[item.name]"
          :placeholder="item.placeholder"
          :style="item.styles"
          class="filter-item"
          @change="buttonClick(item.event)"
        >
          <el-option
            v-for="opt in item.options"
            :key="opt.key"
            :label="opt.label"
            :value="opt.key"
          />
        </el-select>

        <el-date-picker
          v-if="item.type === 'date'"
          v-model="listQuery[item.name]"
          type="date"
          :placeholder="item.placeholder"
          :style="item.styles"
          class="filter-item"
          @change="buttonClick(item.event)"
        />

        <el-button
          v-if="item.type === 'button'"
          v-waves
          class="filter-item"
          :style="item.styles"
          :type="item.buttonType"
          :icon="item.icon"
          @click="buttonClick(item.event)"
        >
          {{ item.name }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { waves } from '@/directive/waves' // waves directive
import { debounce } from '@/utils/index'

import { Directive, reactive, watch } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

import { SearchList } from './data.d'

const vWaves: Directive = waves

const { t } = useI18n()
const props = withDefaults(
  defineProps<{
    configData?: any[]
  }>(),
  {
    configData: [] as any,
  },
)
const emit = defineEmits<{
  (e: 'buttonClick', data: SearchList, event: string): void
}>()

const listQuery = reactive<SearchList>({})

watch(
  listQuery,
  debounce(
    function (val: SearchList) {
      emit('buttonClick', val, 'search')
    },
    0.5 * 1000,
    false,
  ),
  { deep: true },
)

const buttonClick = (event: string) => {
  emit('buttonClick', listQuery, event)
}
</script>

<style scoped></style>
