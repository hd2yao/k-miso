import type { LessonItem } from '../data/lessonItems'

interface LearningCardProps {
  item: LessonItem
}

export function LearningCard({ item }: LearningCardProps) {
  return (
    <section className="learning-card">
      <div className="learning-card__surface">
        <p className="learning-card__term">{item.termKo}</p>
        {item.romanization ? <p className="learning-card__romanization">{item.romanization}</p> : null}
        <div className="learning-card__divider"></div>
        <p className="learning-card__translation">{item.termZh}</p>
      </div>

      <div className="learning-card__meta">
        <div className="learning-card__cover" aria-hidden="true">
          <span>{item.sourceType === 'kpop' ? '♪' : '🎬'}</span>
        </div>
        <div className="learning-card__meta-copy">
          <p className="learning-card__eyebrow">
            {item.sourceEpisodeOrArtist} · {item.sourceType === 'kpop' ? '歌词' : '台词'}
          </p>
          <p className="learning-card__title">{item.sourceTitle}</p>
          <p className="learning-card__context">{item.sourceContext}</p>
        </div>
      </div>

      <div className="learning-card__chips">
        <span className="learning-chip">{item.sourceType === 'kpop' ? 'K-Pop' : 'K-Drama'}</span>
        <span className="learning-chip">{item.sourceEpisodeOrArtist}</span>
        <span className="learning-chip learning-chip--ghost">{item.termZh}</span>
      </div>

      <blockquote className="learning-card__quote">
        “{item.sourceLineShort}”
      </blockquote>
    </section>
  )
}
