import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

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
            <p>{item.seller_id}</p>
          </div>
        ))}
    </div>
  )
}
