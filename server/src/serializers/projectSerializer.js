export function serializeProject(project) {
	const tasksByGroup = { done: [], inProgress: [], upcoming: [] }
	for (const task of project.tasks || []) {
		const group = tasksByGroup[task.groupKey]
		if (group) {
			group.push({
				id: task.taskKey,
				title: task.title,
				timeLabel: task.timeLabel,
				owner: task.owner,
				resources: task.resources,
				stagesDone: task.stagesDone
			})
		}
	}

	return {
		id: project.id,
		title: project.title,
		category: project.category,
		categoryKey: project.categoryKey,
		summary: project.summary,
		stage: project.stage,
		progress: project.progress,
		progressBreakdown: {
			done: project.progressDone,
			inProgress: project.progressInProgress,
			upcoming: project.progressUpcoming
		},
		participants: project.participants,
		deadline: project.deadline,
		completionDateText: project.completionDateText,
		seats: project.seats,
		status: project.status,
		resultsUrl: project.resultsUrl,
		joinUrl: project.joinUrl,
		timeline: (project.timeline || []).map(item => ({
			name: item.name,
			dates: item.dates,
			state: item.state
		})),
		tasks: tasksByGroup,
		mentors: (project.mentors || []).map(mentor => ({
			name: mentor.name,
			specialization: mentor.specialization,
			role: mentor.role,
			avatarColor: mentor.avatarColor
		})),
		members: (project.members || []).map(member => ({
			name: member.name,
			role: member.role,
			activity: member.activity,
			progress: member.progress,
			history: member.history,
			avatarColor: member.avatarColor
		})),
		feedback: (project.feedback || []).map(fb => ({
			id: fb.id,
			author: fb.author,
			role: fb.role,
			text: fb.text,
			time: fb.time
		}))
	}
}

export function serializeProjectList(projects) {
	return projects.map(serializeProject)
}
