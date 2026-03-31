import { render, screen } from '@testing-library/react'

import App from '../App'

describe('App scaffold', () => {
  it('renders the project name', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'K-Miso' }),
    ).toBeInTheDocument()
  })
})
