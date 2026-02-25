const API_URL = '/api/admin'

function getHeaders() {
	const token = localStorage.getItem('token')
	const headers = { 'Content-Type': 'application/json' }
	if (token) {
		headers['Authorization'] = `Bearer ${token}`
	}
	return headers
}

const dataProvider = {
	async getList(resource, params) {
		const { page, perPage } = params.pagination
		const { field, order } = params.sort
		const start = (page - 1) * perPage
		const end = page * perPage

		const query = new URLSearchParams({
			_sort: field,
			_order: order,
			_start: String(start),
			_end: String(end)
		})

		if (params.filter && params.filter.q) {
			query.set('q', params.filter.q)
		}

		const response = await fetch(`${API_URL}/${resource}?${query}`, {
			headers: getHeaders()
		})

		if (!response.ok) throw new Error('Fetch error')

		const total = parseInt(response.headers.get('X-Total-Count') || '0', 10)
		const data = await response.json()

		return { data, total }
	},

	async getOne(resource, params) {
		const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
			headers: getHeaders()
		})
		if (!response.ok) throw new Error('Fetch error')
		const data = await response.json()
		return { data }
	},

	async create(resource, params) {
		const response = await fetch(`${API_URL}/${resource}`, {
			method: 'POST',
			headers: getHeaders(),
			body: JSON.stringify(params.data)
		})
		if (!response.ok) throw new Error('Create error')
		const data = await response.json()
		return { data }
	},

	async update(resource, params) {
		const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
			method: 'PUT',
			headers: getHeaders(),
			body: JSON.stringify(params.data)
		})
		if (!response.ok) throw new Error('Update error')
		const data = await response.json()
		return { data }
	},

	async delete(resource, params) {
		const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
			method: 'DELETE',
			headers: getHeaders()
		})
		if (!response.ok) throw new Error('Delete error')
		return { data: { id: params.id } }
	},

	async deleteMany(resource, params) {
		await Promise.all(
			params.ids.map(id =>
				fetch(`${API_URL}/${resource}/${id}`, {
					method: 'DELETE',
					headers: getHeaders()
				})
			)
		)
		return { data: params.ids }
	},

	async getMany(resource, params) {
		const results = await Promise.all(
			params.ids.map(id =>
				fetch(`${API_URL}/${resource}/${id}`, { headers: getHeaders() }).then(r => r.json())
			)
		)
		return { data: results }
	},

	async getManyReference(resource, params) {
		return this.getList(resource, params)
	},

	async updateMany(resource, params) {
		await Promise.all(
			params.ids.map(id =>
				fetch(`${API_URL}/${resource}/${id}`, {
					method: 'PUT',
					headers: getHeaders(),
					body: JSON.stringify(params.data)
				})
			)
		)
		return { data: params.ids }
	}
}

export default dataProvider
