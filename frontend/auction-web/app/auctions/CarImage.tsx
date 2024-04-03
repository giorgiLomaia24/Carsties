'use client'
import Image from 'next/image'
import React, { useState } from 'react'

type Props = {
    imageUrl : string
}

export default function CarImage({ imageUrl }: Props) {
    const [isloading, setisloading] = useState(true)
  return (
    <Image
          src={imageUrl}
          alt="image"
          fill
          priority
          className={`object-cover group-hover:opacity-75 duration-700 easy-in-out ${isloading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}`}
          sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,25vw'
          onLoad={() => setisloading(false)}/>
  )
}
