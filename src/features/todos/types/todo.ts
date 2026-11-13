export interface Todo {
  id: string
  title: string
  description: string
  dueDate: string
  priority: TodoPriority
  category: string
  completed: boolean
  createdAt: string
}

export type TodoPriority = 'low' | 'medium' | 'high'
export type TodoDraft = Pick<Todo, 'title' | 'description' | 'dueDate' | 'priority' | 'category'>
export type TodoView = 'all' | 'today' | 'upcoming' | 'completed'
export type TodoStatusFilter = 'all' | 'active' | 'completed'
export type TodoSort = 'created' | 'due' | 'priority'
