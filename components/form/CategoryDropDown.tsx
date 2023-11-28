'use client'

import { Category, SubCategory } from '@/utils/types'
import { useState } from 'react'

export default function SelectCategories({
  categories,
  subCategories,
}: {
  categories: Category[]
  subCategories: SubCategory[]
}) {
  const [selectedCategoryState, setSelectedCategoryState] = useState(
    categories[0].id,
  )
  console.log({ selectedCategoryState })
  return (
    <>
      <label htmlFor="item-category">Category:</label>
      <select
        name="category"
        id="category"
        value={selectedCategoryState}
        onChange={e => setSelectedCategoryState(parseInt(e.target.value))}
      >
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.category_name}
          </option>
        ))}
      </select>
      <label htmlFor="item-sub-category">sub-category:</label>
      <select name="sub-category" id="sub-category">
        {subCategories
          .filter(
            subCategory => subCategory.category_id === selectedCategoryState,
          )
          .map(subCategory => (
            <option key={subCategory.id} value={subCategory.id}>
              {subCategory.name}
            </option>
          ))}
      </select>
    </>
  )
}
