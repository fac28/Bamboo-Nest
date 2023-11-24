import fetchAgeGroups from '@/utils/fetchAgeGroups'
import fetchCategories from '@/utils/fetchCategories'
import fetchConditions from '@/utils/fetchConditions'
import PageContainer from '@/components/PageContainer'

export default async function Page() {
  const ageGroups = await fetchAgeGroups()
  const categories = await fetchCategories()
  const conditions = await fetchConditions()

  const submit = async (formData: FormData) => {
    'use server'

    const itemName = formData.get('item-name') as string
    const itemDescription = formData.get('item-description') as string
    const itemPrice = formData.get('item-price') as string
    const ageGroup = formData.get('age-groups') as string
    const category = formData.get('category') as string
    const condition = formData.get('condition') as string
    const brand = formData.get('brand') as string
    const canDeliver = formData.get('can-deliver') as string
    const canCollect = formData.get('can-collect') as string
    const location = formData.get('location') as string
    const itemPicture = formData.get('item-picture') as string

    const info = JSON.stringify({
      itemName,
      itemDescription,
      itemPrice,
      ageGroup,
      category,
      condition,
      brand,
      canDeliver,
      canCollect,
      location,
      itemPicture,
    })

    console.log(info)
  }

  return (
    <PageContainer>
      <div>
        <h1>Upload Item</h1>
        <form className="grid grid-cols-1 gap-2" action={submit}>
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
          <div>
            <input type="checkbox" name="can-deliver" id="can-deliver" />
            <label htmlFor="can-deliver">Available for delivery</label>
          </div>
          <div>
            <input type="checkbox" name="can-collect" id="can-collect" />
            <label htmlFor="can-collect">Available for collection</label>
          </div>
          <label htmlFor="avatar">Upload an item picture:</label>
          <label htmlFor="location">Location:</label>
          <input
            name="location"
            id="location"
            placeholder="Location"
            required
          />
          <input
            type="file"
            id="item-picture"
            name="item-picture"
            accept="image/png, image/jpeg"
          />
          <button>Submit</button>
        </form>
      </div>
    </PageContainer>
  )
}
