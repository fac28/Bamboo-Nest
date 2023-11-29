'use client'
export default function UploadItemSubmit({
  submit,
  existsOnUsersTable,
  seller,
} : {
  submit: (formData: FormData) => void
  existsOnUsersTable: boolean
  seller: string
}) {
  const formHandler = async (formData: FormData) => {
    if (existsOnUsersTable) {
      return submit(formData)
    }
    if (seller) {
      return alert('you need to fill in this form first')
    }
    return alert('you must be logged in to perform this action')
  }
  return (
    <button type="submit" formAction={formHandler}>
      Submit
    </button>
  )
}
