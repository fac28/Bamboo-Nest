'use client'
import Search from '@/components/Search'
import PageContainer from '@/components/PageContainer'

import fetchCategories from '@/utils/fetchCategories'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import searchItem from '@/utils/searchByName'
import fetchImage from '@/utils/fetchImage'
import { Category, ItemWithImage } from '@/utils/types'

export default function Page() {
  const [searchResults, setSearchResults] = useState<ItemWithImage[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  async function handleSearch(term: string) {
    const items = await searchItem(term)

    await Promise.all(
      items.map(async item => {
        item.image = await fetchImage(item.image_id)
      }),
    )

    setSearchResults(items)
  }

  async function fetchCategoriesData() {
    const categoriesData = await fetchCategories()
    setCategories(categoriesData)
  }

  useEffect(() => {
    fetchCategoriesData()
  }, [])

  return (
    <PageContainer>
      <Search placeholder={'Search all products'} onSearch={handleSearch} />{' '}
      {/* Pass the handleSearch function as a prop */}
      {searchResults.length === 0 && (
        <div className="grid grid-cols-2 gap-4">
          {categories.map(category => (
            <div
              key={category.category_name}
              className="bg-white shadow-md rounded-md p-4"
            >
              <Link href={`/products/${category.category_name}`}>
                <h1 className="text-2xl font-bold">{category.category_name}</h1>
              </Link>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        {searchResults.map(result => (
          <div
            key={result.id}
            className="bg-white p-2 border rounded shadow mb-2"
          >
            <h2>{result.name}</h2>
            <p>£{result.price}</p>
            <img
              src={result.image}
              alt={result.name}
              className="w-32 h-32 object-contain"
            />
          </div>
        ))}
      </div>
    </PageContainer>
  )
}
