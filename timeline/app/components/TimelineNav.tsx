'use client'
import React from 'react'
import Image from 'next/image'
import { SignOut } from './auth/signout-button'
import { useRouter } from 'next/router'

function TimelineNav({...props})  {
    // console.log(props);
    return(
        <div className='h-16 w-screen bg-slate-500 flex justify-between'>
            <a className=' text-6xl' href="/timeline">{props.user}'s Timeline</a>
            <div className='flex'>
                <a className='self-center mr-3' href='/timeline'>
                    <Image className='size-8' width={10} height={10} src="/home.svg" />    
                </a>
                <SignOut/>
            </div>
        </div>
    )
}

export default TimelineNav;