import { createClient } from '@/utils/supabase/server'
import { Item } from '@/utils/types'

export default async function getItemDetails(
  supabase: ReturnType<typeof createClient>,
  column_name: 'purchase_history' | 'favourite_items',
  user_id: string,
) {
  const { data } = await supabase
    .from('users')
    .select(column_name as '*')
    .eq('id', user_id)

  if (!data || data.length === 0) {
    return []
  }

  const itemIds = data[0][`${column_name}`] ?? []

  const fetchedItems = await Promise.all(
    itemIds.map(async item_id => {
      const { data } = await supabase
        .from('items')
        .select('*')
        .eq('item_id', item_id)
      return data?.[0]
    }),
  )

  const items = fetchedItems.filter(
    (item: Item | undefined): item is Item => item !== undefined,
  )
  return items
}
