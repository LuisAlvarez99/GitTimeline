import React from "react";
import Image from 'next/image'
import TimelineNav from "../components/TimelineNav"
import { auth } from "../auth"
import { Octokit } from '@octokit/core'
import Link from 'next/Link'

let userRepos = []

export default async function Timeline() {
    
    const session = await auth()
    const token = session.accessToken
    // console.log("Session data: " , session);
    const octokit = new Octokit({
        auth: token
    });

    
    // Fetch repositories for a specific user and store in an array
    async function getUserRepositories(username) {
      try {
        const response = await octokit.request(`GET /users/${username}/repos`, {
          username: username
        });
        // const repos = response.data;
        return response.data;
        } catch (error) {
        console.error("Error fetching repositories:", error);
        throw error;
        }
    }
    const repos = await getUserRepositories("LuisAlvarez99")

    repos.sort((a,b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    const formattedRepos = repos.map(repo => {
        const cretedAt = new Date(repo.created_at);
        const formattedDate = cretedAt.toLocaleString();
        const sessionName = session.user.name;
        // console.log("formattedDate: ", formattedDate);
        return {...repo, formattedDate: formattedDate, sessionName: sessionName}
    })

    userRepos = formattedRepos.map(repo => repo.name);
    let randomNodes = [];
    for ( let node in userRepos) {
        randomNodes.push(userRepos[node]);
    }
    // repos.map(repo => {
    //     console.log(repo.created_at);
    // })
    // console.log("LOGGING REPO DATA: ",Object.getOwnPropertyNames(repos));
    console.log("LOGGING OWNER DATA: ",formattedRepos[0].sessionName);


    // const randomNodes = [
        
        
    //     {
    //         "repo":"gitTimeline",
    //     "filesys":
    //         {
    //             "file1":"tmp.js",
    //             "file2":"tmp.py",
    //             "file3":"tmp.ts",
    //         },
    //     "commithistory":
    //         {
    //             "commit1":
    //                 {
    //                 "msg": "This is a commit message",
    //                 "key": "asuhfkjb123qsr",
    //                 },
    //             "commit2":
    //                 {
    //                 "msg": "This is a commit message",
    //                 "key": "aset aregaserva r",
    //                 },
    //             "commit3":
    //                 {
    //                 "msg": "This is a commit message",
    //                 "key": "ercq423v6w54543vweera",
    //                 },
    //             "commit4":
    //                 {
    //                 "msg": "This is a commit message",
    //                 "key": "e5h7drtsg4d5h7e45gse5dte",
    //                 },
    //         },
    //     "user":
    //     {
    //         "name":"Luis Alvarez",
    //         "memberdate":"2010",
    //         "rating":"3/5",
    //     },
    //     "langs":["js","ts","css"],
    //     "readme":"",
    //     },


    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    //     {
    //     "n0":"n0",
    //     },
    // ];

    return(
        // <div className="bg-slate-700 h-screen">
        <div className="flex flex-col h-full w-auto bg-slate-700">
            <TimelineNav user={session.user.name} />    
            <div  className="flex h-full justify-start items-center overflow-x-scroll">
                {formattedRepos.map((repo,i) => 
                    <Link href={`/repos/${repo.name}?repo=${JSON.stringify(repo)}`} key={i}>
                        <div className=" w-5 h-1 m-1 bg-green-400"></div>
                    </Link>
                )}              
                {/* {formattedRepos.map((repo,i) => 
                    <Link href={`/repos/${repo.name}?repo=${JSON.stringify(repo)}`} key={i}>
                        <div className=" w-5 h-1 m-1 bg-green-400"></div>
                    </Link>
                )}               */}
            </div>
        </div>
        // </div>
    )
}