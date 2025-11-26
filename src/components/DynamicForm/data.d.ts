import type { FormProps } from 'element-plus'
export interface Props extends Partial<FormProps> {
  formItems: FormItem[]
}

export interface FormItem {
  label?: string
  key?: string
  type: string
  hidden?: boolean
  props?: Record<string, any>
  slots?: Record<string, any> | string
  events?: Record<string, any>
  [index: string]: any
}
