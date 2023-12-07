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
    <div className="flex justify-center gap-4 align-center">
      <div className="child:p-2">
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
      </div>
      <div className="child:p-2">
        <label htmlFor="sub-category">Sub-category:</label>
        <select
          name="sub-category"
          id="sub-category"
          className={`min-w-[140px] ${className}`}
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
      </div>
    </div>
  )
}
