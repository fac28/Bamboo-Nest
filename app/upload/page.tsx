import fetchAgeGroups from '@/utils/fetchAgeGroups'
import fetchCategories from '@/utils/fetchCategories'
import fetchConditions from '@/utils/fetchConditions'
import { InputField } from '@/components/form/InputField'
import PageContainer from '@/components/PageContainer'
import fetchSubCategories from '@/utils/fetchSubCategories'
import getUser from '@/utils/getUser'

export default async function Page() {
  const ageGroups = await fetchAgeGroups()
  const categories = await fetchCategories()
  const conditions = await fetchConditions()
  const subCategories = await fetchSubCategories()

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
