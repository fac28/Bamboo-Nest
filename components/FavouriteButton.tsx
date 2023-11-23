'use client'

import { createClient } from '@/utils/supabase/client'

export default function FavouriteButton({
  user,
  itemID,
}: {
  user: string
  itemID: string
}) {
  return (
    <button onClick={() => togggleFavourite(user, itemID)}>
      ADDD TO FAVOURITES
    </button>
  )
}
const supabase = createClient()

async function togggleFavourite(user, itemID) {
  const { data, error } = await supabase
    .from('users')
    .select('favourite_items')
    .eq('id', user)
  const favouriteItems = data && data[0].favourite_items
  if (!favouriteItems || favouriteItems.length === 0) {
    console.log('new item')
    updateSupabaseFavouriteItems(user,[itemID])
    return
  }
  if (favouriteItems.includes(itemID)) {
    const updatedFavouriteItems = favouriteItems.filter(item => item !== itemID)
    console.log('remove item', { updatedFavouriteItems })
    updateSupabaseFavouriteItems(user,updatedFavouriteItems)
    return
  }
  const updatedFavouriteItems = [...favouriteItems, itemID]
  console.log('add item', { updatedFavouriteItems })
  updateSupabaseFavouriteItems(user,updatedFavouriteItems)
}

async function updateSupabaseFavouriteItems(user,updatedItems) {
  const { data, error } = await supabase
   .from('users')
   .update({ favourite_items: updatedItems })
   .eq('id', user)
   .select()
   console.log(data,error)
}