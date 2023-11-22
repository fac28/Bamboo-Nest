import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export default async function fetchCategories() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from('categories').select()

  if (error) {
    console.log(error)
    return []
  }
  return data
}
