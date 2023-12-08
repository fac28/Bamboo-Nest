import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function WideFoundationButton({
  buttonTitle,
  pageUrl,
  className,
}: {
  buttonTitle: string
  pageUrl: string
  className?: string
}) {
  return (
    <Link
      href={pageUrl}
      className={`bg-foundation text-white text-center rounded-full ${
        className || ''
      }`}
    >
      <Button
        className={`bg-foundation text-white rounded-full ${className || ''}`}
      >
        {buttonTitle}
      </Button>
    </Link>
  )
}
