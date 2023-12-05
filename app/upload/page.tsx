import fetchAgeGroups from '@/utils/fetchAgeGroups'
import fetchCategories from '@/utils/fetchCategories'
import fetchConditions from '@/utils/fetchConditions'
import { InputField } from '@/components/forms/InputField'
import PageContainer from '@/components/global-layout/PageContainer'
import fetchSubCategories from '@/utils/fetchSubCategories'
import getUser from '@/utils/getUser'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upload Listing - Bamboo Nest',
}

export default async function Page() {
  const [ageGroups, categories, conditions, subCategories] = await Promise.all([
    fetchAgeGroups(),
    fetchCategories(),
    fetchConditions(),
    fetchSubCategories(),
  ])

  const { user, supabase } = await getUser()
  const userId = user?.id || ''
  const { data } = await supabase
    .from('users')
    .select('first_name,last_name,bio')
    .eq('id', userId)
  const existsOnUsersTable = (data && data.length > 0 ? true : false) || false

  return (
    <PageContainer>
      {user ? (
        <InputField
          ageGroups={ageGroups}
          categories={categories}
          subCategories={subCategories}
          conditions={conditions}
          seller={userId}
          existsOnUsersTable={existsOnUsersTable}
        />
      ) : (
        <h1> Please Log in first </h1>
      )}
    </PageContainer>
  )
}
