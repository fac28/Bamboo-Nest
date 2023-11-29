import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import getItemDetails from '@/utils/fetchItemDetails'
import ItemCard from '@/components/ItemCard'
import fetchSellerName from '@/utils/fetchSellerName'

export default async function Purchase() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userID = user?.id || ''

  const itemDetails = await getItemDetails(supabase, 'purchase_history', userID)
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
              seller_id={item.seller_id}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
