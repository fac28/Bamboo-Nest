'use client'
import Search from '@/components/search/Search'
import PageContainer from '@/components/global-layout/PageContainer'
import fetchCategories from '@/utils/fetchCategories'
import { useState, useEffect } from 'react'
import searchItem from '@/utils/searchByName'
import { Category, Item } from '@/utils/types'
import ItemCard from '@/components/cards/ItemCard'
import { Slider } from '@nextui-org/react'
import SearchPageCategoryCard from '@/components/search/SearchPageCategoryCard'
export default function ClientPage({
  favouriteItems,
  user,
}: {
  favouriteItems: number[] | null
  user: string | null
}) {
  const [searchResults, setSearchResults] = useState<Item[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [maxPrice, setMaxPrice] = useState(200)
  const [filterPrice, setFilterPrice] = useState<number[]>([0, 200])
  const [sortByPrice, setSortByPrice] = useState<string | null>(null)
  useEffect(() => {
    const prices = searchResults.map(result => result.price)
    const newMaxPrice = Math.max(...prices)
    if (!isNaN(newMaxPrice) && isFinite(newMaxPrice)) {
      setMaxPrice(newMaxPrice)
      setFilterPrice([filterPrice[0], newMaxPrice])
    }
  }, [searchResults])

  async function handleSearch(term: string) {
    const items = await searchItem(term)
    setSearchResults(items)
  }

  async function fetchCategoriesData() {
    const categoriesData = await fetchCategories()
    setCategories(categoriesData)
  }
  function handleFilterValues(value: number[]) {
    const newMin = parseFloat(value[0] as unknown as string)
    const newMax = parseFloat(value[1] as unknown as string)
    setFilterPrice([newMin, newMax])
  }

  useEffect(() => {
    fetchCategoriesData()
  }, [])

  return (
    <PageContainer justify="justify-start">
      <div className="w-full flex flex-col gap-4 py-6 lg:py-16">
        <Search placeholder={'Search all products'} onSearch={handleSearch} />{' '}
        {searchResults.length === 0 && (
          <div className="grid grid-cols-2 gap-4">
            {categories.map(category => (
              <SearchPageCategoryCard
                cardKey={category.category_name}
                linkHref={`/products/${category.category_name}`}
                cardName={category.category_name}
              />
            ))}
          </div>
        )}
        <div>
          <Slider
            label="Filter by price:"
            step={0.5}
            maxValue={maxPrice}
            minValue={0}
            defaultValue={[0, filterPrice[1]]}
            value={[filterPrice[0], filterPrice[1]]}
            formatOptions={{ style: 'currency', currency: 'GBP' }}
            classNames={{
              base: 'max-w-sm ',
              filler: 'bg-primaryBlue',
              thumb: 'bg-primaryBlue',
            }}
            startContent={0}
            endContent={maxPrice}
            onChange={value => {
              if (Array.isArray(value)) handleFilterValues(value)
              else handleFilterValues([0, 200])
            }}
          />
          <button
            className="rounded-full px-4 py-2 border bg-primaryBlue border-primaryBlue my-6 text-white text-center italic focus:outline-primaryBlue"
            onClick={() =>
              setSortByPrice(
                sortByPrice === 'ascending' ? 'descending' : 'ascending',
              )
            }
          >
            Sort by price {sortByPrice === 'ascending' ? '↑' : '↓'}
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {searchResults
            .filter(result => {
              return (
                result.price >= filterPrice[0] && result.price <= filterPrice[1]
              )
            })
            .toSorted((a, b) => {
              return sortByPrice === 'descending'
                ? b.price - a.price
                : sortByPrice === 'ascending'
                  ? a.price - b.price
                  : 1
            })
            .map(result => (
              <div key={result.item_id}>
                <ItemCard
                  item={result}
                  favouriteItems={favouriteItems}
                  user={user}
                />
              </div>
            ))}
        </div>
      </div>
    </PageContainer>
  )
}
