import fetchAgeGroups from '@/utils/fetchAgeGroups'
import fetchCategories from '@/utils/fetchCategories'
import fetchConditions from '@/utils/fetchConditions'
import AllInputFields from '@/components/forms/AllInputFields'
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

  const { user, supabase, userID } = await getUser()
  const { data } = await supabase
    .from('users')
    .select('first_name,last_name,bio')
    .eq('id', userID || '')
  const existsOnUsersTable = (data && data.length > 0 ? true : false) || false

  return (
    <PageContainer>
      {user ? (
        <AllInputFields
          ageGroups={ageGroups}
          categories={categories}
          subCategories={subCategories}
          conditions={conditions}
          seller={userID || ''}
          existsOnUsersTable={existsOnUsersTable}
        />
      ) : (
        <h1> Please Log in first </h1>
      )}
    </PageContainer>
  )
}
