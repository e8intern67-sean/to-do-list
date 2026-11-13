export interface Todo {
  id: string
  title: string
  description: string
  dueDate: string
  completed: boolean
  createdAt: string
}

export type TodoDraft = Pick<Todo, 'title' | 'description' | 'dueDate'>
export type TodoView = 'all' | 'today' | 'upcoming' | 'completed'
export type TodoStatusFilter = 'all' | 'active' | 'completed'
