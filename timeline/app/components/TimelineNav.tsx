import React from 'react'
import Image from 'next/image'
import { SignOut } from './auth/signout-button'


export default function TimelineNav() {
    return(
        <div className='h-16 w-screen bg-slate-500 flex justify-between'>
            <a className=' text-6xl' href="/timeline">LuisAlvarez99's Timeline</a>
            <a className='self-center' href='/'>
                <Image className='size-8' width={10} height={10} src="/home.svg" />    
            </a>
            <SignOut>
                <Image className='size-8' width={10} height={10} src="/signout.svg" />    
            </SignOut>
        </div>
    )
}