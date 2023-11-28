import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import PageContainer from '@/components/PageContainer'
import { ReviewSeller } from '@/components/form/ReviewSeller'

export default async function Review({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const seller_id = params.id

  const {
    data: { user },
  } = await supabase.auth.getUser()

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
