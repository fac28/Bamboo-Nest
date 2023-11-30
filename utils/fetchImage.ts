'use server'
import newClient from '@/utils/createNewClient'

export default async function fetchImage(image_id: string) {
  if (!image_id) return null
  const supabase = newClient()

  const { data: allImagesData } = await supabase.storage
    .from('item-pictures')
    .list('')

  const imageName = allImagesData?.filter(
    singleImage => singleImage.id === image_id,
  )
  const { data } = await supabase.storage
    .from('item-pictures')
    .getPublicUrl(`${imageName && imageName[0].name}`)

  return data.publicUrl
}
