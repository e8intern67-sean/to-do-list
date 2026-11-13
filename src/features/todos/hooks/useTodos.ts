import { useCallback, useState } from 'react'
import type { Todo, TodoDraft } from '../types/todo'
import { readTodos, writeTodos } from '../utils/todoStorage'

type TodoState = {
  todos: Todo[]
  error: string
}

export function useTodos() {
  const [state, setState] = useState<TodoState>(() => {
    
    try {
      return { todos: readTodos(), error: '' }
    } catch (caughtError) {
      return {
        todos: [],
        error:
          caughtError instanceof Error
            ? caughtError.message
            : 'Tasks could not be loaded from this browser.',
      }
    }
  })
  const { todos, error } = state

  const save = useCallback((nextTodos: Todo[]) => {
    try {
      writeTodos(nextTodos)
      setState({ todos: nextTodos, error: '' })
      return true
    } catch {
      setState((current) => ({
        ...current,
        error: 'Changes could not be saved. Check your browser storage settings.',
      }))
      return false
    }
  }, [])

  const addTodo = useCallback(
    (draft: TodoDraft) => {
      const todo: Todo = {
        ...draft,
        id: window.crypto.randomUUID(),
        completed: false,
        createdAt: new Date().toISOString(),
      }
      return save([todo, ...todos])
    },
    [save, todos],
  )

  const updateTodo = useCallback(
    (id: string, draft: TodoDraft) =>
      save(todos.map((todo) => (todo.id === id ? { ...todo, ...draft } : todo))),
    [save, todos],
  )

  const toggleTodo = useCallback(
    (id: string) =>
      save(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      ),
    [save, todos],
  )

  const deleteTodo = useCallback(
    (id: string) => save(todos.filter((todo) => todo.id !== id)),
    [save, todos],
  )

  return { todos, error, addTodo, updateTodo, toggleTodo, deleteTodo }
}
