import CategoryCard from '@/components/cards/CategoryCard'
import Link from 'next/link'
import Image from 'next/image'
import ItemCard from '@/components/cards/ItemCard'
import newClient from '@/utils/createNewClient'
import { cardTitle } from '@/utils/constants'
import { ItemForHomePage } from '@/utils/types'

export default async function Index() {
  const supabase = newClient()

  const { data: items } = await supabase
    .from('items')
    .select('item_id, name, price, image_path, brand')

  const itemDetails: ItemForHomePage[] = items || []

  return (
    <>
      <section className="h-60 relative lg:h-96 flex flex-col items-center justify-center">
        <h1 className="text-xl z-10 text-center text-black mb-4 lg:text-5xl">
          Rent, buy or sell your baby gear.
        </h1>

        <h2 className="text-xl z-10 text-center text-black lg:text-5xl w-1/2">
          A marketplace for you to rent, buy or sell pre-loved baby items
          locally.
        </h2>
        <Image
          src="/grass-mint.jpg"
          alt="Pink and mint green background gradient for decorative purposes"
          fill={true}
          priority={true}
        />
      </section>

      <section className="max-w-5xl mx-auto pb-6">
        <div className="flex justify-between px-8 pt-8 items-center">
          <h3 className="text-xl font-medium">Categories</h3>
          <Link href={'/search'} className="hover:opacity-30">
            Search all categories &#8594;
          </Link>
        </div>

        <div className="p-8">
          <CategoryCard cardTitle={cardTitle} height="[50px]" />
        </div>

        <div className="flex justify-between px-8 pt-8 items-center">
          <h3 className="text-xl font-medium">Current Listings</h3>
          <Link href={'/search'} className="hover:opacity-30">
            View more listings &#8594;
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-8">
          {itemDetails.slice(0, 4).map(item => (
            <div key={item.item_id}>
              <ItemCard
                item={item}
                grid_direction={'grid-rows-2'}
                background_colour={'bg-white'}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
