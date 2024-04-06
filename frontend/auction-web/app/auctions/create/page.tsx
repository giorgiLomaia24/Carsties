import Heading from '@/app/components/Heading'
import React from 'react'
import AuctionForm from '../AuctionForm'

export default function Create() {
  
  return (
    <div className='mx-auto max-w-[75%] shadow-lg mt-5 bg-white wounded-lg px-6 py-7'>
      <Heading title='Are you selling your car?' subTitle='please enter the details' />
      <AuctionForm/>
    </div>
  )
}
