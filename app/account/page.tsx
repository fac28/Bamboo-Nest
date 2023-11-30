import Link from 'next/link'
import PageContainer from '@/components/PageContainer'
import getUser from '@/utils/getUser'

export default async function Login() {
  const { user } = await getUser()
  if (!user) {
    return (
      <PageContainer>
        <h1> Please Log in first </h1>
      </PageContainer>
    )
  }
  return (
    <PageContainer>
      <h1> Your Account </h1>
      <div className="gap-4 grid grid-cols-2 grid-rows-2">
        <Link href="/account/favourites">Favourites </Link>
        <Link href="/account/purchases">Purchases </Link>
        <Link href="/account/listings">All Listings </Link>
        <Link href="/account/details">Personal Details </Link>
      </div>
    </PageContainer>
  )
}
