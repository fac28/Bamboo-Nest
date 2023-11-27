// import Image from 'next/image'

export default function PageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <Image src="/icecream.jpg" alt="Background Image" fill={true} /> */}
      <div className="w-full sm:max-w-md justify-center mx-auto flex flex-wrap items-center">
        {children}
      </div>
    </>
  )
}
