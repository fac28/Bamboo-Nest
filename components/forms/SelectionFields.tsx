import { Age, Category, Condition, SubCategory } from '@/utils/types'
import SelectCategories from './CategoryDropDown'
import { Tooltip } from '@nextui-org/react'
import { defaultImage } from '@/utils/constants'
import PreviewImage from '../UploadImage'

export default function SelectionFields({
  ageGroups,
  categories,
  subCategories,
  conditions,
}: {
  ageGroups: Age[]
  categories: Category[]
  subCategories: SubCategory[]
  conditions: Condition[]
}) {
  return (
    <>
      <label htmlFor="item-picture">
        Add a picture of your item:<span className="text-red-700"> *</span>
      </label>
      <Tooltip
        closeDelay={500}
        content="Upload an image of your item. Only .jpg & .png are accepted"
      >
        <PreviewImage image_path={defaultImage} item_picture={true} />
      </Tooltip>

      <label htmlFor="age-groups" className="mt-6">
        Age Group:
      </label>
      <select name="age-groups" id="age-groups" className="custom-input">
        {ageGroups.map(ageGroup => (
          <option key={ageGroup.id} value={ageGroup.id}>
            {ageGroup.age_category}
          </option>
        ))}
      </select>
      <SelectCategories
        categories={categories}
        subCategories={subCategories}
        className={'custom-input'}
      />
      <label htmlFor="item-condition">Condition:</label>
      <select
        name="condition"
        id="condition"
        defaultValue=""
        className="custom-input"
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
        className="custom-input"
      />
      <Tooltip closeDelay={500} content="Please select at least one option">
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
    </>
  )
}
