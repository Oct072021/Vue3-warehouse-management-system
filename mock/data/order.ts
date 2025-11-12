import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

const outboundArr: any[] = []
const inboundArr: any[] = []

for (let i = 1; i <= 1000; i++) {
  const production: any[] = []
  for (let j = 1; j <= 5; j++) {
    production.push({
      productionID: `00018${j}`,
      productionName: `电源${j}`,
      specs1: '@integer(1, 20)cm',
      specs2: '@integer(1, 20)cm',
      quantity: '@integer(0, 100)',
      price: '@float(200, 500, 0, 2)',
    })
  }
  const status = Mock.Random.integer(0, 2)
  const auditor = status === 0 ? '' : 'Sam'
  const reason = status === 0 ? '' : 'xxxxxxxxx'
  outboundArr.push(
    Mock.mock({
      id: i,
      orderID: `RKD${10000 + i}`,
      timestamp: "@date('2022/MM/dd')",
      title: `设备箱 ${i} `,
      'area|1': ['area-1', 'area-2', 'area-3', 'area-4'],
      type: '@integer(0, 1)',
      documenter: 'Sekiro',
      'client|1': ['66科技', 'xx科技', 'LA科技'],
      status,
      auditor,
      contact: 'Higgs',
      number: 12345678912,
      remark: '无',
      reason,
      production,
    }),
  )
}

for (let i = 1; i <= 600; i++) {
  const production: any[] = []
  for (let j = 1; j <= 5; j++) {
    production.push({
      productionID: `00018${j}`,
      productionName: `电源${j}`,
      specs1: '@integer(1, 20)cm',
      specs2: '@integer(1, 20)cm',
      quantity: '@integer(0, 100)',
      price: '@float(200, 500, 0, 2)',
    })
  }
  const status = Mock.Random.integer(0, 2)
  const auditor = status === 0 ? '' : 'Sam'
  const reason = status === 0 ? '' : 'xxxxxxxxx'
  inboundArr.push(
    Mock.mock({
      id: i,
      orderID: `RKD${10000 + i}`,
      timestamp: "@date('2022/MM/dd')",
      title: `设备箱 ${i} `,
      'area|1': ['area-1', 'area-2', 'area-3', 'area-4'],
      type: '@integer(0, 1)',
      'supplier|1': ['CA科技', 'ZV科技', '77科技'],
      documenter: 'Sekiro',
      status,
      auditor,
      contact: 'Higgs',
      number: 12345678912,
      remark: '无',
      reason,
      production,
    }),
  )
}

