import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type PrimaryButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

export function PrimaryButton({ children, className, type = 'button', ...props }: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={`primary-button${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
