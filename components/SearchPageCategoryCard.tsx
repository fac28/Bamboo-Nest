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
      className="bg-white shadow-md rounded-md p-4"
    >
      <h1 className="text-2xl font-bold">{cardName}</h1>
    </Link>
  )
}
