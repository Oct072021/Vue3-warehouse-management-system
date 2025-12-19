import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

const stockArr: any[] = []

for (let i = 1; i <= 700; i++) {
  stockArr.push(
    Mock.mock({
      id: i,
      productionID: Mock.Random.guid().slice(0, 23),
      specs: '@integer(1, 100)*@integer(1, 100)',
      productionName: `stock ${i} `,
      'area|1': ['area-1', 'area-2', 'area-3', 'area-4'],
      quantity: '@integer(0, 100)',
      'unit|1': ['EA', 'PCS', 'SET'],
    }),
  )
}

export default [
  {
    url: '/vue-element-admin/stock/list',
    method: 'get',
    response: ({ query }) => {
      const { area, productionName, page, limit, sort } = query
      // simulate search
      let mockList = stockArr.filter((item) => {
        if (area && item.area !== area) return false
        if (productionName && item.productionName.indexOf(productionName) < 0) return false
        return true
      })
      // sort
      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      // Pagination
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList,
        },
      }
    },
  },

  {
    url: '/vue-element-admin/stock/getProductionByArea',
    method: 'get',
    response: ({ query }) => {
      const { area } = query

      // simulate search
      const filterList = stockArr.filter((item) => {
        if (area && item.area !== area) return false
        return true
      })

      const data = {}
      filterList.forEach((item) => {
        const { productionID, productionName, quantity, unit } = item
        data[productionID] = { productionName, quantity, unit }
      })

      return {
        code: 20000,
        data,
      }
    },
  },
] as MockMethod[]
