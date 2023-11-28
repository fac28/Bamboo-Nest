import FavouriteButton from '@/components/FavouriteButton'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import PageContainer from '@/components/PageContainer'
import Image from 'next/image'
import Link from 'next/link'
import WideBlueButton from '@/components/WideBlueButton'
import checkItemInitialFavouriteState from '@/utils/checkItemInitialFavouriteState'

const itemQuery =
  '*, age(age_category), categories(category_name), conditions(condition,description), users(first_name,last_name)'

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
      age: { age_category: age },
      conditions: { condition: condition, description: conditionDescription },
      categories: { category_name: category },
      seller_id,
      users: { first_name },
      image_path,
    } = data[0]

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const initialIsFavourite: boolean = await checkItemInitialFavouriteState(
      user?.id,
      item_id,
    )

    return (
      <PageContainer>
        <div className="flex flex-col gap-y-6">
          <FavouriteButton
            user={user ? user.id : null}
            itemID={item_id}
            className="self-end"
            initialIsFavourite={initialIsFavourite}
          />

          <Image
            src={image_path}
            width={300}
            height={300}
            alt={`image of ${name}`}
            className="self-center rounded-lg"
          />
          <p className="font-light">{brand.toUpperCase()}</p>
          <div className="flex flex-wrap justify-between text-xl font-medium">
            <p>{name}</p>
            <p>£{price}</p>
          </div>
          <Link href={`/seller/${seller_id}`} className="self-center">
            <p>Seller: {first_name}</p>
          </Link>
          <div className="italic font-light child:py-1">
            <p>Condition: {condition}</p>
            <p>Item condition expanded: {conditionDescription}</p>
            <p>Age category: {age}</p>
            <p>Item category: {category}</p>

            <p>
              Postage options: {delivery && `post`} {collection && `collect`}
            </p>
          </div>
          <p>{description}</p>
          <WideBlueButton
            buttonTitle={`Request ${first_name}'s Contact Info`}
            pageUrl={`/seller/${seller_id}`}
          />
        </div>
      </PageContainer>
    )
  } catch (error) {
    console.log(error)
    return <p>Error loading data</p>
  }
}
