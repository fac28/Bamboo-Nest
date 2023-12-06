import fetchItemsBySeller from '@/utils/fetchItemsBySeller'
import { Review, ItemForListingPage } from '@/utils/types'
import ItemCard from '@/components/cards/ItemCard'
import getUser from '@/utils/getUser'
import DisplayReview from '@/components/reviews/DisplayReview'
import fetchReviewBySeller from '@/utils/fetchReviewBySeller'
import Accordion from '@/components/Accordion'

export default async function ListingHistory({ id = '' }) {
  const { supabase, userID } = await getUser()

  if (id === '') id = userID || ''

  let itemDetails: ItemForListingPage[] = []

  itemDetails = await fetchItemsBySeller(supabase, id)

  const reviewData: Review[] = await fetchReviewBySeller(supabase, id)

  return itemDetails.length > 0 ? (
    <div className="py-4 w-full">
      <Accordion title="Reviews">
        <DisplayReview reviewData={reviewData} />
      </Accordion>

      <Accordion title="All Listings">
        <div className="grid grid-cols-2 gap-4">
          {itemDetails.map(item => (
            <div key={item.item_id}>
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </Accordion>
    </div>
  ) : (
    <div>
      <h2>No items listed yet</h2>
    </div>
  )
}
