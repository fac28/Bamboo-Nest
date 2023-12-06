import Link from 'next/link'
import PageContainer from '@/components/global-layout/PageContainer'


export default function NotFound() {
  return (
    <PageContainer>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </PageContainer>
  )
}
