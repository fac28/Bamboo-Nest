import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function listing({
  params,
}: {
  params: {
    id: string
  }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('item_id', params.id)
  const item = data && data[0]
  return (
    <>
      <h1>{item.name}</h1>
      <h2>Price £{item.price}</h2>
      <p>{item.description}</p>
      <p>age category {item.age_category}</p>
      <p>brand {item.brand}</p>
      <p>
        Postage options: {item.delivery && `post`}{' '}
        {item.collection && `collect`}
      </p>
      <p>Item condition {item.condition}</p>
      <p>Item category {item.category_id}</p>
    </>
  )
}

// {"name":"Dino Fleece Blanket","price":4,"image_id":"b5635d9d-9109-4564-92a7-939928b8af7e","description":"Very soft blanket perfect for winter.","age_category":11,"brand":"Dunelm","delivery":true,"collection":true,"item_id":1,"condition":3,"category_id":7}
