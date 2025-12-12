import axios, {  AxiosError, AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
import { useUserStore } from '@/store/user'
import { Response } from '@/types/httpRes.d'

const requestQueue: any[] = [] // 请求队列
const maxConcurrent = 3 // 最大并发请求数
let concurrentRequests = 0 // 当前并发请求数

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  isFirst: true,
  dataType: 'default',
  headers: {
    'Content-Type': 'application/json',
  },
})

// request interceptor
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    // 添加请求头
    if (userStore.token) {
      config.headers['X-Token'] = getToken()!
    }

    // 追加时间戳，防止GET请求缓存
    if (config.method?.toUpperCase() === 'GET') {
      config.params = { ...config.params, t: new Date().getTime() }
    }
    // 控制并发任务的执行顺序
    if (concurrentRequests < maxConcurrent) {
      concurrentRequests++

      return config
    } else {
      return new Promise((resolve) => {
        if (config.isFirst) {
          requestQueue.unshift({ config, resolve })
        } else {
          requestQueue.push({ config, resolve })
        }
      })
    }
  },
  (error: AxiosError) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { config, data } = response
    const { code, message } = data
    // 文件流处理
    if (config.responseType === 'blob') return response

    const userStore = useUserStore()
    if (code === 20000) {
      if (config.typeStr) {
        ElMessage({
          message: config.typeStr + '成功',
          type: 'success',
        })
      }
    } else {
      if (config.typeStr) {
        ElMessage({
          message: config.typeStr + '失败--' + message,
          type: 'error',
        })
      }
    }

    if (code === 40300) {
      // to re-login
      ElMessageBox.confirm(
        'You have been logged out, you can cancel to stay on this page, or log in again',
        'Confirm logout',
        {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      ).then(() => {
        userStore.resetToken().then(() => {
          location.reload()
        })
      })
    }

    concurrentRequests--
    if (requestQueue.length > 0) {
      const { config, resolve } = requestQueue.shift()
      concurrentRequests++
      resolve(config)
    }

    return data
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

/* 导出封装的请求方法 */
export const Http = {
  getRequest<T = any>(url: string, config?: AxiosRequestConfig): Promise<Response<T>> {
    return service.get(url, config)
  },

  postRequest<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return service.post(url, data, config)
  },

  putRequest<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return service.put(url, data, config)
  },

  deleteRequest<T = any>(url: string, config?: AxiosRequestConfig): Promise<Response<T>> {
    return service.delete(url, config)
  },
}

export default service
