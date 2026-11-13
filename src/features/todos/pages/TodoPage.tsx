import { useState } from 'react'
import MainLayout from '../../../components/layout/MainLayout'
import Button from '../../../components/ui/Button'
import Modal from '../../../components/ui/Modal'
import { useTodos } from '../hooks/useTodos'
import type { Todo, TodoDraft, TodoSort, TodoStatusFilter, TodoView } from '../types/todo'
import { getLocalDateKey } from '../utils/todoDate'
import TodoFilters from '../components/TodoFilters'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

function TodoPage() {
  const { todos, error, addTodo, updateTodo, toggleTodo, deleteTodo } = useTodos()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>()
  const [statusFilter, setStatusFilter] = useState<TodoStatusFilter>('all')
  const [sort, setSort] = useState<TodoSort>('created')

  const today = getLocalDateKey()
  const counts: Record<TodoView, number> = {
    all: todos.length,
    today: todos.filter((todo) => !todo.completed && todo.dueDate === today).length,
    upcoming: todos.filter((todo) => !todo.completed && todo.dueDate > today).length,
    completed: todos.filter((todo) => todo.completed).length,
  }
  const statusCounts: Record<TodoStatusFilter, number> = {
    all: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  }
  const overdueCount = todos.filter(
    (todo) => !todo.completed && todo.dueDate !== '' && todo.dueDate < today,
  ).length
  const greeting = new Date().getHours() < 12 ? 'Good morning' : 'Good afternoon'

  function openCreateForm() {
    setEditingTodo(undefined)
    setIsFormOpen(true)
  }

  function openEditForm(todo: Todo) {
    setEditingTodo(todo)
    setIsFormOpen(true)
  }

  function closeForm() {
    setIsFormOpen(false)
    setEditingTodo(undefined)
  }

  function saveTodo(draft: TodoDraft) {
    return editingTodo
      ? updateTodo(editingTodo.id, draft)
      : addTodo(draft)
  }

  return (
    <MainLayout counts={counts} onAdd={openCreateForm}>
      {({ activeView, search }) => {
        const viewTodos = todos.filter((todo) => {
          if (activeView === 'today') return !todo.completed && todo.dueDate === today
          if (activeView === 'upcoming') return !todo.completed && todo.dueDate > today
          if (activeView === 'completed') return todo.completed
          return true
        })
        const visibleTodos = viewTodos.filter((todo) => {
          const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 'active' && !todo.completed) ||
            (statusFilter === 'completed' && todo.completed)
          const query = search.trim().toLocaleLowerCase()
          return (
            matchesStatus &&
            (!query ||
              todo.title.toLocaleLowerCase().includes(query) ||
              todo.description.toLocaleLowerCase().includes(query))
          )
        }).sort((first, second) => {
          if (sort === 'due') return (first.dueDate || '9999').localeCompare(second.dueDate || '9999')
          if (sort === 'priority') {
            const priorityRank = { high: 0, medium: 1, low: 2 }
            return priorityRank[first.priority] - priorityRank[second.priority]
          }
          return second.createdAt.localeCompare(first.createdAt)
        })
        const title =
          activeView === 'today'
            ? 'Today'
            : activeView === 'upcoming'
              ? 'Upcoming'
              : activeView === 'completed'
                ? 'Completed'
                : 'All'

        return (
          <>
            <section className="page-heading">
              <div>
                <p className="eyebrow">{greeting} · {new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</p>
                <h1>{title}<span className="page-heading__period">.</span></h1>
                <p className="page-heading__subtitle">
                  {activeView === 'today'
                    ? 'A little progress goes a long way.'
                    : 'Keep your focus on what matters.'}
                </p>
              </div>
              <Button onClick={openCreateForm} variant="primary">
                <span aria-hidden="true">＋</span> Add task
              </Button>
            </section>

            <section aria-label="Task overview" className="overview-grid">
              <article className="overview-card">
                <span className="overview-card__label">Total tasks</span>
                <strong>{todos.length}</strong>
                <span className="overview-card__hint">Across your workspace</span>
              </article>
              <article className="overview-card overview-card--accent">
                <span className="overview-card__label">In progress</span>
                <strong>{statusCounts.active}</strong>
                <span className="overview-card__hint">Still on your list</span>
              </article>
              <article className="overview-card">
                <span className="overview-card__label">Completed</span>
                <strong>{statusCounts.completed}</strong>
                <span className="overview-card__hint">Nice work so far</span>
              </article>
              <article className="overview-card overview-card--warning">
                <span className="overview-card__label">Overdue</span>
                <strong>{overdueCount}</strong>
                <span className="overview-card__hint">Need your attention</span>
              </article>
            </section>

            <section aria-label="Your tasks" className="tasks-section">
              <div className="tasks-section__top">
                <div>
                  <h2>Your tasks</h2>
                  <span className="tasks-section__summary">
                    {visibleTodos.length} {visibleTodos.length === 1 ? 'task' : 'tasks'}
                  </span>
                </div>
                <TodoFilters
                  activeFilter={statusFilter}
                  counts={statusCounts}
                  onChange={setStatusFilter}
                />
              </div>
              <div className="tasks-toolbar">
                <span className="tasks-toolbar__label">Sort by</span>
                <select
                  aria-label="Sort tasks"
                  className="sort-select"
                  onChange={(event) => setSort(event.target.value as TodoSort)}
                  value={sort}
                >
                  <option value="created">Recently added</option>
                  <option value="due">Due date</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              {error && <p className="error-banner" role="alert">{error}</p>}
              <TodoList
                todos={visibleTodos}
                onAdd={openCreateForm}
                onDelete={deleteTodo}
                onEdit={openEditForm}
                onToggle={toggleTodo}
              />
            </section>

            {isFormOpen && (
              <Modal
                onClose={closeForm}
                title={editingTodo ? 'Edit task' : 'Create a task'}
              >
                <TodoForm
                  onCancel={closeForm}
                  onSubmit={saveTodo}
                  todo={editingTodo}
                />
              </Modal>
            )}
          </>
        )
      }}
    </MainLayout>
  )
}

export default TodoPage
