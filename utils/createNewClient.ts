import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default function newClient() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  return supabase
}
