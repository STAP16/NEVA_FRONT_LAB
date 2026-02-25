import {
	List,
	Datagrid,
	TextField,
	DeleteButton
} from 'react-admin'

export function FeedbackList() {
	return (
		<List>
			<Datagrid>
				<TextField source="id" label="ID" />
				<TextField source="projectId" label="Проект" />
				<TextField source="author" label="Автор" />
				<TextField source="role" label="Роль" />
				<TextField source="text" label="Текст" />
				<TextField source="time" label="Время" />
				<DeleteButton />
			</Datagrid>
		</List>
	)
}
