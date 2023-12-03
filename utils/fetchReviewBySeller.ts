import { createClient } from '@/utils/supabase/server'

export default async function fetchReviewBySeller(
  supabase: ReturnType<typeof createClient>,
  sellerId: string,
) {
  const { data: reviewData, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('seller_id', sellerId)
  if (!reviewData || error) {
    return []
  }
  return reviewData
}
