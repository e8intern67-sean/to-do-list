import Button from '../../../components/ui/Button'
import type { Todo } from '../types/todo'
import { getLocalDateKey } from '../utils/todoDate'

type TodoCardProps = {
  todo: Todo
  onDelete: (id: string) => void
  onEdit: (todo: Todo) => void
  onToggle: (id: string) => void
}

function TodoCard({ todo, onDelete, onEdit, onToggle }: TodoCardProps) {
  const dueDate = todo.dueDate
    ? new Date(`${todo.dueDate}T00:00:00`).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })
    : ''

  return (
    <article className={`todo-card ${todo.completed ? 'todo-card--completed' : ''}`}>
      <button
        aria-label={todo.completed ? `Mark ${todo.title} as not done` : `Complete ${todo.title}`}
        aria-pressed={todo.completed}
        className="todo-card__check"
        onClick={() => onToggle(todo.id)}
        type="button"
      >
        {todo.completed ? '✓' : ''}
      </button>
      <div className="todo-card__content">
        <div className="todo-card__title-row">
          <span className={`priority-dot priority-dot--${todo.priority}`} title={`${todo.priority} priority`} />
          <h3>{todo.title}</h3>
        </div>
        {todo.description && <p>{todo.description}</p>}
        <div className="todo-card__meta">
          <span className="todo-card__category">{todo.category}</span>
          {dueDate && (
            <span className={`todo-card__date ${!todo.completed && todo.dueDate < getLocalDateKey() ? 'todo-card__date--overdue' : ''}`}>
              <span aria-hidden="true">◷</span> {dueDate}
            </span>
          )}
        </div>
      </div>
      <div className="todo-card__actions">
        <Button
          aria-label={`Edit ${todo.title}`}
          className="icon-button"
          onClick={() => onEdit(todo)}
          title="Edit task"
          type="button"
          variant="quiet"
        >
          ✎
        </Button>
        <Button
          aria-label={`Delete ${todo.title}`}
          className="icon-button"
          onClick={() => onDelete(todo.id)}
          title="Delete task"
          type="button"
          variant="quiet"
        >
          ×
        </Button>
      </div>
    </article>
  )
}

export default TodoCard
