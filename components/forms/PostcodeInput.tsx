import { regexForOutCode } from '@/utils/constants'
import { Tooltip } from '@nextui-org/react'

export default function PostcodeInput() {
  return (
    <>
      <label htmlFor="postcode">
        Please enter the first half of your postcode:
        <span className="text-red-700"> *</span>
      </label>
      <Tooltip
        closeDelay={500}
        content="Please enter the first half of a valid postcode e.g. SE14"
      >
        <input
          className="invalid:bg-red-500 invalid:border-red-500 focus:invalid:outline-white focus:valid:outline-foundation custom-input"
          type="text"
          name="postcode"
          id="postcode"
          pattern={regexForOutCode}
          required
          aria-required="true"
        />
      </Tooltip>
    </>
  )
}
