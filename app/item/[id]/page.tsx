import { createClient } from '@/utils/supabase/server'
import { PostgrestError } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const itemQuery =
  'name,price,description,brand,delivery,collection, age(age_category), categories(category_name), conditions(condition,description)'

  type ItemType = {
    name: string;
    price: number;
    description: string;
    brand: string;
    delivery: boolean;
    collection: boolean;
    age: {
      age_category: string;
    };
    categories: {
      category_name: string;
    };
    conditions: {
      condition: string;
      description: string;
    };
  };

export default async function listing({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error }: { data: ItemType[] | null; error: PostgrestError } = await supabase
      .from('items')
      .select(itemQuery)
      .eq('item_id', params.id);

    if (error || !data) {
      throw new Error('Error fetching data');
    }

    const { name, price, description, brand, delivery, collection } = data && data[0];
    const age = data && data[0]?.age?.age_category;
    const condition = data && data[0]?.conditions?.condition;
    const conditionDescription = data && data[0]?.conditions?.description;
    const category = data && data[0]?.categories?.category_name;

    return (
      <>
        <h1>{name}</h1>
        <h2>Price £{price}</h2>
        <p>{description}</p>
        <p>Age category: {age}</p>
        <p>Brand: {brand}</p>
        <p>
          Postage options: {delivery && `post`} {collection && `collect`}
        </p>
        <p>Item condition: {condition}</p>
        <p>Item condition expanded: {conditionDescription}</p>
        <p>Item category: {category}</p>
      </>
    );
  } catch (error) {
    console.log(error);
    // Handle the error as needed
    return <p>Error loading data</p>;
  }
}
