import PageContainer from '@/components/global-layout/PageContainer'
import nodemailer from 'nodemailer'
const tailwindForInputs =
  'rounded-full px-4 py-2 bg-white border border-primaryBlue mb-6 text-center italic focus:outline-primaryBlue'

export default function ContactPage() {
  async function submit(formData: FormData) {
    'use server'
    const email = formData.get('contact-email') as string
    const message = formData.get('contact-message') as string
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Define the email content
    const mailOptions = {
      from: 'bamboonesttfb@gmail.com',
      to: 'bamboonesttfb@gmail.com',
      subject: 'Bamboo Nest contact',
      text: message,
      html: `<p>from: ${email}</p>
      <p>message: ${message}</p>`,
      replyTo: email,
    }
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Email sent: ' + info.response)
    })
  }

  return (
    <PageContainer>
      <h1>Contact Page</h1>
      <form className="grid grid-cols-1 gap-2">
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
          placeholder="What would you like to let us know"
          className={tailwindForInputs}
          name="contact-message"
          id="contact-message"
        />
        <button type="submit" formAction={submit}>
          Submit
        </button>
      </form>
    </PageContainer>
  )
}
