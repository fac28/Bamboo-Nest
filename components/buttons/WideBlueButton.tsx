import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function WideBlueButton({
  buttonTitle,
  pageUrl,
  className,
}: {
  buttonTitle: string
  pageUrl: string
  className?: string
}) {
  return (
    <Button
      className={`bg-foundation text-white rounded-full ${className || ''}`}
    >
      <Link href={pageUrl}>{buttonTitle}</Link>
    </Button>
  )
}
