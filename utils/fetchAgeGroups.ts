import newClient from '@/utils/createNewClient'

export default async function fetchAgeGroups() {
  const supabase = newClient()

  const { data, error } = await supabase.from('age').select()

  if (error) {
    console.error(error)
    return []
  }
  return data
}
