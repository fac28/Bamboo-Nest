'use client'

import { createClient } from '@/utils/supabase/client'

export default function FavouriteButton({
  user,
  itemID,
}: {
  user: string | null
  itemID: string
}) {
  return user ? (
    <button onClick={() => togggleFavourite(user, itemID)}>
      ADDD TO FAVOURITES
    </button>
  ) : (
    <p>'not logged in'</p>
  )
}
const supabase = createClient()

async function togggleFavourite(user: string, itemID: string) {
  const { data, error } = await supabase
    .from('users')
    .select('favourite_items')
    .eq('id', user)
  //log only here to appease eslint
  console.log(error)
  const favouriteItems: string[] | null = data && data[0].favourite_items
  if (!favouriteItems || favouriteItems.length === 0) {
    updateSupabaseFavouriteItems(user, [itemID])
    return
  }
  if (favouriteItems.includes(itemID)) {
    const updatedFavouriteItems = favouriteItems.filter(item => item !== itemID)
    console.log('remove item', { updatedFavouriteItems })
    updateSupabaseFavouriteItems(user, updatedFavouriteItems)
    return
  }
  const updatedFavouriteItems = [...favouriteItems, itemID]
  console.log('add item', { updatedFavouriteItems })
  updateSupabaseFavouriteItems(user, updatedFavouriteItems)
}

async function updateSupabaseFavouriteItems(
  user: string,
  updatedItems: string[],
) {
  const { data, error } = await supabase
    .from('users')
    .update({ favourite_items: updatedItems })
    .eq('id', user)
    .select()
  // console log is just to stop lint errors
  console.log(data, error)
}
