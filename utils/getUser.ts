/* eslint-disable  @typescript-eslint/no-explicit-any */
import newClient from '@/utils/createNewClient'

export default async function getUser() {
  const supabase = newClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { user, supabase }
}
