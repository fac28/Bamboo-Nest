import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

const itemQuery =
  '*, age(age_category), categories(category_name), conditions(condition,description)'

export default async function listing({
  params,
}: {
  params: {
    id: string
  }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data, error } = await supabase
      .from('items')
      .select(itemQuery)
      .eq('item_id', params.id)
    // console.log(error, data)
    if (error || !data || data.length === 0) {
      // need to split data.length conditional into own if leading to 404
      throw new Error('Error fetching data')
    }
    const { name, price, description, brand, delivery, collection } =
      data && data[0]
    const age = data && data[0]?.age?.age_category
    const condition = data && data[0]?.conditions?.condition
    const conditionDescription = data && data[0]?.conditions?.description
    const category = data && data[0]?.categories?.category_name
    const imageUUID = data && data[0]?.image_id
    const allImages = await supabase.storage.from('item-pictures').list('')
    const imageName =
      allImages &&
      allImages.data?.filter(singleImage => singleImage.id === imageUUID)
    const publicUrl = await supabase.storage
      .from('item-pictures')
      .getPublicUrl(`${imageName && imageName[0].name}`)
    console.log(publicUrl)
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
        <img src={publicUrl.data.publicUrl} width={500} height={500} />
      </>
    )
  } catch (error) {
    console.log(error)
    return <p>Error loading data</p>
  }
}
