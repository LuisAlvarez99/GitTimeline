"use client"
import { signIn } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils"
import Image from "next/image"
import React from "react"


export default function SignIn() {
    return (
        <button className="flex rounded-xl justify-center items-center bg-slate-600 w-52 h-16" onClick={() => signIn("github", {callbackUrl: "http://localhost:3000/timeline"})}>
            <Image className="size-6" width={6} height={6} src="/github.svg" alt="GitHub" />
            <h1 className="font-semibold text-xl">GitHub SSO</h1>
        </button>
    )
}