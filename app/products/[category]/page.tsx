import fetchItemsByCategory from '@/utils/fetchItemsByCategory'
import fetchImage from '@/utils/fetchImage'
import PageContainer from '@/components/PageContainer'
import Link from 'next/link'

export default async function Page({
  params,
}: {
  params: { category: string }
}) {
  const items = await fetchItemsByCategory(decodeURIComponent(params.category))
  for (const item of items) {
    if (item.image_path) {
      item.image = item.image_path
    } else {
      item.image = await fetchImage(item.image_id)
    }
  }

  return (
    <PageContainer>
      <div className="flex flex-col">
        <h1>{params.category.toUpperCase()}</h1>
        <div className="grid grid-cols-3 gap-4">
          {items.map(item => (
            <Link href={`/item/${item.item_id}`} key={item.name}>
              <div className="bg-white shadow-md rounded-md p-4">
                <h1 className="text-2xl font-bold">{item.name}</h1>
                <p className="text-xl">£{item.price}</p>
                <img
                  src={item.image}
                  width={200}
                  height={200}
                  alt={`image of ${item.name}`}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
