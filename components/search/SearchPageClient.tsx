'use client'
import Search from '@/components/search/Search'
import PageContainer from '@/components/global-layout/PageContainer'
import fetchCategories from '@/utils/fetchCategories'
import { useState, useEffect } from 'react'
import searchItem from '@/utils/searchByName'
import { Category, Item, SubCategory } from '@/utils/types'
import ShowCategories from '@/components/cards/ShowCategories'
import Filter from '@/components/search/Filter'
import FilteredResults from '@/components/search/ShowFilteredResults'
import CategoryFilter from '@/components/search/CategoryFilter'
import fetchSubCategories from '@/utils/fetchSubCategories'

export default function ClientPage({
  favouriteItems,
  user,
}: {
  favouriteItems: number[] | null
  user: string | null
}) {
  const [searchResults, setSearchResults] = useState<Item[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [maxPrice, setMaxPrice] = useState(200)
  const [filterPrice, setFilterPrice] = useState<number[]>([0, 200])
  const [sortByPrice, setSortByPrice] = useState<string | null>(null)
  const [selectedCategoryState, setSelectedCategoryState] = useState<number>(0)
  const [selectedSubCategoryState, setSelectedSubCategoryState] =
    useState<number>(0)

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
    const [categoriesData, subCategoriesData] = await Promise.all([
      fetchCategories(),
      fetchSubCategories(),
    ])
    categoriesData.unshift({ id: 0, category_name: 'All Categories' })
    setCategories(categoriesData)
    setSubCategories(subCategoriesData)
  }

  useEffect(() => {
    fetchCategoriesData()
  }, [])

  return (
    <PageContainer justify="justify-start" className="gap-4 child:w-full">
      <Search placeholder={'Search all products'} onSearch={handleSearch} />{' '}
      {searchResults.length === 0 ? (
        <ShowCategories categories={categories} />
      ) : (
        <>
          <CategoryFilter
            categories={categories}
            subCategories={subCategories}
            selectedCategoryState={selectedCategoryState}
            setSelectedCategoryState={setSelectedCategoryState}
            selectedSubCategoryState={selectedSubCategoryState}
            setSelectedSubCategoryState={setSelectedSubCategoryState}
          />
          <Filter
            maxPrice={maxPrice}
            filterPrice={filterPrice}
            sortByPrice={sortByPrice}
            setSortByPrice={setSortByPrice}
            setFilterPrice={setFilterPrice}
          />
          <FilteredResults
            searchResults={searchResults}
            filterPrice={filterPrice}
            favouriteItems={favouriteItems}
            user={user}
            sortByPrice={sortByPrice}
            category_id={selectedCategoryState}
            sub_category_id={selectedSubCategoryState}
          />
        </>
      )}
    </PageContainer>
  )
}
