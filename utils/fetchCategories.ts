'use server'
import newClient from '@/utils/createNewClient'

export default async function fetchCategories() {
  const supabase = newClient()

  const { data, error } = await supabase.from('categories').select()

  if (error) {
    console.error(error)
    return []
  }
  return data
}
