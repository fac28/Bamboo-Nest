import ContactForm from '@/components/forms/ContactForm'
import emailHandler from '@/utils/emailHandler'
import { z } from 'zod'

export default await function ContactSeller({
  sellerID,
  fullName,
  sellerEmail,
}: {
  sellerID: string
  fullName: string
  sellerEmail: string
}) {
  async function submit(formData: FormData) {
    'use server'
    const ContactSchema = z.object({
      email: z.string().email(),
      message: z.string().max(500),
    })
    const email = formData.get('contact-email') as string
    const message = formData.get('contact-message') as string
    const { email: validatedEmail, message: validatedMessage } =
      ContactSchema.parse({ email, message })
    console.log(sellerID)
    if (sellerEmail) {
      emailHandler(sellerEmail, validatedMessage, validatedEmail)
    }
  }

  return (
    <>
      <h1>Get in touch with {fullName}</h1>
      <ContactForm submit={submit} />
    </>
  )
}
