import PageContainer from '@/components/global-layout/PageContainer'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const tailwindForInputs =
  'rounded-full px-4 py-2 bg-white border border-foundation mb-6 text-center italic focus:outline-foundation'

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
      <form className="grid grid-cols-1 gap-2 ">
        <label htmlFor="contact-email">Email</label>
        <input
          placeholder="example@example.com"
          className={tailwindForInputs}
          type="email"
          name="contact-email"
          id="contact-email"
          required
        />
        <label htmlFor="contact-message">Message</label>
        <textarea
          placeholder="How can we help?"
          className={`rounded-xl min-h-[150px] ${tailwindForInputs}`}
          name="contact-message"
          id="contact-message"
        />
        <button
          type="submit"
          formAction={submit}
          className="bg-foundation text-white px-4 py-2 border border-foundation rounded-full hover:opacity-80"
        >
          Submit
        </button>
      </form>
    </PageContainer>
  )
}
