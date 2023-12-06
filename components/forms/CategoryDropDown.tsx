'use client'

import { CategoryFilterProps } from '@/utils/types'

export default function SelectCategories({
  categories,
  subCategories,
  className,
  selectedCategoryState,
  setSelectedCategoryState,
  selectedSubCategoryState,
  setSelectedSubCategoryState,
}: CategoryFilterProps) {
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
      <label htmlFor="sub-category">Sub-category:</label>
      <select
        name="sub-category"
        id="sub-category"
        className={className}
        value={selectedSubCategoryState}
        onChange={e => setSelectedSubCategoryState(parseInt(e.target.value))}
      >
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
