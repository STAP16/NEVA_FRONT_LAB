import { Admin, Resource } from 'react-admin'
import authProvider from './authProvider.js'
import dataProvider from './dataProvider.js'
import { ProjectList, ProjectEdit, ProjectCreate } from './resources/projects.jsx'
import { FeedbackList } from './resources/feedback.jsx'

function App() {
	return (
		<Admin authProvider={authProvider} dataProvider={dataProvider} title="NEVA LAB Admin">
			<Resource
				name="projects"
				list={ProjectList}
				edit={ProjectEdit}
				create={ProjectCreate}
				options={{ label: 'Проекты' }}
			/>
			<Resource
				name="feedback"
				list={FeedbackList}
				options={{ label: 'Отзывы' }}
			/>
		</Admin>
	)
}

export default App
