import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { lessonItems } from '../data/lessonItems'
import { loadLessonItemsFromRemote } from '../data/lessonItemsLoader'

function createMockResponse(ok: boolean, payload: unknown): Response {
  return {
    ok,
    json: async () => payload,
  } as Response
}

describe('lessonItemsLoader', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('updates source lines from lyrics API when available', async () => {
    const fetchMock = vi.mocked(fetch)

    fetchMock
      .mockResolvedValueOnce(
        createMockResponse(true, {
          lyrics: '[PSY]\n오빤 강남스타일\n낮에는 따사로운 인간적인 여자',
        }),
      )
      .mockResolvedValueOnce(
        createMockResponse(true, {
          lyrics: '[BLACKPINK]\n보란 듯이 무너졌어',
        }),
      )

    const loadedItems = await loadLessonItemsFromRemote(lessonItems)

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(loadedItems[0].sourceLineShort).toBe('낮에는 따사로운 인간적인 여자')
    expect(loadedItems[1].sourceLineShort).toBe('보란 듯이 무너졌어')
    expect(loadedItems[0].sourceContext).toContain('公开歌词接口')
  })

  it('keeps original items when lyrics API fails', async () => {
    const fetchMock = vi.mocked(fetch)

    fetchMock
      .mockResolvedValueOnce(createMockResponse(false, { error: 'not found' }))
      .mockRejectedValueOnce(new Error('network failed'))

    const loadedItems = await loadLessonItemsFromRemote(lessonItems)

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(loadedItems[0].sourceLineShort).toBe(lessonItems[0].sourceLineShort)
    expect(loadedItems[1].sourceLineShort).toBe(lessonItems[1].sourceLineShort)
  })
})

