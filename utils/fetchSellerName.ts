/* eslint-disable  @typescript-eslint/no-explicit-any */
export default async function fetchSellerName(supabase: any, seller_id: string) {
  const { data } = await supabase.from('users').select().eq('id', seller_id)
  const { first_name, last_name } = data && data[0]
  return first_name + ' ' + last_name
}
