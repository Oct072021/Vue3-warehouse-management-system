<template>
  <el-form
    :model="modelValue"
    :label-width="props.labelWidth"
    :rules="props.rules"
    v-bind="{ ref: changeRef }"
  >
    <el-form-item
      v-for="item in items"
      v-bind="getFormItemProps(item)"
      :style="{ 'margin-right': item.type === 'button' ? '12px' : '32px' }"
    >
      <!-- 如果传入了插槽，则使用插槽渲染，否则使用默认的动态组件配置进行渲染 -->
      <slot :name="item.key">
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
import { ComponentInstance, computed, getCurrentInstance, ref } from 'vue'

import { useTools } from './hooks/useTools'

import { ElForm } from 'element-plus'
import { FormItem, Props } from './data.d'

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
const changeRef = (exposed: any) => {
  if (vm) vm.exposed = exposed
}

defineExpose({} as ComponentInstance<typeof ElForm>)
</script>

<style lang="scss" scoped></style>
