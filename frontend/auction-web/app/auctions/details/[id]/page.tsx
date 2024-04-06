import { getAuctionById } from '@/app/actions/AuctionActions'
import Heading from '@/app/components/Heading'
import { fetchWrapper } from '@/lib/fetchWrapper'
import React, { useEffect } from 'react'
import CountdownTimer from '../../CountdownTimer'
import CarImage from '../../CarImage'
import DetailedSpecs from './DetailedSpecs'
import EditButton from './EditButton'
import { getCurrentUser } from '@/app/actions/AuthActions'
import DeleteButton from './DeleteButton'

export default async function Deatils({ params }: { params: { id: string } }) {
  const data = await getAuctionById(params.id);
  const user = await getCurrentUser();

  return (
    <div>
      <div className='flex justify-between'>
        <div className="flex gap-2">
        <Heading title={`${data.make} ${data.model}`} />
        {user?.username === data.seller && (
          <DeleteButton id={data.id } />

        )}
        </div>       
        <div className='flex gap-3'>
          <h3 className="text-2xl font-semibold"> Time Remaining :</h3>
          <CountdownTimer auctionEnd={data.auctionEnd } />
        </div>
      </div>
      

      <div className="grid grid-cols-2 gap-6 mt-3">
        <div className="w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden">
          <CarImage imageUrl={data.imageUrl} />
        </div>
        <div className="border-2 rounded-lg p-2 bg-gray-100">
          <Heading title='Bids'/>
        </div>

      </div>

      <div className="grid grid-cols-1 rounded-lg mt-3">
          <DetailedSpecs auction={data}/>
        </div>

    </div>
   
  )
}
