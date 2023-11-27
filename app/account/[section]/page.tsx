import PageContainer from '@/components/PageContainer'
import UpdateForm from '@/components/form/UpdateProfile'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function listing({
  params,
}: {
  params: {
    section: string
    message: string
  }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const sections: { [key: string]: string } = {
    details: 'Personal Details',
    favorites: 'Favorites',
    purchases: 'Purchases',
    sold: 'Sold',
  }

  return user ? (
    <PageContainer>
      <h1>Your Account</h1>
      <h1>{sections[params.section]}</h1>
      <div>
        <UpdateForm />
      </div>
    </PageContainer>
  ) : (
    <PageContainer>
      <h1>Your Account</h1>
      <h1>{sections[params.section]}</h1>
      <Link href={'/login'}>Log in to see your account details</Link>
    </PageContainer>
  )
}
