import fetchItemsByCategory from '@/utils/fetchItemsByCategory'
import PageContainer from '@/components/PageContainer'
import ItemCard from '@/components/ItemCard'
import getUser from '@/utils/getUser'

export default async function Page({
  params,
}: {
  params: { category: string }
}) {
  const items = await fetchItemsByCategory(decodeURIComponent(params.category))
  const { user, supabase } = await getUser()

  const userID = user ? user.id : ""
  const { data: favourites } = await supabase
    .from('users')
    .select('favourite_items')
    .eq('id', userID)

  const favouriteItems: number[] | null =
    favourites && favourites[0].favourite_items


  return (
    <PageContainer justify="justify-start">
      <div className="flex flex-col gap-4 py-16">
        <h1>{params.category}</h1>
        <div className="grid grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.item_id}>
              <ItemCard
                item={item}
                favouriteItems={favouriteItems}
                user={userID}
              />
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
