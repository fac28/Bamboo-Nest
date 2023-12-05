import { Age, Category, Condition, SubCategory, ItemInfo } from '@/utils/types'
import { redirect } from 'next/navigation'
import SelectCategories from './CategoryDropDown'
import UploadItemSubmit from './SubmitItemButton'
import newClient from '@/utils/createNewClient'
import { Tooltip } from '@nextui-org/react'
import { regexForOutCode, defaultImage } from '@/utils/constants'
import PreviewImage from '../UploadImage'
import { ItemSchema } from '@/utils/constants'
import getFormData from '@/utils/getFormData'

export async function InputField({
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
        delivery} = getFormData(formData, seller)

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
        throw new Error(`${error}`)
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
        <label htmlFor="item-name">
          Item Name:<span className="text-red-700"> *</span>
        </label>
        <Tooltip closeDelay={500} content="Max 50 characters">
          <input
            className="custom-input"
            name="item-name"
            id="item-name"
            placeholder="Provide the name of your item"
            type="text"
            required
            aria-required="true"
            aria-label=""
          />
        </Tooltip>
        <label htmlFor="item-description">
          Description:<span className="text-red-700"> *</span>
        </label>
        <Tooltip closeDelay={500} content="Max 500 characters">
          <input
            className="custom-input"
            name="item-description"
            placeholder="Provide a description of your item"
            id="item-description"
            required
            aria-required="true"
          />
        </Tooltip>
        <label htmlFor="item-price">
          Price:<span className="text-red-700"> *</span>
        </label>
        <Tooltip closeDelay={500} content="Enter a price for your item">
          <input
            className="custom-input"
            name="item-price"
            id="item-price"
            placeholder="0.00"
            type="number"
            min="0"
            step="0.01"
            required
            aria-required="true"
          />
        </Tooltip>
        <label htmlFor="age-groups">Age Group:</label>
        <select name="age-groups" id="age-groups" className="custom-input">
          {ageGroups.map(ageGroup => (
            <option key={ageGroup.id} value={ageGroup.id}>
              {ageGroup.age_category}
            </option>
          ))}
        </select>
        <SelectCategories
          categories={categories}
          subCategories={subCategories}
          className={'custom-input'}
        />
        <label htmlFor="item-condition">Condition:</label>
        <select
          name="condition"
          id="condition"
          defaultValue=""
          className="custom-input"
        >
          {conditions.map(condition => (
            <option key={condition.id} value={condition.id}>
              {condition.condition}
            </option>
          ))}
        </select>
        <label htmlFor="brand">
          Brand:<span className="text-red-700"> *</span>
        </label>
        <input
          name="brand"
          id="brand"
          placeholder="Provide the brand of your item"
          className="custom-input"
        />
        <Tooltip closeDelay={500} content="Please select at least one option">
          <fieldset id="delivery" className="flex flex-wrap gap-2 p-0 pb-6">
            <legend className="pb-2">
              Delivery options<span className="text-red-700"> *</span>
            </legend>
            <div className="child:p-2">
              <input type="checkbox" name="can-deliver" id="can-deliver" />
              <label htmlFor="can-deliver">Local Delivery</label>
            </div>
            <div className="child:p-2">
              <input type="checkbox" name="can-collect" id="can-collect" />
              <label htmlFor="can-collect">Collection</label>
            </div>
          </fieldset>
        </Tooltip>

        <label htmlFor="postcode">
          Please enter the first half of your postcode:
          <span className="text-red-700"> *</span>
        </label>
        <Tooltip
          closeDelay={500}
          content="Please enter the first half of a valid postcode e.g. SE14"
        >
          <input
            className="invalid:bg-red-500 custom-input"
            type="text"
            name="postcode"
            id="postcode"
            pattern={regexForOutCode}
            required
            aria-required="true"
          />
        </Tooltip>
        <label htmlFor="item-picture">
          Add a picture of your item:<span className="text-red-700"> *</span>
        </label>
        <Tooltip
          closeDelay={500}
          content="Upload an image of your item. Only .jpg & .png are accepted"
        >
          <PreviewImage image_path={defaultImage} item_picture={true} />
        </Tooltip>
        <UploadItemSubmit
          submit={submit}
          existsOnUsersTable={existsOnUsersTable}
          seller={seller}
        />
      </form>
    </div>
  )
}
