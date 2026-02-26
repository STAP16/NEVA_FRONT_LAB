import {
	List,
	Datagrid,
	TextField,
	NumberField,
	EditButton,
	DeleteButton,
	Edit,
	Create,
	SimpleForm,
	TextInput,
	NumberInput,
	SelectInput,
	required
} from 'react-admin'

const categoryChoices = [
	{ id: 'web', name: 'Web' },
	{ id: 'mobile', name: 'Mobile' },
	{ id: 'ai', name: 'AI' },
	{ id: 'design', name: 'Design' },
	{ id: 'analytics', name: 'Analytics' }
]

const statusChoices = [
	{ id: 'active', name: 'Активный' },
	{ id: 'completed', name: 'Завершён' }
]

export function ProjectList() {
	return (
		<List>
			<Datagrid rowClick="edit">
				<TextField source="id" label="ID" />
				<TextField source="title" label="Название" />
				<TextField source="category" label="Категория" />
				<TextField source="mentor" label="Ментор" />
				<NumberField source="progress" label="Прогресс %" />
				<NumberField source="participants" label="Участники" />
				<NumberField source="seats" label="Места" />
				<TextField source="status" label="Статус" />
				<EditButton />
				<DeleteButton />
			</Datagrid>
		</List>
	)
}

function ProjectForm() {
	return (
		<SimpleForm>
			<TextInput source="id" label="ID (slug)" validate={required()} />
			<TextInput source="title" label="Название" validate={required()} fullWidth />
			<TextInput source="description" label="Описание" multiline fullWidth validate={required()} />
			<SelectInput source="categoryKey" label="Категория" choices={categoryChoices} validate={required()} />
			<TextInput source="category" label="Категория (отображение)" helperText="Web, AI, Mobile и т.д." />
			<NumberInput source="participants" label="Кол-во участников" min={0} />
			<TextInput source="mentor" label="Ментор" fullWidth />
			<TextInput source="deadline" label="Дата окончания" />
			<TextInput source="recruitmentDate" label="Дата набора" />
			<NumberInput source="progress" label="Прогресс %" min={0} max={100} />
			<NumberInput source="seats" label="Свободных мест" min={0} />
			<SelectInput source="status" label="Статус" choices={statusChoices} />
			<NumberInput source="sortOrder" label="Порядок сортировки" />
		</SimpleForm>
	)
}

export function ProjectEdit() {
	return (
		<Edit>
			<ProjectForm />
		</Edit>
	)
}

export function ProjectCreate() {
	return (
		<Create>
			<ProjectForm />
		</Create>
	)
}
