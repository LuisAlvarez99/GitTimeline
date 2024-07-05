'use client'
import { signOut } from "next-auth/react"
import Image from "next/image"

export function SignOut() {
    return <button onClick={() => signOut({callbackUrl: '/'})}><Image className='size-8' width={10} height={10} src="/signout.svg" /></button>
}