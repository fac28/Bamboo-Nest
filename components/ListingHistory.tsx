import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import fetchItemsBySeller from '@/utils/fetchItemsBySeller'
import { ItemWithImage } from '@/utils/types'
import ItemCard from '@/components/ItemCard'

export default async function SellingHistory() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userID = user?.id || ''

  const itemDetails: ItemWithImage[] = await fetchItemsBySeller(supabase, userID)

  return (
      <div className="flex flex-col gap-4 py-16">
        <div className="grid grid-cols-2 gap-4">
          {itemDetails.map(item => (
            <div key = {item.item_id}>
              <ItemCard
                linkHref={`/item/${item.item_id}`}
                cardName={item.name}
                cardPrice={item.price}
                cardImgSrc={item.image_path}
                cardImgAlt={`image of ${item.name}`}
              />
            </div>
          ))}
        </div>
      </div>
  )
}
