import fetchAgeGroups from '@/utils/fetchAgeGroups'
import fetchCategories from '@/utils/fetchCategories'
import fetchConditions from '@/utils/fetchConditions'
import { InputField } from '@/components/form/InputField'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import PageContainer from '@/components/PageContainer'
import fetchSubCategories from '@/utils/fetchSubCategories'

export default async function Page() {
  const ageGroups = await fetchAgeGroups()
  const categories = await fetchCategories()
  const conditions = await fetchConditions()
  const subCategories = await fetchSubCategories()

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const user = await supabase.auth.getUser()
  const userId = (user && user.data?.user?.id) || ''
  const {data} = await supabase.from('users').select('first_name,last_name,bio').eq('id',userId)
  const existsOnUsersTable = data ? true : false
  return (
    <PageContainer>
      <InputField
        ageGroups={ageGroups}
        categories={categories}
        subCategories={subCategories}
        conditions={conditions}
        seller={userId}
        existsOnUsersTable={existsOnUsersTable}
      />
    </PageContainer>
  )
}
