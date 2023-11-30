'use server'
import newClient from '@/utils/createNewClient'

export default async function fetchSubCategories() {
  const supabase = newClient()

  const { data, error } = await supabase.from('sub_categories').select('*')
  if (error) {
    console.error(error)
    return []
  }
  return data
}
