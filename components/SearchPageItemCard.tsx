import Link from 'next/link'

export default function SearchPageItemCard({
  linkHref,
  cardKey,
  cardName,
  cardPrice,
  cardImgSrc,
  cardImgAlt,
}: {
  linkHref: string
  cardKey: number
  cardName: string
  cardPrice: number
  cardImgSrc: string
  cardImgAlt: string
}) {
  return (
    <Link
      href={linkHref}
      key={cardKey}
      className="bg-white p-2 border rounded shadow mb-2"
    >
      <h2>{cardName}</h2>
      <p>£{cardPrice}</p>
      <img
        src={cardImgSrc}
        alt={cardImgAlt}
        className="w-32 h-32 object-contain"
      />
      {/* <FavouriteButton
                user={user ? user.id : null}
                itemID={item_id}
                className="self-end"
                initialIsFavourite={initialIsFavourite}
              /> */}
    </Link>
  )
}
