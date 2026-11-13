import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

function Input({ label, id, className = '', ...props }: InputProps) {
  const inputId = id ?? props.name

  return (
    <label className="field" htmlFor={inputId}>
      <span className="field__label">{label}</span>
      <input id={inputId} className={`input ${className}`} {...props} />
    </label>
  )
}

export default Input
