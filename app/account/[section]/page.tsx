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
    section: string
    message: string
  }
}) {
  const { user } = await getUser()

  const sections: { [key: string]: string } = {
    details: 'Personal Details',
    favourites: 'Favourites',
    purchases: 'Purchases',
    listings: 'Listings',
  }

  let component = null
  switch (params.section) {
    case 'details':
      component = <UpdateForm />
      break
    case 'favourites':
      component = <Favourites />
      break
    case 'purchases':
      component = <Purchase />
      break
    case 'listings':
      component = <ListingHistory />
      break
    default:
      break
  }

  return user ? (
    <PageContainer>
      <h1>Your Account</h1>
      <h2 className="text-xl">{sections[params.section]}</h2>
      {component}
    </PageContainer>
  ) : (
    <PageContainer>
      <h1>Your Account</h1>
      <h2 className="text-xl">{sections[params.section]}</h2>
      <Link href={'/login'}>Log in to see your account details</Link>
    </PageContainer>
  )
}
