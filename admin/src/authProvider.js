const API_URL = '/api/admin'

const authProvider = {
	async login({ username, password }) {
		const response = await fetch(`${API_URL}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		})
		if (!response.ok) {
			throw new Error('Неверный логин или пароль')
		}
		const { token } = await response.json()
		localStorage.setItem('token', token)
	},

	async logout() {
		localStorage.removeItem('token')
	},

	async checkAuth() {
		const token = localStorage.getItem('token')
		if (!token) {
			throw new Error('Not authenticated')
		}

		const response = await fetch(`${API_URL}/me`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		if (!response.ok) {
			localStorage.removeItem('token')
			throw new Error('Token expired')
		}
	},

	async checkError(error) {
		if (error.status === 401 || error.status === 403) {
			localStorage.removeItem('token')
			throw new Error('Unauthorized')
		}
	},

	async getPermissions() {
		return 'admin'
	},

	async getIdentity() {
		return { id: 'admin', fullName: 'Администратор' }
	}
}

export default authProvider
