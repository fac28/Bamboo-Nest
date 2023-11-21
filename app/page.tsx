import Header from '@/components/Header';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

export default async function Index() {
  return (
    <div>
      <nav></nav>

      <div>
        <Header />
        <main>
          <Button color="danger">Buy</Button>
          <Link href="/">Sell</Link>
        </main>
      </div>

      <footer></footer>
    </div>
  );
}
