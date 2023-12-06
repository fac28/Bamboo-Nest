import ContactForm from '@/components/forms/ContactForm'
import { adminAuthClient } from '@/utils/supabase/admin'
import nodemailer from 'nodemailer'
import { z } from 'zod'

export default await function ContactSeller({
  sellerID,
}: {
  sellerID: string
}) {
  async function submit(formData: FormData) {
    'use server'
    const ContactSchema = z.object({
      email: z.string().email(),
      message: z.string().max(500),
    })
    const email = formData.get('contact-email') as string
    const message = formData.get('contact-message') as string
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    const { data } = await adminAuthClient.getUserById(sellerID)

    const sellerEmail = data && data.user && data.user.email

    const { email: validatedEmail, message: validatedMessage } =
      ContactSchema.parse({ email, message })
    const mailOptions = {
      from: 'bamboonesttfb@gmail.com',
      to: `${sellerEmail}`,
      subject: 'Bamboo Nest contact',
      text: validatedMessage,
      html: `<p>from: ${validatedEmail}</p>
      <p>message: ${validatedMessage}</p>`,
      replyTo: validatedEmail,
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Email sent: ' + info.response)
    })
  }

  return (
    <>
      <h1 className="text-center">Contact Page</h1>
      <ContactForm submit={submit} />
    </>
  )
}
