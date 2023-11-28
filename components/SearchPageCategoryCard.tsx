import Link from 'next/link'

export default function SearchPageCategoryCard({
  cardKey,
  linkHref,
  cardName,
}: {
  cardKey: string
  linkHref: string
  cardName: string
}) {
  return (
    <Link
      key={cardKey}
      href={linkHref}
      className="bg-white shadow-md rounded-2xl border border-primaryBlue p-16"
    >
      <p className="text-2xl font-medium text-center text-primaryBlue">
        {cardName}
      </p>
    </Link>
  )
}
