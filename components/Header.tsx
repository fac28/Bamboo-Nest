import AuthButton from '@/components/AuthButton'
import NavigationMenu from '@/components/NavigationMenu'

export default async function Header() {
  return (
    <div className="flex items-center">
      <p className="font-bold text-inherit px-6 text-xl">Bamboo Nest</p>

      <AuthButton />
      <NavigationMenu />
    </div>
  )
}
