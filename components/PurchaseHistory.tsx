import getItemDetails from '@/utils/fetchItemDetails'
import ItemCard from '@/components/ItemCard'
import fetchSellerName from '@/utils/fetchSellerName'
import getUser from '@/utils/getUser'

export default async function Purchase() {
  const { user, supabase } = await getUser()

  const userID = user?.id || ''

  const itemDetails = await getItemDetails(supabase, 'purchase_history', userID)
  const seller_name = await fetchSellerName(
    supabase,
    itemDetails[0] && itemDetails[0].seller_id || '',
  )

  return (
    <div className="flex flex-col gap-4 py-16">
      <h1>Your Purchase History</h1>
      <div className="grid grid-cols-2 gap-4">
        {itemDetails.map(item => (
          <div key={item?.item_id}>
            <ItemCard
              item={item}
              seller_name={seller_name}
              seller_id={item?.seller_id}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
