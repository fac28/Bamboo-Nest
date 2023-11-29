import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import ClientPage from '../../components/SearchPageClient'

export default async function page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data: favourites } = await supabase
    .from('users')
    .select('favourite_items')
    .eq('id', user && user.id)
  const favouriteItems: string[] | null =
    favourites && favourites[0].favourite_items
  const userID = user ? user.id : null
  return <ClientPage favouriteItems={favouriteItems} user={userID} />
}