export default [
  /**--------------------------------------------  inbound module  --start  --------------------------------------------------------**/
  {
    url: '/vue-element-admin/inbound/list',
    method: 'get',
    response: ({ query }) => {
      const { orderID, area, type, page = 1, limit = 20, status } = query
      // simulate search
      let mockList = inboundArr.filter((item) => {
        if (area && item.area !== area) return false
        if (type && ('' + item.type).indexOf(type) < 0) return false
        if (status && ('' + item.status).indexOf(status) < 0) return false
        if (orderID && item.orderID.indexOf(orderID) < 0) return false
        return true
      })

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
    url: '/vue-element-admin/inbound/all',
    method: 'get',
    response: ({ query }) => {
      const { area } = query
      // simulate search
      let mockList = inboundArr.filter((item) => {
        if (area && item.area !== area) return false
        return true
      })

      return {
        code: 20000,
        data: mockList,
      }
    },
  },

  {
    url: '/vue-element-admin/inbound/total',
    method: 'get',
    response: ({ query }) => {
      const { area } = query
      let mockList = inboundArr.filter((item) => {
        if (area && item.area !== area) return false
        return true
      })
      const totalArr: any[] = []
      const ordersArr: any[] = []
      for (let i = 1; i < 13; i++) {
        // Filter out the monthly data
        const monthData = mockList.filter((item, index) => parseInt(item.timestamp.slice(5, 7)) === i)
        // get the monthly order quantity
        ordersArr.push(monthData.length)
        // get the monthly inbound total amount
        let temp = 0
        monthData.forEach((item) => {
          let totalPrice = 0
          item.production.forEach((prod: any) => {
            totalPrice += parseFloat(prod.price * prod.quantity + '')
          })
          temp += totalPrice
        })
        totalArr.push(parseInt(temp + ''))
      }

      const type: Record<string, number> = {}
      inboundArr.forEach((item) => {
        if (!type[item.type]) type[item.type] = 0
        type[item.type]++
      })

      return {
        code: 20000,
        data: {
          total: totalArr,
          orders: ordersArr,
          type,
        },
      }
    },
  },

  {
    url: '/vue-element-admin/inbound/detail',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      for (const item of inboundArr) {
        if (item.id === +id) {
          return {
            code: 20000,
            data: item,
          }
        }
      }
    },
  },

  {
    url: '/vue-element-admin/inbound/audit',
    method: 'put',
    response: ({ body }) => {
      const { detail, status } = body
      const index = inboundArr.findIndex((v) => v.id === detail.id)
      detail.status = status
      inboundArr.splice(index, 1, detail)

      return {
        code: 20000,
        data: {},
        message: 'success',
      }
    },
  },

  {
    url: '/vue-element-admin/inbound/create',
    method: 'post',
    response: ({ body }) => {
      body.id = inboundArr.length + 1
      body['status'] = 0
      body.orderID = `RKD${10000 + inboundArr.length + 1}`
      inboundArr.unshift(body)

      return {
        code: 20000,
        message: 'success',
        data: {},
      }
    },
  },

  {
    url: '/vue-element-admin/inbound/update',
    method: 'post',
    response: ({ body }) => {
      const index = inboundArr.findIndex((v) => v.id === body.id)
      inboundArr.splice(index, 1, body)

      return {
        code: 20000,
        message: 'success',
        data: {},
      }
    },
  },

  {
    url: '/vue-element-admin/inbound/remove',
    method: 'delete',
    response: ({ query }) => {
      const index = inboundArr.findIndex((v) => v.id == query.id)
      inboundArr.splice(index, 1)

      return {
        code: 20000,
        message: 'success',
        data: {},
      }
    },
  },
  /**--------------------------------------------  inbound module  --end  ----------------------------------------------------------**/

  /**--------------------------------------------  outbound module  --start  -------------------------------------------------------**/
  {
    url: '/vue-element-admin/outbound/list',
    method: 'get',
    response: ({ query }) => {
      const { orderID, area, type, page = 1, limit = 20, status } = query
      // simulate search
      let mockList = outboundArr.filter((item) => {
        if (area && item.area !== area) return false
        if (type && ('' + item.type).indexOf(type) < 0) return false
        if (status && ('' + item.status).indexOf(status) < 0) return false
        if (orderID && item.orderID.indexOf(orderID) < 0) return false
        return true
      })
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
    url: '/vue-element-admin/outbound/all',
    method: 'get',
    response: ({ query }) => {
      const { area } = query
      // simulate search
      let mockList = outboundArr.filter((item) => {
        if (area && item.area !== area) return false
        return true
      })

      return {
        code: 20000,
        data: mockList,
      }
    },
  },

  {
    url: '/vue-element-admin/outbound/total',
    method: 'get',
    response: ({ query }) => {
      const { area } = query
      let mockList = outboundArr.filter((item) => {
        if (area && item.area !== area) return false
        return true
      })
      const totalArr: any[] = []
      const ordersArr: any[] = []
      for (let i = 1; i < 13; i++) {
        // Filter out the monthly data
        const monthData = mockList.filter((item, index) => parseInt(item.timestamp.slice(5, 7)) === i)
        // get the monthly order quantity
        ordersArr.push(monthData.length)
        // get the monthly outbound total amount
        let temp = 0
        monthData.forEach((item) => {
          let totalPrice = 0
          item.production.forEach((prod: any) => {
            totalPrice += parseFloat(prod.price * prod.quantity + '')
          })
          temp += totalPrice
        })
        totalArr.push(parseInt(temp + ''))
      }

      return {
        code: 20000,
        data: {
          total: totalArr,
          orders: ordersArr,
        },
      }
    },
  },

  {
    url: '/vue-element-admin/outbound/detail',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      for (const item of outboundArr) {
        if (item.id === +id) {
          return {
            code: 20000,
            data: item,
          }
        }
      }
    },
  },

  {
    url: '/vue-element-admin/outbound/audit',
    method: 'put',
    response: ({ body }) => {
      const { detail, status } = body
      const index = outboundArr.findIndex((v) => v.id === detail.id)
      detail.status = status
      outboundArr.splice(index, 1, detail)

      return {
        code: 20000,
        data: {},
        message: 'success',
      }
    },
  },

  {
    url: '/vue-element-admin/outbound/create',
    method: 'post',
    response: ({ body }) => {
      body.id = outboundArr.length + 1
      body['status'] = 0
      body.orderID = `RKD${10000 + outboundArr.length + 1}`
      outboundArr.unshift(body)

      return {
        code: 20000,
        message: 'success',
        data: {},
      }
    },
  },

  {
    url: '/vue-element-admin/outbound/update',
    method: 'post',
    response: ({ body }) => {
      const index = outboundArr.findIndex((v) => v.id === body.id)
      outboundArr.splice(index, 1, body)

      return {
        code: 20000,
        message: 'success',
        data: {},
      }
    },
  },

  {
    url: '/vue-element-admin/outbound/remove',
    method: 'delete',
    response: ({ query }) => {
      const index = outboundArr.findIndex((v) => v.id == query.id)

      outboundArr.splice(index, 1)

      return {
        code: 20000,
        message: 'success',
        data: {},
      }
    },
  },
  /**--------------------------------------------  outbound module  --end  ---------------------------------------------------------**/
] as MockMethod[]

export { inboundArr, outboundArr }
