import getItemDetails from '@/utils/fetchItemDetails'
import ItemCard from '@/components/cards/ItemCard'
import fetchSellerName from '@/utils/fetchSellerName'
import getUser from '@/utils/getUser'

export default async function Purchase() {
  const { supabase, userID } = await getUser()

  if (!userID) {
    return null
  }

  const itemDetails = await getItemDetails(supabase, 'favourite_items', userID)

  const seller_name = await fetchSellerName(
    supabase,
    itemDetails?.[0]?.seller_id || '',
  )

  return (
    <div className="flex flex-col gap-4 py-16">
      <h1>Your Favourites</h1>
      <div className="grid grid-cols-2 gap-4">
        {itemDetails.map(item => (
          <div key={item.item_id}>
            <ItemCard item={item} seller_name={seller_name} />
          </div>
        ))}
      </div>
    </div>
  )
}
