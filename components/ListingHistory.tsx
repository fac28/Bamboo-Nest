import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import fetchItemsBySeller from '@/utils/fetchItemsBySeller'
import { ItemWithImage } from '@/utils/types'
import Link from 'next/link'

export default async function SellingHistory() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userID = user?.id || ''

  const itemDetails = await fetchItemsBySeller(supabase, userID)

  return (
    <div>
      {itemDetails.map((item: ItemWithImage, index: number) => (
          <Link key={index} href={`/item/${item.item_id}`}>
            <Image
              src={item.image_path}
              height={50}
              width={50}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.sold? 'Sold on ' + item.sold_at: 'On Sale'}</p>

          </Link>
        ))}
    </div>
  )
}
