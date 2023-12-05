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
        className="custom-input"
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        required={required}
      />
    </>
  )
}
