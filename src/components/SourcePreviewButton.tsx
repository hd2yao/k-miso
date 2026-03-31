import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type SourcePreviewButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

export function SourcePreviewButton({
  children,
  className,
  type = 'button',
  ...props
}: SourcePreviewButtonProps) {
  return (
    <button
      type={type}
      className={`source-preview-button${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
