<template>
  <el-form
    :ref="changeRef"
    v-bind="{ ...$attrs, ...props }"
  >
    <el-form-item
      v-for="item in items"
      v-bind="getFormItemProps(item)"
      :style="{ 'margin-right': item.type === 'button' ? '12px' : '32px' }"
    >
      <!-- 如果传入了插槽，则使用插槽渲染，否则使用默认的动态组件配置进行渲染 -->
      <slot :name="item.key">
        <!-- 此处不能使用v-model绑定数据，因为此处的comp可能是按钮，不需要绑定数据 -->
        <!-- v-model实际是modelValue和'update:modelValue'事件的语法糖 -->
        <component
          :is="getComponents(item)"
          v-bind="{ ...getProps(item), ...(item.key ? { modelValue: modelValue[item.key] } : {}) }"
          v-on="{
            ...getEvents(item),
            ...(item.key ? { 'update:modelValue': (val: any) => (modelValue[item.key!] = val) } : {}),
          }"
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
import { ComponentInstance, VNodeRef, computed, getCurrentInstance } from 'vue'

import { useTools } from './hooks/useTools'

import type { ElForm, FormInstance } from 'element-plus'
import type { FormItem, Props } from './data.d'

const props = defineProps<Props>()
const emit = defineEmits()

const { getProps, getComponents, getFormItemProps, getSlots } = useTools()

const getEvents = (item: FormItem) => {
  if (!item.events) return {}
  const events: Record<string, (...args: any[]) => void> = {}
  Object.keys(item.events).forEach((eventName) => {
    const activeName = item.events![eventName]
    events[eventName] = (...args: any[]) => {
      emit(activeName, ...args)
    }
  })
  return events
}

const modelValue = defineModel<{ [index: string]: any }>({ default: () => ({}) })

const items = computed(() => props.formItems.filter((item) => !item.hidden))

const vm = getCurrentInstance()
const changeRef: VNodeRef = (ins) => {
  const form = ins as FormInstance | null
  if (vm) {
    vm.exposed = form || {}
    vm.exposeProxy = form || {}
  }
}

defineExpose({} as ComponentInstance<typeof ElForm>)
</script>

<style lang="scss" scoped></style>
