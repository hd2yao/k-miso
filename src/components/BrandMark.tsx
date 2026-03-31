interface BrandMarkProps {
  compact?: boolean
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className={`brand-mark${compact ? ' brand-mark--compact' : ''}`}>
      <div className="brand-mark__icon" aria-hidden="true">
        <span className="brand-mark__eye brand-mark__eye--left"></span>
        <span className="brand-mark__eye brand-mark__eye--right"></span>
        <span className="brand-mark__smile"></span>
      </div>
      <div className="brand-mark__text">
        <span className="brand-mark__title">K-Miso</span>
        {!compact ? <span className="brand-mark__subtitle">韩语学习</span> : null}
      </div>
    </div>
  )
}
