export default function getFormData(formData: FormData, seller: string) {
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
  const rentValue: FormDataEntryValue | null = formData.get('rent-available')
  const rent_available: boolean = rentValue === 'on'
  const collectionValue: FormDataEntryValue | null = formData.get('can-collect')
  const collection: boolean = collectionValue === 'true'
  const deliveryValue: FormDataEntryValue | null = formData.get('can-deliver')
  const delivery: boolean = deliveryValue === 'true'
  return {
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
    rent_available,
  }
}
