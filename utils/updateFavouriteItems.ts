import { createClient } from './supabase/client'

export default async function updateSupabaseFavouriteItems(
  user: string,
  updatedItems: number[],
) {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ favourite_items: updatedItems })
      .eq('id', user)
      .select()
    if (error || !data) {
      throw new Error('Error fetching data')
    }
  } catch (error) {
    console.error(error)
  }
}
