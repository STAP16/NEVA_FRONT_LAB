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
	ArrayInput,
	SimpleFormIterator,
	required
} from 'react-admin'

const categoryChoices = [
	{ id: 'web', name: 'Web' },
	{ id: 'mobile', name: 'Mobile' },
	{ id: 'ai', name: 'AI' },
	{ id: 'design', name: 'Design' },
	{ id: 'analytics', name: 'Analytics' }
]

const categoryLabelMap = {
	web: 'Web',
	mobile: 'Mobile',
	ai: 'AI',
	design: 'Design',
	analytics: 'Analytics'
}

const statusChoices = [
	{ id: 'active', name: 'Активный' },
	{ id: 'completed', name: 'Завершён' }
]

const timelineStateChoices = [
	{ id: 'done', name: 'Выполнен' },
	{ id: 'progress', name: 'В процессе' },
	{ id: 'planned', name: 'Запланирован' }
]

const taskGroupChoices = [
	{ id: 'done', name: 'Выполненные' },
	{ id: 'inProgress', name: 'В процессе' },
	{ id: 'upcoming', name: 'Предстоящие' }
]

export function ProjectList() {
	return (
		<List>
			<Datagrid rowClick="edit">
				<TextField source="id" label="ID" />
				<TextField source="title" label="Название" />
				<TextField source="category" label="Категория" />
				<TextField source="stage" label="Этап" />
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
			<SelectInput source="categoryKey" label="Категория" choices={categoryChoices} validate={required()} />
			<TextInput source="category" label="Категория (отображение)" helperText="Web, AI, Mobile и т.д." />
			<TextInput source="summary" label="Описание" multiline fullWidth validate={required()} />
			<TextInput source="stage" label="Этап" />
			<NumberInput source="progress" label="Прогресс %" min={0} max={100} />
			<NumberInput source="progressDone" label="Прогресс: выполнено %" min={0} max={100} />
			<NumberInput source="progressInProgress" label="Прогресс: в процессе %" min={0} max={100} />
			<NumberInput source="progressUpcoming" label="Прогресс: предстоящие %" min={0} max={100} />
			<NumberInput source="participants" label="Участники" min={0} />
			<TextInput source="deadline" label="Дедлайн" />
			<TextInput source="completionDateText" label="Текст завершения" fullWidth />
			<NumberInput source="seats" label="Свободных мест" min={0} />
			<SelectInput source="status" label="Статус" choices={statusChoices} />
			<NumberInput source="sortOrder" label="Порядок сортировки" />

			<ArrayInput source="timeline" label="Этапы (Timeline)">
				<SimpleFormIterator>
					<TextInput source="name" label="Название этапа" />
					<TextInput source="dates" label="Даты" />
					<SelectInput source="state" label="Состояние" choices={timelineStateChoices} />
					<NumberInput source="sortOrder" label="Порядок" />
				</SimpleFormIterator>
			</ArrayInput>

			<ArrayInput source="tasks" label="Задачи">
				<SimpleFormIterator>
					<TextInput source="taskKey" label="Ключ задачи" />
					<SelectInput source="groupKey" label="Группа" choices={taskGroupChoices} />
					<TextInput source="title" label="Название" fullWidth />
					<TextInput source="timeLabel" label="Срок" />
					<TextInput source="owner" label="Ответственный" />
					<NumberInput source="sortOrder" label="Порядок" />
				</SimpleFormIterator>
			</ArrayInput>

			<ArrayInput source="mentors" label="Менторы">
				<SimpleFormIterator>
					<TextInput source="name" label="Имя" />
					<TextInput source="specialization" label="Специализация" />
					<TextInput source="role" label="Роль" />
					<TextInput source="avatarColor" label="Цвет аватара" />
					<NumberInput source="sortOrder" label="Порядок" />
				</SimpleFormIterator>
			</ArrayInput>

			<ArrayInput source="members" label="Участники">
				<SimpleFormIterator>
					<TextInput source="name" label="Имя" />
					<TextInput source="role" label="Роль" />
					<TextInput source="activity" label="Активность" />
					<NumberInput source="progress" label="Прогресс %" min={0} max={100} />
					<TextInput source="avatarColor" label="Цвет аватара" />
					<NumberInput source="sortOrder" label="Порядок" />
				</SimpleFormIterator>
			</ArrayInput>
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
