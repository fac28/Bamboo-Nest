'use client'

import toggleFavourite from '@/utils/handleFavouriteItem'

export default function FavouriteButton({
  user,
  itemID,
}: {
  user: string | null
  itemID: string
}) {
  return user ? (
    <button onClick={() => toggleFavourite(user, itemID)}>
      ADD TO FAVOURITES
    </button>
  ) : (
    <button onClick={logInAlert}>ADD TO FAVOURITES</button>
  )
}

function logInAlert() {
  alert('you must be logged in to perform this action')
}
