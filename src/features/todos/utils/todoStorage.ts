import type { Todo } from '../types/todo'

const STORAGE_KEY = 'daymark.todos'

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false

  const todo = value as Record<string, unknown>
  return (
    typeof todo.id === 'string' &&
    typeof todo.title === 'string' &&
    typeof todo.description === 'string' &&
    typeof todo.dueDate === 'string' &&
    typeof todo.completed === 'boolean' &&
    typeof todo.createdAt === 'string'
  )
}

export function readTodos(): Todo[] {
  const storedTodos = window.localStorage.getItem(STORAGE_KEY)
  if (storedTodos === null) return []

  let parsed: unknown
  try {
    parsed = JSON.parse(storedTodos)
  } catch {
    throw new Error('Saved tasks could not be read because their data is invalid.')
  }

  if (!Array.isArray(parsed) || !parsed.every(isTodo)) {
    throw new Error('Saved tasks have an unexpected format.')
  }

  return parsed
}

export function writeTodos(todos: Todo[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}
