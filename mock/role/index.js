// const Mock = require('mockjs')
// const { deepClone } = require('../utils')
// const { asyncRoutes, constantRoutes } = require('./routes.js')

// const routes = deepClone([...constantRoutes, ...asyncRoutes])

// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

// function filterAsyncRoutes(routes, roles) {
//   const res = []

//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         // recursion
//         tmp.children = filterAsyncRoutes(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })

//   return res
// }

// const data_operator_routes = filterAsyncRoutes(routes, ['dataOperator'])
// const accountant_routes = filterAsyncRoutes(routes, ['accountant'])

// const roles = [
//   {
//     key: 'admin',
//     name: 'admin',
//     description: 'Super Administrator. Have access to view all pages.',
//     routes: routes
//   },
//   {
//     key: 'dataOperator',
//     name: 'dataOperator',
//     description: 'data operator. Can see all pages about data',
//     routes: data_operator_routes
//   },
//   {
//     key: 'accountant',
//     name: 'accountant',
//     description: 'accountant. Can only see page about finance',
//     routes: accountant_routes
//   }
// ]

// module.exports = [
//   // mock get all routes form server
//   {
//     url: '/vue-element-admin/routes',
//     type: 'get',
//     response: _ => {
//       return {
//         code: 20000,
//         data: routes
//       }
//     }
//   },

//   // mock get all roles form server
//   {
//     url: '/vue-element-admin/roles',
//     type: 'get',
//     response: _ => {
//       return {
//         code: 20000,
//         data: roles
//       }
//     }
//   },

//   // add role
//   {
//     url: '/vue-element-admin/role',
//     type: 'post',
//     response: config => {
//       const role = config.body
//       role.key = Mock.mock('@integer(300, 5000)')
//       roles.push(role)
//       return {
//         code: 20000,
//         data: role
//       }
//     }
//   },

//   // update role
//   {
//     url: '/vue-element-admin/role/[A-Za-z0-9]',
//     type: 'put',
//     response: config => {
//       const role = config.body
//       for (let index = 0; index < roles.length; index++) {
//         if (roles[index].key === role.key) {
//           roles.splice(index, 1, Object.assign({}, role))
//           break
//         }
//       }
//       return {
//         code: 20000,
//         data: roles
//       }
//     }
//   },

//   // delete role
//   {
//     url: '/vue-element-admin/role/[A-Za-z0-9]',
//     type: 'delete',
//     response: {
//       code: 20000,
//       data: {
//         status: 'success'
//       }
//     }
//   }
// ]
