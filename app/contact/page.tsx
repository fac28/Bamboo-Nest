import ContactForm from '@/components/forms/ContactForm'
import PageContainer from '@/components/global-layout/PageContainer'
import { contactEmail } from '@/utils/constants'
import emailHandler from '@/utils/emailHandler'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export default function ContactPage() {
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
    emailHandler(contactEmail, validatedMessage, validatedEmail)
    redirect('/')
  }

  return (
    <PageContainer className="child:w-full child:max-w-md">
      <h1 className="text-center">Contact Page</h1>
      <ContactForm submit={submit} />
    </PageContainer>
  )
}
