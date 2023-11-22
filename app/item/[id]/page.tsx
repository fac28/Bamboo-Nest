import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

const itemQuery =
  'name,price,description,brand,delivery,collection, age(age_category), categories(category_name), conditions(condition,description)'

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
    .select(itemQuery)
    .eq('item_id', params.id)
  const { name, price, description, brand, delivery, collection } =
    data && data[0]
  const age = data && data[0].age.age_category
  const condition = data && data[0].conditions.condition
  const conditionDescription = data && data[0].conditions.description
  const category = data && data[0].categories.category_name
  return (
    <>
      <h1>{name}</h1>
      <h2>Price £{price}</h2>
      <p>{description}</p>
      <p>Age category: {age}</p>
      <p>Brand: {brand}</p>
      <p>
        Postage options: {delivery && `post`} {collection && `collect`}
      </p>
      <p>Item condition: {condition}</p>
      <p>Item condition expanded: {conditionDescription}</p>
      <p>Item category: {category}</p>
    </>
  )
}

// {"name":"Dino Fleece Blanket","price":4,"image_id":"b5635d9d-9109-4564-92a7-939928b8af7e","description":"Very soft blanket perfect for winter.","age_category":11,"brand":"Dunelm","delivery":true,"collection":true,"item_id":1,"condition":3,"category_id":7}
