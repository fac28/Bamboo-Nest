import Link from 'next/link'
import PageContainer from '@/components/PageContainer'

export default async function Login() {
  return (
    <PageContainer>
      <h1> Your Account </h1>
      <div className="gap-4 grid grid-cols-2 grid-rows-2">
        <Link href="/account">Favourites </Link>
        <Link href="/account/purchases">Purchases </Link>
        <Link href="/account">Sold </Link>
        <Link href="/account/details">Personal Details </Link>
      </div>
    </PageContainer>
  )
}
