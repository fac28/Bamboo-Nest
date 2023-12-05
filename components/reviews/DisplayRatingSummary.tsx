import { Review } from '@/utils/types'

export default function DisplayRatingSummary({
  reviewData,
}: {
  reviewData: Review[]
}) {
  const averageScores =
    reviewData.reduce((acc, review) => {
      return acc + (review.review_score ? review.review_score : 0)
    }, 0) / reviewData.length

  return averageScores ? (
    <h2>Average Score: {averageScores.toFixed(2)}</h2>
  ) : (
    <div>
      <h2>No reviews yet</h2>
    </div>
  )
}
