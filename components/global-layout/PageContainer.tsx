// import Image from 'next/image'
import BackButton from '../buttons/BackButton'

export default function PageContainer({
  children,
  justify = 'justify-center',
  className,
}: {
  children: React.ReactNode
  justify?: 'justify-center' | 'justify-start'
  className?: string
}) {
  return (
    <div className="bg-background pb-16">
      <BackButton />
      <div
        className={`w-full vh-without-nav mx-auto flex flex-wrap flex-col px-6 lg:px-64 max-w-7xl ${justify} items-center ${
          className || ''
        }`}
      >
        {children}
      </div>
    </div>
  )
}
