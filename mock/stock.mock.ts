import Mock from 'mockjs'
import { defineMock } from 'vite-plugin-mock-dev-server'

const stockArr: any[] = []

for (let i = 1; i <= 700; i++) {
	stockArr.push(
		Mock.mock({
			id: i,
			itemID: `@guid()`,
			specs: '@integer(1, 100)*@integer(1, 100)',
			title: `stock ${i} `,
			'type|1': ['GZ', 'SH', 'BJ', 'SZ'],
			quantity: '@integer(0, 100)',
			mass: '@float(10, 50, 0, 2)'
		})
	)
}

export default defineMock([
	{
		url: '/dev-api/vue-element-admin/stock/list',
		method: 'GET',
		response(req, res, next) {
			const { type, title, page = 1, limit = 20, sort } = req.query
			// simulate search
			let mockList = stockArr.filter(item => {
				if (type && item.type !== type) return false
				if (title && item.title.indexOf(title) < 0) return false
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
		url: '/dev-api/vue-element-admin/stock/detail',
		method: 'GET',
		response(req, res, next) {
			const { id } = req.query
			for (const item of stockArr) {
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
		url: '/dev-api/vue-element-admin/stock/update',
		method: 'POST',
		response(req, res, next) {
			const index = stockArr.findIndex(v => v.id === req.body.id)
			stockArr.splice(index, 1, req.body)
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
		url: '/dev-api/vue-element-admin/stock/remove',
		method: 'POST',
		response(req, res, next) {
			const index = stockArr.findIndex(v => v.id === req.body.id)
			stockArr.splice(index, 1)
			res.end(
				JSON.stringify({
					code: 20000,
					message: 'success',
					data: {}
				})
			)
		}
	}
])
