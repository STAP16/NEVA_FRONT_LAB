const API_BASE = import.meta.env.VITE_API_URL || ''

export async function fetchProjects() {
	const response = await fetch(`${API_BASE}/api/projects`)
	if (!response.ok) throw new Error('Failed to fetch projects')
	return response.json()
}

export async function fetchProject(id) {
	const response = await fetch(`${API_BASE}/api/projects/${id}`)
	if (!response.ok) throw new Error('Failed to fetch project')
	return response.json()
}

export async function submitProjectFeedback(projectId, { author, role, text }) {
	const response = await fetch(`${API_BASE}/api/projects/${projectId}/feedback`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ author, role, text })
	})
	if (!response.ok) throw new Error('Failed to submit feedback')
	return response.json()
}

export async function joinProject(projectId) {
	const response = await fetch(`${API_BASE}/api/projects/${projectId}/join`, {
		method: 'POST'
	})
	if (!response.ok) throw new Error('Failed to join')
	return response.json()
}
