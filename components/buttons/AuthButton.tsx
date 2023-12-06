import Link from 'next/link'
import { redirect } from 'next/navigation'
import getUser from '@/utils/getUser'
import newClient from '@/utils/createNewClient'

export default async function AuthButton() {
  const { user, supabase, userID } = await getUser()

  const { data } = await supabase
    .from('users')
    .select('first_name')
    .eq('id', userID || '')

  const userName = (data && data[0] && data[0].first_name) || 'User'

  const signOut = async () => {
    'use server'

    const supabase = newClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  if (!user)
    return (
      <Link
        href="/login"
        className="margin-left-auto py-2 px-3 flex border-2 border-solid border-foundation rounded-full no-underline bg-white hover:bg-btn-background-hover"
      >
        Login
      </Link>
    )

  return (
    <div className="flex items-center gap-4 margin-left-auto">
      Hey, {userName}!
      <form action={signOut}>
        <button className="py-2 px-4 border-2 border-solid border-foundation rounded-full no-underline bg-btn-background  hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  )
}
