import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { slugField } from '../fields/slug'

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },

  admin: {
    group: 'Site',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    preview: ({ slug }) => `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/${slug}`,
  },

  versions: { drafts: true },

  fields: [
    {
      name: 'title',
      label: 'Titre',
      type: 'text',
      required: true,
    },

    slugField(),

    {
      name: 'template',
      label: 'Template',
      type: 'select',
      defaultValue: 'default',
      options: [{ label: 'Page standard', value: 'default' }],
      admin: { position: 'sidebar' },
    },

    {
      name: 'content',
      label: 'Contenu',
      type: 'richText',
      required: true,
      editor: lexicalEditor(),
    },

    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      admin: { description: 'Données pour <head> et les réseaux sociaux.' },
      fields: [
        {
          name: 'metaTitle',
          label: 'Meta title',
          type: 'text',
          validate: (val: any) => (val && val.length > 60 ? '60 caractères max.' : true),
        },
        {
          name: 'metaDescription',
          label: 'Meta description',
          type: 'textarea',
          validate: (val) => (val && val.length > 160 ? '160 caractères max.' : true),
        },
        {
          name: 'ogImage',
          label: 'Image Open Graph',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    {
      name: 'publishedAt',
      label: 'Date de publication',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
  ],
}

export default Pages
