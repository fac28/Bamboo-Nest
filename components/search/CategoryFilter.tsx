'use client'
import SelectCategories from '@/components/forms/CategoryDropDown'
import { CategoryFilterProps } from '@/utils/types'

export default function CategoryFilter({
  categories,
  subCategories,
  selectedCategoryState,
  setSelectedCategoryState,
  selectedSubCategoryState,
  setSelectedSubCategoryState,
}: CategoryFilterProps) {
  return (
    <div>
      <SelectCategories
        categories={categories}
        subCategories={subCategories}
        className={'custom-input'}
        selectedCategoryState={selectedCategoryState}
        setSelectedCategoryState={setSelectedCategoryState}
        selectedSubCategoryState={selectedSubCategoryState}
        setSelectedSubCategoryState={setSelectedSubCategoryState}
      />
    </div>
  )
}
