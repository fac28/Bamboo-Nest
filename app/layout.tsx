import { DM_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import 'normalize.css/normalize.css'
import Header from '@/components/global-layout/nav/Header'
import Footer from '@/components/global-layout/Footer'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Bamboo Nest',
  description: 'Rent, buy or sell your baby gear',
  icons: {
    icon: '/icon.png',
  },
}

const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={dm_sans.className}>
      <body className="text-foreground">
        <main className="bg-background min-h-screen flex flex-col">
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
