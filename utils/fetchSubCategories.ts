'use server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export default async function fetchSubCategories() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from('sub_categories').select('*')
  console.log(data)
  if (error) {
    console.log(error)
    return []
  }
  return data
}
