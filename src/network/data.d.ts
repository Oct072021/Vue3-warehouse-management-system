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
