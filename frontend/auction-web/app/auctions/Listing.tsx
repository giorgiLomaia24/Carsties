'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/AuctionActions';
import { Auction, PagedResult } from '@/types';
import Filters from './Filters';
import { useParamsStore } from '@/hooks/useParamsStore';
import { shallow } from 'zustand/shallow';

import qs from 'query-string'
import EmptyFillter from '../components/EmptyFillter';
import { useAuctionStore } from '@/hooks/useAuctionStore';
import Loading from '../components/Loading';


export default function Listing() {

  const params = useParamsStore(state => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    seller: state.seller,
    winner: state.winner
      
  }));

  const data = useAuctionStore(state => ({
    auctions: state.auctions,
    totalCount: state.totalCount,
    pageCount: state.pageCount
  }));


  const setData = useAuctionStore(state => state.setData);



  const setParams = useParamsStore(state => state.setParams);
  const url = qs.stringifyUrl({ url: '', query: params });
  const [loading, setLoading] = useState(true);


  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  
  // const [auctions, setAuctions] = useState<Auction[]>();
  // const [pageCount, setPageCount] = useState(0);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [pageSize, setpageSize] = useState(4)

  useEffect(() => {
    setLoading(true)
    getData(url)
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [url]);


  if (loading) return <Loading/>
  
  if (data.totalCount === 0) return <EmptyFillter showReset />
  
  console.log(data.auctions)


  return (
    
    <>
      <Filters />
     
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
       {data.auctions && data.auctions.map((auction) => (
                <Card key={auction.id} auction={auction} />
            ))}
      </div>

      <div className='flex justify-center mt-4'>
      <AppPagination currentPage={params.pageNumber} pageCount={data.pageCount} pageChanged={setPageNumber} />

      </div>
    </>  
  )
}
