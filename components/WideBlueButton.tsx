import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function WideBlueButton({
  buttonTitle,
  pageUrl,
}: {
  buttonTitle: string
  pageUrl: string
}) {
  return (
    <Button className="bg-primaryBlue text-white rounded-full">
      <Link href={pageUrl}>{buttonTitle}</Link>
    </Button>
  )
}
