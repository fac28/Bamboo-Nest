import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import fetchSellerName from '@/utils/fetchSellerName'
import getItemDetails from '@/utils/fetchItemDetails'

export default async function Purchase() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userID = user?.id || ''

  const itemDetails = await getItemDetails(supabase, 'purchase_history', userID)

  return (
    <div>
      {itemDetails &&
        itemDetails.map((item, index) => (
          <div key={index}>
            <Image
              src={item.image_path}
              height={50}
              width={50}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>Seller: {fetchSellerName(supabase, item.seller_id)}</p>
            <Link href={`/review/${item.seller_id}`} className="underline">
              Leave a review
            </Link>
          </div>
        ))}
    </div>
  )
}
