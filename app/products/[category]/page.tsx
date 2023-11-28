import fetchItemsByCategory from '@/utils/fetchItemsByCategory'
import PageContainer from '@/components/PageContainer'
// import Link from 'next/link'
import SearchPageItemCard from '@/components/SearchPageItemCard'

export default async function Page({
  params,
}: {
  params: { category: string }
}) {
  const items = await fetchItemsByCategory(decodeURIComponent(params.category))

  return (
    <PageContainer justify="justify-start">
      <div className="flex flex-col gap-4 py-16">
        <h1>{params.category}</h1>
        <div className="grid grid-cols-2 gap-4">
          {items.map(item => (
            <SearchPageItemCard
              linkHref={`/item/${item.item_id}`}
              cardKey={item.name}
              cardName={item.name}
              cardPrice={item.price}
              cardImgSrc={item.image_path}
              cardImgAlt={`image of ${item.name}`}
            />
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
