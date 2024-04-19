import { MockMethod } from 'vite-plugin-mock'

export function responseFake(base: string, mock: MockMethod) {
	const { url, method, rawResponse, response } = mock

	return {
		url: base + url,
		method: method || 'get',
		response: response || rawResponse
	} as MockMethod
}
