import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default async function UpdateForm() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: userInfo } = await supabase
    .from('users')
    .select()
    .eq('id', user?.id)

  const firstName = userInfo?.[0]?.first_name
  const lastName = userInfo?.[0]?.last_name

  const bio = userInfo?.[0]?.bio
  const profilePicture = userInfo?.[0]?.image_path

  const update = async (formData: FormData) => {
    'use server'

    const firstName = formData.get('First Name') as string
    const lastName = formData.get('Last Name') as string
    const bio = formData.get('Bio') as string
    const profilePicture = formData.get('profile-picture') as File

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    await supabase.storage
      .from('profile-pictures')
      .upload(profilePicture.name, profilePicture, { upsert: true })

    const { data: publicUrl } = await supabase.storage
      .from('profile-pictures')
      .getPublicUrl(profilePicture.name)

    await supabase
      .from('users')
      .upsert({
        id: user?.id,
        first_name: firstName,
        last_name: lastName,
        bio: bio,
        image_path: publicUrl.publicUrl,
      })
      .select()

    return redirect('/account')
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
          placeholder={firstName.length === 0 ? 'First Name' : firstName}
        />
        <label htmlFor="Last Name">Last Name</label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="Last Name"
          placeholder={lastName.length === 0 ? 'Last Name' : lastName}
        />
        <label htmlFor="Bio">About Me</label>
        <textarea
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="Bio"
          placeholder={
            !bio || (bio && bio.length === 0) ? 'Tell us about yourself' : bio
          }
        />
        <label htmlFor="profile-picture">Profile Picture</label>
        <p>Your current profile</p>
        <Image
          src={profilePicture || ''}
          width={100}
          height={100}
          alt={firstName}
        />
        <input
          type="file"
          id="profile-picture"
          name="profile-picture"
          accept="image/png, image/jpeg"
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
