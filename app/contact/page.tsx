import PageContainer from '@/components/PageContainer'
import nodemailer from 'nodemailer'

export default function ContactPage() {
  async function submit(formData: FormData) {
    'use server'
    const email = formData.get('contact-email') as string
    const message = formData.get('contact-message') as string
    const subject = formData.get('contact-subject') as string
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
      to: 'jesandfordsmith@gmail.com',
      subject: subject,
      text: message,
      html: `<p>${message}</p>`,
      replyTo: email
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
      <form>
        <label htmlFor="contact-email">Email</label>
        <input type="email" name='contact-email' id="contact-email" />
        <label htmlFor="contact-subject">subject</label>
        <input type="text" name="contact-subject" id="contact-subject" />
        <label htmlFor="contact-message">Message</label>
        <input type="text" name="contact-message" id="contact-message" />
        <button type="submit" formAction={submit}>
          Submit
        </button>
      </form>
    </PageContainer>
  )
}
