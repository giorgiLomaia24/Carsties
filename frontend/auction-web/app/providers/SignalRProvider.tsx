'use client'

import { useAuctionStore } from '@/hooks/useAuctionStore';
import { useBidStore } from '@/hooks/useBidStore';
import { Auction, AuctionFinished, Bid } from '@/types';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { User } from 'next-auth';
import React, { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import AuctionCreatedNotification from '../components/AuctionCreatedNotification';
import { getAuctionById } from '../actions/AuctionActions';
import AuctionFinishedNotification from '../components/AutionFinishedNotification';


type Props = {
    children: ReactNode
    user : User | null
}

export default function SignalRProvider({ children ,user}: Props) {
    const [connection, setconnection] = useState<HubConnection | null>(null);
    const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice);
    const addBid = useBidStore(state => state.addBid);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:6001/notifications')
            .withAutomaticReconnect()
            .build();
        setconnection(newConnection);
    }, []);
    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('started connection to signalr');

                    connection.on('BidPlaced', (bid: Bid) => {
                        if (bid.bidStatus.includes("Accepted")) {
                            setCurrentPrice(bid.auctionId, bid.amount);
                        }
                        addBid(bid);
                    });

                    connection.on('AuctionCreated', (auction: Auction) => {
                        if (user?.username != auction.seller) {
                             return toast(<AuctionCreatedNotification auction={auction}/>, {duration:10000})
                         }
                    });

                    connection.on('AuctionFinished', (finishedAuction: AuctionFinished) => {
                        const auction = getAuctionById(finishedAuction.auctionId);
                        return toast.promise(auction, {
                            loading: "LOADING",
                            success: (auction) => <AuctionFinishedNotification auction={auction} auctionFinished={finishedAuction} />,
                            error : (err) => "Auction Finished"
                            
                        },{success: {duration:10000,icon:null}})
                    });


            }).catch(err => console.log(err))
           
        }

        return () => {
            connection?.stop();
        }
    },[connection,setCurrentPrice]);
  return (
    children
  )
}
