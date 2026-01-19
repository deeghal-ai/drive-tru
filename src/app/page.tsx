import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect root to English version
  redirect('/en')
}
