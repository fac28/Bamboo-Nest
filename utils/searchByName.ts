'use server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export default async function searchItem(name: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('items')
    .select()
    .ilike('name', `%${name}%`)

  if (!data || error) {
    return []
  }

  return data
}
