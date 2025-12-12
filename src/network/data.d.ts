declare module 'axios' {
  export interface AxiosRequestConfig {
    dataType?: string
    typeStr?: string
    isFirst?: boolean
  }
}

export interface Response<T> {
  code: number
  message?: string
  data: T
}
// 分页
export interface Pagination {
  current?: number
  pageSize?: number
}
// 列表
export interface List<T> {
  total: number
  records: T[]
}
