import Search from "@/components/Search";
import fetchCategories from "@/utils/fetchCategories";

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <>
      <Search placeholder={"Search all products"} />
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div className="bg-white shadow-md rounded-md p-4">
            <h1 className="text-2xl font-bold">{category.category_name}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
