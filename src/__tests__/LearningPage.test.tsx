import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { LearningPage } from '../pages/LearningPage'

describe('LearningPage', () => {
  it('cycles through lesson items and loops back to the start', () => {
    render(
      <MemoryRouter>
        <LearningPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Boy With Luv')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '下一个' }))
    expect(screen.getByText('Drama')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '下一个' }))
    fireEvent.click(screen.getByRole('button', { name: '下一个' }))

    expect(screen.getByText('Boy With Luv')).toBeInTheDocument()
  })

  it('shows source actions based on available metadata', () => {
    render(
      <MemoryRouter>
        <LearningPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('button', { name: '查看出处' })).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: '在 YouTube 查看' }),
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '下一个' }))

    expect(
      screen.queryByRole('button', { name: '查看出处' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: '在 YouTube 查看' })).toBeInTheDocument()
  })
})
