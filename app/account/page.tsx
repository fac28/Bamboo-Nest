import Link from 'next/link'
import PageContainer from '@/components/PageContainer'
import getUser from '@/utils/getUser'
import { Card, CardHeader } from '@nextui-org/react'

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
        <Link href="/account/favourites">
          <Card
            className={`border-2 border-solid border-primaryBlue rounded-3xl h-20`}
          >
            <CardHeader className="flex items-center justify-center h-full">
              <h4 className="text-sm text-primaryBlue font-medium lg:text-xl">
                Favourites
              </h4>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/account/purchases">
          <Card
            className={`border-2 border-solid border-primaryBlue rounded-3xl h-20`}
          >
            <CardHeader className="flex items-center justify-center h-full">
              <h4 className="text-sm text-primaryBlue font-medium lg:text-xl">
                Purchases
              </h4>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/account/listings">
          <Card
            className={`border-2 border-solid border-primaryBlue rounded-3xl h-20`}
          >
            <CardHeader className="flex items-center justify-center h-full">
              <h4 className="text-sm text-primaryBlue font-medium lg:text-xl">
                All Listings
              </h4>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/account/details">
          <Card
            className={`border-2 border-solid border-primaryBlue rounded-3xl h-20`}
          >
            <CardHeader className="flex items-center justify-center h-full">
              <h4 className="text-sm text-primaryBlue font-medium lg:text-xl">
                Personal Details
              </h4>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </PageContainer>
  )
}
