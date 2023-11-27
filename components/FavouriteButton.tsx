'use client'

import toggleFavourite from '@/utils/handleFavouriteItem'

export default function FavouriteButton({
  user,
  itemID,
  className
}: {
  user: string | null
  itemID: string
  className?: string
}) {
  return user ? (
    <button className={className} onClick={() => toggleFavourite(user, itemID)}>
      ADD TO FAVOURITES
    </button>
  ) : (
    <button className={className} onClick={logInAlert}>
      ADD TO FAVOURITES
    </button>
  )
}

function logInAlert() {
  alert('you must be logged in to perform this action')
}
