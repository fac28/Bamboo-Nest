import { Review } from '@/utils/types'
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react'

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
    <Card className="mb-2">
      <CardHeader className="flex gap-3">
        <h2>Average Score: {averageScores.toFixed(2)}</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        {reviewData.map((review, index) => {
          return (
            <div key={index + 1}>
              <q>{review.comment}</q>
            </div>
          )
        })}
      </CardBody>
    </Card>
  ) : (
    <div>
      <h2>No reviews yet</h2>
    </div>
  )
}
