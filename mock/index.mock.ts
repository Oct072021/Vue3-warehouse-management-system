import { defineMock } from 'vite-plugin-mock-dev-server'

import userMock from './user.mock'
import warehouseMock from './warehouse.mock'

const mock = [...userMock, ...warehouseMock]

// export default defineMock(mock)
