// import '../styles/globals.css'
// import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

import HomePage        from '@/components/HomePage'
import HomeDescription from '@/components/HomeDescription'
import TableHome       from '@/components/TableHomePage'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'


function MyApp() {
  return (
    <>
      <HomePage />
      <HomeDescription />
      <TableHome />
      <CTA />
      <Footer />
    </>
  )
}

export default MyApp
