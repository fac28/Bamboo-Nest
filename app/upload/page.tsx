import fetchAgeGroups from '@/utils/fetchAgeGroups'
import fetchCategories from '@/utils/fetchCategories'
import fetchConditions from '@/utils/fetchConditions'
import { InputField } from '@/components/form/InputField'

export default async function Page() {
  const ageGroups = await fetchAgeGroups()
  const categories = await fetchCategories()
  const conditions = await fetchConditions()

  return (
    <div>
      <InputField
        ageGroups={ageGroups}
        categories={categories}
        conditions={conditions}
      />
    </div>
  )
}
