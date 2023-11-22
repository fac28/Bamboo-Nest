import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import AuthButton from '@/components/AuthButton'

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
      <AuthButton />
      <div className="relative h-96">
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
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-4 w-500px px-8 py-4">
          <Button className="w-full p-16 bg-primaryBlue rounded-full">
            <Link href="/" className="text-white">
              Buy
            </Link>
          </Button>
          <Button className="w-full p-16 bg-white border-2 border-solid border-primaryBlue rounded-full">
            <Link href="/" className="text-primaryBlue">
              Sell
            </Link>
          </Button>
        </div>

        <div className="px-8 pb-8">
          <CategoryCard cardTitle={cardTitle} />
        </div>
      </div>
      <footer></footer>
    </>
  );
}
