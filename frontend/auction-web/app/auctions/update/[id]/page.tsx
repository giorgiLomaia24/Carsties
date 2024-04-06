import React from 'react'

export default function Update({params}: {params : {id :string}}) {
  return (
    <div className='mx-auto w-[75%] shadow-lg p-10 bg-white rounded-lg '>
      update page for {params?.id}
    </div>
  )
}
