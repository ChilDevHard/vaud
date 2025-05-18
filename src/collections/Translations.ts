/* ───── src/collections/translations.ts ─────
   Une simple table clé-valeur multilingue            */

import { CollectionConfig } from 'payload'

export const Translations: CollectionConfig = {
  slug: 'translations',
  admin: {
    description: 'Clé unique + valeurs par langue.  Modifiable depuis le back-office.',
    useAsTitle: 'key',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      label: 'Identifiant',
    },
    {
      name: 'fr',
      type: 'text',
      label: 'Français',
      required: true,
    },
    {
      name: 'en',
      type: 'text',
      label: 'English',
      required: false,
    },
    // Ajoute d’autres langues si besoin…
  ],
}
