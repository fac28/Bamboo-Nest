import { Age, Category, Condition, SubCategory, ItemInfo } from '@/utils/types'
import { redirect } from 'next/navigation'
import newClient from '@/utils/createNewClient'
import { ItemSchema } from '@/utils/constants'
import getFormData from '@/utils/getFormData'
import TextFields from './TextFields'
import SelectionFields from './SelectionFields'
import PostcodeInput from './PostcodeInput'
import UploadItemSubmit from './SubmitItemButton'

export default async function AllInputFields({
  ageGroups,
  categories,
  subCategories,
  conditions,
  seller,
  existsOnUsersTable,
}: {
  ageGroups: Age[]
  categories: Category[]
  subCategories: SubCategory[]
  conditions: Condition[]
  seller: string
  existsOnUsersTable: boolean
}) {
  const submit = async (formData: FormData) => {
    'use server'

    let successFlag = false
    try {
      const {
        image,
        imageName,
        name,
        description,
        price,
        age_category,
        category_id,
        sub_category_id,
        condition,
        brand,
        postcode,
        collection,
        delivery,
      } = getFormData(formData, seller)

      const supabase = newClient()

      await supabase.storage
        .from('item-pictures')
        .upload(imageName, image, { upsert: true })

      const { data: publicUrl } = await supabase.storage
        .from('item-pictures')
        .getPublicUrl(imageName)

      const itemInfo: ItemInfo = {
        description,
        name,
        price,
        age_category,
        category_id,
        sub_category_id,
        condition,
        brand,
        delivery,
        collection,
        seller_id: seller,
        image_path: publicUrl.publicUrl,
        postcode: postcode,
      }

      const validatedItemInfo = ItemSchema.parse(itemInfo)
      console.log(validatedItemInfo)
      const { error } = await supabase.from('items').insert(itemInfo).select()

      if (error) {
        throw new Error(``)
      }
      successFlag = true
    } catch (error) {
      console.error(error)
    } finally {
      if (successFlag) {
        redirect('/search')
      }
    }
  }
  return (
    <div>
      <h1 className="text-center">Upload Item</h1>
      <form className="grid grid-cols-1 gap-2">
        <TextFields />
        <SelectionFields
          ageGroups={ageGroups}
          categories={categories}
          subCategories={subCategories}
          conditions={conditions}
        />
        <PostcodeInput />
        <UploadItemSubmit
          submit={submit}
          existsOnUsersTable={existsOnUsersTable}
          seller={seller}
        />
      </form>
    </div>
  )
}
