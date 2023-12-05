import { Review } from '@/utils/types'
import Link from 'next/link'

export default function DisplayRatingSummary({
  reviewData,
  sellerID,
}: {
  reviewData: Review[]
  sellerID: string
}) {
  const averageScores =
    reviewData.reduce((acc, review) => {
      return acc + (review.review_score ? review.review_score : 0)
    }, 0) / reviewData.length

  return averageScores ? (
    <Link href={`${sellerID}/history`}>
      <p className="hover:no-underline underline opacity-70">
        Rating: {averageScores.toFixed(2)}/5{' '}
        <span className="text-yellow-500">&#9733;</span>
      </p>
    </Link>
  ) : (
    <p>No reviews yet</p>
  )
}
