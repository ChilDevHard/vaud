import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@/components/layout/richtext'
import type { Page } from '../../../payload-types'

export default async function PageBySlug(props: { params: Promise<{ slug?: string }> }) {
  const params = await props.params
  if (!params?.slug) return notFound()

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: params.slug },
    },
    draft: false,
  })

  const page = docs?.[0] as Page | undefined

  if (!page) return notFound()

  return (
    <main className="prose max-w-none">
      <RichText data={page.content} />
    </main>
  )
}
