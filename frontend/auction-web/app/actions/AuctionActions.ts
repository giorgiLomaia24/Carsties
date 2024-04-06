'use server'

import { Auction, PagedResult } from '@/types';
import { getTokenWorkaround } from './AuthActions';
import { fetchWrapper } from '@/lib/fetchWrapper';
import { FieldValues } from 'react-hook-form';

export  async function getData(query:string) : Promise<PagedResult<Auction>>
{
    return await fetchWrapper.get(`search${query}`)

    // const res = await fetch(`http://localhost:6001/search${query}`);

    // if (!res.ok) throw new Error("Failed to fetch Data");

    // return res.json();
    
}


export async function updateAuctionTest() {
    const data = {
        millage: Math.floor(Math.random() * 1000000) + 1
    } 
    return await fetchWrapper.put('auctions/3659ac24-29dd-407a-81f5-ecfe6f924b9b',data);
}

export async function createAuction(data: FieldValues) {
    return await fetchWrapper.post('auctions', data);
}

export async function getAuctionById(id : string) : Promise<Auction> {
    return await fetchWrapper.get(`auctions/${id}`);
}


export async function deleteAuction(id : string){
    return await fetchWrapper.del(`auctions/${id}`);
}

