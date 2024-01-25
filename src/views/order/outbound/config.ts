const config = [
	{
		type: 'input',
		name: 'title',
		styles: {
			width: '200px'
		},
		event: 'search'
	},
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
		name: 'sort',
		styles: {
			width: '150px'
		},
		sortOptions: [
			{ label: 'ID Ascending', key: '+id' },
			{ label: 'ID Descending', key: '-id' }
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
