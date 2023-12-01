'use client'
export default function UploadItemSubmit({
  submit,
  existsOnUsersTable,
  seller,
}: {
  submit: (formData: FormData) => void
  existsOnUsersTable: boolean
  seller: string
}) {
  const formHandler = async (formData: FormData) => {
    if (existsOnUsersTable) {
      return submit(formData)
    }
    if (seller) {
      return alert('you need to update your details ')
    }
    return alert('you must be logged in to perform this action')
  }
  return (
    <button
      type="submit"
      formAction={formHandler}
      className="rounded-full px-4 py-2 border bg-primaryBlue border-primaryBlue my-6 text-white text-center italic focus:outline-primaryBlue"
    >
      Submit
    </button>
  )
}
