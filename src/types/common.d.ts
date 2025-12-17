export interface List<T> {
  items: T[]
  total: number
}

export type Type = 'primary' | 'danger' | 'success' | 'warning' | 'info'
