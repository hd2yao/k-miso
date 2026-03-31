import { lessonItems, type LessonItem } from './lessonItems'

interface LyricsResponse {
  lyrics?: string
}

const LYRICS_API_BASE_URL = 'https://api.lyrics.ovh/v1'
const HANGUL_PATTERN = /[가-힣]/

function normalizeLyricsLines(lyrics: string): string[] {
  return lyrics
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('['))
}

function pickLyricsLine(lines: string[], keyword: string): string | null {
  const normalizedKeyword = keyword.trim()

  const keywordMatch = lines.find((line) => line.includes(normalizedKeyword))
  if (keywordMatch) {
    return keywordMatch
  }

  const koreanLine = lines.find((line) => HANGUL_PATTERN.test(line))
  return koreanLine ?? lines[0] ?? null
}

async function fetchLyrics(artist: string, title: string): Promise<string | null> {
  const endpoint = `${LYRICS_API_BASE_URL}/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
  const response = await fetch(endpoint)

  if (!response.ok) {
    return null
  }

  const data = (await response.json()) as LyricsResponse
  if (typeof data.lyrics !== 'string' || data.lyrics.trim().length === 0) {
    return null
  }

  return data.lyrics
}

function shouldUseRemoteLyrics() {
  return import.meta.env.MODE !== 'test'
}

export async function loadLessonItemsFromRemote(baseItems: LessonItem[]): Promise<LessonItem[]> {
  const loadedItems = await Promise.all(
    baseItems.map(async (item) => {
      if (!item.lyricsArtist || !item.lyricsTitle) {
        return item
      }

      try {
        const lyrics = await fetchLyrics(item.lyricsArtist, item.lyricsTitle)
        if (!lyrics) {
          return item
        }

        const lines = normalizeLyricsLines(lyrics)
        const pickedLine = pickLyricsLine(lines, item.lyricsKeyword ?? item.termKo)
        if (!pickedLine) {
          return item
        }

        return {
          ...item,
          sourceLineShort: pickedLine,
          sourceContext: '来自公开歌词接口，自动抽取一句短引用。',
        }
      } catch {
        return item
      }
    }),
  )

  return loadedItems
}

export async function loadLessonItems(): Promise<LessonItem[]> {
  if (!shouldUseRemoteLyrics()) {
    return lessonItems
  }

  return loadLessonItemsFromRemote(lessonItems)
}
