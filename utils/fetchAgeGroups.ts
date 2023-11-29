import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export default async function fetchAgeGroups() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from('age').select()

  if (error) {
    console.error(error)
    return []
  }
  return data
}
