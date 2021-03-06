import NextApp from 'next/app'
import Head from 'next/head'
import React from 'react'

import './styles/tailwind.css'

import './styles/index.css'

import './styles/devices/iphone.css'

import { AppGlobalStyles } from '../src/components/styles/AppGlobalStyles'
import { AuthProvider } from '../src/context/AuthContext'
import { PaddleLoaderProvider } from '../src/context/PaddleLoaderContext'
import { PlansProvider } from '../src/context/PlansContext'
import { StripeLoaderProvider } from '../src/context/StripeLoaderContext'
import { ThemeConsumer, ThemeProvider } from '../src/context/ThemeContext'

export default class App extends NextApp {
  onLoad() {
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        document.body.className = `${document.body.className} loaded`.trim()
      })
    }, 1000)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', this.onLoad)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('load', this.onLoad)
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <AuthProvider>
        <StripeLoaderProvider>
          <PaddleLoaderProvider>
            <ThemeProvider>
              <PlansProvider>
                <Head>
                  <title>DevHub | GitHub Notifications & Activities on your Desktop</title>
                </Head>

                <ThemeConsumer>
                  {({ theme }) => (
                    <div
                      className={theme.isDark ? 'dark-theme' : 'light-theme'}
                    >
                      <Component {...pageProps} />
                    </div>
                  )}
                </ThemeConsumer>
                <AppGlobalStyles />
              </PlansProvider>
            </ThemeProvider>
          </PaddleLoaderProvider>
        </StripeLoaderProvider>
      </AuthProvider>
    )
  }
}
