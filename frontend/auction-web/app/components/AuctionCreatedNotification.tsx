import { Auction } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
    auction : Auction
}

export default function AuctionCreatedNotification({auction}:Props) {
  return (
      <Link href={`/auctions/details/${auction.id}`} className='flex flex-col items-center'>
          <div className="flex flex-row items-center gap-2">
              <Image
                  src={auction.imageUrl}
                  height={80}
                  width={80}
                  alt='auction image'
                  className='rounded-lg w-auto  h-auto'
              /> 
              <span>New Auction! {auction.make} {auction.model} by {auction.seller }</span>
          </div>      
      </Link>
  )
}
