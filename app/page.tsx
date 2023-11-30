// import NavigationMenu from '@/components/NavigationMenu'

import CategoryCard from '@/components/CategoryCard'
import Link from 'next/link'
// import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
// import getItemDetails from '@/utils/fetchItemDetails'
import ItemCard from '@/components/ItemCard'

// import Header from '@/components/Header'

export default async function Index() {
  const cardTitle = [
    { title: 'Clothing' },
    { title: 'Feeding' },
    { title: 'Sleeping' },
    { title: 'Travelling' },
    { title: 'Cleaning' },
    { title: 'Playing' },
    { title: 'Monitoring' },
    { title: 'Other' },
  ]

  interface Item {
    item_id: number
    name: string
    price: number
    image_path: string
    brand: string
    // Add any other properties if necessary
  }

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: items } = await supabase
    .from('items')
    .select('item_id, name, price, image_path, brand')

  const itemDetails: Item[] = items || []

  return (
    <>
      <div className="h-60 relative lg:h-96">
        <div className="absolute inset-0 flex items-center justify-center mx-auto ">
          <h2 className="text-xl z-10 text-center text-black lg:text-5xl w-1/2">
            Rent, buy or sell your baby gear. A marketplace for you to rent, buy
            or sell pre-loved baby items locally.
          </h2>
        </div>
        <Image
          src="/grass-mint.jpg"
          alt="Description of the image"
          fill={true}
        />
      </div>
      <div className="max-w-5xl mx-auto ">
        <div className="flex justify-between px-8 pt-8 items-center">
          <p className="text-xl font-medium">Categories</p>
          <Link href={'/search'}>View More &#8594;</Link>
        </div>

        {/* <div className="p-8 cust-dotted-border-bottom"> */}
        <div className="p-8">
          <CategoryCard cardTitle={cardTitle} height="[50px]" />
        </div>

        <div className="flex justify-between px-8 pt-8 items-center">
          <p className="text-xl font-medium">Recently Listed</p>
          <Link href={'/Search'}>See more &#8594;</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-8">
          {itemDetails.slice(0, 4).map(item => (
            <div key={item.item_id}>
              <ItemCard
                linkHref={`/item/${item.item_id}`}
                cardName={item.name}
                cardPrice={item.price}
                cardImgSrc={item.image_path}
                cardImgAlt={`image of ${item.name}`}
                grid_direction={'grid-rows-2'}
                // seller_name={}
              />
            </div>
          ))}
        </div>

        {/* <div className="flex gap-4 w-500px p-8 ">
          <Link href="/search" className="w-full ">
            <Button className="text-white text-4xl w-full p-16 bg-primaryBlue border-4 border-solid border-primaryBlue rounded-full">
              Buy{' '}
            </Button>
          </Link>
          <Link href="/upload" className="w-full ">
            <Button className="text-primaryBlue text-4xl w-full p-16 bg-white border-4 border-solid border-primaryBlue rounded-full">
              Sell{' '}
            </Button>
          </Link>
        </div> */}
      </div>
      <footer></footer>
    </>
  )
}
