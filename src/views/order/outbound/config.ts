const config = [
	{
		type: 'input',
		name: 'orderID',
		styles: {
			width: '200px'
		},
		event: 'search'
	},
	{
		type: 'select',
		name: 'type',
		styles: {
			width: '150px'
		},
		page: 'orders',
		options: [
			{ label: 'purchase', key: 0 },
			{ label: 'sell', key: 1 }
		]
	},
	{
		type: 'select',
		name: 'status',
		styles: {
			width: '150px'
		},
		page: 'orders',
		options: [
			{ label: 'wait', key: 0 },
			{ label: 'success', key: 1 },
			{ label: 'fail', key: 2 }
		]
	},
	{
		type: 'button',
		name: 'Search',
		buttonType: 'primary',
		icon: 'search',
		styles: {
			margin: '0 10px 0 0'
		},
		event: 'search'
	},
	{
		type: 'button',
		name: 'Add',
		buttonType: 'primary',
		icon: 'edit',
		styles: {
			margin: '0 10px 0 0'
		},
		event: 'add'
	},
	{
		type: 'button',
		name: 'Export',
		buttonType: 'primary',
		icon: 'download',
		styles: {
			margin: '0 10px 0 0'
		},
		event: 'export'
	}
]

export { config }
