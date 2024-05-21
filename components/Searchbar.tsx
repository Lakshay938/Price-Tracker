'use client'
import { scrapAndStoreProduct } from '@/lib/actions';
import { scrapAmazonProduct } from '@/lib/scraper';
import React, { FormEvent } from 'react'
import { useState } from 'react';
import { redirect } from 'next/navigation';

export const Searchbar = () => {
    const isValidAmazonLink = (url:string)=>{
        try{
            const parsedURL = new URL (url);
            const hostname = parsedURL.hostname;
            if(hostname.includes('amazon.com') ||
               hostname.includes('amazon.in') ||
               hostname.includes('amazon')         
        ){
            return true;
        }
        }
        catch(e){
            return false;
        }
        return false;
    }
    const [searchPrompt, setsearchPrompt] = useState('');
    const [IsLoading, setIsLoading] = useState(false);
    const handleSubmit =async (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault(); // prevent from reloading
        const isValid = isValidAmazonLink(searchPrompt);
        if(!isValid){
            return alert('Please provide a valid amazon link')
        }

        try{
            setIsLoading(true);
            const product = await scrapAndStoreProduct(searchPrompt);
            // redirect(`/products/${product._id}`)
        }
        catch(e){
            console.log(e);
        }
        finally{
            setIsLoading(false);
        }

    }
  return (
        <form className='flex flex-wrap gap-4 mt-12'
        onSubmit={handleSubmit}>
            <input
            type='text'
            value={searchPrompt}
            onChange={(e)=> setsearchPrompt(e.target.value)}
            placeholder='Enter product link here'
            className='searchbar-input' >
            </input>
            <button type='submit' 
            disabled={searchPrompt===''}
            className='searchbar-btn'>{IsLoading ? 'Searching...':'Search'}</button>
        </form>
  )
}
