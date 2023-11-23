import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export default async function fetchImage(image_id: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: allImagesData } = await supabase.storage
      .from('item-pictures')
      .list('')
    console.log(allImagesData)
    const imageName = allImagesData?.filter(
      singleImage => singleImage.id === image_id,
    )
    console.log(imageName)
    const { data } = await supabase.storage
      .from('item-pictures')
      .getPublicUrl(`${imageName && imageName[0].name}`)

  return data.publicUrl
}
