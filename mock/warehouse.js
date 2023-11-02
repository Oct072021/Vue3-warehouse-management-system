// const Mock = require('mockjs')

// const outboundArr = []
// const inboundArr = []

// for (let i = 0; i < 1000; i++) {
//   outboundArr.push(Mock.mock({
//     id: i + 1,
//     itemID: `@guid()`,
//     timestamp: "@date('2022/MM/dd')",
//     client: '@first',
//     specs: '@integer(1, 100)*@integer(1, 100)mm',
//     title: `goods ${i} `,
//     'type|1': ['GZ', 'SH', 'BJ', 'SZ'],
//     quantity: '@integer(0, 100)',
//     price: '@float(800, 10000, 0, 2)',
//     mass: '@float(10, 50, 0, 2)kg',
//   }))
// }

// console.log(typeof outboundArr[0].timestamp);

// for (let i = 0; i < 1000; i++) {
//   const { quantity, price } = outboundArr[i]
//   outboundArr[i].total = (quantity * price).toFixed(2)
// }

// for (let i = 0; i < 600; i++) {
//   inboundArr.push(Mock.mock({
//     id: i + 1,
//     itemID: `@guid()`,
//     timestamp: "@date('2022/MM/dd')",
//     specs: '@integer(1, 100)*@integer(1, 100)mm',
//     title: `inbound goods ${i} `,
//     'type|1': ['GZ', 'SH', 'BJ', 'SZ'],
//     quantity: '@integer(0, 100)',
//     price: '@float(800, 10000, 0, 2)',
//     mass: '@float(10, 50, 0, 2)kg',
//   }))
// }

// for (let i = 0; i < 600; i++) {
//   const { quantity, price } = inboundArr[i]
//   inboundArr[i].total = (quantity * price).toFixed(2)
// }

// const inboundModule = [{
//   url: '/vue-element-admin/inbound/list',
//   type: 'get',
//   response: config => {
//     const { itemID, type, title, page = 1, limit = 20, sort } = config.query
//     // simulate search
//     let mockList = inboundArr.filter(item => {
//       if (type && item.type !== type) return false
//       if (title && item.title.indexOf(title) < 0) return false
//       if (itemID && item.itemID.indexOf(itemID) < 0) return false
//       return true
//     })
//     // sort
//     if (sort === '-id') {
//       mockList = mockList.reverse()
//     }

//     // Pagination
//     const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
//     return {
//       code: 20000,
//       data: {
//         total: mockList.length,
//         items: pageList,
//         allItems: mockList
//       }
//     }
//   }
// },

// {
//   url: '/vue-element-admin/inbound/total',
//   type: 'get',
//   response: config => {
//     const { type } = config.query
//     let mockList = inboundArr.filter(item => {
//       if (type && item.type !== type) return false
//       return true
//     })
//     const totalArr = []
//     const ordersArr = []
//     for (let i = 1; i < 13; i++) {
//       // Filter out the monthly data
//       const monthData = mockList.filter((item, index) => parseInt(item.timestamp.slice(5, 7)) === i)
//       // Get the monthly order quantity
//       ordersArr.push(monthData.length)
//       // Get the monthly inbound total amount
//       let temp = 0
//       monthData.forEach(item => temp += parseFloat(item.total))
//       totalArr.push(parseInt(temp))
//     }
//     return {
//       code: 20000,
//       data: {
//         total: totalArr,
//         orders: ordersArr
//       }
//     }
//   }
// },

// {
//   url: '/vue-element-admin/inbound/detail',
//   type: 'get',
//   response: config => {
//     const { id } = config.query
//     for (const article of inboundArr) {
//       if (article.id === +id) {
//         return {
//           code: 20000,
//           data: article
//         }
//       }
//     }
//   }
// },

// {
//   url: '/vue-element-admin/inbound/create',
//   type: 'post',
//   response: config => {
//     inboundArr.unshift(config.body)
//     return {
//       code: 20000,
//       data: 'success'
//     }
//   }
// },

// {
//   url: '/vue-element-admin/inbound/update',
//   type: 'post',
//   response: config => {
//     config.body.total = (parseFloat(config.body.quantity) * parseFloat(config.body.price)).toFixed(2)
//     const index = inboundArr.findIndex(v => v.id === config.body.id)
//     inboundArr.splice(index, 1, config.body)
//     return {
//       code: 20000,
//       data: 'success'
//     }
//   }
// },

// {
//   url: '/vue-element-admin/inbound/remove',
//   type: 'post',
//   response: config => {
//     const index = inboundArr.findIndex(v => v.id === config.body.id)
//     inboundArr.splice(index, 1)
//     return {
//       code: 20000,
//       data: 'success'
//     }
//   }
// },
// ]

// const outboundModule = [{
//   url: '/vue-element-admin/outbound/list',
//   type: 'get',
//   response: config => {
//     const { itemID, type, title, page = 1, limit = 20, sort } = config.query
//     // simulate search
//     let mockList = outboundArr.filter(item => {
//       if (type && item.type !== type) return false
//       if (title && item.title.indexOf(title) < 0) return false
//       if (itemID && item.itemID.indexOf(itemID) < 0) return false
//       return true
//     })
//     // sort
//     if (sort === '-id') {
//       mockList = mockList.reverse()
//     }
//     // Pagination
//     const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

//     return {
//       code: 20000,
//       data: {
//         total: mockList.length,
//         items: pageList,
//         allItems: mockList
//       }
//     }
//   }
// },

// {
//   url: '/vue-element-admin/outbound/total',
//   type: 'get',
//   response: config => {
//     const { type } = config.query
//     let mockList = outboundArr.filter(item => {
//       if (type && item.type !== type) return false
//       return true
//     })
//     const totalArr = []
//     const ordersArr = []
//     for (let i = 1; i < 13; i++) {
//       // Filter out the monthly data
//       const monthData = mockList.filter((item, index) => parseInt(item.timestamp.slice(5, 7)) === i)
//       // Get the monthly order quantity
//       ordersArr.push(monthData.length)
//       // Get the monthly outbound total amount
//       let temp = 0
//       monthData.forEach(item => temp += parseFloat(item.total))
//       totalArr.push(parseInt(temp))
//     }
//     return {
//       code: 20000,
//       data: {
//         total: totalArr,
//         orders: ordersArr
//       }
//     }
//   }
// },

// {
//   url: '/vue-element-admin/outbound/detail',
//   type: 'get',
//   response: config => {
//     const { id } = config.query
//     for (const article of outboundArr) {
//       if (article.id === +id) {
//         return {
//           code: 20000,
//           data: article
//         }
//       }
//     }
//   }
// },

// {
//   url: '/vue-element-admin/outbound/create',
//   type: 'post',
//   response: config => {
//     outboundArr.unshift(config.body)
//     return {
//       code: 20000,
//       data: 'success'
//     }
//   }
// },

// {
//   url: '/vue-element-admin/outbound/update',
//   type: 'post',
//   response: config => {
//     config.body.total = (parseFloat(config.body.quantity) * parseFloat(config.body.price)).toFixed(2)
//     const index = outboundArr.findIndex(v => v.id === config.body.id)
//     outboundArr.splice(index, 1, config.body)
//     return {
//       code: 20000,
//       data: 'success'
//     }
//   }
// },
// {
//   url: '/vue-element-admin/outbound/remove',
//   type: 'post',
//   response: config => {
//     const index = outboundArr.findIndex(v => v.id === config.body.id)
//     outboundArr.splice(index, 1)
//     return {
//       code: 20000,
//       data: 'success'
//     }
//   }
// }
// ]

// module.exports = [...inboundModule, ...outboundModule]

