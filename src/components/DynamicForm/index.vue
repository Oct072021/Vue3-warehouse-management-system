<template>
  <el-form
    ref="formRef"
    :model="modelValue"
    :label-width="props['label-width']"
    :rules="props.rules"
  >
    <el-form-item
      v-for="item in items"
      v-bind="getFormItemProps(item)"
    >
      <!-- 如果传入了插槽，则使用插槽渲染，否则使用默认的动态组件配置进行渲染 -->
      <slot :name="item.key">
        <component
          :is="getComponents(item)"
          v-bind="{ ...getProps(item), ...(item.key && { modelValue: modelValue[item.key] }) }"
        >
          <template
            v-for="slot in getSlots(item.slots)"
            #[slot.name]
          >
            {{ slot.content }}
          </template>
        </component>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'

import { useTools } from './hooks/useTools'

import type { FormInstance, FormRules } from 'element-plus'
import { FormItem } from './data.d'

const props = withDefaults(
  defineProps<{
    formItems: FormItem[]
    rules?: FormRules
    'label-width'?: string
  }>(),
  {
    'label-width': '',
  },
)
const emit = defineEmits()

const { getProps, getComponents, getFormItemProps, getSlots } = useTools()

const formRef = ref<FormInstance>()

const modelValue = defineModel<{ [index: string]: any }>({ default: () => ({}) })

const items = computed(() => props.formItems.filter((item) => !item.hidden))
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
