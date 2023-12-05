import SearchPageCategoryCard from '@/components/search/SearchPageCategoryCard'

export default function ShowCategories(
  categories: {
    category_name: string
    id: number
  }[],
) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map(category => (
        <SearchPageCategoryCard
          cardKey={category.category_name}
          linkHref={`/products/${category.category_name}`}
          cardName={category.category_name}
        />
      ))}
    </div>
  )
}
