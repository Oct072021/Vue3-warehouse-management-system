import { MockMethod } from 'vite-plugin-mock'

import userMock from '../data/user'
import stockMock from '../data/stock'
import orderMock from '../data/order'

import { responseFake } from '../utils'

const modules = [...userMock, ...stockMock, ...orderMock]

Object.keys(modules).forEach(key => {
	modules[key] = responseFake('/dev-api', modules[key])
})

export default modules as MockMethod[]
