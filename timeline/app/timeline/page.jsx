import React from "react";
import Image from 'next/image'
import TimelineNav from "../components/TimelineNav"
import { auth } from "../auth"
import { Octokit } from '@octokit/core'
import { Link } from 'next/link'

// async function getToken() {
//     const csrfToken = await fetch("http://localhost:3000/api/auth/csrf")
    
//     if(!csrfToken.ok) {
//         throw new Error('Failed to fetch data')
//     }
    
//     return csrfToken.json()
// }

let userRepos = []

export default async function Timeline() {
    
    const session = await auth()
    const token = session.accessToken
    // console.log("Session data: " , session);
    const octokit = new Octokit({
        auth: token
    });
    const sessionUser = session.user.name;
    
    // Fetch repositories for a specific user
    async function getUserRepositories(username) {
      try {
        const response = await octokit.request(`GET /users/${username}/repos`, {
          username: username
        });
        const repos = response.data;
        userRepos = repos.map(repo => repo.name);
        return repos;
      } catch (error) {
        console.error("Error fetching repositories:", error);
        throw error;
      }
    }
    
    getUserRepositories("LuisAlvarez99")
    .then(repos => {
        // console.log("User's repositories:", userRepos);
            // for (let repo of repos) {
            //     userRepos.push(repo["name"]);
            // }
        })
        .catch(error => {
            console.error("Error:", error);
        });
        
        
    let randomNodes = [

    ];
    
    for ( let node in userRepos) {
        randomNodes.push(userRepos[node]);
    }
    // randomNodes.push(userRepos);
    // console.log("repo nodes: ", randomNodes);
    
    // const userData = await octokit.rest
    // const data = octokit.request('GET /users/LuisAlvarez99/repos');
    // const data = octokit.rest.issues.listLabelsForRepo();
    
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
            <TimelineNav />    
            <div  className="flex h-full justify-start items-center overflow-x-scroll">

                {randomNodes.map((node,i) => 
                    <Link href={`/repos/${node}`} as={`/repos/${node}`} key={i} passHref>
                        <a>
                            <div className=" w-5 h-1 m-1 bg-green-400"></div>
                        </a>
                    </Link>
                )}
                
            </div>
        </div>
        // </div>
    )
    
}