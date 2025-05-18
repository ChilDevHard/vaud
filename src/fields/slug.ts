import type { Field } from 'payload'
import slugify from 'slugify'

export const slugField = (): Field => ({
  name: 'slug',
  label: 'Slug',
  type: 'text',
  unique: true,
  index: true,
  admin: { position: 'sidebar' },
  hooks: {
    beforeValidate: [
      ({ value, siblingData }) =>
        slugify(value || siblingData?.title || '', {
          lower: true,
          strict: true,
        }),
    ],
  },
})
