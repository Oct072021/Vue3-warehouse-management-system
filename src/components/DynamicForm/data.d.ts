import type { FormProps } from 'element-plus'
export interface Props extends Partial<FormProps> {
  formItems: FormItem[]
}

export interface FormItem {
  label?: string // el-form-item的label
  key?: string // v-for的key，同时也作为el-form-item的prop
  type: string // 组件类型
  hidden?: boolean // 是否隐藏该表单项
  slots?: Record<string, any> | string // 对应组件需要挂载的插槽
  events?: Record<string, any> // 对应组件的事件
  props?: Record<string, any> // 对应组件需要挂载的属性
  [index: string]: any // 便利化设计，不写props也可以挂载属性，适用于props少的情况
}
