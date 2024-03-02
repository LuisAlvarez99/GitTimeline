'use client'
import React from "react"
import ssoGitHub from "./SSOAuth"


export default function Login() {
    return(
        <div className="bg-slate">
            <a href="/test">Test</a>
            <div className="flex flex-col items-center gap-1">
                <h1 className="h-8 w-max align-center bg-red-400 border border-solid  border-blue-500">
                    Connect to Github to build your timeline
                </h1>
                {/* <ssoGitHub><ssoGitHub/> */}
            </div>
        </div>
    )
}