import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import fetchItemsBySeller from '@/utils/fetchItemsBySeller'
import { ItemWithImage, Review } from '@/utils/types'
import WideBlueButton from '@/components/WideBlueButton'
import PageContainer from '@/components/PageContainer'
import ListingHistory from '@/components/ListingHistory'
import fetchReviewBySeller from '@/utils/fetchReviewBySeller'
import DisplayReview from '@/components/DisplayReview'

export default async function listing({
  params,
}: {
  params: {
    slug: string[]
  }
}) {
  const sellerID = params.slug[0]

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data, error } = await supabase
      .from('users')
      .select('first_name, last_name, bio, image_path, created_at')
      .eq('id', sellerID)

    if (error || !data || data.length === 0) {
      throw new Error('Error fetching data')
    }

    const { first_name, last_name, bio, image_path, created_at } = data[0]

    const fullName = `${first_name} ${last_name}`
    const items_for_sale: ItemWithImage[] = await fetchItemsBySeller(
      supabase,
      sellerID,
    )

    const reviewData: Review[] = await fetchReviewBySeller(supabase, sellerID)

    if (params.slug[1] == 'history') {
      return (
        <PageContainer>
          <h1>Reviews for {first_name} </h1>
          <DisplayReview reviewData={reviewData} />
          <h1>All Listings by {first_name}</h1>
          <ListingHistory id={sellerID} />
        </PageContainer>
      )
    }

    const sale_history: ItemWithImage[] = await items_for_sale.filter(
      item => item.sold === true,
    )

    const imageStyle = {
      borderRadius: '50%',
      border: '1px solid #fff',
    }

    return (
      <PageContainer>
        <div className="pb-2 gap-2">
          <Image
            src={image_path || ''}
            alt={`${fullName}'s avatar photo`}
            width={200}
            height={200}
            style={imageStyle}
          />
          <h1 className="text-xl">{fullName}</h1>
          <p className="text-slate-500">
            {sale_history && sale_history.length} items sold
          </p>
        </div>
        <div>
          <h2 className="text-xl"> About me </h2>
          <p>{bio}</p>
          <h2 className="text-xl"> Member Since </h2>
          <p>{created_at.split('T')[0]}</p>
          <div className="flex flex-col w-40 gap-2 pt-2">
            <WideBlueButton
              buttonTitle={`See All ${first_name}'s Items`}
              pageUrl={`${sellerID}/history`}
            />
            <WideBlueButton buttonTitle={`Message ${first_name}`} pageUrl="" />
          </div>
        </div>
      </PageContainer>
    )
  } catch (error) {
    console.error(error)
    return <p>Error loading data</p>
  }
}
