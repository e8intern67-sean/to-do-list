import { useState, type ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import type { TodoView } from '../../features/todos/types/todo'

type MainLayoutProps = {
  children: (layout: {
    activeView: TodoView
    search: string
    onAdd: () => void
    onSearchChange: (value: string) => void
    onViewChange: (view: TodoView) => void
  }) => ReactNode
  counts: Record<TodoView, number>
  onAdd: () => void
}

function MainLayout({ children, counts, onAdd }: MainLayoutProps) {
  const [activeView, setActiveView] = useState<TodoView>('all')
  const [search, setSearch] = useState('')

  return (
    <div className="app-shell">
      <Sidebar
        activeView={activeView}
        counts={counts}
        onAdd={onAdd}
        onViewChange={setActiveView}
      />
      <div className="main-column">
        <Header search={search} onSearchChange={setSearch} />
        <main className="main-content">
          {children({
            activeView,
            search,
            onAdd,
            onSearchChange: setSearch,
            onViewChange: setActiveView,
          })}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
