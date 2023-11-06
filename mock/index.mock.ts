import { defineMock } from 'vite-plugin-mock-dev-server'

import userMock from './user.mock'
import recordsMock from './records.mock'

const mock = [...userMock, ...recordsMock]

// export default defineMock(mock)
