import React from 'react'
import TimelineNav from '../components/TimelineNav'
import { Octokit } from 'octokit'
import Image from "next/image"
// import axios from "axios"
import { auth } from "../auth"
// import Utility from '../components/Utility'

async function getToken() {
    const csrfToken = await fetch("http://localhost:3000/api/auth/csrf")
    
    if(!csrfToken.ok) {
        throw new Error('Failed to fetch data')
    }
    
    return csrfToken.json()
}

export default async function projectName() {
    
    // useEffect({
    //     axios.get(`api.github.com/users/${session.user.name}`)
    // },[])

    // console.log("utils: " + Object.keys(Utility))
    
    const session = await auth()
    const token = await getToken()
    console.log("Token: " + token.csrfToken);
    const octokit = new Octokit({
        auth: token.csrfToken
    });

    // const userData = await octokit.rest
    // console.log("User Obj: " + Object.keys(octokit.rest.users));


    return(
        <div className='flex flex-col h-screen w-auto bg-slate-700'>
            <TimelineNav />
            {/* <pre>
                {userData}
            </pre> */}
            <span className='border border-blue-500 rounded-md self-center h-5/6 m-10 w-4/5 flex flex-wrap'>
                <span className='self-center h-full w-4/5 flex flex-col '>
                    <h1 className='border-r-2 border-blue-500 justify-self-end w-auto h-1/5'>Project name here</h1>
                    <h3 className='border-r-2 border-blue-500  w-auto h-2/5'>table showing file structure <b>this will be a component</b></h3>
                    <div className='h-3/5 border-r-2 border-blue-500 '>Graph of commit history</div>
                </span>
                <div className='h-full w-1/5 self-end'>
                    <div className='pt-5 h-1/5 border-l-2 border-red-600 flex justify-evenly'>
                        <Image className='size-10 rounded-full' width={10} height={10} src={session.user.image} alt='userpfp'/>
                        <h1 className='pt-2'>{session.user.name}</h1>
                    </div>
                    <h1 className='h-1/5 border-l-2 border-red-600'>Project languages</h1>
                    <h1 className='h-3/5 border-l-2 shadow-2xl border-red-600'>Readme.md</h1>
                </div>
            </span>

        </div>
    )
}