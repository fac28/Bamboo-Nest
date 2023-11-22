import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Providers } from './providers'
import 'normalize.css/normalize.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Bamboo Nest',
  description: 'leading baby clothing marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-white text-foreground">
        <main className="min-h-screen flex flex-col">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  )
}
