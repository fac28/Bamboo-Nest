import Link from 'next/link'
import FavouriteButton from './FavouriteButton'

export default function ItemCard({
  linkHref,
  cardKey,
  cardName,
  cardPrice,
  cardImgSrc,
  cardImgAlt,
  seller_name = null,
  seller_id = null,
  grid_direction = 'grid-cols-2',
  favouriteItems,
  user,
}: {
  linkHref: string
  cardKey?: number
  cardName: string
  cardPrice: number
  cardImgSrc: string
  cardImgAlt: string
  seller_id?: string | null
  seller_name?: string | null
  grid_direction?: 'grid-cols-2' | 'grid-rows-2'
  favouriteItems?: string[] | null
  user?: string | null
}) {
  return (
    <Link
      href={seller_id ? `/review/${seller_id}` : linkHref}
      className={`bg-white p-2 rounded-2xl shadow-xl mb-2 grid grid-rows-2 lg:${grid_direction} gap-4`}
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
        {seller_name && <p className="text-sm">Seller: {seller_name}</p>}
        {seller_id && <p className="text-sm">Leave a review</p>}
      </div>

      {cardKey ? (
        <FavouriteButton
          user={user ? user : null}
          itemID={`${cardKey}`}
          className="self-end"
          favouriteItems={favouriteItems}
        />
      ) : (
        <></>
      )}
    </Link>
  )
}
