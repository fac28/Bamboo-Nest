'use client'

import togggleFavourite from "@/utils/handleFavouriteItem"

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
