'use client'

import { useState } from 'react'
import toggleFavourite from '@/utils/handleFavouriteItem'
import { FaRegHeart, FaHeart } from 'react-icons/fa6'

export default function FavouriteButton({
  user,
  itemID,
  className,
  initialIsFavourite,
}: {
  user: string | null
  itemID: string
  className?: string
  initialIsFavourite?: boolean
}) {
  const [isFavourite, setIsFavourite] = useState(initialIsFavourite)

  const handleClick = () => {
    if (user) {
      toggleFavourite(user, itemID)
      setIsFavourite(!isFavourite) // Toggle the local state
    } else {
      logInAlert()
    }
  }

  return (
    <button className={className} onClick={handleClick}>
      {isFavourite ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  )
}

function logInAlert() {
  alert('You must be logged in to perform this action')
}
