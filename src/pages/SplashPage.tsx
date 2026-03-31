import { useNavigate } from 'react-router-dom'

import { AppShell } from '../components/AppShell'
import { BrandMark } from '../components/BrandMark'
import { PrimaryButton } from '../components/PrimaryButton'
import { ROUTES } from '../lib/routes'

export function SplashPage() {
  const navigate = useNavigate()

  return (
    <AppShell className="phone-frame--splash">
      <section className="splash-page">
        <div className="splash-page__wall"></div>
        <div className="splash-page__content">
          <div className="splash-page__brand-card">
            <BrandMark />
          </div>
          <div className="splash-page__headline">
            <h1>K-Miso</h1>
            <p>歌词与台词中的韩语画廊</p>
          </div>
          <p className="splash-page__description">
            让每一个词都如艺术品般呈现。沉浸在韩语的韵律之中。
          </p>
          <PrimaryButton onClick={() => navigate(ROUTES.learn)}>开始学习</PrimaryButton>
          <div className="splash-page__dots" aria-hidden="true">
            <span className="is-active"></span>
            <span></span>
            <span></span>
          </div>
          <p className="splash-page__watermark">遇见心动的韩语单词</p>
        </div>
      </section>
    </AppShell>
  )
}
