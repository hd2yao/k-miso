import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { AppRoutes } from '../App'

describe('App routes', () => {
  it('navigates from splash page to learning page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: '开始学习' }))

    expect(screen.getByText('Boy With Luv')).toBeInTheDocument()
  })

  it('opens filtered learning content from the categories page', () => {
    render(
      <MemoryRouter initialEntries={['/categories']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: '进入片场' }))

    expect(screen.getByText('도깨비')).toBeInTheDocument()
  })
})
