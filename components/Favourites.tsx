import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'

export default async function Purchase() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('users')
    .select('favourite_items')
    .eq('id', user?.id)

  const favourite_items: number[] = data && data[0]?.favourite_items

  const itemDetails = await Promise.all(
    favourite_items &&
      favourite_items.map(async item_id => {
        const { data } = await supabase
          .from('items')
          .select('*')
          .eq('item_id', item_id)
        return data && data[0]
      }),
  )

  async function fetchSellerName(seller_id: string) {
    const { data } = await supabase.from('users').select().eq('id', seller_id)
    const { first_name, last_name } = data && data[0]
    return first_name + ' ' + last_name
  }

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
            <p>Seller: {fetchSellerName(item.seller_id)}</p>
          </Link>
        ))}
    </div>
  )
}
