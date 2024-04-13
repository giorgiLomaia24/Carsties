import { numberWithCommas } from '@/app/lib/numberFormater';
import { Bid } from '@/types'
import { format } from 'date-fns';
import React from 'react'


type Props = {
    bid : Bid
}

export default function BidItem({ bid }: Props) {
    
    function gettingBidInfo() {
        let bgColor = '';
        let text = '';
        switch (bid.bidStatus) {
            case 'Accepted':
                bgColor = 'bg-green-200';
                text = 'Bid Accepted';
                break;
            case 'AcceptedBelowReserve':
                bgColor = 'bg-amber-500';
                text = 'Reserve Not Met';
                break;
            case 'TooLow':
                bgColor = 'bg-red-200';
                text = 'Too Low';
                break;   
            default:
                bgColor = 'bg-red-200';
                text = 'Bid Placed After Auction Finished';
                break;
        }

        return {bgColor, text}
    }
  return (
    <div className={`border-gray-300 border-2 px-3 py-2 rounded-lg flex justify-between items-center mb-2 ${gettingBidInfo().bgColor} `}>
          <div className="flex flex-col">
              <span>Bidder: {bid.bidder}</span>
              <span className='text-gray-700 text-sm'>Time : {format(new Date( bid.bidTime),'dd MM yyyy h:mm a') }</span>
          </div>
          <div className="flex flex-col text-right">
              <div className="text-xl font-semibold">${ numberWithCommas(bid.amount)}</div>
              <div className="flex flex-row items-center text-right">
                  <span>{gettingBidInfo().text }</span>
              </div>
          </div>
    </div>
  )
}
