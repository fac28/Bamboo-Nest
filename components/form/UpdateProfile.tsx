import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function UpdateForm() {
  const update = async (formData: FormData) => {
    'use server'

    const firstName = formData.get('First Name') as string
    const lastName = formData.get('Last Name') as string
    const bio = formData.get('Bio') as string

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    await supabase
      .from('users')
      .upsert({
        id: user?.id,
        first_name: firstName,
        last_name: lastName,
        bio: bio,
      })
      .select()

    return redirect('/signup?message=profile updated')
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <h1>Update your profile</h1>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label htmlFor="First Name">First Name</label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="First Name"
          placeholder="First Name"
          required
        />
        <label htmlFor="Last Name">Last Name</label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="Last Name"
          placeholder="Last Name"
          required
        />
        <label htmlFor="Bio">About Me</label>
        <textarea
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="Bio"
          placeholder="Write a little about yourself"
        />
        <button
          formAction={update}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
        >
          Update
        </button>
      </form>
    </div>
  )
}
