import { Card, CardHeader } from '@nextui-org/react'

interface CardTitle {
  title: string
}

interface CategoryCardProps {
  cardTitle: CardTitle[]
}

export default function CategoryCard({ cardTitle }: CategoryCardProps) {
  return (
    <div className="gap-4 grid grid-cols-2 grid-rows-2 ">
      {cardTitle.map((item, index) => (
        <Card
          className="h-[200px] border-2 border-solid border-primaryBlue rounded-3xl"
          key={index}
        >
          <CardHeader className="flex items-center justify-center h-full">
            <h4 className="text-primaryBlue font-medium text-large">
              {item.title}
            </h4>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
