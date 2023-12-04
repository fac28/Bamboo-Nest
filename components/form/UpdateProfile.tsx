import { redirect } from 'next/navigation'
import Image from 'next/image'
import getUser from '@/utils/getUser'
import newClient from '@/utils/createNewClient'

export default async function UpdateForm() {
  const { user, supabase } = await getUser()
  const userID = user?.id || ''

  const { data: userInfo } = await supabase
    .from('users')
    .select()
    .eq('id', userID)

  const firstName = userInfo?.[0]?.first_name || ''
  const lastName = userInfo?.[0]?.last_name || ''

  const bio = userInfo?.[0]?.bio
  const profilePicture = userInfo?.[0]?.image_path

  const update = async (formData: FormData) => {
    'use server'

    const firstNameNew = formData.get('First Name') as string
    const lastNameNew = formData.get('Last Name') as string
    const bioNew = formData.get('Bio') as string
    const profilePictureNew = formData.get('profile-picture') as File

    const supabase = newClient()

    const userID = user?.id || ''

    if (profilePictureNew.name === 'undefined') {
      await supabase
        .from('users')
        .upsert({
          id: userID,
          first_name: firstNameNew.length === 0 ? firstName : firstNameNew,
          last_name: lastNameNew.length === 0 ? lastName : lastNameNew,
          bio: bioNew.length === 0 ? bio : bioNew,
        })
        .select()
      return redirect('/account')
    }

    await supabase.storage
      .from('profile-pictures')
      .upload(profilePictureNew.name, profilePictureNew, { upsert: true })

    const { data: publicUrl } = await supabase.storage
      .from('profile-pictures')
      .getPublicUrl(profilePictureNew.name)

    await supabase
      .from('users')
      .upsert({
        id: userID,
        first_name: firstNameNew.length === 0 ? firstName : firstNameNew,
        last_name: lastNameNew.length === 0 ? lastName : lastNameNew,
        bio: bioNew.length === 0 ? bio : bioNew,
        image_path:
          profilePictureNew.name.length === 0
            ? profilePicture
            : publicUrl.publicUrl,
      })
      .select()

    return redirect('/account')
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <h1>Update your profile</h1>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label htmlFor="First Name">First Name</label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="First Name"
          placeholder={firstName?.length === 0 ? 'First Name' : firstName}
        />
        <label htmlFor="Last Name">Last Name</label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="Last Name"
          placeholder={lastName?.length === 0 ? 'Last Name' : lastName}
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
        <p>Your current picture</p>
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
