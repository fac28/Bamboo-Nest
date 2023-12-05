import { Review } from '@/utils/types'

function generateStars(score: number | null) {
  if (score === null) {
    return null // or display some default value for no score
  }

  const stars = []
  for (let i = 0; i < score; i++) {
    stars.push(
      <span key={i} className="text-yellow-500">
        &#9733;
      </span>,
    )
  }
  return stars
}

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
    <div className="mb-2 flex flex-col gap-4">
      <h2 className="font-medium text-center pb-2 text-foundation">
        Average rating: {averageScores.toFixed(2)}/5
      </h2>
      {reviewData.map((review, index) => (
        <div
          key={index + 1}
          className="border border-foundation leading-relaxed  bg-white text-center p-4 rounded-md shadow-md gap-4"
        >
          <q>{review.comment}</q>
          <p>
            Rating: {review.review_score}/5
            {generateStars(
              review.review_score !== null
                ? Math.round(review.review_score)
                : null,
            )}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <h2>No reviews yet</h2>
    </div>
  )
}
