import Button from '../ui/Button'
import type { TodoView } from '../../features/todos/types/todo'
type SidebarProps = {
  activeView: TodoView
  counts: Record<TodoView, number>
  onAdd: () => void
  onViewChange: (view: TodoView) => void
}

const navigation: { view: TodoView; label: string; icon: string }[] = [
  { view: 'all', label: 'All tasks', icon: '○' },
  { view: 'today', label: 'Today', icon: '◷' },
  { view: 'upcoming', label: 'Upcoming', icon: '▦' },
  { view: 'completed', label: 'Completed', icon: '✓' },
]

function Sidebar({ activeView, counts, onAdd, onViewChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <a aria-label="Daymark home" className="brand" href="/">
        <span className="brand__mark">d</span>
        <span>To-Do-List</span>
      </a>

      <Button className="sidebar__add" onClick={onAdd} variant="primary">
        <span aria-hidden="true">＋</span> New task
      </Button>

      <p className="sidebar__label">WORKSPACE</p>
      <nav aria-label="Task views" className="sidebar__nav">
        {navigation.map(({ view, label, icon }) => (
          <button
            aria-current={activeView === view ? 'page' : undefined}
            className={`nav-item ${activeView === view ? 'nav-item--active' : ''}`}
            key={view}
            onClick={() => onViewChange(view)}
            type="button"
          >
            <span aria-hidden="true" className="nav-item__icon">
              {icon}
            </span>
            <span>{label}</span>
            <span className="nav-item__count">{counts[view]}</span>
          </button>
        ))}
      </nav>

    </aside>
  )
}

export default Sidebar
