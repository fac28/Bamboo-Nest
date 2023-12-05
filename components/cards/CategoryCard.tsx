import { Card, CardHeader } from '@nextui-org/react'
import Link from 'next/link'

interface CardTitle {
  title: string
}

interface CategoryCardProps {
  cardTitle: CardTitle[]
  height: string
}

export default function CategoryCard({ cardTitle, height }: CategoryCardProps) {
  return (
    <div className="gap-4 grid grid-cols-3 lg:grid-cols-4 grid-rows-2">
      {cardTitle.map((item, index) => (
        <Link key={index} href={`/products/${encodeURIComponent(item.title)}`}>
          <Card
            className={`h-${height} border-2 border-solid border-foundation rounded-3xl hover:scale-95 transition-transform duration-300 transform origin-center`}
            key={index}
          >
            <CardHeader className="flex items-center justify-center h-full">
              <p className="text-sm font-medium lg:text-xl">{item.title}</p>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
