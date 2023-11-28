'use client'

import toggleFavourite from '@/utils/handleFavouriteItem'
import { FaRegHeart } from 'react-icons/fa6'
import { FaHeart } from 'react-icons/fa6'

export default function FavouriteButton({
  user,
  itemID,
  className,
}: {
  user: string | null
  itemID: string
  className?: string
}) {
  return user ? (
    <button className={className} onClick={() => toggleFavourite(user, itemID)}>
      <FaRegHeart />
    </button>
  ) : (
    <button className={className} onClick={logInAlert}>
      <FaHeart />
    </button>
  )
}

function logInAlert() {
  alert('you must be logged in to perform this action')
}
