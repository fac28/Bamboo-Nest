import ClientPage from '../../components/SearchPageClient'
import getUser from '@/utils/getUser'

export default async function page() {
  const {user, supabase} = await getUser()

  const { data: favourites } = await supabase
    .from('users')
    .select('favourite_items')
    .eq('id', user && user.id)
  const favouriteItems: string[] | null =
    favourites && favourites[0].favourite_items
  const userID = user ? user.id : null
  return <ClientPage favouriteItems={favouriteItems} user={userID} />
}
