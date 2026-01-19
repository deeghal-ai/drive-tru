import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Drive Life - Pre-owned Cars UAE',
  description: 'Find your perfect certified pre-owned car in UAE',
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const isRTL = params.locale === 'ar'
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabic' : ''}>
      <Header locale={params.locale} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer locale={params.locale} />
    </div>
  )
}

// Generate static params for both locales
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}
