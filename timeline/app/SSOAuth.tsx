'use server'

// import { React } from 'react'
import { redirect } from "next/navigation"

export default function ssoGitHub() {
    return(
        <button 
                type="button" 
                className="bg-slate-700 h-max w-max"
                onClick={() =>{confirm("Conencting to Github") ? redirect('/test'): console.log("Said No")}}
            >
                    Github SSO
            </button>
    )
}