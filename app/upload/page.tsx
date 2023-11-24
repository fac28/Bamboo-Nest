import fetchAgeGroups from '@/utils/fetchAgeGroups'
import fetchCategories from '@/utils/fetchCategories'
import fetchConditions from '@/utils/fetchConditions'
import { InputField } from '@/components/form/InputField'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import UploadImage from '@/components/UploadImage'
import PageContainer from '@/components/PageContainer'

export default async function Page() {
  const ageGroups = await fetchAgeGroups()
  const categories = await fetchCategories()
  const conditions = await fetchConditions()

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const user = await supabase.auth.getUser()
  const userId = (user && user.data?.user?.id) || ''

  return (
    <PageContainer>
      <UploadImage />
      <InputField
        ageGroups={ageGroups}
        categories={categories}
        conditions={conditions}
        seller={userId}
      />
    </PageContainer>
  )
}
