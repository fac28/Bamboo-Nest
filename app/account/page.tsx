import Link from 'next/link'
import PageContainer from '@/components/PageContainer'

export default async function Login() {
  return (
    <PageContainer>
      <h1> Your Account </h1>
      <div className="gap-4 grid grid-cols-2 grid-rows-2">
        <Link href="/">Favourites </Link>
        <Link href="/">Purchases </Link>
        <Link href="/">Sold </Link>
        <Link href="/">Personal Details </Link>
      </div>
    </PageContainer>
  )
}
