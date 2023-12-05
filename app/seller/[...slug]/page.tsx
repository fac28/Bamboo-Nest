import Image from 'next/image'
import fetchItemsBySeller from '@/utils/fetchItemsBySeller'
import { Item } from '@/utils/types'
import WideBlueButton from '@/components/buttons/WideBlueButton'
import PageContainer from '@/components/global-layout/PageContainer'
import ListingHistory from '@/components/user-info/UserListingHistory'
import getUser from '@/utils/getUser'
import { Metadata } from 'next'
import DisplayRatingSummary from '@/components/reviews/DisplayRatingSummary'
import { Review } from '@/utils/types'
import fetchReviewBySeller from '@/utils/fetchReviewBySeller'

export const metadata: Metadata = {
  title: 'Seller Overview - Bamboo Nest',
}

export default async function listing({
  params,
}: {
  params: {
    slug: string[]
  }
}) {
  const sellerID = params.slug[0]
  const { supabase } = await getUser()

  try {
    const { data, error } = await supabase
      .from('users')
      .select('first_name, last_name, bio, image_path, created_at')
      .eq('id', sellerID)

    if (error || !data || data.length === 0) {
      throw new Error('Error fetching data')
    }

    const reviewData: Review[] = await fetchReviewBySeller(supabase, sellerID)

    const { first_name, last_name, bio, image_path, created_at } = data[0]

    const fullName = `${first_name} ${last_name}`
    const items_for_sale: Item[] = await fetchItemsBySeller(supabase, sellerID)

    if (params.slug[1] == 'history') {
      return (
        <PageContainer>
          <h1>All Listings by {first_name}</h1>
          <ListingHistory id={sellerID} />
        </PageContainer>
      )
    }

    const sale_history: Item[] = await items_for_sale.filter(
      item => item.sold === true,
    )

    return (
      <PageContainer className="pb-2 gap-2 child:max-w-md ">
        <Image
          src={image_path || ''}
          alt={`${fullName}'s profile picture`}
          priority={true}
          width={200}
          height={200}
          className="border rounded-full object-cover aspect-square"
        />
        <div className="w-full pb-6 leading-relaxed">
          <h1 className="text-center">{fullName}</h1>
          <div className="flex gap-2 justify-center">
            <p className="text-foundation pb-6">
              {sale_history && sale_history.length} items sold
            </p>
            <DisplayRatingSummary reviewData={reviewData} sellerID={sellerID} />
          </div>
          <h2 className="font-medium">About {first_name}</h2>
          <p className="pb-6">
            {bio || `${first_name} hasn't added an about me yet.`}
          </p>
          <h2 className="font-medium">Member Since</h2>
          <p>{created_at ? created_at.split('T')[0] : 'N/A'}</p>
        </div>
        <WideBlueButton
          buttonTitle={`See All ${first_name}'s Items`}
          pageUrl={`${sellerID}/history`}
          className="w-full"
        />
        <WideBlueButton
          buttonTitle={`Message ${first_name}`}
          pageUrl=""
          className="w-full"
        />
      </PageContainer>
    )
  } catch (error) {
    console.error(error)
    return <p>Error loading data</p>
  }
}
