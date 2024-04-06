'use client'

import { Button, TextInput } from 'flowbite-react';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/Input';
import DateInput from '../components/DateInput';
import { createAuction } from '../actions/AuctionActions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Auction } from '@/types';


type Props = {
    auction?:Auction
}


export default function AuctionForm({auction}:Props) {
    const router = useRouter()
    const { control, handleSubmit, setFocus, reset, formState: { isSubmitting, isValid } } = useForm({ mode: 'onTouched' })
    
    useEffect(() => {
      
        setFocus('make')
    }, [setFocus])
  
 async function onSubmit(data : FieldValues) {
     try {
         const res = await createAuction(data);
         if (res.status === 401) {
             toast.error("You are not authorized, please login first");
             return;
         }
         

         router.push(`/auctions/details/${res.id}`)
        
     } catch (error: any) {
         
         toast.error("something went wrong!");
         return;
          
      }
  }
  return (
      <form className='flec flex-col mt-3 ' onSubmit={handleSubmit(onSubmit)}>
          
          <Input  label='Make' name='make' control={control} rules={{ required: '"Make" field is required' }} />
          <Input  label='Model' name='model' control={control} rules={{ required: '"Model" field is required' }} />
          <Input  label='Color' name='color' control={control} rules={{ required: '"Color" field is required' }} />
          <div className="grid grid-cols-2 gap-3">
              <Input  label='Year' name='year' control={control} type='number' rules={{ required: '"Year" field is required' }} />
              <Input  label='Mileage' name='mileage' control={control} type='number' rules={{required :'"Mileage" field is required'}}/>
          </div>
          <Input  label='Image URL' name='imageUrl' control={control} rules={{required :'"Image URL" field is required'}}/>
          <div className="grid grid-cols-2 justify-center gap-3">
              <Input  label='Reserve Price (leave 0 if no reserve)' name='reservePrice' control={control} type='number' rules={{ required: '"Reserve Price" field is required' }} />
              <DateInput label='Auction End (date/time)' name='auctionEnd' control={control} dateFormat='dd MMMM yyyy h:mm a' showTimeSelect  rules={{required :'"Auction End" field is required'}}/>
          </div>


   
          <div className="flex justify-between">
              <Button outline type='button' color={'gray'}>Cancel</Button>
              <Button isProcessing={isSubmitting}  disabled={!isValid} type='submit' outline color={'success'}>Sell</Button>
          </div>    
    </form>
  )
}
