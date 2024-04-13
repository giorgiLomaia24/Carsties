import { Auction, AuctionFinished } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { numberWithCommas } from '../lib/numberFormater';

type Props = {
    auctionFinished:AuctionFinished
    auction : Auction
}

export default function AuctionFinishedNotification({auction,auctionFinished}:Props) {
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
              <div className='flex flex-col'>
                  <span>Auction for {auction.make} {auction.model} by {auction.seller} has finished!</span>
                  {auctionFinished.itemSold && auctionFinished.amount ?
                      (<p>Congrats to {auctionFinished.winner}, who won this auction for ${numberWithCommas(auctionFinished.amount)}</p>) :
                      (<p>Without winner</p>)}
                  
              </div>
         </div>      
      </Link>
  )
}
