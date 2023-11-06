import Mock from 'mockjs'
import { defineMock } from 'vite-plugin-mock-dev-server'

const outboundArr: any[] = []
const inboundArr: any[] = []

for (let i = 1; i <= 1000; i++) {
	outboundArr.push(
		Mock.mock({
			id: i,
			itemID: `@guid()`,
			timestamp: "@date('2022/MM/dd')",
			client: '@first',
			specs: '@integer(1, 100)*@integer(1, 100)mm',
			title: `goods ${i} `,
			'type|1': ['GZ', 'SH', 'BJ', 'SZ'],
			quantity: '@integer(0, 100)',
			price: '@float(800, 10000, 0, 2)',
			mass: '@float(10, 50, 0, 2)kg',
		})
	)
}

for (let i = 1; i <= 600; i++) {
	inboundArr.push(
		Mock.mock({
			id: i,
			itemID: `@guid()`,
			timestamp: "@date('2022/MM/dd')",
			specs: '@integer(1, 100)*@integer(1, 100)mm',
			title: `inbound goods ${i} `,
			'type|1': ['GZ', 'SH', 'BJ', 'SZ'],
			quantity: '@integer(0, 100)',
			price: '@float(800, 10000, 0, 2)',
			mass: '@float(10, 50, 0, 2)kg',
		})
	)
}

export default defineMock([
	/**--------------------------------------------  inbound module  --start  --------------------------------------------------------**/
	{
		url: '/dev-api/vue-element-admin/inbound/list',
		method: 'GET',
		response(req, res, next) {
			const { itemID, type, title, page = 1, limit = 20, sort } = req.query
			// simulate search
			let mockList = inboundArr.filter(item => {
				if (type && item.type !== type) return false
				if (title && item.title.indexOf(title) < 0) return false
				if (itemID && item.itemID.indexOf(itemID) < 0) return false
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
						allItems: mockList,
					},
				})
			)
		},
	},

	{
		url: '/dev-api/vue-element-admin/inbound/total',
		method: 'GET',
		response(req, res, next) {
			const { type } = req.query
			let mockList = inboundArr.filter(item => {
				if (type && item.type !== type) return false
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
						orders: ordersArr,
					},
				})
			)
		},
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
							data: item,
						})
					)
				}
			}
		},
	},

	{
		url: '/dev-api/vue-element-admin/inbound/create',
		method: 'POST',
		response(req, res, next) {
			inboundArr.unshift(req.body)
			res.end(
				JSON.stringify({
					code: 20000,
					data: 'success',
				})
			)
		},
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
					data: 'success',
				})
			)
		},
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
					data: 'success',
				})
			)
		},
	},
	/**--------------------------------------------  inbound module  --end  ----------------------------------------------------------**/

	/**--------------------------------------------  outbound module  --start  -------------------------------------------------------**/
	{
		url: '/dev-api/vue-element-admin/outbound/list',
		method: 'GET',
		response(req, res, next) {
			const { itemID, type, title, page = 1, limit = 20, sort } = req.query
			// simulate search
			let mockList = outboundArr.filter(item => {
				if (type && item.type !== type) return false
				if (title && item.title.indexOf(title) < 0) return false
				if (itemID && item.itemID.indexOf(itemID) < 0) return false
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
						allItems: mockList,
					},
				})
			)
		},
	},

	{
		url: '/dev-api/vue-element-admin/outbound/total',
		method: 'GET',
		response(req, res, next) {
			const { type } = req.query
			let mockList = outboundArr.filter(item => {
				if (type && item.type !== type) return false
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
						orders: ordersArr,
					},
				})
			)
		},
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
							data: item,
						})
					)
				}
			}
		},
	},

	{
		url: '/dev-api/vue-element-admin/outbound/create',
		method: 'POST',
		response(req, res, next) {
			outboundArr.unshift(req.body)
			res.end(
				JSON.stringify({
					code: 20000,
					data: 'success',
				})
			)
		},
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
					data: 'success',
				})
			)
		},
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
					data: 'success',
				})
			)
		},
	},
	/**--------------------------------------------  outbound module  --end  ---------------------------------------------------------**/
])

export { inboundArr, outboundArr }
