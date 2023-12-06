import ItemCard from '@/components/cards/ItemCard'
import { FilteredResultsProps } from '@/utils/types'

export default function FilteredResults({
  searchResults,
  filterPrice,
  favouriteItems,
  user,
  sortByPrice,
  category_id,
  sub_category_id,
}: FilteredResultsProps) {
  const filteredResults = searchResults
    .filter(
      result =>
        result.price >= filterPrice[0] && result.price <= filterPrice[1],
    )
    .sort((a, b) => {
      return sortByPrice === 'descending'
        ? b.price - a.price
        : sortByPrice === 'ascending'
          ? a.price - b.price
          : 1
    })
    .filter(result => {
      return category_id ? result.category_id === category_id : true
    })
    .filter(result => {
      return sub_category_id ? result.sub_category_id === sub_category_id : true
    })

  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {filteredResults.length > 0 ? (
        filteredResults.map(result => (
          <div key={result.item_id}>
            <ItemCard
              item={result}
              favouriteItems={favouriteItems}
              user={user}
            />
          </div>
        ))
      ) : (
        <p>No Match</p>
      )}
    </div>
  )
}
