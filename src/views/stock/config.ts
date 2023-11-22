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
		type: 'select',
		name: 'area',
		styles: {
			width: '140px'
		},
		options: [
			{ key: 'area-1', label: 'area-1' },
			{ key: 'area-2', label: 'area-2' },
			{ key: 'area-3', label: 'area-3' },
			{ key: 'area-4', label: 'area-4' }
		]
	},
	{
		type: 'select',
		name: 'sort',
		styles: {
			width: '150px'
		},
		options: [
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
