import AuthButton from '@/components/AuthButton'
import NavigationMenu from '@/components/NavigationMenu'
import Link from 'next/link'

export default async function Header() {
  return (
    <div className="flex items-center relative z-10">
      <Link href="#">
        <p className="font-bold text-inherit px-6 text-xl">Bamboo Nest</p>
      </Link>

      <AuthButton />
      <NavigationMenu />
    </div>
  )
}
