'use client'

import { useParamsStore } from '@/hooks/useParamsStore';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaCaravan } from "react-icons/fa";


export default function Logo() {
  const router = useRouter();
  const pathName = usePathname();
  const reset = useParamsStore(state => state.reset)
  function resetLogic() {
    if (pathName !== '/') router.push('/')
    reset()
  }

  return (
    <div onClick={resetLogic} className='cursor-pointer flex items-center gap-2 text-1xl font-semibold text-yellow-500'>
    <FaCaravan size={34} />   
    <div>Carsies Auctions</div>      
    </div>
  )
}
