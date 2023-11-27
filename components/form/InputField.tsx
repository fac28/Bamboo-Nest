import { Age, Category, Condition } from '@/utils/types'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function InputField({
  ageGroups,
  categories,
  conditions,
  seller,
}: {
  ageGroups: Age[]
  categories: Category[]
  conditions: Condition[]
  seller: string
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
    const condition = parseInt(formData.get('condition') as string)
    const brand = formData.get('brand') as string
    const delivery = formData.get('can-deliver')
    delivery === 'on' ? true : false
    const collection = formData.get('can-collect')
    collection === 'on' ? true : false

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

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
      condition,
      brand,
      delivery,
      collection,
      seller_id: seller,
      image_path: publicUrl.publicUrl,
    }

    const { error } = await supabase.from('items').insert(itemInfo).select()

    if (error) {
      console.error(error)
    }

    return redirect('/search')
  }

  return (
    <div>
      <h1>Upload Item</h1>
      <form className="grid grid-cols-1 gap-2">
        <label htmlFor="item-name">Item Name:</label>
        <input
          name="item-name"
          id="item-name"
          placeholder="Item Name"
          required
        ></input>
        <label htmlFor="item-description">Description:</label>
        <input
          name="item-description"
          placeholder="Description"
          id="item-description"
          required
        ></input>
        <label htmlFor="item-price">Price:</label>
        <input
          name="item-price"
          id="item-price"
          placeholder="price"
          type="number"
          min="0"
          step="0.01"
          required
        ></input>
        <label htmlFor="age-group">Age Group:</label>
        <select name="age-groups" id="age-groups">
          {ageGroups.map(ageGroup => (
            <option key={ageGroup.id} value={ageGroup.id}>
              {ageGroup.age_category}
            </option>
          ))}
        </select>
        <label htmlFor="item-category">Category:</label>
        <select name="category" id="category">
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
        <label htmlFor="item-condition">Condition:</label>
        <select name="condition" id="condition">
          {conditions.map(condition => (
            <option key={condition.id} value={condition.id}>
              {condition.condition}
            </option>
          ))}
        </select>
        <label htmlFor="brand">Brand:</label>
        <input name="brand" id="brand" placeholder="Brand"></input>
        <fieldset id="delivery">
          <legend>Choose your delivery options</legend>
          <input type="checkbox" name="can-deliver" id="can-deliver" />
          <label htmlFor="can-deliver">Available for delivery</label>
          <input type="checkbox" name="can-collect" id="can-collect" />
          <label htmlFor="can-collect">Available for collection</label>
        </fieldset>
        <label htmlFor="item-picture">Select an item picture:</label>
        <input
          type="file"
          id="item-picture"
          name="item-picture"
          accept="image/png, image/jpeg"
        />
        <button type="submit" formAction={submit}>
          Submit
        </button>
      </form>
    </div>
  )
}
