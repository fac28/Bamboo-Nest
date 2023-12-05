import ItemCard from '@/components/cards/ItemCard'
import { FilteredResultsProps } from '@/utils/types'

export default function FilteredResults({
  searchResults, filterPrice, favouriteItems, user, sortByPrice}
  : FilteredResultsProps) {
  return (
  <div className="mt-4 grid grid-cols-2 gap-4">
    {searchResults
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
      .map(result => (
        <div key={result.item_id}>
          <ItemCard item={result} favouriteItems={favouriteItems} user={user} />
        </div>
      ))}
  </div>
  )
}
