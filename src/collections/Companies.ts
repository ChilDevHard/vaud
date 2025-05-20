// src/collections/Companies.ts
import type { CollectionConfig } from 'payload'

const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'name',
    group: 'Données emploi',
    defaultColumns: ['name', 'tva', 'validated'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // --- Ligne 1 : Nom + Raison sociale + TVA + Code (50% + sidebar 50%) ---
    {
      type: 'row',

      fields: [
        {
          name: 'name',
          label: 'Nom de l’entreprise',
          type: 'text',
          required: true,
          admin: { width: '100%', description: 'Visible au public' },
        },
      ],
    },

    {
      type: 'group',
      name: 'general',
      label: 'General',
      admin: { width: '100%' },

      fields: [
        {
          type: 'row',

          fields: [
            {
              name: 'legalName',
              label: 'Raison sociale (forme légale)',
              type: 'text',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'tva',
              label: 'Numéro TVA',
              type: 'text',
              required: true,
              admin: { width: '50%', description: 'Visible au public' },
            },
          ],
        },
        {
          type: 'row',

          fields: [
            {
              name: 'code',
              label: 'Code interne',
              type: 'text',
              required: false,
              hooks: {
                beforeValidate: [
                  ({ value }) => {
                    if (!value) {
                      return `C${Math.random().toString(36).substr(2, 8).toUpperCase()}`
                    }

                    return value
                  },
                ],
              },
              admin: {
                position: 'sidebar',
                width: '50%',
                readOnly: true,
              },
            },
            {
              name: 'website',
              label: 'Website',
              type: 'text',
              required: false,
              admin: { width: '50%', description: 'Visible au public' },
            },
          ],
        },
        {
          name: 'description',
          label: 'Description de l’entreprise',
          type: 'textarea',
          admin: { width: '100%', description: 'Visible au public' },
        },
      ],
    },
    {
      type: 'group',
      name: 'address',
      label: 'Adresse légale',
      admin: { width: '100%' },

      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'street',
              label: 'Rue',
              type: 'text',
              required: true,
              admin: { width: '66%' },
            },
            {
              name: 'number',
              label: 'N°',
              type: 'text',
              required: true,
              admin: { width: '33%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'postcode',
              label: 'Code postal',
              type: 'text',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'city',
              label: 'Ville',
              type: 'text',
              required: true,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },

    // --- Ligne 3 : Description plein largeur ---

    {
      type: 'row',
      fields: [
        // --- Sidebar : Validation ---
        {
          name: 'validated',
          label: 'Vérifiée ?',
          type: 'checkbox',
          defaultValue: false,
          admin: { width: '20%' },
        },
        {
          name: 'validationNotice',
          label: 'Motif de validation',
          type: 'text',
          admin: { width: '40%' },
        },
        {
          name: 'validationDate',
          label: 'Date de validation',
          type: 'date',
          admin: { width: '40%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'blocked',
          label: 'Bloquée ?',
          type: 'checkbox',
          defaultValue: false,
          admin: { width: '25%' },
        },
        {
          name: 'blockReasons',
          label: 'Motifs de blocage',
          type: 'array',
          admin: { width: '75%' },
          fields: [
            {
              name: 'reason',
              label: 'Raison',
              type: 'text',
              admin: { width: '100%' },
            },
            {
              name: 'date',
              label: 'Date',
              type: 'date',
              admin: { width: '100%' },
            },
          ],
        },
      ],
    },

    // --- Sidebar : Contacts internes ---
    {
      type: 'group',
      name: 'contactPrivate',
      label: 'Contacts internes',
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'recruiters',
          label: 'Recruteurs rattachés',
          type: 'relationship',
          relationTo: 'managers',
          hasMany: true,
          admin: { width: '100%' },
        },
        { name: 'phone', label: 'Téléphone privé', type: 'text' },
        { name: 'email', label: 'E-mail privé', type: 'email' },
        { name: 'googleLink', label: 'Lien Google Maps', type: 'text' },
        {
          name: 'privateNotes',
          label: 'Notes internes',
          type: 'array',
          fields: [
            {
              name: 'note',
              label: 'Note',
              type: 'textarea',
              admin: { width: '100%' },
            },
            {
              name: 'date',
              label: 'Date',
              type: 'date',
              admin: { width: '50%' },
            },
            {
              name: 'addedBy',
              label: 'Par (admin)',
              type: 'relationship',
              relationTo: 'users',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
  ],
}

export default Companies
