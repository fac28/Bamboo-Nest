import Link from 'next/link'
import FavouriteButton from './FavouriteButton'
import { useEffect, useState } from 'react'
import checkItemInitialFavouriteState from '@/utils/checkItemInitialFavouriteState'
import { User } from '@/utils/types'

export default function SearchPageItemCard({
  linkHref,
  cardKey,
  cardName,
  cardPrice,
  cardImgSrc,
  cardImgAlt,
  user
}: {
  linkHref: string
  cardKey: number
  cardName: string
  cardPrice: number
  cardImgSrc: string
  cardImgAlt: string
  user: User
}) {
  const [initialIsFavourite, setInitialIsFavourite] = useState(false)
  useEffect(() => {
    const fetchData = async () => {const initialIsFavourite: boolean = await checkItemInitialFavouriteState(
      user?.id,
      `${cardKey}`,
    )
    setInitialIsFavourite(initialIsFavourite)
  }
  console.log(fetchData)
  }, [])
  
  return (
    <Link
      href={linkHref}
      key={cardKey}
      className="bg-white p-2 rounded-2xl shadow-xl mb-2 grid grid-cols-2 gap-4"
    >
      <div className="sm:col-span-1 row-span-2">
        <img
          src={cardImgSrc}
          alt={cardImgAlt}
          className="w-full h-full aspect-square object-cover rounded-2xl"
        />
      </div>
      <div className="md:col-span-1 row-span-2 flex flex-col justify-around p-2">
        <p className="text-md">{cardName}</p>
        <p className="text-sm">£{cardPrice}</p>
      </div>

      <FavouriteButton
                user={user ? user.id : null}
                itemID={`${cardKey}`}
                className="self-end"
                initialIsFavourite={initialIsFavourite}
              />
    </Link>
  )
}
