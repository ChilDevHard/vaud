import { t } from '@/lib/i18n'

const rights = await t('all_rights_reserved', 'fr')
const designedForPeople = await t('designed_for_platform_people', 'fr')

export default function Footer() {
  return (
    <footer className="w-full bg-[#009B4D] text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 text-xs sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {rights}
        </p>
        <p>{designedForPeople}</p>
      </div>
    </footer>
  )
}
