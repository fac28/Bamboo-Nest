import Link from 'next/link'
import FavouriteButton from '@/components/buttons/FavouriteButton'
import Image from 'next/image'
import {
  Item,
  ItemForHomePage,
  ItemWithImage,
  ItemForListingPage,
} from '@/utils/types'

export default function ItemCard({
  seller_name = null,
  seller_id = null,
  grid_direction = 'grid-cols-2',
  favouriteItems,
  user,
  background_colour = 'bg-white',
  backgroundImg = null,
  item,
}: {
  seller_id?: string | null
  seller_name?: string | null
  grid_direction?: 'grid-cols-2' | 'grid-rows-2'
  favouriteItems?: number[] | null
  user?: string | null
  background_colour?: 'bg-white' | 'bg-lightMauve'
  backgroundImg?: string | null
  item: Item | ItemForHomePage | ItemWithImage | ItemForListingPage | null
}) {
  const linkHref = `/item/${item?.item_id}`
  const cardKey = item?.item_id
  const cardName = item?.name
  const cardPrice = item?.price
  const cardImgSrc = item?.image_path as string
  const cardImgAlt = `image of ${item?.name}`

  return (
    <Link
      href={seller_id ? `/review/${seller_id}` : linkHref}
      className={`${background_colour} hover:scale-95 hover:opacity-90 transition-transform duration-300 transform origin-center p-2 rounded-2xl shadow-xl mb-2 grid grid-rows-2 lg:${grid_direction} gap-4`}
      style={{
        backgroundImage: backgroundImg ? `url(${backgroundImg})` : 'none',
        backgroundSize: '300%',
        backgroundPosition: 'center bottom',
      }}
    >
      <Image
        width="500"
        height="500"
        src={cardImgSrc}
        alt={cardImgAlt}
        className="w-full h-full aspect-square object-cover rounded-2xl sm:col-span-1 row-span-2"
      />
      <div className="md:col-span-1 row-span-2 flex flex-col justify-around p-2 min-h-[6rem]">
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
        <p className="text-md">{cardName}</p>
        <p className="text-sm">£{cardPrice?.toFixed(2)}</p>
        {seller_name && <p className="text-sm">Seller: {seller_name}</p>}
        {seller_id && <p className="text-sm">Leave a review</p>}
      </div>
    </Link>
  )
}
