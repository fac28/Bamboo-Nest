import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import getUser from '@/utils/getUser'

export default async function AuthButton() {
  const { user, supabase } = await getUser()

  const { data } = await supabase
    .from('users')
    .select('first_name')
    .eq('id', user?.id)

  const userName = (data && data[0].first_name) || 'User'

  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/login')
  }

  if (!user)
    return (
      <Link
        href="/login"
        className="margin-left-auto py-2 px-3 flex border-2 border-solid border-primaryBlue rounded-full no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        Login
      </Link>
    )

  return (
    <div className="flex items-center gap-4 margin-left-auto">
      Hey, {userName}!
      <form action={signOut}>
        <button className="py-2 px-4 border-2 border-solid border-primaryBlue rounded-full no-underline bg-btn-background  hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  )
}
