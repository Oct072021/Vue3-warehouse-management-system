import { useErrorLogStore } from '@/store/errorLog'
import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
import { useUserStore } from '@/store/user'
import { Response } from '@/types/httpRes.d'
import { Log } from '@/store/errorLog/data'

// create an axios instance
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API, // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// do something before request is sent
		const userStore = useUserStore()
		if (userStore.token) {
			// let each request carry token
			// ['X-Token'] is a custom headers key
			// please modify it according to the actual situation
			config.headers!['X-Token'] = getToken()!
		}
		return config
	},
	(error: AxiosError) => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	 */

	/**
	 * Determine the request status by custom code
	 * Here is just an example
	 * You can also judge the status by HTTP Status Code
	 */
	(response: AxiosResponse<Response>): Promise<Response> | Response => {
		const res = response.data

		const userStore = useUserStore()
		// if the custom code is not 20000, it is judged as an error.
		if (res.code !== 20000) {
			ElMessage({
				message: res.message || 'Error',
				type: 'error',
				duration: 5 * 1000
			})

			// 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
			if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
				// to re-login
				ElMessageBox.confirm(
					'You have been logged out, you can cancel to stay on this page, or log in again',
					'Confirm logout',
					{
						confirmButtonText: 'Re-Login',
						cancelButtonText: 'Cancel',
						type: 'warning'
					}
				).then(() => {
					userStore.resetToken().then(() => {
						location.reload()
					})
				})
			}
			return Promise.reject(new Error(res.message || 'Error'))
		} else {
			return res
		}
	},
	(error: AxiosError) => {
		console.log(error) // for debug

		const { code, request, message, name } = error
		const log: Log = {
			info: code,
			url: request.responseURL,
			err: {
				message,
				stack: name
			}
		}

		const errorLogStore = useErrorLogStore()
		errorLogStore.addErrorLog(log)

		ElMessage({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
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
	}
}

export default service
