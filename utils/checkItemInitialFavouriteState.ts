export default async function checkItemInitialFavouriteState(
  favouriteItems: string[] | unknown,
  item_id: string,
) {
  if (!Array.isArray(favouriteItems)) return false
  const initialIsFavourite: boolean = favouriteItems
    ? favouriteItems.includes(parseInt(item_id))
    : false
  return initialIsFavourite
}
