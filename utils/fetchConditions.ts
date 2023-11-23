import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export default async function fetchConditions() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from('conditions').select()

  if (error) {
    console.log(error)
    return []
  }
  return data
}
