import { ReduxProvider } from '@/redux/ReduxProvider'

import AlertPopUp from '@/components/AlertPopUp/AlertPopUp'

import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import './globals.scss'

const inter = Inter({ subsets: ['cyrillic'] })

export const metadata: Metadata = {
  title: 'Конструктор калькулятора',
  description:
    'Приложение Next.js, с использованием стека: [typescript, redux, dnd-kit]',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <ReduxProvider>
        <body className={inter.className}>
          <AlertPopUp />
          {children}
        </body>
      </ReduxProvider>
    </html>
  )
}
