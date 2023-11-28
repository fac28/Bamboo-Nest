// import Image from 'next/image'
import BackButton from './BackButton'

export default function PageContainer({
  children,
  justify = 'justify-center',
}: {
  children: React.ReactNode
  justify?: 'justify-center' | 'justify-start'
}) {
  return (
    <div className="global-background">
      <BackButton />
      <div
        className={`w-full vh-without-nav mx-auto flex flex-wrap flex-col px-64 max-w-7xl ${justify}`}
      >
        {children}
      </div>
    </div>
  )
}
