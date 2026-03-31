import type { CategoryItem } from '../data/categories'

interface CategoryCardProps {
  category: CategoryItem
  onSelect: (id: CategoryItem['id']) => void
}

export function CategoryCard({ category, onSelect }: CategoryCardProps) {
  return (
    <article className={`category-card ${category.accentClassName}`}>
      <p className="category-card__eyebrow">{category.eyebrow}</p>
      <h2 className="category-card__title">{category.title}</h2>
      <p className="category-card__description">{category.description}</p>
      <button
        type="button"
        className="category-card__action"
        onClick={() => onSelect(category.id)}
      >
        {category.actionLabel}
      </button>
    </article>
  )
}
