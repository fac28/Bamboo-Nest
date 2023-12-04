import { Age, Category, Condition, SubCategory, ItemInfo } from '@/utils/types'
import { redirect } from 'next/navigation'
import SelectCategories from './CategoryDropDown'
import UploadItemSubmit from './SubmitItemButton'
import newClient from '@/utils/createNewClient'

const regexForOutCode =
  '[A-Za-z]{1,2}\\d[A-Za-z\\d]?|[A-Za-z]{2}\\d[A-Za-z\\d]?|[A-Za-z]\\d[A-Za-z\\d]?|[A-Za-z]{1,2}\\d{2}[A-Za-z]?|[A-Za-z]\\d{2}[A-Za-z]?'

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
    const image = formData.get('item-picture') as File
    const imageName = image.name

    const name = formData.get('item-name') as string
    const description = formData.get('item-description') as string
    const price = parseFloat(formData.get('item-price') as string)
    const age_category = parseInt(formData.get('age-groups') as string)
    const category_id = parseInt(formData.get('category') as string)
    const sub_category_id = parseInt(formData.get('sub-category') as string)
    const condition = parseInt(formData.get('condition') as string)
    const brand = formData.get('brand') as string
    const postcode = formData.get('postcode') as string

    const collectionValue: FormDataEntryValue | null = formData.get('can-collect')
    const collection: boolean = collectionValue === 'true';
    const deliveryValue: FormDataEntryValue | null = formData.get('can-deliver')
    const delivery: boolean = deliveryValue === 'true';

    const supabase = newClient()

    await supabase.storage
      .from('item-pictures')
      .upload(imageName, image, { upsert: true })

    const { data: publicUrl } = await supabase.storage
      .from('item-pictures')
      .getPublicUrl(imageName)

    const itemInfo : ItemInfo= {
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

    const { error } = await supabase.from('items').insert(itemInfo).select()

    if (error) {
      console.error(error)
    }
    return redirect('/search')
  }

  return (
    <div>
      <h1 className="text-center">Upload Item</h1>
      <form className="grid grid-cols-1 gap-2">
        <label htmlFor="item-name">
          Item Name:<span className="invalid:red-500">*</span>
        </label>
        <input
          className="rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue"
          name="item-name"
          id="item-name"
          placeholder="Item Name"
          required
          aria-required="true"
        ></input>
        <label htmlFor="item-description">
          Description:<span>*</span>
        </label>
        <input
          className="rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue"
          name="item-description"
          placeholder="Description"
          id="item-description"
          required
          aria-required="true"
        />
        <label htmlFor="item-price">
          Price:<span>*</span>
        </label>
        <input
          className="rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue"
          name="item-price"
          id="item-price"
          placeholder="Price"
          type="number"
          min="0"
          step="0.01"
          required
          aria-required="true"
        />
        <label htmlFor="age-groups">
          Age Group:<span>*</span>
        </label>
        <select
          name="age-groups"
          id="age-groups"
          className="rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue"
        >
          {ageGroups.map(ageGroup => (
            <option key={ageGroup.id} value={ageGroup.id}>
              {ageGroup.age_category}
            </option>
          ))}
        </select>
        <SelectCategories
          categories={categories}
          subCategories={subCategories}
          className={
            'rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue'
          }
        />
        <label htmlFor="item-condition">
          Condition:<span>*</span>
        </label>
        <select
          name="condition"
          id="condition"
          defaultValue=""
          className="rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue"
        >
          {conditions.map(condition => (
            <option key={condition.id} value={condition.id}>
              {condition.condition}
            </option>
          ))}
        </select>
        <label htmlFor="brand">
          Brand:<span>*</span>
        </label>
        <input
          name="brand"
          id="brand"
          placeholder="Brand"
          className="rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue"
        />
        <fieldset id="delivery" className="flex flex-wrap gap-2 p-0 pb-6">
          <legend className="pb-2">
            Delivery options<span>*</span>
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
        <label htmlFor="postcode">
          Please enter the first half of your postcode:<span>*</span>
        </label>
        <input
          className="invalid:bg-red-500 rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue"
          type="text"
          name="postcode"
          id="postcode"
          pattern={regexForOutCode}
          required
          aria-required="true"
        />
        <label htmlFor="item-picture">
          Add pictures of your item:<span>*</span>
        </label>
        <input
          type="file"
          id="item-picture"
          name="item-picture"
          accept="image/png, image/jpeg"
          required
          aria-required="true"
        />

        <UploadItemSubmit
          submit={submit}
          existsOnUsersTable={existsOnUsersTable}
          seller={seller}
        />
      </form>
    </div>
  )
}
