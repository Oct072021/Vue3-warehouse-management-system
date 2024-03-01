import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import { MockMethod } from 'vite-plugin-mock'

import userMock from './mock-data/user'
import stockMock from './mock-data/stock'
import orderMock from './mock-data/order'

const modules = [...userMock, ...stockMock, ...orderMock]

function responseFake(mock: MockMethod) {
	return {
		url: mock.url.replace(/\/dev-api/g, import.meta.env.VITE_VUE_APP_BASE_API),
		method: mock.method || 'get',
		response: mock.response || mock.rawResponse
	}
}

export function setupProdMockServer() {
	Object.keys(modules).forEach(key => {
		modules[key] = responseFake(modules[key])
	})
	createProdMockServer(modules)
}
