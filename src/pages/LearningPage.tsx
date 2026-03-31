import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppShell } from '../components/AppShell'
import { BrandMark } from '../components/BrandMark'
import { LearningCard } from '../components/LearningCard'
import { PrimaryButton } from '../components/PrimaryButton'
import { SourcePreviewButton } from '../components/SourcePreviewButton'
import { YouTubeEmbedModal } from '../components/YouTubeEmbedModal'
import { lessonItems, type SourceType } from '../data/lessonItems'
import { ROUTES } from '../lib/routes'

interface LearningPageProps {
  sourceType?: SourceType
}

export function LearningPage({ sourceType }: LearningPageProps) {
  const navigate = useNavigate()
  const items = sourceType ? lessonItems.filter((item) => item.sourceType === sourceType) : lessonItems
  const [index, setIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const activeItem = items[index] ?? lessonItems[0]

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
