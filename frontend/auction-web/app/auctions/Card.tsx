import React from 'react'
import CountdownTimer from './CountdownTimer'
import CarImage from './CarImage'
import { Auction } from '@/types'
import Link from 'next/link'
import CurrentBid from './CurrentBid'

type Props = {
    auction: Auction | null // Make auction optional
}

export default function Card({ auction }: Props) {
    // Perform null check for auction object
    if (!auction) {
        return null; // Or render a placeholder or handle the null case appropriately
    }

    return (
        <Link href={`/auctions/details/${auction?.id}`} className='group'>
            <div className="w-full bg-gray-200 aspect-w-16 aspect-h-10  overflow-hidden rounded-lg">
                <div>
                {auction.imageUrl && <CarImage imageUrl={auction.imageUrl} />}
                <div className='absolute bottom-2 left-2 '>
                    <CountdownTimer auctionEnd={auction.auctionEnd} />
                </div>
                <div className='absolute top-2 right-2 '>
                    <CurrentBid  amount={auction.currentHighBid} reservePrice={auction.reservePrice} />
                </div>
                </div>
             
            </div>
            <div className="flex justify-between items-center mt-4">
                <h3 className="text-gray-700 ">{auction.make} {auction.model}</h3>
                <p className="font-semibold text-sm">{auction.year}</p>
            </div>
        </Link>
    )
}
