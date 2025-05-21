import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'

import '@styles/globals.css'
import BannerText from '@/components/custom/BannerText'
import { t } from '@/lib/i18n'
const transparency_slogan = await t('transparency_slogan', 'fr')

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  return (
    <>
      <main className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <BannerText slogan={`${transparency_slogan}`} />
      </main>
    </>
  )
}
