import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export default function Page () {

  const submit = async (formData: FormData) => {
    'use server'

    const image = formData.get('item-picture') as File

    const imageName = image.name

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.storage
      .from('item-pictures')
      .upload(imageName, image, {upsert: true})

    if (error) {
      console.log(error)
    }

  }

  return (
    <form>
      <label htmlFor="item-picture">Upload an item picture:</label>
      <input
        type="file"
        id="item-picture"
        name="item-picture"
        accept="image/png, image/jpeg"
      />
      <button type="submit" formAction={submit}>Submit</button>
    </form>
  )
}
