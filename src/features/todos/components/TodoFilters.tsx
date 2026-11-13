import type { TodoStatusFilter } from '../types/todo'

type TodoFiltersProps = {
  activeFilter: TodoStatusFilter
  counts: Record<TodoStatusFilter, number>
  onChange: (filter: TodoStatusFilter) => void
}

const filters: { id: TodoStatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'To do' },
  { id: 'completed', label: 'Done' },
]

function TodoFilters({ activeFilter, counts, onChange }: TodoFiltersProps) {
  return (
    <div aria-label="Filter tasks by status" className="filters" role="group">
      {filters.map(({ id, label }) => (
        <button
          aria-pressed={activeFilter === id}
          className={`filter-button ${activeFilter === id ? 'filter-button--active' : ''}`}
          key={id}
          onClick={() => onChange(id)}
          type="button"
        >
          {label}
          <span>{counts[id]}</span>
        </button>
      ))}
    </div>
  )
}

export default TodoFilters
