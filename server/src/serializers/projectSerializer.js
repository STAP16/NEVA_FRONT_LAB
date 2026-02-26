export function serializeProject(project) {
	return {
		id: project.id,
		title: project.title,
		description: project.description,
		category: project.category,
		categoryKey: project.categoryKey,
		participants: project.participants,
		mentor: project.mentor,
		deadline: project.deadline,
		recruitmentDate: project.recruitmentDate,
		progress: project.progress,
		seats: project.seats,
		status: project.status
	}
}

export function serializeProjectList(projects) {
	return projects.map(serializeProject)
}
