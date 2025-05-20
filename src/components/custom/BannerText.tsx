import { t } from '@/lib/i18n'

const slogan = await t('transparency_slogan', 'fr')

export default function BannerText() {
  return (
    <div className="banner-text py-8 text-center">
      <h1 className="text-3xl font-['Helvetica'] font-light mb-4">{slogan}</h1>
    </div>
  )
}
