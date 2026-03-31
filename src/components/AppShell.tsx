import type { PropsWithChildren, ReactNode } from 'react'

interface AppShellProps extends PropsWithChildren {
  className?: string
  header?: ReactNode
}

export function AppShell({ children, className, header }: AppShellProps) {
  return (
    <div className="app-stage">
      <div className={`phone-frame${className ? ` ${className}` : ''}`}>
        {header}
        {children}
      </div>
    </div>
  )
}
