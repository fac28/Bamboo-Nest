import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import getItemDetails from '@/utils/fetchItemDetails'
import fetchSellerName from '@/utils/fetchSellerName'

export default async function Purchase() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userID = user?.id || ''

  const itemDetails = await getItemDetails(supabase, 'favourite_items', userID)

  return (
    <div>
      {itemDetails &&
        itemDetails.map((item, index) => (
          <Link href={`/item/${item.item_id}`} key={index}>
            <Image
              src={item.image_path}
              height={50}
              width={50}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>£{item.price}</p>
            <p>Seller: {fetchSellerName(supabase, item.seller_id)}</p>
          </Link>
        ))}
    </div>
  )
}
