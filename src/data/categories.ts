import type { SourceType } from './lessonItems'

export interface CategoryItem {
  id: SourceType
  eyebrow: string
  title: string
  description: string
  actionLabel: string
  accentClassName: string
}

export const categories: CategoryItem[] = [
  {
    id: 'kpop',
    eyebrow: 'MUSIC & LYRICS',
    title: 'K-Pop',
    description: '跟着旋律记词，把抽象词放回真实语境。',
    actionLabel: '开始听歌',
    accentClassName: 'category-card--mint',
  },
  {
    id: 'kdrama',
    eyebrow: 'DRAMA & SCRIPTS',
    title: 'K-Drama',
    description: '用角色对白记情绪词和叙事表达。',
    actionLabel: '进入片场',
    accentClassName: 'category-card--apricot',
  },
]
