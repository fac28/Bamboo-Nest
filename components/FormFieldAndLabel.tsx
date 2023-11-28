export default function FormFieldAndLabel({
  htmlForInput,
  labelName,
  inputType,
  inputName,
  inputPlaceholder,
  required = false,
}: {
  htmlForInput: string
  labelName: string
  inputType: string
  inputName: string
  inputPlaceholder: string
  required?: boolean
}) {
  return (
    <>
      <label className="text-md" htmlFor={htmlForInput}>
        {labelName}
        {required && <span className="text-red-500">&nbsp;*</span>}
      </label>
      <input
        className="rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic mb-10 focus:outline-primaryBlue"
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        required={required}
      />
    </>
  )
}
