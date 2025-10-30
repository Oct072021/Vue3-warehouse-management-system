export interface FormItem {
  label?: string
  key?: string
  type: string
  hidden?: boolean
  props?: { [index: string]: any }
  slots?: Record<string, any> | string
  [index: string]: any
}
