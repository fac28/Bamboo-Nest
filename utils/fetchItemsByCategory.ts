import newClient from '@/utils/createNewClient'

export default async function fetchItemsByCategory(category: string) {
  const supabase = newClient()

  if (category.toLowerCase() === 'all') {
    const { data, error } = await supabase.from('items').select()

    if (!data || error) {
      return []
    }
    return data
  } else {
    const { data, error } = await supabase
      .from('categories')
      .select(`items(*)`)
      .eq('category_name', category)

    if (!data || error) {
      return []
    }

    return data[0].items
  }
}
