import { z } from 'zod'

export const linkData = [
  { href: '/account/favourites', text: 'Favourites' },
  { href: '/account/purchases', text: 'Purchases' },
  { href: '/account/listings', text: 'All Listings' },
  { href: '/account/details', text: 'Personal Details' },
]

export const cardTitle = [
  { title: 'Clothing' },
  { title: 'Feeding' },
  { title: 'Sleeping' },
  { title: 'Travelling' },
  { title: 'Cleaning' },
  { title: 'Playing' },
  { title: 'Monitoring' },
  { title: 'Other' },
]

export const regexForOutCode =
  '[A-Za-z]{1,2}\\d[A-Za-z\\d]?|[A-Za-z]{2}\\d[A-Za-z\\d]?|[A-Za-z]\\d[A-Za-z\\d]?|[A-Za-z]{1,2}\\d{2}[A-Za-z]?|[A-Za-z]\\d{2}[A-Za-z]?'

export const defaultImage = '/default-product-image.png'
export const defaultProfileImage = '/default-avatar.png'

export const ItemSchema = z.object({
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
  image_path: z.string(),
})
