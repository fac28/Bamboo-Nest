'use client'
import { Button } from '@nextui-org/react'


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
    <Button type="submit" formAction={formHandler} className="bg-primaryBlue text-white rounded-full">
      Submit
    </Button>
  )
}
