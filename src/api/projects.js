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
