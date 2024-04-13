'use client'

import { getBidsForAuction } from '@/app/actions/AuctionActions';
import Heading from '@/app/components/Heading';
import { useBidStore } from '@/hooks/useBidStore';
import { Auction, Bid } from '@/types';
import { error } from 'console';
import { User } from 'next-auth';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import BidItem from './BidItem';
import { numberWithCommas } from '@/app/lib/numberFormater';
import EmptyFillter from '@/app/components/EmptyFillter';
import BidForm from './BidForm';

type Props = {
    user: User | null
    auction : Auction
}


function BidList({ user, auction }: Props) {
    const [loading, setloading] = useState(true)
    const bids = useBidStore(state => state.bids);
  const setBids = useBidStore(state => state.setBids);
  const higBid = bids.reduce((prev, current) => prev > current.amount ? prev : current.bidStatus.includes("Accepted") ? current.amount : prev, 0);
  const open = useBidStore(state => state.open);
  const setOpen = useBidStore(state => state.setOpen);
  const openForBids = new Date(auction.auctionEnd) > new Date();
    useEffect(() => {
        getBidsForAuction(auction.id)
            .then((res: any) => {
                if (res.error) throw res.error;
                setBids(res as Bid[])
            })
            .catch(err => {
                toast.error(err.message)
            })
            .finally(() => setloading(false));
            
        
    }, [auction.id, setloading, setBids]);
  
  useEffect(() => {
    setOpen(openForBids);
   },[openForBids,setOpen]);

    if( loading) return <span>Loading ...</span>
  return (
    <div className="rounded-lg shadow-md">
      <div className="py-2 px-4 bg-white">
        <div className='sticky top-0 bg-white py-2 '>
        <Heading title={`Current hign bid is $${numberWithCommas(higBid)}`} />
        </div>      
      </div>
      <div className="overflow-auto h-[400px] flex flex-col-reverse px-2">
        {bids.length === 0 ? (
        <EmptyFillter title='No bids for this auction' subtitle='Are you inetrested in this car, please place your bid'/>
        ) : (
          bids.map((bid) => (
            <BidItem key={bid.id} bid={bid}/>
          ))
            
        )}
      </div>

      <div className="px-2 pb-2 text-gray-500">
        {!open ?
          (<div className='flex items-center justify-center p-2 text-lg font semibold'>Auction has finished.</div>) : 
          !user ?
          (<div className='flex items-center justify-center p-2 text-lg font semibold'>Please log in to bid</div>)
          : user && user.username === auction.seller ? <div className='flex items-center justify-center p-2 text-lg font semibold'>Hope you will get best from this auction</div> :
            (<BidForm auctionId={auction.id }  highBid={higBid}/>)}
        
      </div>
   
  </div>
  )
}

export default BidList