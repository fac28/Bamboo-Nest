import { Age, Category, Condition, SubCategory } from '@/utils/types'
import { redirect } from 'next/navigation'
import SelectCategories from './CategoryDropDown'
import UploadItemSubmit from './SubmitItemButton'
import newClient from '@/utils/createNewClient'
import { Tooltip } from '@nextui-org/react'
import { z } from "zod";

const regexForOutCode =
  '[A-Za-z]{1,2}\\d[A-Za-z\\d]?|[A-Za-z]{2}\\d[A-Za-z\\d]?|[A-Za-z]\\d[A-Za-z\\d]?|[A-Za-z]{1,2}\\d{2}[A-Za-z]?|[A-Za-z]\\d{2}[A-Za-z]?'
  
  export async function InputField({
    ageGroups,
    categories,
    subCategories,
    conditions,
    seller,
  existsOnUsersTable,
}:{
  ageGroups: Age[]
  categories: Category[]
  subCategories: SubCategory[]
  conditions: Condition[]
  seller: string
  existsOnUsersTable: boolean
}) {
  const submit = async (formData: FormData) => {
    'use server'
    try {
      const ItemSchema = z.object({
        name: z.string().max(50),
        description: z.string().max(500),
        price: z.number(),
        age_category: z.number(),
        category_id: z.number(),
        sub_category_id: z.number(),
        condition: z.number(),
        brand: z.string(),
        postcode: z.string().toUpperCase(),
        delivery: z.boolean(),
        collection: z.boolean(),
        seller_id: z.string(),
        image_path: z.string()
      })
      const image = formData.get('item-picture') as File
      const imageName = seller + image.name
      const name = formData.get('item-name') as string
      const description = formData.get('item-description') as string
      const price = parseFloat(formData.get('item-price') as string)
      const age_category = parseInt(formData.get('age-groups') as string)
      const category_id = parseInt(formData.get('category') as string)
      const sub_category_id = parseInt(formData.get('sub-category') as string)
      const condition = parseInt(formData.get('condition') as string)
      const brand = formData.get('brand') as string
      const postcode = formData.get('postcode') as string
      const delivery = formData.get('can-deliver')
      const deliveryBool = delivery ==='on' ? true : false
      const collection = formData.get('can-collect')
      const collectionBool = collection ==='on' ? true : false
      
      const supabase = newClient()
  
      await supabase.storage
        .from('item-pictures')
        .upload(imageName, image, { upsert: true })
  
      const { data: publicUrl } = await supabase.storage
        .from('item-pictures')
        .getPublicUrl(imageName)
  
      const itemInfo = {
        name,
        description,
        price,
        age_category,
        category_id,
        sub_category_id,
        condition,
        brand,
        delivery: deliveryBool,
        collection: collectionBool,
        seller_id: seller,
        image_path: publicUrl.publicUrl,
        postcode: postcode,
      }
      const validatedItemInfo = ItemSchema.parse(itemInfo)
      const { error } = await supabase.from('items').insert(validatedItemInfo).select()
      if (error) {
        console.error(error)
      }
      redirect('/search')
    } catch (error) {
      console.log('error')
      console.error(error)
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
            className="rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue"
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
            className="rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue"
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
        <Tooltip
          closeDelay={500}
          content="Enter a price for your item"
        >
          <input
            className="rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue"
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
        <label htmlFor="item-condition">Condition:</label>
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
          Brand:<span className="text-red-700"> *</span>
        </label>
        <input
          name="brand"
          id="brand"
          placeholder="Provide the brand of your item"
          className="rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue"
        />
        <Tooltip
          closeDelay={500}
          content="Please select at least one option"
        >
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
            className="invalid:bg-red-500 rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue"
            type="text"
            name="postcode"
            id="postcode"
            pattern={regexForOutCode}
            required
            aria-required="true"
          />
        </Tooltip>
        <label htmlFor="item-picture">
          Add pictures of your item:<span className="text-red-700"> *</span>
        </label>
        <Tooltip
          closeDelay={500}
          content="Upload an image of your item. Only .jpg & .png are accepted"
        >
          <input
            type="file"
            id="item-picture"
            name="item-picture"
            accept="image/png, image/jpeg"
            required
            aria-required="true"
          />
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
