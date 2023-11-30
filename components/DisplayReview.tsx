import { Review } from '@/utils/types'

export default function DisplayReview({
  reviewData,
}: {
  reviewData: Review[]
}) {
  const averageScores =
    reviewData.reduce((acc, review) => {
      return acc + (review.review_score ? review.review_score : 0)
    }, 0) / reviewData.length

  return averageScores ? (
    <div>
      <h2>Average Score: {averageScores}</h2>
      {reviewData.map((review, index) => {
        return (
          <div key={index + 1}>
            <p>{review.comment}</p>
          </div>
        )
      })}
    </div>
  ) : (
    <div>
      <h2>No reviews yet</h2>
    </div>
  )
}
