'use client'

import { useState, ChangeEvent } from 'react'

export default function Search({
  placeholder,
  onSearch,
}: {
  placeholder: string
  onSearch: (term: string) => void
}) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        className="peer block w-full rounded-md border border-foundation py-[9px] pl-10 text-2xl text-foundation focus:outline-foundation placeholder:text-foundation placeholder:font-extralight placeholder:italic"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  )
}
