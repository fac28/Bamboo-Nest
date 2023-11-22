import AuthButton from '@/components/AuthButton'
import NavigationMenu from '@/components/NavigationMenu'

export default async function Header() {
  return (
    <div className="flex">
      <NavigationMenu />
      <AuthButton />
    </div>
  )
}
