import Link from 'next/link'
import FavouriteButton from './FavouriteButton'

export default function SearchPageItemCard({
  linkHref,
  cardKey,
  cardName,
  cardPrice,
  cardImgSrc,
  cardImgAlt,
  favouriteItems,
  user,
}: {
  linkHref: string
  cardKey: number
  cardName: string
  cardPrice: number
  cardImgSrc: string
  cardImgAlt: string
  favouriteItems: string[] | null
  user: string | null
}) {
  favouriteItems

  return (
    <>
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
        user={user}
        itemID={`${cardKey}`}
        className="self-end"
        favouriteItems={favouriteItems}
      />
      </Link>
    </>
  )
}
