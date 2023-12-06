import PageContainer from '@/components/global-layout/PageContainer'
import { ReviewSeller } from '@/components/forms/ReviewSeller'
import getUser from '@/utils/getUser'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Review - Bamboo Nest',
}

export default async function Review({ params }: { params: { id: string } }) {
  const seller_id = params.id

  const { user } = await getUser()

  return user ? (
    <PageContainer>
      <ReviewSeller seller_id={seller_id} />
    </PageContainer>
  ) : (
    <PageContainer>
      <h1>Log in to leave a review</h1>
    </PageContainer>
  )
}
