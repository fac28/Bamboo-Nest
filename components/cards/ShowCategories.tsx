import SearchPageCategoryCard from '@/components/search/SearchPageCategoryCard'
import { Category } from '@/utils/types'

interface ShowCategoriesProps {
  categories: Category[]
}

export default function ShowCategories(props: ShowCategoriesProps) {
  const { categories } = props
  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map(category => (
        category.category_name !== 'All Categories' &&
        <SearchPageCategoryCard
          cardKey={category.category_name}
          linkHref={`/products/${category.category_name.toLowerCase()}`}
          cardName={category.category_name}
        />
      ))}
    </div>
  )
}
