import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'quiet' | 'danger'
}

function Button({
  children,
  className = '',
  variant = 'secondary',
  ...props
}: ButtonProps) {
  return (
    <button className={`button button--${variant} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
