import { redirect } from 'next/navigation'
import getUser from '@/utils/getUser'
import newClient from '@/utils/createNewClient'
import PreviewImage from '@/components/UploadImage'
import { defaultProfileImage } from '@/utils/constants'
import FormFieldAndLabel from './FormFieldAndLabel'

export default async function UpdateForm() {
  const { user, supabase, userID } = await getUser()

  const { data: userInfo } = await supabase
    .from('users')
    .select()
    .eq('id', userID || '')

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
        <FormFieldAndLabel
          htmlForInput="First Name"
          labelName="First Name"
          inputType="text"
          inputName="First Name"
          inputPlaceholder={firstName?.length === 0 ? 'First Name' : firstName}
          required
        />
        <FormFieldAndLabel
          htmlForInput="Last Name"
          labelName="Last Name"
          inputType="text"
          inputName="Last Name"
          inputPlaceholder={lastName?.length === 0 ? 'Last Name' : lastName}
          required
        />

        <label htmlFor="Bio">About Me</label>
        <textarea
          className="bg-white rounded-md border border-foundation min-h-[150px] px-4 py-2 mb-6"
          name="Bio"
          placeholder={
            !bio || (bio && bio.length === 0) ? 'Tell us about yourself' : bio
          }
        />
        <label htmlFor="profile-picture">Profile Picture</label>
        <PreviewImage image_path={profilePicture || defaultProfileImage} />
        <button
          formAction={update}
          aria-label="Update your profile"
          className="px-4 py-2 mb-6 mt-4 bg-foundation text-white rounded-full"
        >
          Update
        </button>
      </form>
    </div>
  )
}
