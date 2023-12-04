import PageContainer from '@/components/PageContainer'
import UpdateForm from '@/components/form/UpdateProfile'
import Link from 'next/link'
import Purchase from '@/components/PurchaseHistory'
import Favourites from '@/components/Favourites'
import ListingHistory from '@/components/ListingHistory'
import getUser from '@/utils/getUser'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account Home - Bamboo Nest',
}

export default async function listing({
  params,
}: {
  params: {
    section: keyof typeof sections
    message: string
  }
}) {
  const { user } = await getUser()

  const sections = {
    details: { title: 'Personal Details', component: <UpdateForm /> },
    favourites: { title: 'Favourites', component: <Favourites /> },
    purchases: { title: 'Purchases', component: <Purchase /> },
    listings: { title: 'Listings', component: <ListingHistory /> },
  }

  return user ? (
    <PageContainer>
      <h1>Your Account</h1>
      <h2 className="text-xl">{sections[params.section].title}</h2>
      {sections[params.section].component}
    </PageContainer>
  ) : (
    <PageContainer>
      <h1>Your Account</h1>
      <h2 className="text-xl">{sections[params.section].title}</h2>
      <Link href={'/login'}>Log in to see your account details</Link>
    </PageContainer>
  )
}
