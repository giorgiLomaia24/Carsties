'use client'
import { useParamsStore } from '@/hooks/useParamsStore';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";


export default function Search() {
    const setParams = useParamsStore(state => state.setParams);
    const setSearchValue = useParamsStore(state=> state.setSearchValue)
    const searchValue = useParamsStore(state => state.searchValue);
    const router = useRouter();
    const pathName = usePathname()
    function onSearchInputCHange(event: any) {
        if(pathName !== '/') router.push('/')

        setSearchValue(event.target.value);
    }

    function search() {
        setParams({searchTerm:searchValue})
    }
    return (
        <>
          <input
              onKeyDown={(e: any) => {
                  if(e.key === 'Enter') search()
              }}
              onChange={onSearchInputCHange}
              value={searchValue}
              type="text"
              placeholder='Search for cars by make, model, year or color'
              className='custom-input text-sm text-gray-600' />
          <button onClick={search}>
              <IoSearchSharp size={34}
               className='bg-black text-yellow-300 rounded-full cursor-pointer p-2 mx-2'/>
          </button>
      
    </>
  )
}
