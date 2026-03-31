import { useNavigate } from 'react-router-dom'

import { AppShell } from '../components/AppShell'
import { BrandMark } from '../components/BrandMark'
import { CategoryCard } from '../components/CategoryCard'
import { categories } from '../data/categories'
import type { SourceType } from '../data/lessonItems'
import { ROUTES } from '../lib/routes'

export function CategoriesPage() {
  const navigate = useNavigate()

  const openCategory = (sourceType: SourceType) => {
    navigate(`${ROUTES.learn}?type=${sourceType}`)
  }

  return (
    <AppShell
      className="phone-frame--categories"
      header={
        <header className="app-header">
          <BrandMark compact />
        </header>
      }
    >
      <section className="categories-page">
        <div className="categories-page__copy">
          <h1>今天想学点什么？</h1>
          <p>在这里，每一个音符和每一段对白都是你学习韩语的钥匙。</p>
        </div>

        <div className="categories-page__grid">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={openCategory}
            />
          ))}
        </div>

        <section className="trend-card">
          <p className="trend-card__eyebrow">热门趋势 TrendingNow</p>
          <div className="trend-card__chips">
            <span>NewJeans</span>
            <span>黑暗荣耀</span>
          </div>
        </section>
      </section>
    </AppShell>
  )
}
