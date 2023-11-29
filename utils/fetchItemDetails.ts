/* eslint-disable  @typescript-eslint/no-explicit-any */
export default async function getItemDetails(
  supabase: any,
  column_name: string,
  user_id: string,
) {
  const { data } = await supabase
    .from('users')
    .select(column_name as '*')
    .eq('id', user_id)

  const itemIds: number[] = data && data[0][`${column_name}`]

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
