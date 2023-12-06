import { Database } from '@/database.types'
import { Dispatch, SetStateAction } from 'react'

export type User = {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string
  phone: string
  confirmation_sent_at: string
  confirmed_at: string
  last_sign_in_at: string
  app_metadata: { provider: string; providers: [string] }
  user_metadata: object
  identities: [
    {
      id: string
      user_id: string
      identity_data: unknown
      provider: string
      last_sign_in_at: string
      created_at: string
      updated_at: string
    },
  ]
  created_at: string
  updated_at: string
}

export type Category = Database['public']['Tables']['categories']['Row']
export type SubCategory = Database['public']['Tables']['sub_categories']['Row']
export type Item = Database['public']['Tables']['items']['Row']

export type ItemWithImage = Item & {
  image: string
  id: number
  image_path: string
}

export type Age = Database['public']['Tables']['age']['Row']
export type Condition = Database['public']['Tables']['conditions']['Row']

export type UserInfo = Database['public']['Tables']['users']['Row']
export type Purchase =
  Database['public']['Tables']['users']['Row']['purchase_history']

export type Review = Database['public']['Tables']['reviews']['Row']
export interface ItemForHomePage {
  item_id: number
  name: string | null
  price: number | null
  image_path: string | null
  brand: string | null
  rent_available?: boolean | null
}

export type ItemForListingPage = {
  item_id: number | null
  name: string | null
  price: number | null
  image_path: string | null
  brand: string | null
  description: string | null
  condition: number | null
  rent_available?: boolean | null
}

export interface ItemInfo {
  name: string
  description: string
  price: number
  age_category: number
  category_id: number
  sub_category_id: number
  condition: number
  brand: string
  delivery: boolean
  collection: boolean
  seller_id: string
  image_path: string
  postcode: string
  rent_available?: boolean
}

export interface FilterProps {
  maxPrice: number
  filterPrice: number[]
  sortByPrice: string | null
  setSortByPrice: (value: string | null) => void
  setFilterPrice: (value: number[]) => void
}

export interface FilteredResultsProps {
  searchResults: Item[]
  filterPrice: number[]
  favouriteItems: number[] | null
  user: string | null
  sortByPrice: string | null
  category_id?: number | null | undefined
  sub_category_id?: number | null | undefined
}

export interface CategoryFilterProps {
  categories: Category[]
  subCategories: SubCategory[]
  selectedCategoryState: number
  setSelectedCategoryState: Dispatch<SetStateAction<number>>
  selectedSubCategoryState: number
  setSelectedSubCategoryState: Dispatch<SetStateAction<number>>
  className?: string
}
