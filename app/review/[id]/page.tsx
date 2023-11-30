import PageContainer from '@/components/PageContainer'
import { ReviewSeller } from '@/components/form/ReviewSeller'
import getUser from '@/utils/getUser'

export default async function Review({ params }: { params: { id: string } }) {

  const seller_id = params.id

  const { user } = await getUser()

  return user ? (
    <PageContainer>
      <div>
        <ReviewSeller seller_id={seller_id} />
      </div>
    </PageContainer>
  ) : (
    <PageContainer>
      <div>
        <h1>Log in to leave a review</h1>
      </div>
    </PageContainer>
  )
}
