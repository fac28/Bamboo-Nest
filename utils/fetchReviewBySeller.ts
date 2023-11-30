/* eslint-disable  @typescript-eslint/no-explicit-any */

export default async function fetchReviewBySeller(supabase: any, sellerId: string) {
  const {data: reviewData, error} = await supabase.from('reviews').select('*').eq('seller_id', sellerId)
  if (!reviewData || error) {
    return []
  }
  return reviewData
  }
