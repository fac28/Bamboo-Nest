'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function PreviewImage(
  { image_path, item_picture=false }:
  { image_path: string,
    item_picture?: boolean }) {
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
      <Image
        src={selectedImage ? imagePreview : image_path}
        width={100}
        height={100}
        alt="Preview"
      />

      {item_picture?
      (<input
        type="file"
        id="item-picture"
        name="item-picture"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
        required
        aria-required="true"
      />):
      (<input
        type="file"
        id="profile-picture"
        name="profile-picture"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
      />)}
    </>
  )
}
