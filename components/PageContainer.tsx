// import Image from 'next/image'

export default function PageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <Image src="/icecream.jpg" alt="Background Image" fill={true} /> */}
      <div className="w-full px-96 py-24 vh-without-nav justify-center mx-auto flex flex-wrap flex-col items-center global-background">
        {children}
      </div>
    </>
  )
}
