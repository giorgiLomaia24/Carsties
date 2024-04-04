'use client'

import React, { useState } from 'react'
import { updateAuctionTest } from '../actions/AuctionActions';
import { Button } from 'flowbite-react';

export default function AuthTest() {
    const [loading, setloading] = useState(false);
    const [result, setresult] = useState<any>();

    function doUpdate() {
        setresult(undefined);
        setloading(true);
        updateAuctionTest()
            .then(res => setresult(res))
        .finally(() => setloading(false))
    }

  return (
      <div className='flex items-center gap-4'>
          <Button outline isProcessing={loading} onClick={doUpdate}>Do Test</Button>
          <div>{JSON.stringify(result,null,2) }</div>
      
    </div>
  )
}
