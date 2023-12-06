import ContactForm from '@/components/forms/ContactForm'
import PageContainer from '@/components/global-layout/PageContainer'
import nodemailer from 'nodemailer'
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
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    const { email: validatedEmail, message: validatedMessage } =
      ContactSchema.parse({ email, message })
    const mailOptions = {
      from: 'bamboonesttfb@gmail.com',
      to: 'bamboonesttfb@gmail.com',
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
    <PageContainer className="child:w-full child:max-w-md">
      <h1 className="text-center">Contact Page</h1>
      <ContactForm submit={submit}  />
    </PageContainer>
  )
}

  