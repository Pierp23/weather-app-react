import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Weather App',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true} className={inter.className}>{children}</body>
    </html>
  )
}