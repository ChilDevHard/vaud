import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-[#009B4D] text-white shadow-md">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold lowercase tracking-tight">
          emploivaud
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
