import Link from 'next/link'
import NotificationStripe from '@/components/custom/NotificationStripe'
import { t } from '@/lib/i18n'

const designedForPeople = await t('designed_for_platform_people', 'fr')
export default function Header() {
  return (
    <header className="w-full bg-[#009B4D] text-white shadow-md">
      <NotificationStripe />
      <nav className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Emploi Vaud
        </Link>

        {/* Menu */}
        <ul className="flex items-center gap-6 text-sm font-medium">
          <li>
            <Link href="/cgu" className="hover:opacity-90">
              CGU
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
