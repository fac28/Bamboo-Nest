import { Tooltip } from '@nextui-org/react'

export default function TextFields() {
  return (
    <>
      <label htmlFor="item-name">
        Item Name:<span className="text-red-700"> *</span>
      </label>
      <Tooltip closeDelay={500} content="Max 50 characters">
        <input
          className="custom-input"
          name="item-name"
          id="item-name"
          placeholder="Provide the name of your item"
          type="text"
          required
          aria-required="true"
          aria-label=""
          maxLength={50}
        />
      </Tooltip>
      <label htmlFor="item-description">
        Description:<span className="text-red-700"> *</span>
      </label>
      <Tooltip closeDelay={500} content="Max 500 characters">
        <input
          className="custom-input"
          name="item-description"
          placeholder="Provide a description of your item"
          id="item-description"
          required
          aria-required="true"
          maxLength={500}
        />
      </Tooltip>
      <label htmlFor="item-price">
        Price:<span className="text-red-700"> *</span>
      </label>
      <Tooltip closeDelay={500} content="Enter a price for your item">
        <input
          className="custom-input"
          name="item-price"
          id="item-price"
          placeholder="£0.00"
          type="number"
          min="0"
          step="0.10"
          required
          aria-required="true"
        />
      </Tooltip>
      <fieldset className="child:p-2 pb-6 p-0">
        <input type="checkbox" name="rent-available" id="rent-available" />
        <label htmlFor="rent-available" className="text-foundation text-lg">
          Available for rent
        </label>
      </fieldset>
    </>
  )
}
