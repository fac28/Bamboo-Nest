import getItemDetails from '@/utils/fetchItemDetails'
import ItemCard from '@/components/ItemCard'
import fetchSellerName from '@/utils/fetchSellerName'
import getUser from '@/utils/getUser'

export default async function Purchase() {
  const { user, supabase } = await getUser()

  const userID = user?.id || ''

  const itemDetails = await getItemDetails(supabase, 'favourite_items', userID)
  const seller_name = await fetchSellerName(supabase, itemDetails[0].seller_id)

  return (
    <div className="flex flex-col gap-4 py-16">
      <div className="grid grid-cols-2 gap-4">
        {itemDetails.map(item => (
          <div key={item.item_id}>
            <ItemCard
              linkHref={`/item/${item.item_id}`}
              cardName={item.name}
              cardPrice={item.price}
              cardImgSrc={item.image_path}
              cardImgAlt={`image of ${item.name}`}
              seller_name={seller_name}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
