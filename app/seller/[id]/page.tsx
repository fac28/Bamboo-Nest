import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'

export default async function listing({
  params,
}: {
  params: {
    id: string
  }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*') // Should change this to just relevant info to ensure we don't expose private info of seller to public
      .eq('id', params.id)
    if (error || !data || data.length === 0) {
      throw new Error('Error fetching data')
    }
    const {
      first_name,
      last_name,
      bio,
      sale_history,
      items_for_sale,
      profile_picture,
    } = data[0]
    const fullName = `${first_name} ${last_name}`

    const { data: allImagesData } = await supabase.storage
      .from('profile-pictures')
      .list('')
    const imageName = allImagesData?.filter(
      singleImage => singleImage.id === profile_picture,
    )
    const { data: publicUrl } = await supabase.storage
      .from('profile-pictures')
      .getPublicUrl(`${imageName && imageName[0].name}`)
    return (
      <>
        <div>
          <h1>{fullName}</h1>
          <Image
            src={publicUrl.publicUrl}
            alt={`${fullName}'s avatar photo`}
            width={300}
            height={300}
          />
        </div>
        <p>{bio}</p>
        <div>
          <p>{items_for_sale && items_for_sale.length} items for sale</p>
          {/* want to add a card or list of cards here with most recent items */}
          <button>see all</button>
        </div>
        <div>
          <p>{sale_history && sale_history.length} items sold</p>
          {/* want to add a card or list of cards here with most recent items */}
          <button>see all</button>
        </div>
      </>
    )
  } catch (error) {
    console.log(error)
    return <p>Error loading data</p>
  }
}
