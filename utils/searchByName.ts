'use server'
import newClient from '@/utils/createNewClient'

export default async function searchItem(name: string) {
  const supabase = newClient()

  const { data, error } = await supabase
    .from('items')
    .select()
    .ilike('name', `%${name}%`)

  if (!data || error) {
    return []
  }

  return data
}
