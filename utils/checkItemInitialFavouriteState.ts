export default async function checkItemInitialFavouriteState(
  favouriteItems: string[] | null | undefined,
  item_id: string,
) {
  return (favouriteItems ?? []).includes(item_id)
}
