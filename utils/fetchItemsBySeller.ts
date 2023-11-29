/* eslint-disable  @typescript-eslint/no-explicit-any */
export default async function fetchItemsBySeller(
  supabase: any,
  seller_id: string,
) {
  const { data, error } = await supabase
    .from('items')
    .select()
    .eq('seller_id', seller_id)

  if (!data || error) {
    return []
  }

  return data
}
