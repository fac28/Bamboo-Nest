import fetchItemsBySeller from '@/utils/fetchItemsBySeller'
import { ItemWithImage, Review } from '@/utils/types'
import ItemCard from '@/components/ItemCard'
import getUser from '@/utils/getUser'
import DisplayReview from '@/components/DisplayReview'
import fetchReviewBySeller from '@/utils/fetchReviewBySeller'

export default async function ListingHistory({ id = '' }) {
  const { user, supabase } = await getUser()
  const userID = (await user?.id) || ''

  if (id === '') id = userID

  const itemDetails: ItemWithImage[] = await fetchItemsBySeller(supabase, id)
  const reviewData: Review[] = await fetchReviewBySeller(supabase, id)

  return itemDetails.length > 0 ? (
    <div className="flex flex-col gap-4 py-16">
      <h1>Reviews you have received</h1>
      <DisplayReview reviewData={reviewData} />
      <h1>All Listings</h1>
      <div className="grid grid-cols-2 gap-4">
        {itemDetails.map(item => (
          <div key={item.item_id}>
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <h2>No items listed yet</h2>
    </div>
  )
}
