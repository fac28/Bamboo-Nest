import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'


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
    console.log(data)
    const {first_name, last_name, bio, sale_history, items_for_sale, profile_picture} = data[0]
    const fullName = `${first_name} ${last_name}`
    return (<>
    <div>
        <h1>{fullName}</h1>
        <img src={profile_picture&&profile_picture}></img>
    </div>
        <p>{bio}</p>
        <div>
            <p>{items_for_sale&&items_for_sale.length} items for sale</p>
            <button>see all</button>
        </div>
        <div>
            <p>{sale_history&&sale_history.length} items sold</p>
            <button>see all</button>
        </div>
    </>)
  } catch (error) {
    console.log(error)
    return <p>Error loading data</p>
  }
}
