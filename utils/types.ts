import { Database } from '@/database.types'
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
