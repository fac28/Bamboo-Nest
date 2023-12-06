import newClient from '@/utils/createNewClient'

export default async function getUser() {
  const supabase = newClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userID = user?.id

  return { user, supabase, userID }

}
