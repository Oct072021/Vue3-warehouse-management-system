import Mock from 'mockjs'
import { defineMock } from 'vite-plugin-mock-dev-server'

const outboundArr: any[] = []
const inboundArr: any[] = []

for (let i = 1; i <= 1000; i++) {
	outboundArr.push(
		Mock.mock({
			id: i,
			orderID: `@guid()`,
			timestamp: "@date('2022/MM/dd')",
			client: '@first',
			specs: '@integer(1, 100)*@integer(1, 100)',
			title: `goods ${i} `,
			'area|1': ['area-1', 'area-2', 'area-3', 'area-4'],
			quantity: '@integer(0, 100)',
			price: '@float(800, 10000, 0, 2)',
			mass: '@float(10, 50, 0, 2)'
		})
	)
}

for (let i = 1; i <= 600; i++) {
	const production: any[] = []
	for (let j = 1; j <= 5; j++) {
		production.push({
			productionID: `00018${j}`,
			productionName: `电源${j}`,
			specs: '@integer(1, 100)*@integer(1, 100)',
			quantity: '@integer(0, 100)',
			price: '@float(200, 500, 0, 2)'
		})
	}
	inboundArr.push(
		Mock.mock({
			id: i,
			orderID: `RKD${10000 + i}`,
			timestamp: "@date('2022/MM/dd')",
			title: `设备箱 ${i} `,
			'area|1': ['area-1', 'area-2', 'area-3', 'area-4'],
			type: '@integer(0, 1)',
			supplier: 'xx科技',
			documenter: 'Sekiro',
			status: '@integer(0, 2)',
			auditor: 'Sam',
			contact: 'Higgs',
			number: 12345678912,
			remark: '无',
			reason: 'xxxxxxxx',
			production
		})
	)
}

