import fetchItemsByCategory from '@/utils/fetchItemsByCategory'
import PageContainer from '@/components/PageContainer'
import Link from 'next/link'
import SearchPageItemCard from '@/components/SearchPageItemCard'

export default async function Page({
  params,
}: {
  params: { category: string }
}) {
  const items = await fetchItemsByCategory(decodeURIComponent(params.category))

  return (
    // <PageContainer justify =
    // 'justify-start' >
    // (
    //   <div className="flex flex-col gap-4 py-16">
    //     <Search placeholder={'Search all products'} onSearch={handleSearch} />{' '}
    //     {searchResults.length === 0 && (
    //       <div className="grid grid-cols-2 gap-4">
    //         {categories.map(category => (
    //           <SearchPageCategoryCard
    //             cardKey={category.category_name}
    //             linkHref={`/products/${category.category_name}`}
    //             cardName={category.category_name}
    //           />
    //         ))}
    //       </div>
    //     )}
    //     <div className="mt-4 grid grid-cols-2 gap-4">
    //       {searchResults.map(result => (
    //         <SearchPageItemCard
    //           linkHref={`item/${result.item_id}`}
    //           cardKey={result.id}
    //           cardName={result.name}
    //           cardPrice={result.price}
    //           cardImgSrc={result.image_path}
    //           cardImgAlt={result.name}
    //         />
    //       ))}
    //     </div>
    //   </div>
    //   ))
    // </PageContainer>

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

            // <Link href={`/item/${item.item_id}`} key={item.name}>
            //   <div className="bg-white shadow-md rounded-md p-4">
            //     <h1 className="text-2xl font-bold">{item.name}</h1>
            //     <p className="text-xl">£{item.price}</p>
            //     <img
            //       src={item.image_path}
            //       width={200}
            //       height={200}
            //       alt={`image of ${item.name}`}
            //     />
            //   </div>
            // </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
