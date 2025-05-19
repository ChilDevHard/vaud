// src/collections/JobOffers.ts
import type { CollectionConfig, CollectionSlug } from 'payload'

const JobOffers: CollectionConfig = {
  slug: 'jobOffers',
  admin: {
    useAsTitle: 'title',
    group: 'Données emploi',
    defaultColumns: ['title', 'company', 'modeOfWork', 'createdAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // entreprise + lieu (2 colonnes)
    {
      name: 'company',
      label: 'Entreprise',
      type: 'relationship',
      relationTo: 'companies' as CollectionSlug,
      required: true,
      admin: { width: '50%' },
    },
    {
      type: 'group',
      name: 'location',
      label: 'Lieu de travail',
      admin: { width: '50%' },
      fields: [
        { name: 'address', label: 'Adresse', type: 'text', admin: { width: '100%' } },
        {
          name: 'postcode',
          label: 'Code postal',
          type: 'text',
          admin: { width: '33%' },
        },
        { name: 'city', label: 'Commune', type: 'text', admin: { width: '66%' } },
      ],
    },

    // titre + contrat + mode
    {
      name: 'title',
      label: 'Intitulé du poste',
      type: 'text',
      required: true,
      admin: { width: '50%' },
    },
    {
      name: 'modeOfWork',
      label: 'Mode de travail',
      type: 'select',
      options: [
        { label: 'Sur place', value: 'on-site' },
        { label: 'Hybride', value: 'hybrid' },
        { label: 'À distance', value: 'remote' },
      ],
      admin: { width: '50%' },
    },

    // taux d’occupation
    {
      type: 'group',
      name: 'occupancy',
      label: "Taux d'occupation (%)",
      admin: { width: '33%' },
      fields: [
        { name: 'min', label: 'Min %', type: 'number', admin: { width: '50%' } },
        { name: 'max', label: 'Max %', type: 'number', admin: { width: '50%' } },
      ],
    },

    // salaire
    {
      type: 'group',
      name: 'salary',
      label: 'Fourchette salariale (CHF)',
      admin: { width: '66%' },
      fields: [
        { name: 'min', label: 'Min', type: 'number', admin: { width: '33%' } },
        { name: 'max', label: 'Max', type: 'number', admin: { width: '33%' } },
        { name: 'class', label: 'Classe', type: 'number', admin: { width: '17%' } },
        { name: 'classLink', label: 'Grille (URL)', type: 'text', admin: { width: '17%' } },
      ],
    },

    // descriptifs (plein largeur)
    {
      name: 'description',
      label: 'Description du poste',
      type: 'richText',
      admin: { width: '100%' },
    },
    { name: 'requirements', label: 'Exigences', type: 'richText', admin: { width: '100%' } },
    { name: 'requirementsPlus', label: 'Atouts', type: 'richText', admin: { width: '100%' } },

    // étape de recrutement & manager
    {
      name: 'hiringSteps',
      label: 'Étapes de recrutement',
      type: 'array',
      admin: { width: '50%' },
      fields: [
        { name: 'stepName', label: 'Étape', type: 'text', admin: { width: '50%' } },
        { name: 'dueDate', label: 'Date butoir', type: 'date', admin: { width: '25%' } },
        { name: 'completed', label: 'Terminée ?', type: 'checkbox', admin: { width: '25%' } },
        { name: 'comments', label: 'Commentaires', type: 'textarea', admin: { width: '100%' } },
      ],
    },
    {
      name: 'manager',
      label: 'Responsable',
      type: 'relationship',
      relationTo: 'managers' as CollectionSlug,
      required: true,
      admin: { width: '50%' },
    },
  ],
}

export default JobOffers
