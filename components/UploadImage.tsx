import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default function UploadImage() {
  const submit = async (formData: FormData) => {
    'use server'
    const image = formData.get('item-picture') as File

    const imageName = image.name

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.storage
      .from('item-pictures')
      .upload(imageName, image, { upsert: true })

    if (error) {
      console.log(error)
    }

    const { data: publicUrl } = await supabase.storage
      .from('item-pictures')
      .getPublicUrl(imageName)

    console.log(publicUrl)

    return redirect('/search')
  }

  return (
    <form>
      <label htmlFor="item-picture">Select an item picture:</label>
      <input
        type="file"
        id="item-picture"
        name="item-picture"
        accept="image/png, image/jpeg"
      />
      <button type="submit" formAction={submit}>
        Upload
      </button>
    </form>
  )
}
