const API_BASE = import.meta.env.VITE_API_URL || ''

export async function fetchDirections() {
	const response = await fetch(`${API_BASE}/api/directions`)
	if (!response.ok) throw new Error('Failed to fetch directions')
	return response.json()
}

export async function submitApplication(data) {
	const response = await fetch(`${API_BASE}/api/applications`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
	if (!response.ok) throw new Error('Failed to submit application')
	return response.json()
}
