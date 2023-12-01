'use client'

import { Category, SubCategory } from '@/utils/types'
import { useState } from 'react'

export default function SelectCategories({
  categories,
  subCategories,
  className,
}: {
  categories: Category[]
  subCategories: SubCategory[]
  className: string
}) {
  const inputStyle =
    'peer block w-full rounded-md border border-primaryBlue py-[3px] pl-5 text-xl text-primaryBlue'
  const [selectedCategoryState, setSelectedCategoryState] = useState(
    categories[0].id,
  )
  return (
    <>
      <label htmlFor="item-category">Category:</label>
      <select
        name="category"
        id="category"
        value={selectedCategoryState}
        onChange={e => setSelectedCategoryState(parseInt(e.target.value))}
        className={className}
      >
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.category_name}
          </option>
        ))}
      </select>
      <label htmlFor="item-sub-category">Sub-category:</label>
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
