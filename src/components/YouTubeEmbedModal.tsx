interface YouTubeEmbedModalProps {
  title: string
  videoId: string
  startSeconds?: number
  endSeconds?: number
  sourceUrl?: string
  open: boolean
  onClose: () => void
}

export function YouTubeEmbedModal({
  title,
  videoId,
  startSeconds = 0,
  endSeconds,
  sourceUrl,
  open,
  onClose,
}: YouTubeEmbedModalProps) {
  if (!open) {
    return null
  }

  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
    start: String(startSeconds),
  })

  if (typeof endSeconds === 'number') {
    params.set('end', String(endSeconds))
  }

  return (
    <div className="video-modal" role="dialog" aria-modal="true" aria-label={`${title} 出处预览`}>
      <div className="video-modal__scrim" onClick={onClose}></div>
      <div className="video-modal__panel">
        <div className="video-modal__header">
          <p>{title}</p>
          <button type="button" className="video-modal__close" onClick={onClose}>
            关闭
          </button>
        </div>
        <div className="video-modal__body">
          <iframe
            title={`${title} YouTube preview`}
            src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {sourceUrl ? (
          <div className="video-modal__footer">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="video-modal__link"
            >
              在 YouTube 打开
            </a>
          </div>
        ) : null}
      </div>
    </div>
  )
}
