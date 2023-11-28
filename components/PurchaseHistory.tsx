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
    .select('purchase_history')
    .eq('id', user?.id)

  const purchase_history: number[] = data && data[0]?.purchase_history

  const itemDetails = await Promise.all(
    purchase_history &&
      purchase_history.map(async purchase_id => {
        const { data } = await supabase
          .from('items')
          .select('*')
          .eq('item_id', purchase_id)
        return data && data[0]
      }),
  )

  async function fetchSellerName(seller_id: string) {
    const { data } = await supabase
      .from('users')
      .select()
      .eq('id', seller_id)
    const { first_name, last_name } = data && data[0]
    return first_name + ' ' + last_name
  }

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
            <p>Seller: {fetchSellerName(item.seller_id)}</p>
            <Link
              href={`/review/${item.seller_id}`}
              className='underline'>
              Leave a review
            </Link>
          </div>
        ))}
    </div>
  )
}
