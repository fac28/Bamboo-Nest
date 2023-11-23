import AuthButton from '@/components/AuthButton'
import NavigationMenu from '@/components/NavigationMenu'

export default async function Header() {
  return (
    <div className="flex justify-between items-center">
      <p className="font-bold text-inherit px-6">Bamboo Nest</p>

      <AuthButton />
      <NavigationMenu />
    </div>
  )
}
