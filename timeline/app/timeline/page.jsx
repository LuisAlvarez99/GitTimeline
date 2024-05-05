import React from "react";
// import navigation from 'next'
import Image from 'next/image'
import TimelineNav from "../components/TimelineNav"
import { auth } from "../auth";
import { Octokit } from 'octokit'
// import { getCsrfToken } from "next-auth/react";
// import ProjectNodes from "../components/ProjectNodes"

async function getToken() {
    const csrfToken = await fetch("http://localhost:3000/api/auth/csrf")
    
    if(!csrfToken.ok) {
        throw new Error('Failed to fetch data')
    }
    
    return csrfToken.json()
}


export default async function Timeline() {
    
    const session = await auth()
    const token = await getToken()
    console.log("Token: " + token.csrfToken);
    const octokit = new Octokit({
        auth: token.csrfToken
    });
    const sessionUser = session.user.name;
    
    // Fetch repositories for a specific user
    async function getUserRepositories(username) {
      try {
        const response = await octokit.request('GET /users/{username}/repos', {
          username: username
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching repositories:", error);
        throw error;
      }
    }
    
    // const userData = await octokit.rest
    // const data = octokit.request('GET /users/LuisAlvarez99/repos');
    getUserRepositories('LuisAlvarez99')
    .then(repos => {
        console.log("User's repositories:", repos);
    })
    .catch(error => {
        console.error("Error:", error);
    });
    //    const data = octokit.rest.issues.listLabelsForRepo();

    const randomNodes = [


        {
        "repo":"gitTimeline",
        "filesys":
            {
                "file1":"tmp.js",
                "file2":"tmp.py",
                "file3":"tmp.ts",
            },
        "commithistory":
            {
                "commit1":
                    {
                    "msg": "This is a commit message",
                    "key": "asuhfkjb123qsr",
                    },
                "commit2":
                    {
                    "msg": "This is a commit message",
                    "key": "aset aregaserva r",
                    },
                "commit3":
                    {
                    "msg": "This is a commit message",
                    "key": "ercq423v6w54543vweera",
                    },
                "commit4":
                    {
                    "msg": "This is a commit message",
                    "key": "e5h7drtsg4d5h7e45gse5dte",
                    },
            },
        "user":
        {
            "name":"Luis Alvarez",
            "memberdate":"2010",
            "rating":"3/5",
        },
        "langs":["js","ts","css"],
        "readme":"",
        },


        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
        {
        "n0":"n0",
        },
    ];

    return(
        // <div className="bg-slate-700 h-screen">
        <div className="flex flex-col h-full w-auto bg-slate-700">
            <TimelineNav />    
            {/* <pre>
                {JSON.stringify(data,null,2)}
            </pre> */}

            <div  className="flex h-full justify-center items-center">
                {randomNodes.map((node,i) => 
                                                <a key={i} href="/projectName">
                                                    <Image className="size-10" width={10} height={10} src="/pin.svg" alt="project pin" />
                                                </a>
                )}
                {/* {randomNodes.map((node,i) => <ProjectNodes key= {i} node={node}/>)} */}
                
            </div>
        </div>
        // </div>
    )
    
}