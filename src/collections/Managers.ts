// src/collections/Managers.ts
import type { CollectionConfig } from 'payload'

const Managers: CollectionConfig = {
  slug: 'managers',
  admin: {
    useAsTitle: 'email',
    group: 'Données emploi',
    defaultColumns: ['firstName', 'lastName', 'email', 'active'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          label: 'Prénom',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'lastName',
          label: 'Nom',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },

    {
      name: 'email',
      label: 'Adresse e-mail',
      type: 'email',
      required: true,
      admin: { width: '50%', description: 'Visible au public' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phonePublic',
          label: 'Téléphone',
          type: 'text',
          admin: { width: '33%', description: 'Visible au public' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'active',
          label: 'Actif',
          type: 'checkbox',
          defaultValue: true,
          admin: { width: '33%' },
        },
        {
          name: 'blocked',
          label: 'Bloqué',
          type: 'checkbox',
          defaultValue: false,
          admin: { width: '33%' },
        },
      ],
    },

    {
      name: 'privateNotes',
      label: 'Notes internes',
      type: 'array',
      admin: { width: '100%' },
      fields: [
        { name: 'note', label: 'Note', type: 'textarea', admin: { width: '100%' } },
        { name: 'date', label: 'Date', type: 'date', admin: { width: '33%' } },
        {
          name: 'addedBy',
          label: 'Par (admin)',
          type: 'relationship',
          relationTo: 'users',
          admin: { width: '66%' },
        },
      ],
    },
    //sidebar
    {
      type: 'group',
      name: 'contactPrivate',
      label: 'Contacts internes',
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'company',
          label: 'Entreprise',
          type: 'relationship',
          relationTo: 'companies',
          required: true,
          hasMany: false,
        },
        {
          name: 'function',
          label: 'Fonction',
          type: 'text',
          required: true,
        },
        {
          name: 'phonePrivate',
          label: 'Téléphone interne',
          type: 'text',
          required: false,
          admin: { width: '100%', description: 'Que pour les contacts internes' },
        },
        {
          name: 'emailPublic',
          label: 'E-mail interne',
          type: 'email',
          required: false,
          admin: { width: '50%' },
        },
      ],
    },
  ],
}

export default Managers
