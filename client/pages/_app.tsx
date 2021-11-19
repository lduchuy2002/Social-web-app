import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import Providers from './Provider'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof document !== undefined) {
      import('bootstrap')
    }
  }, [])
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
