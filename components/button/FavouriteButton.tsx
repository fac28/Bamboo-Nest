'use client'

import { useEffect, useState } from 'react'
import toggleFavourite from '@/utils/handleFavouriteItem'
import { FaRegHeart, FaHeart } from 'react-icons/fa6'
import checkItemInitialFavouriteState from '@/utils/checkItemInitialFavouriteState'

export default function FavouriteButton({
  user,
  itemID,
  className,
  favouriteItems,
}: {
  user: string | null
  itemID: string
  className?: string
  favouriteItems?: number[] | null
}) {
  const [isFavourite, setIsFavourite] = useState(false)
  useEffect(() => {
    const initialiseFavouriteState = async () => {
      const initialFavourite = await checkItemInitialFavouriteState(
        favouriteItems?.map(item => item.toString()),
        itemID,
      )
      setIsFavourite(initialFavourite)
    }
    initialiseFavouriteState()
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (user) {
      toggleFavourite(user, parseInt(itemID))
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
