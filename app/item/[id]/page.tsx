import FavouriteButton from '@/components/FavouriteButton'
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
    if (error || !data || data.length === 0) {
      throw new Error('Error fetching data')
    }
    const {
      item_id,
      name,
      price,
      description,
      brand,
      delivery,
      collection,
      age: ageData,
      conditions: conditionData,
      categories: categoryData,
      image_id,
    } = data[0]
    const age = ageData.age_category
    const condition = conditionData.condition
    const conditionDescription = conditionData.description
    const category = categoryData.category_name
    const { data: allImagesData } = await supabase.storage
      .from('item-pictures')
      .list('')
    const imageName = allImagesData?.filter(
      singleImage => singleImage.id === image_id,
    )
    const { data: publicUrl } = await supabase.storage
      .from('item-pictures')
      .getPublicUrl(`${imageName && imageName[0].name}`)
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
        {/* All images should come from supabase url so might be better to use next Image and approve url */}
        <img
          src={publicUrl.publicUrl}
          width={500}
          height={500}
          alt={`image of ${name}`}
        />
        <FavouriteButton  user={`05979b42-ac73-4b6a-888b-e5f569b0b5e2`} itemID={item_id}  />
      </>
    )
  } catch (error) {
    console.log(error)
    return <p>Error loading data</p>
  }
}  