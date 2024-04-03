'use client'
import { useParamsStore } from '@/hooks/useParamsStore';
import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";


export default function Search() {
    const setParams = useParamsStore(state => state.setParams);
    const setSearchValue = useParamsStore(state=> state.setSearchValue)
    const searchValue = useParamsStore(state => state.searchValue)
    function onSearchInputCHange(event : any) {
        setSearchValue(event.target.value)
    }

    function search() {
        setParams({searchTerm:searchValue})
    }
  return (
      <div className='flex w-[50%] items-center border-2 rounded-full  py-2 shadow-sm bg-white'>
          <input
              onKeyDown={(e: any) => {
                  if(e.key === 'Enter') search()
              }}
              onChange={onSearchInputCHange}
              value={searchValue}
              type="text"
              placeholder='Search for cars by make, model, year or color'
              className='flex-grow pl-5 bg-transparent focus:outline-none border-transparent  focus:border-transparent focus:ring-0 text-sm text-gray-600' />
          <button onClick={search}>
              <IoSearchSharp size={34}
               className='bg-black text-yellow-300 rounded-full cursor-pointer p-2 mx-2'/>
          </button>
      
    </div>
  )
}
