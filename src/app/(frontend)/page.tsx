import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'

import '@styles/globals.css'
import BannerText from '@/components/custom/BannerText'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  return (
    <>
      <main className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <BannerText />
      </main>
    </>
  )
}
