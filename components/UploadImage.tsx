'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function PreviewImage({ profile }: { profile: string }) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const file = event.target.files?.[0]
      if (file) {
        setSelectedImage(file)

        const imageURL = URL.createObjectURL(file)
        setImagePreview(imageURL)
      }
    }
  }

  return (
    <>
      <label htmlFor="profile-picture">Profile Picture</label>
      <Image
        src={selectedImage ? imagePreview : profile}
        width={100}
        height={100}
        alt="Preview"
      />
      <input
        type="file"
        id="profile-picture"
        name="profile-picture"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
      />
    </>
  )
}
