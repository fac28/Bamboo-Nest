import nodemailer from 'nodemailer'

export default function emailHandler(
  emailTo: string,
  validatedMessage: string,
  userEmail: string,
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
  const mailOptions = {
    from: 'bamboonesttfb@gmail.com',
    to: `${emailTo}`,
    subject: 'Bamboo Nest contact',
    text: validatedMessage,
    html: `<p>from: ${userEmail}</p>
      <p>message: ${validatedMessage}</p>`,
    replyTo: userEmail,
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Email sent: ' + info.response)
  })
}
