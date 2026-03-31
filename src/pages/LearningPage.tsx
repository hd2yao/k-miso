import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppShell } from '../components/AppShell'
import { BrandMark } from '../components/BrandMark'
import { LearningCard } from '../components/LearningCard'
import { PrimaryButton } from '../components/PrimaryButton'
import { SourcePreviewButton } from '../components/SourcePreviewButton'
import { YouTubeEmbedModal } from '../components/YouTubeEmbedModal'
import { lessonItems, type LessonItem, type SourceType } from '../data/lessonItems'
import { loadLessonItems } from '../data/lessonItemsLoader'
import { ROUTES } from '../lib/routes'

interface LearningPageProps {
  sourceType?: SourceType
  loadItems?: () => Promise<LessonItem[]>
}

export function LearningPage({ sourceType, loadItems = loadLessonItems }: LearningPageProps) {
  const navigate = useNavigate()
  const [allItems, setAllItems] = useState<LessonItem[]>(lessonItems)
  const [index, setIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    let cancelled = false

    void loadItems()
      .then((loadedItems) => {
        if (cancelled || loadedItems.length === 0) {
          return
        }

        if (loadedItems === lessonItems) {
          return
        }

        setAllItems(loadedItems)
        setShowVideo(false)
      })
      .catch(() => {
        // 保留本地内置词条作为回退，不中断学习流。
      })

    return () => {
      cancelled = true
    }
  }, [loadItems])

  const items = sourceType ? allItems.filter((item) => item.sourceType === sourceType) : allItems
  const safeIndex = items.length > 0 ? index % items.length : 0
  const activeItem = items[safeIndex] ?? allItems[0] ?? lessonItems[0]

  const nextItem = () => {
    if (items.length === 0) {
      return
    }

    setIndex((currentIndex) => (currentIndex + 1) % items.length)
    setShowVideo(false)
  }

  return (
    <AppShell
      className="phone-frame--learning"
      header={
        <header className="app-header">
          <BrandMark compact />
          <button
            type="button"
            className="app-header__link"
            onClick={() => navigate(ROUTES.categories)}
          >
            题材入口
          </button>
        </header>
      }
    >
      <section className="learning-page">
        <LearningCard item={activeItem} />

        <div className="learning-page__actions">
          {activeItem.youtubeVideoId && activeItem.isEmbeddable ? (
            <SourcePreviewButton onClick={() => setShowVideo(true)}>
              查看出处
            </SourcePreviewButton>
          ) : activeItem.sourceUrl ? (
            <a
              href={activeItem.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="source-preview-button source-preview-button--link"
            >
              在 YouTube 查看
            </a>
          ) : null}
          <PrimaryButton onClick={nextItem}>下一个</PrimaryButton>
        </div>
      </section>

      {activeItem.youtubeVideoId && activeItem.isEmbeddable ? (
        <YouTubeEmbedModal
          open={showVideo}
          onClose={() => setShowVideo(false)}
          title={activeItem.sourceTitle}
          videoId={activeItem.youtubeVideoId}
          startSeconds={activeItem.startSeconds}
          endSeconds={activeItem.endSeconds}
          sourceUrl={activeItem.sourceUrl}
        />
      ) : null}
    </AppShell>
  )
}
