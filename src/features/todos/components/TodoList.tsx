import Button from '../../../components/ui/Button'
import type { Todo } from '../types/todo'
import TodoCard from './TodoCard'

type TodoListProps = {
  todos: Todo[]
  onAdd: () => void
  onDelete: (id: string) => void
  onEdit: (todo: Todo) => void
  onToggle: (id: string) => void
}

function TodoList({ todos, onAdd, onDelete, onEdit, onToggle }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div aria-hidden="true" className="empty-state__illustration">✳</div>
        <h3>Nothing on your list</h3>
        <p>A clear space is a good place to start.</p>
        <Button onClick={onAdd} variant="secondary">Add a task</Button>
      </div>
    )
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
          todo={todo}
        />
      ))}
    </div>
  )
}

export default TodoList
