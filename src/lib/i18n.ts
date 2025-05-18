import { getPayload } from 'payload'
import config from '@/payload.config'

const cache = new Map<string, Record<string, string>>()

export async function t(key: string, locale: 'fr' | 'en' = 'fr'): Promise<string> {
  if (!cache.has(locale)) {
    const payload = await getPayload({ config })
    const all = await payload.find({
      collection: 'translations',
      depth: 0,
      limit: 9999,
    })
    const dict: Record<string, string> = {}
    all.docs.forEach((doc: any) => {
      dict[doc.key] = doc[locale]
    })
    cache.set(locale, dict)
  }
  return cache.get(locale)?.[key] ?? key
}
