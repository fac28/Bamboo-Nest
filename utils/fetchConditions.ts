import newClient from '@/utils/createNewClient'

export default async function fetchConditions() {
  const supabase = newClient()

  const { data, error } = await supabase.from('conditions').select()

  if (error) {
    console.error(error)
    return []
  }
  return data
}
