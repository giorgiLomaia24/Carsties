'use client'

import { Button } from 'flowbite-react'
import Link from 'next/link'
import { MdOutlineEditRoad } from "react-icons/md";

import React from 'react'


type Props = {
    id: string

}

export default function EditButton({id} : Props) {
  return (
    <Button color={'green'}  >
        <Link href={`/auctions/update/${id}`}><MdOutlineEditRoad size={14} color='black' /></Link>
    </Button>
  )
}
