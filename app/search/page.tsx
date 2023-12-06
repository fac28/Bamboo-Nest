import ClientPage from '../../components/search/SearchPageClient'
import getUser from '@/utils/getUser'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search Listings - Bamboo Nest',
}

export default async function page() {
  const { supabase, userID } = await getUser()

  const { data: favourites } = await supabase
    .from('users')
    .select('favourite_items')
    .eq('id', userID||'')

  let favouriteItems: number[] | [] = []
  if (favourites && favourites[0]) {
    favouriteItems = favourites[0].favourite_items || []
  }

  return <ClientPage favouriteItems={favouriteItems} user={userID||''} />
}
