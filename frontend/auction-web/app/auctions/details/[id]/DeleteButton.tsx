'use client'

import Link from 'next/link'
import { MdOutlineEditRoad } from "react-icons/md";

import React, { useState } from 'react'
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { deleteAuction } from '@/app/actions/AuctionActions';
import toast from 'react-hot-toast';


type Props = {
    id: string

}

export default function DeleteButton({ id }: Props) {
    const [loading, setloading] = useState(false);
    const router = useRouter();
    function doDelete() {
        setloading(true);
        deleteAuction(id)
            .then(res => { if (res.error) throw res.error; router.push('/') })
            .catch(error => { toast.error(error.status + ' ' + error.message) })
            .finally(() => setloading(false))
    }
  return (
    <Button color={'failure'}  isProcessing={loading} onClick={doDelete} >
       X
    </Button>
  )
}