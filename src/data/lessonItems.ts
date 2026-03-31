export type SourceType = 'kpop' | 'kdrama'

export interface LessonItem {
  id: string
  termKo: string
  termZh: string
  romanization?: string
  sourceType: SourceType
  sourceTitle: string
  sourceContext: string
  sourceLineShort: string
  sourceEpisodeOrArtist: string
  youtubeVideoId?: string
  startSeconds?: number
  endSeconds?: number
  sourceUrl?: string
  isEmbeddable?: boolean
}

export const lessonItems: LessonItem[] = [
  {
    id: 'boy-with-luv-happiness',
    termKo: '행복',
    termZh: '幸福',
    romanization: 'haengbok',
    sourceType: 'kpop',
    sourceTitle: 'Boy With Luv',
    sourceContext: '用一句很轻的问句把情绪拉进歌里。',
    sourceLineShort: '뭐가 널 행복하게 하는지?',
    sourceEpisodeOrArtist: 'BTS',
    youtubeVideoId: 'XsX3ATc3FbA',
    startSeconds: 42,
    endSeconds: 47,
    sourceUrl: 'https://www.youtube.com/watch?v=XsX3ATc3FbA&t=42s',
    isEmbeddable: true,
  },
  {
    id: 'drama-wound',
    termKo: '상처',
    termZh: '伤口',
    romanization: 'sangcheo',
    sourceType: 'kpop',
    sourceTitle: 'Drama',
    sourceContext: '情绪更强烈，适合对比记忆抽象名词。',
    sourceLineShort: '나를 더 아프게 하는 drama',
    sourceEpisodeOrArtist: 'aespa',
    sourceUrl: 'https://www.youtube.com/results?search_query=aespa+Drama+official+mv',
  },
  {
    id: 'goblin-fate',
    termKo: '운명',
    termZh: '命运',
    romanization: 'unmyeong',
    sourceType: 'kdrama',
    sourceTitle: '도깨비',
    sourceContext: '剧情台词更适合记抽象词和情绪表达。',
    sourceLineShort: '운명처럼 다시 만났어요.',
    sourceEpisodeOrArtist: 'tvN',
    sourceUrl: 'https://www.youtube.com/results?search_query=%EB%8F%84%EA%B9%A8%EB%B9%84+clip',
  },
]
