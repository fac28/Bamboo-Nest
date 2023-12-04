import { createClient } from '@/utils/supabase/server'

export default async function fetchSellerName(
  supabase: ReturnType<typeof createClient>,
  seller_id: string,
) {
  const { data } = await supabase.from('users').select().eq('id', seller_id)
  if (data && data.length === 1) {
    const { first_name, last_name } = data[0]
    return first_name + ' ' + last_name
  } else {
    return 'Unknown'
  }
}
