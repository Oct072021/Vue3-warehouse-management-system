import { defineMock } from 'vite-plugin-mock-dev-server'

import userMock from './user.mock'
import recordsMock from './order.mock'

const mock = [...userMock, ...recordsMock]

// export default defineMock(mock)
