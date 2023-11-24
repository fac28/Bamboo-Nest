import Image from 'next/image'

export default function PageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Image src="/icecream.jpg" alt="Background Image" fill={true} />
      <div className="w-full sm:max-w-md absolute inset-0 justify-center mx-auto flex items-center">
        {children}
      </div>
    </>
  )
}
