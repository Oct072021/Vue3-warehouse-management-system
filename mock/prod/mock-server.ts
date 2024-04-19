import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import userMock from '../data/user'
import stockMock from '../data/stock'
import orderMock from '../data/order'

import { responseFake } from '../utils'

const modules = [...userMock, ...stockMock, ...orderMock]

export function setupProdMockServer() {
	Object.keys(modules).forEach(key => {
		modules[key] = responseFake(import.meta.env.VITE_APP_BASE_API, modules[key])
	})
	createProdMockServer(modules)
}
