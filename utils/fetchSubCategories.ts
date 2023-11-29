'use server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export default async function fetchSubCategories() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from('sub_categories').select('*')
  if (error) {
    console.error(error)
    return []
  }
  return data
}
