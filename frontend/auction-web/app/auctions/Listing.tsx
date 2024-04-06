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


export default function Listing() {

  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStore(state => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    seller: state.seller,
    winner: state.winner
      
  }))

  const setParams = useParamsStore(state => state.setParams);
  const url = qs.stringifyUrl({ url: '', query: params });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  
  // const [auctions, setAuctions] = useState<Auction[]>();
  // const [pageCount, setPageCount] = useState(0);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [pageSize, setpageSize] = useState(4)

  useEffect(() => {
    getData(url)
      .then(data => {
        setData(data)
      })
  }, [url]);


  if (!data) return <h3>Loading...</h3>
  
  if (data.totalCount === 0) return <EmptyFillter showReset />
  
  console.log(data.results)


  return (
    
    <>
      <Filters />
    <div className='grid grid-cols-4 gap-6'>
       {data.results && data.results.map((auction) => (
                <Card key={auction.id} auction={auction} />
            ))}
      </div>

      <div className='flex justify-center mt-4'>
      <AppPagination currentPage={params.pageNumber} pageCount={data.pageCount} pageChanged={setPageNumber} />

      </div>
    </>  
  )
}
