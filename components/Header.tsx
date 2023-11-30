import AuthButton from '@/components/button/AuthButton'
import NavigationMenu from '@/components/NavigationMenu'
import Link from 'next/link'

export default async function Header() {
  return (
    <div className="flex items-center sticky top-0 z-30 bg-white w-full">
      <Link href="/">
        <p className="font-bold text-inherit px-6 text-xl">Bamboo Nest</p>
      </Link>

      <AuthButton />
      <NavigationMenu />
    </div>
  )
}
