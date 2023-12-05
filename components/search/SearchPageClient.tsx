'use client'
import Search from '@/components/search/Search'
import PageContainer from '@/components/global-layout/PageContainer'
import fetchCategories from '@/utils/fetchCategories'
import { useState, useEffect } from 'react'
import searchItem from '@/utils/searchByName'
import { Category, Item } from '@/utils/types'
import ItemCard from '@/components/cards/ItemCard'
import SearchPageCategoryCard from '@/components/search/SearchPageCategoryCard'
// import ShowCategories from '@/components/cards/ShowCategories'
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
  const [filterPrice, setFilterPrice] = useState<number>(200)

  useEffect(() => {
    const prices = searchResults.map(result => result.price)
    const newMaxPrice = Math.max(...prices)
    if (!isNaN(newMaxPrice) && isFinite(newMaxPrice)) {
      setMaxPrice(newMaxPrice)
      setFilterPrice(newMaxPrice)
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

  useEffect(() => {
    fetchCategoriesData()
  }, [])
  // console.log({ filterPrice })
  return (
    <PageContainer justify="justify-start">
      <div className="flex flex-col gap-4 py-6 lg:py-16">
        <Search placeholder={'Search all products'} onSearch={handleSearch} />{' '}
        {/* {searchResults.length === 0 && (
          <div className="grid grid-cols-2 gap-4">
          {categories.map(category => (
            <SearchPageCategoryCard
              cardKey={category.category_name}
              linkHref={`/products/${category.category_name}`}
              cardName={category.category_name}
            />
          ))}
          </div>
        )} */}
        <label htmlFor="filter-by-price">Filter by price:</label>
        <div className='flex flex-inline'>
          <input
          id="filter-by-price"
          type="range"
          min={0}
          max={maxPrice}
          value={filterPrice}
          onChange={e => {
            setFilterPrice(parseInt(e.target.value))
          }}
          />
          <p> £{filterPrice} </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {searchResults
            .filter(result => {
              return result.price <= filterPrice
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
