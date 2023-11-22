import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import Image from 'next/image';

export default async function Index() {
  const cardTitle = [
    { title: 'Cots' },
    { title: 'Toys' },
    { title: 'Clothes' },
    { title: 'Buggies' },
  ];
  return (
    <>
      <Header />

      <div className="relative h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="z-10 text-center">
            Bamboo Nest is the leading baby clothing marketplace, buy or sell.
          </h2>
        </div>
        <Image
          src="/tumbleweed.png"
          alt="Description of the image"
          fill={true}
          // layout="fill"
          // objectFit="cover"
        />
      </div>

      <div>
        <Button color="danger" className="w-1/2">
          <Link href="/">Buy</Link>
        </Button>
        <Button color="danger" className="w-1/2">
          <Link href="/">Sell</Link>
        </Button>
      </div>

      <div>
        <CategoryCard cardTitle={cardTitle} />
      </div>

      <footer></footer>
    </>
  );
}
