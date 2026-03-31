import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import { LearningPage } from '../pages/LearningPage'
import { lessonItems } from '../data/lessonItems'

describe('LearningPage', () => {
  it('cycles through lesson items and loops back to the start', () => {
    render(
      <MemoryRouter>
        <LearningPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Gangnam Style')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '下一个' }))
    expect(screen.getByText('How You Like That')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '下一个' }))
    fireEvent.click(screen.getByRole('button', { name: '下一个' }))

    expect(screen.getByText('Gangnam Style')).toBeInTheDocument()
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

  it('loads remote lesson items when loader resolves', async () => {
    const remoteItems = lessonItems.map((item, index) =>
      index === 0 ? { ...item, sourceTitle: 'Remote Gangnam Style', sourceLineShort: '오빤 강남스타일' } : item,
    )

    const loadItems = vi.fn().mockResolvedValue(remoteItems)

    render(
      <MemoryRouter>
        <LearningPage loadItems={loadItems} />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('Remote Gangnam Style')).toBeInTheDocument()
      expect(screen.getByText('“오빤 강남스타일”')).toBeInTheDocument()
    })
  })

  it('falls back to local lesson items when loader rejects', async () => {
    const loadItems = vi.fn().mockRejectedValue(new Error('network error'))

    render(
      <MemoryRouter>
        <LearningPage loadItems={loadItems} />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('Gangnam Style')).toBeInTheDocument()
    })
    expect(loadItems).toHaveBeenCalledTimes(1)
  })
})
