'use client'

import { Slider } from '@nextui-org/react'
import { FilterProps } from '@/utils/types'

export default function Filter({
  maxPrice,
  filterPrice,
  sortByPrice,
  setSortByPrice,
  setFilterPrice,
}: FilterProps) {
  function handleFilterValues(value: number[]) {
    const newMin = parseFloat(value[0].toString())
    const newMax = parseFloat(value[1].toString())
    setFilterPrice([newMin, newMax])
  }

  return (
    <div className="flex flex-wrap justify-between items-center">
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
          filler: 'bg-foundation',
          thumb: 'bg-foundation',
        }}
        startContent={0}
        endContent={maxPrice}
        onChange={value => {
          if (Array.isArray(value)) handleFilterValues(value)
          else handleFilterValues([0, 200])
        }}
      />
      <button
        className="rounded-full px-4 py-2 border bg-foundation border-foundation my-6 text-white text-center italic focus:outline-foundation"
        onClick={() =>
          setSortByPrice(
            sortByPrice === 'ascending' ? 'descending' : 'ascending',
          )
        }
      >
        Sort by price {sortByPrice === 'ascending' ? '↑' : '↓'}
      </button>
    </div>
  )
}
