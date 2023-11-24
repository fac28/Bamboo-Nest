import Image from 'next/image'

export default async function PageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Image
        src="/icecream.jpg" // Replace with the path to your background image
        alt="Background Image"
        layout="fill"
        objectFit="cover"
      />
      <div className="w-full sm:max-w-md absolute inset-0 justify-center mx-auto flex items-center">
        {children}
      </div>
    </>
  )
}
