import { useState, type FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import type { Todo, TodoDraft } from '../types/todo'

type TodoFormProps = {
  todo?: Todo
  onCancel: () => void
  onSubmit: (draft: TodoDraft) => boolean
}

function TodoForm({ todo, onCancel, onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState(todo?.title ?? '')
  const [description, setDescription] = useState(todo?.description ?? '')
  const [dueDate, setDueDate] = useState(todo?.dueDate ?? '')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const saved = onSubmit({ title: title.trim(), description: description.trim(), dueDate })
    if (saved) onCancel()
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <Input
        autoFocus
        label="Task name"
        maxLength={120}
        name="title"
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to get done?"
        required
        value={title}
      />
      <label className="field" htmlFor="description">
        <span className="field__label">Description <span className="field__optional">Optional</span></span>
        <textarea
          className="input textarea"
          id="description"
          maxLength={500}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add a few details..."
          rows={3}
          value={description}
        />
      </label>
      <Input
        label="Due date"
        name="dueDate"
        onChange={(event) => setDueDate(event.target.value)}
        type="date"
        value={dueDate}
      />
      <div className="todo-form__actions">
        <Button onClick={onCancel} type="button">Cancel</Button>
        <Button type="submit" variant="primary">
          {todo ? 'Save changes' : 'Create task'}
        </Button>
      </div>
    </form>
  )
}

export default TodoForm
