import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import { DarkModeContextProvider } from '../providers/DarkModeContextProvider'
import { AuthProvider } from '../contexts/AuthContext';
import { AuthGuard } from '../components/AuthGuard/AuthGuard';
import { NextPage } from 'next'
import { Header } from '../components/Header/Header'
export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean
}
export default function App(props: AppProps) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props
  const apolloClient = useApollo(pageProps)

  return  <ApolloProvider client={apolloClient}>
     <DarkModeContextProvider>
     <AuthProvider>
      <Header />
        {/* if requireAuth property is present - protect the page */}
        {Component.requireAuth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          // public page
          <Component {...pageProps} />
        )}
      </AuthProvider>
      </DarkModeContextProvider>
    </ApolloProvider>
}
