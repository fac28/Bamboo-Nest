import fetchItemsByCategory from '@/utils/fetchItemsByCategory'
import fetchImage from '@/utils/fetchImage'
import PageContainer from '@/components/PageContainer'

export default async function Page({
  params,
}: {
  params: { category: string }
}) {
  const items = await fetchItemsByCategory(decodeURIComponent(params.category))
  for (const item of items) {
    item.image = await fetchImage(item.image_id)
  }

  return (
    <PageContainer>
      <div className="flex flex-col">
        <h1>{params.category.toUpperCase()}</h1>
        <div className="grid grid-cols-3 gap-4">
          {items.map(item => (
            <div className="bg-white shadow-md rounded-md p-4" key={item.name}>
              <h1 className="text-2xl font-bold">{item.name}</h1>
              <p className="text-xl">£{item.price}</p>
              <img
                src={item.image}
                width={200}
                height={200}
                alt={`image of ${item.name}`}
              />
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
