import CategoryCard from '@/components/CategoryCard'
import Link from 'next/link'
import Image from 'next/image'
import ItemCard from '@/components/ItemCard'
import newClient from '@/utils/createNewClient'
import { cardTitle } from '@/utils/constants'
import { ItemForHomePage } from '@/utils/types'

// import Header from '@/components/Header'

export default async function Index() {
  const supabase = newClient()

  const { data: items } = await supabase
    .from('items')
    .select('item_id, name, price, image_path, brand')

  const itemDetails: ItemForHomePage[] = items || []

  return (
    <>
      <div className="h-60 relative lg:h-96 flex flex-col items-center justify-center">
        <h1 className="text-xl z-10 text-center text-black mb-4 lg:text-5xl">
          Rent, buy or sell your baby gear.
        </h1>

        <h2 className="text-xl z-10 text-center text-black lg:text-5xl w-1/2">
          A marketplace for you to rent, buy or sell pre-loved baby items
          locally.
        </h2>
        <Image
          src="/grass-mint.jpg"
          // src="/customgreen.png"
          alt="Description of the image"
          fill={true}
        />
      </div>
      <div className="max-w-5xl mx-auto pb-6">
        <div className="flex justify-between px-8 pt-8 items-center">
          <p className="text-xl font-medium">Categories</p>
          <Link href={'/search'} className="hover:opacity-30">
            View More &#8594;
          </Link>
        </div>

        {/* <div className="p-8 cust-dotted-border-bottom"> */}
        <div className="p-8">
          <CategoryCard cardTitle={cardTitle} height="[50px]" />
        </div>

        <div className="flex justify-between px-8 pt-8 items-center">
          <p className="text-xl font-medium">Recently Listed</p>
          <Link href={'/search'} className="hover:opacity-30">
            See more &#8594;
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-8">
          {itemDetails.slice(0, 4).map(item => (
            <div key={item.item_id}>
              <ItemCard
                item={item}
                grid_direction={'grid-rows-2'}
                background_colour={'bg-white'}
                // backgroundImg={'/grad_17.png'}
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
