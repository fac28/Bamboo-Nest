import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { User } from './types'

export default async function checkItemInitialFavouriteState(
  user: string | undefined,
  item_id: string,
) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: favourites } = await supabase
    .from('users')
    .select('favourite_items')
    .eq('id', user)

  const favouriteItems: string[] | null =
    favourites && favourites[0].favourite_items

  const initialIsFavourite: boolean = favouriteItems
    ? favouriteItems.includes(item_id)
    : false
  return initialIsFavourite
}
