import { createClient } from '@/utils/supabase/server'

export default async function getItemDetails(
  supabase: ReturnType<typeof createClient>,
  column_name: 'purchase_history' | 'favourite_items',
  user_id: string,
) {
  const { data } = await supabase
    .from('users')
    .select(column_name as '*')
    .eq('id', user_id)

    const itemIds: number[] = data?.[0][`${column_name}`] ?? []

  if (itemIds) {
    const itemDetails = await Promise.all(
      itemIds &&
        itemIds.map(async item_id => {
          const { data } = await supabase
            .from('items')
            .select('*')
            .eq('item_id', item_id)
          return data && data[0]
        }),
    )
    return itemDetails
  }
  return []
}
