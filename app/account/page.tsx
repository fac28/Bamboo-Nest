import Link from 'next/link'
import PageContainer from '@/components/PageContainer'
import getUser from '@/utils/getUser'
import { Card } from '@nextui-org/react'
import { linkData } from '@/utils/constants'

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
      <h1>Your Account</h1>
      <div className="w-full gap-4 grid lg:grid-cols-2 lg:grid-rows-2">
        {linkData.map(({ href, text }) => (
          <Link href={href} key={href}>
            <Card className="border-2 p-16 border-solid border-primaryBlue rounded-3xl h-20 flex items-center justify-center ">
              {/* <CardHeader className="flex items-center justify-center h-full"> */}
              <h4 className="text-primaryBlue font-medium lg:text-xl">
                {text}
              </h4>
              {/* </CardHeader> */}
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}
