'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

export default function Search({
  placeholder,
  onSearch,
}: {
  placeholder: string
  onSearch: (term: string) => void
}) {
  const [searchTerm, setSearchTerm] = useState('') // Initialize a state variable for the search term

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="relative flex">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}
