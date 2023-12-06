'use client'
import Image from 'next/image'

export default function ProfilePic({
  image_path,
  fullName,
}: {
  image_path: string
  fullName: string
}) {
  return (
    <>
      <Image
        src={image_path}
        alt={`${fullName}'s profile picture`}
        priority={true}
        width={200}
        height={200}
        className="border mb-16 rounded-full object-cover aspect-square"
      />
    </>
  )
}
