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
  lyricsArtist?: string
  lyricsTitle?: string
  lyricsKeyword?: string
}

export const lessonItems: LessonItem[] = [
  {
    id: 'gangnam-style-woman',
    termKo: '여자',
    termZh: '女人',
    romanization: 'yeoja',
    sourceType: 'kpop',
    sourceTitle: 'Gangnam Style',
    sourceContext: '通过副歌前的叙述句记基础名词。',
    sourceLineShort: '낮에는 따사로운 인간적인 여자',
    sourceEpisodeOrArtist: 'PSY',
    youtubeVideoId: '9bZkp7q19f0',
    startSeconds: 24,
    endSeconds: 29,
    sourceUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0&t=24s',
    isEmbeddable: true,
    lyricsArtist: 'PSY',
    lyricsTitle: 'Gangnam Style',
    lyricsKeyword: '여자',
  },
  {
    id: 'how-you-like-that-fall',
    termKo: '무너지다',
    termZh: '崩塌',
    romanization: 'muneojida',
    sourceType: 'kpop',
    sourceTitle: 'How You Like That',
    sourceContext: '在强情绪句子里记动词变形。',
    sourceLineShort: '보란 듯이 무너졌어',
    sourceEpisodeOrArtist: 'BLACKPINK',
    sourceUrl: 'https://www.youtube.com/watch?v=ioNng23DkIM&t=14s',
    lyricsArtist: 'BLACKPINK',
    lyricsTitle: 'How You Like That',
    lyricsKeyword: '무너졌어',
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
