'use client'

import { placeBidForAuction } from '@/app/actions/AuctionActions';
import { numberWithCommas } from '@/app/lib/numberFormater';
import { useBidStore } from '@/hooks/useBidStore';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
    auctionId: string
    highBid:number
   
}

export default function BidForm({ auctionId, highBid }: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const addBid = useBidStore(state => state.addBid);
  function onSubmitForm(data: FieldValues) {
    if (data?.amount <= highBid) {
      reset();
      return toast.error("bid must be at least $" + numberWithCommas( highBid + 1) );
    }
        placeBidForAuction(auctionId, +data.amount)
          .then(bid => {

            console.log(bid,'bid')
           
            if (bid.status === 400) {
              reset()
              throw bid;
            } 
                addBid(bid);
                reset();
        }).catch(err => toast.error(err.message));
    }
  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className='flex items-center border-2 rounded-lg py-2 px-3'>
          <input type="number"
              {...register('amount')}
              className='custom-input text-sm tetx-gray-600'
              placeholder={`Enter Your Bid (minimum bid is $${numberWithCommas(highBid + 1)})`}
            />
    </form>
  )
}
