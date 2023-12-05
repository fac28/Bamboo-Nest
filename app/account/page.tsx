import Link from 'next/link'
import PageContainer from '@/components/global-layout/PageContainer'
import getUser from '@/utils/getUser'
import { Card } from '@nextui-org/react'
import { linkData } from '@/utils/constants'

export default async function Login() {
  const { user } = await getUser()
  if (!user) {
    return (
      <PageContainer>
        <h1> Please Login first </h1>
      </PageContainer>
    )
  }
  return (
    <PageContainer>
      <h1>Your Account</h1>
      <section className="w-full gap-4 grid lg:pt-8 lg:grid-cols-2 lg:grid-rows-2">
        {linkData.map(({ href, text }) => (
          <Link href={href} key={href}>
            <Card className="border-2 p-16 border-solid border-foundation rounded-3xl h-20 flex items-center justify-center ">
              <p className="text-foundation font-medium lg:text-xl">{text}</p>
            </Card>
          </Link>
        ))}
      </section>
    </PageContainer>
  )
}
