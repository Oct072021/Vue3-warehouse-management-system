import { MockMethod } from 'vite-plugin-mock'

import userMock from '../data/user'
import stockMock from '../data/stock'
import orderMock from '../data/order'
import transferMock from '../data/transfer'
import waterfall from '../data/waterfall'

import { responseFake } from '../utils'

const modules = [...userMock, ...stockMock, ...orderMock, ...transferMock, ...waterfall]

Object.keys(modules).forEach((key) => {
  modules[key] = responseFake('', modules[key])
})

export default modules as MockMethod[]
