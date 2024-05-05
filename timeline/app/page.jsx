'use client'

import React from "react"
import { useRouter } from "next/navigation"
import Image from 'next/image'

export default function Login() {

    const router = useRouter()
    return(
        <div className="bg-gradient-to-br from-slate-700 to-slate-400 via-blue-400 h-full">
            <div className="flex flex-col gap-2 h-full justify-evenly items-center">
                {/* <a className="self-start Justify-self-start" href="/test">Test</a> */}
                <h1 className="text-5xl bg-slate-600 rounded-xl p-2 font-bold">
                    Connect to Github to build your timeline
                </h1>
                <a className="flex rounded-xl justify-center items-center bg-slate-600 w-52 h-16" href='/api/auth/signin?callbackUrl=/timeline'>
                    <Image className="size-6" width={6} height={6} src="/github.svg" alt="GitHub"/>
                    <h1 className="font-semibold text-xl">GitHub SSO</h1>
                </a>

                {/* <button 
                type="button" 
                className="bg-gray-600 border rounded-lg w-80 h-16"
                onClick={() =>{confirm("Conencting to Github") ? router.push('/api/auth/signin?callbackUrl=/timeline'): router.push('/api/auth/signout')}}
            >
                    Github SSO
            </button> */}

            </div>
        </div>
    )
}