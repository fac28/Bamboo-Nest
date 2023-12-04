import { createClient } from '@/utils/supabase/server'

export default async function fetchItemsBySeller(
  supabase: ReturnType<typeof createClient>,
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
