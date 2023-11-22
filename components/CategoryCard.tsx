import {
  Card,
  CardHeader,
} from '@nextui-org/react';

interface CardTitle {
  title: string;
}

interface CategoryCardProps {
  cardTitle: CardTitle[];
}

export default function CategoryCard({ cardTitle }: CategoryCardProps) {
  return (
    <div className="max-w-[900px] gap-2 grid grid-cols-2 grid-rows-2 ">
      {cardTitle.map((item, index) => (
        <Card className="h-[300px]" key={index}>
          <CardHeader className="flex items-center justify-center h-full">
            <h4 className="text-black font-medium text-large">{item.title}</h4>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
