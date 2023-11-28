// import Image from 'next/image'
import BackButton from './BackButton'

export default function PageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="global-background">
      <BackButton />
      <div className="w-full vh-without-nav justify-center mx-auto flex flex-wrap flex-col px-64 max-w-7xl">
        {children}
      </div>
    </div>
  )
}
