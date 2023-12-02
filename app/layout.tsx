import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Providers } from './providers'
import 'normalize.css/normalize.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Bamboo Nest',
  description: 'leading baby clothing marketplace',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="text-foreground">
        <main className="bg-customBg min-h-screen flex flex-col">
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  )
}