export default defineMock([
	/**--------------------------------------------  inbound module  --start  --------------------------------------------------------**/
	{
		url: '/dev-api/vue-element-admin/inbound/list',
		method: 'GET',
		response(req, res, next) {
			const { orderID, area, type, page = 1, limit = 20, status } = req.query
			// simulate search
			let mockList = inboundArr.filter(item => {
				if (area && item.area !== area) return false
				if (type && ('' + item.type).indexOf(type) < 0) return false
				if (status && ('' + item.status).indexOf(status) < 0) return false
				if (orderID && item.orderID.indexOf(orderID) < 0) return false
				return true
			})

			// Pagination
			const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
			res.end(
				JSON.stringify({
					code: 20000,
					data: {
						total: mockList.length,
						items: pageList,
						allItems: mockList
					}
				})
			)
		}
	},

	{
		url: '/dev-api/vue-element-admin/inbound/total',
		method: 'GET',
		response(req, res, next) {
			const { area } = req.query
			let mockList = inboundArr.filter(item => {
				if (area && item.area !== area) return false
				return true
			})
			const totalArr: any[] = []
			const ordersArr: any[] = []
			for (let i = 1; i < 13; i++) {
				// Filter out the monthly data
				const monthData = mockList.filter((item, index) => parseInt(item.timestamp.slice(5, 7)) === i)
				// Get the monthly order quantity
				ordersArr.push(monthData.length)
				// Get the monthly inbound total amount
				let temp = 0
				monthData.forEach(item => (temp += parseFloat(item.price * item.quantity + '')))
				totalArr.push(parseInt(temp + ''))
			}

			res.end(
				JSON.stringify({
					code: 20000,
					data: {
						total: totalArr,
						orders: ordersArr
					}
				})
			)
		}
	},

	{
		url: '/dev-api/vue-element-admin/inbound/detail',
		method: 'GET',
		response(req, res, next) {
			const { id } = req.query
			for (const item of inboundArr) {
				if (item.id === +id) {
					res.end(
						JSON.stringify({
							code: 20000,
							data: item
						})
					)
				}
			}
		}
	},

	{
		url: '/dev-api/vue-element-admin/inbound/audit',
		method: 'PUT',
		response(req, res, next) {
			const { detail, status } = req.body
			const index = inboundArr.findIndex(v => v.id === detail.id)
			detail.status = status
			inboundArr.splice(index, 1, detail)
			res.end(
				JSON.stringify({
					code: 20000,
					data: {},
					message: 'success'
				})
			)
		}
	},

	{
		url: '/dev-api/vue-element-admin/inbound/create',
		method: 'POST',
		response(req, res, next) {
			req.body.id = inboundArr.length + 1
			inboundArr.unshift(req.body)
			res.end(
				JSON.stringify({
					code: 20000,
					message: 'success',
					data: {}
				})
			)
		}
	},

	{
		url: '/dev-api/vue-element-admin/inbound/update',
		method: 'POST',
		response(req, res, next) {
			const index = inboundArr.findIndex(v => v.id === req.body.id)
			inboundArr.splice(index, 1, req.body)
			res.end(
				JSON.stringify({
					code: 20000,
					message: 'success',
					data: {}
				})
			)
		}
	},

	{
		url: '/dev-api/vue-element-admin/inbound/remove',
		method: 'POST',
		response(req, res, next) {
			const index = inboundArr.findIndex(v => v.id === req.body.id)
			inboundArr.splice(index, 1)
			res.end(
				JSON.stringify({
					code: 20000,
					message: 'success',
					data: {}
				})
			)
		}
	},
	/**--------------------------------------------  inbound module  --end  ----------------------------------------------------------**/

	/**--------------------------------------------  outbound module  --start  -------------------------------------------------------**/
	{
		url: '/dev-api/vue-element-admin/outbound/list',
		method: 'GET',
		response(req, res, next) {
			const { orderID, area, title, page = 1, limit = 20, sort } = req.query
			// simulate search
			let mockList = outboundArr.filter(item => {
				if (area && item.area !== area) return false
				if (title && item.title.indexOf(title) < 0) return false
				if (orderID && item.orderID.indexOf(orderID) < 0) return false
				return true
			})
			// sort
			if (sort === '-id') {
				mockList = mockList.reverse()
			}
			// Pagination
			const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

			res.end(
				JSON.stringify({
					code: 20000,
					data: {
						total: mockList.length,
						items: pageList,
						allItems: mockList
					}
				})
			)
		}
	},

	{
		url: '/dev-api/vue-element-admin/outbound/total',
		method: 'GET',
		response(req, res, next) {
			const { area } = req.query
			let mockList = outboundArr.filter(item => {
				if (area && item.area !== area) return false
				return true
			})
			const totalArr: any[] = []
			const ordersArr: any[] = []
			for (let i = 1; i < 13; i++) {
				// Filter out the monthly data
				const monthData = mockList.filter((item, index) => parseInt(item.timestamp.slice(5, 7)) === i)
				// Get the monthly order quantity
				ordersArr.push(monthData.length)
				// Get the monthly outbound total amount
				let temp = 0
				monthData.forEach(item => (temp += parseFloat(item.price * item.quantity + '')))
				totalArr.push(parseInt(temp + ''))
			}
			res.end(
				JSON.stringify({
					code: 20000,
					data: {
						total: totalArr,
						orders: ordersArr
					}
				})
			)
		}
	},

	{
		url: '/dev-api/vue-element-admin/outbound/detail',
		method: 'GET',
		response(req, res, next) {
			const { id } = req.query
			for (const item of outboundArr) {
				if (item.id === +id) {
					res.end(
						JSON.stringify({
							code: 20000,
							data: item
						})
					)
				}
			}
		}
	},

	{
		url: '/dev-api/vue-element-admin/outbound/create',
		method: 'POST',
		response(req, res, next) {
			req.body.id = outboundArr.length + 1
			outboundArr.unshift(req.body)
			res.end(
				JSON.stringify({
					code: 20000,
					message: 'success',
					data: {}
				})
			)
		}
	},

	{
		url: '/dev-api/vue-element-admin/outbound/update',
		method: 'POST',
		response(req, res, next) {
			const index = outboundArr.findIndex(v => v.id === req.body.id)
			outboundArr.splice(index, 1, req.body)
			res.end(
				JSON.stringify({
					code: 20000,
					message: 'success',
					data: {}
				})
			)
		}
	},

	{
		url: '/dev-api/vue-element-admin/outbound/remove',
		method: 'POST',
		response(req, res, next) {
			const index = outboundArr.findIndex(v => v.id === req.body.id)
			outboundArr.splice(index, 1)
			res.end(
				JSON.stringify({
					code: 20000,
					message: 'success',
					data: {}
				})
			)
		}
	}
	/**--------------------------------------------  outbound module  --end  ---------------------------------------------------------**/
])

export { inboundArr, outboundArr }
